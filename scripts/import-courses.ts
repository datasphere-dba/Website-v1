import fs from "node:fs";
import path from "node:path";
import sanitizeHtml from "sanitize-html";
import { CourseSchema, type CourseSchemaType } from "../src/lib/course-schema";

const repoRoot = process.cwd();

// Default input paths relative to repo root
const defaultAdminPath = path.resolve(
  repoRoot,
  "../../DataSphere/Week 1 Backup (8 Oct 2026)/raw exports/trainercentral_admin_export.json"
);
const defaultPublicPath = path.resolve(
  repoRoot,
  "../../DataSphere/Week 1 Backup (8 Oct 2026)/Drive copy (shared)/03 TrainerCentral – Courses/TrainerCentral – public course list (69).json"
);

const adminPath = process.argv[2] ? path.resolve(repoRoot, process.argv[2]) : defaultAdminPath;
const publicPath = process.argv[3] ? path.resolve(repoRoot, process.argv[3]) : defaultPublicPath;

console.log(`Loading admin export from: ${adminPath}`);
console.log(`Loading public list from:   ${publicPath}`);

if (!fs.existsSync(adminPath)) {
  console.error(`Error: Admin export file not found at ${adminPath}`);
  process.exit(1);
}
if (!fs.existsSync(publicPath)) {
  console.error(`Error: Public list file not found at ${publicPath}`);
  process.exit(1);
}

const adminData = JSON.parse(fs.readFileSync(adminPath, "utf-8"));
const publicData: Array<{ href: string; text: string }> = JSON.parse(
  fs.readFileSync(publicPath, "utf-8")
);

const launchListPath = path.resolve(repoRoot, "scripts/launch-courses.json");
const overridesPath = path.resolve(repoRoot, "scripts/course-overrides.json");

if (!fs.existsSync(launchListPath)) {
  console.error(`Error: Launch courses list not found at ${launchListPath}`);
  process.exit(1);
}

const launchSlugs: string[] = JSON.parse(fs.readFileSync(launchListPath, "utf-8"));
const overrides: Record<string, Partial<CourseSchemaType>> = fs.existsSync(overridesPath)
  ? JSON.parse(fs.readFileSync(overridesPath, "utf-8"))
  : {};

// Index admin courses by uniqueKey
interface RawAdminCourse {
  uniqueKey: string;
  courseName: string;
  subTitle?: string;
  description?: string;
  courseURL: string;
  type?: string;
  kind?: string;
  publishStatus?: string;
  isPrivateCourse?: string;
  isHiddenCourse?: string;
}

const adminCoursesMap = new Map<string, RawAdminCourse>();
for (const course of adminData.courses as RawAdminCourse[]) {
  adminCoursesMap.set(course.uniqueKey, course);
}

// Index public items by slug extracted from href
const publicCoursesMap = new Map<string, { href: string; text: string }>();
for (const item of publicData) {
  const slug = item.href.replace("https://training.datasphere.co.in/course/", "").replace(/\/$/, "");
  publicCoursesMap.set(slug, item);
}

function cleanDescriptionHtml(rawHtml?: string): string {
  if (!rawHtml) return "";

  // Sanitize allowed tags and drop disallowed tags/attributes while keeping text
  let cleaned = sanitizeHtml(rawHtml, {
    allowedTags: ["p", "br", "strong", "b", "em", "ul", "ol", "li", "h3", "h4", "a"],
    allowedAttributes: {
      a: ["href"],
    },
    transformTags: {
      h1: "h3",
      h2: "h3",
      h5: "h4",
      h6: "h4",
    },
  });

  // Replace &nbsp; runs and unicode non-breaking spaces with normal spaces
  cleaned = cleaned.replace(/(?:&nbsp;|\u00A0)+/g, " ");

  // Remove empty paragraphs
  let prev: string;
  do {
    prev = cleaned;
    cleaned = cleaned.replace(/<p>(?:\s|<br\s*\/?>)*<\/p>/gi, "");
  } while (cleaned !== prev);

  cleaned = cleaned.replace(/\s+<\/p>/g, "</p>");
  cleaned = cleaned.replace(/<p>\s+/g, "<p>");
  cleaned = cleaned.trim();

  // If content does not start with a block tag, wrap in <p>...</p>
  if (cleaned && !/^(?:<p|<h[34]|<ol|<ul)/i.test(cleaned)) {
    cleaned = `<p>${cleaned}</p>`;
  }

  return cleaned;
}

function detectTechnology(title: string, subtitle = ""): CourseSchemaType["technology"] | "unknown" {
  const combined = `${title} ${subtitle}`;
  // AWS Cloud Admin -> cloud
  if (/AWS Cloud Admin/i.test(combined)) return "cloud";
  // MySQL -> mysql
  if (/MySQL/i.test(combined)) return "mysql";
  // SQL Server -> sqlserver
  if (/SQL Server/i.test(combined)) return "sqlserver";
  // MongoDB/Cassandra/DocumentDB/NoSQL -> nosql
  if (/MongoDB|Cassandra|DocumentDB|NoSQL/i.test(combined)) return "nosql";
  // PostgreSQL/Aurora -> postgresql
  if (/PostgreSQL|PotgreSQL|Aurora/i.test(combined)) return "postgresql";
  // Oracle/OCI/Exadata/RAC -> oracle
  if (/Oracle|OCI|Exadata|RAC/i.test(combined)) return "oracle";
  return "unknown";
}

function detectKind(title: string, subtitle = ""): CourseSchemaType["kind"] {
  const combined = `${title} ${subtitle}`;
  if (/bundle|package/i.test(combined)) return "package";
  if (/workshop/i.test(combined)) return "workshop";
  return "course";
}

function detectMode(
  title: string,
  subtitle = "",
  description = ""
): CourseSchemaType["mode"] | "unknown" {
  const combined = `${title} ${subtitle}`;
  if (/\bHML\b/i.test(combined)) return "hml";
  if (/\bOLT\b/i.test(combined)) return "olt";
  if (/workshop/i.test(combined)) return "live-workshop";

  // Check description
  if (/\bHML\b/i.test(description)) return "hml";
  if (/\bOLT\b/i.test(description)) return "olt";
  if (/live workshop/i.test(description)) return "live-workshop";
  if (/self-paced|self paced/i.test(description)) return "self-paced";

  return "unknown";
}

const coursesOutputDir = path.resolve(repoRoot, "src/content/courses");
if (!fs.existsSync(coursesOutputDir)) {
  fs.mkdirSync(coursesOutputDir, { recursive: true });
}

const summaryRows: Array<{
  slug: string;
  technology: string;
  kind: string;
  mode: string;
  price: number;
}> = [];

const errors: string[] = [];

for (let i = 0; i < launchSlugs.length; i++) {
  const slug = launchSlugs[i];
  const order = i + 1;
  const featured = order <= 6;

  const adminCourse = adminCoursesMap.get(slug);
  if (!adminCourse) {
    errors.push(`Slug "${slug}" was not found in admin export.`);
    continue;
  }

  const publicCourse = publicCoursesMap.get(slug);
  if (!publicCourse) {
    errors.push(`Slug "${slug}" was not found in public course list.`);
    continue;
  }

  // Extract price from public text (ends with e.g. "Rs. 3999.00")
  const priceMatch = publicCourse.text.match(/Rs\.\s*([\d,]+(?:\.\d+)?)/i);
  if (!priceMatch) {
    errors.push(`Could not extract price from public text for "${slug}": "${publicCourse.text}"`);
    continue;
  }
  const priceInr = Math.round(parseFloat(priceMatch[1].replace(/,/g, "")));

  const titleRaw = adminCourse.courseName;
  const subtitleRaw = adminCourse.subTitle || undefined;
  const descriptionHtml = cleanDescriptionHtml(adminCourse.description);
  const enrolUrl = adminCourse.courseURL;

  // Auto-detection
  const detectedTech = detectTechnology(titleRaw, subtitleRaw);
  const detectedKind = detectKind(titleRaw, subtitleRaw);
  const detectedMode = detectMode(titleRaw, subtitleRaw, adminCourse.description || "");

  const override = overrides[slug] || {};

  const technology = (override.technology || detectedTech) as CourseSchemaType["technology"];
  const kind = (override.kind || detectedKind) as CourseSchemaType["kind"];
  const mode = (override.mode || detectedMode) as CourseSchemaType["mode"];
  const title = override.title || titleRaw;
  const subtitle = override.subtitle !== undefined ? override.subtitle : subtitleRaw;

  const courseData: CourseSchemaType = {
    slug,
    title,
    ...(subtitle ? { subtitle } : {}),
    technology,
    kind,
    mode,
    priceInr,
    enrolUrl,
    descriptionHtml,
    featured,
    order,
    status: "live",
    sourceUpdatedAt: "2026-10-08",
  };

  // Validate with Zod
  const validation = CourseSchema.safeParse(courseData);
  if (!validation.success) {
    errors.push(
      `Course "${slug}" failed schema validation:\n` +
        validation.error.issues
          .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
          .join("\n")
    );
    continue;
  }

  // Write pretty-printed JSON file
  const outFilePath = path.join(coursesOutputDir, `${slug}.json`);
  fs.writeFileSync(outFilePath, JSON.stringify(validation.data, null, 2) + "\n", "utf-8");

  summaryRows.push({
    slug,
    technology: validation.data.technology,
    kind: validation.data.kind,
    mode: validation.data.mode,
    price: validation.data.priceInr,
  });
}

if (errors.length > 0) {
  console.error("\n=== IMPORT FAILED WITH ERRORS ===");
  for (const err of errors) {
    console.error(err);
  }
  process.exit(1);
}

// Print summary table
console.log("\n=== IMPORT SUCCESSFUL ===");
console.log(`Generated ${summaryRows.length} course files in src/content/courses/\n`);

console.log("| # | Slug | Technology | Kind | Mode | Price (INR) |");
console.log("|---|---|---|---|---|---|");
summaryRows.forEach((row, idx) => {
  console.log(
    `| ${idx + 1} | ${row.slug} | ${row.technology} | ${row.kind} | ${row.mode} | ₹${row.price.toLocaleString("en-IN")} |`
  );
});
