import { CourseSchema } from "@/lib/course-schema";
import { rawCourses } from "@/content/courses";
import type { Course, Technology } from "@/types/course";

function loadCourses(): Course[] {
  const loaded: Course[] = [];

  for (let i = 0; i < rawCourses.length; i++) {
    const raw = rawCourses[i];
    const candidateSlug =
      typeof raw === "object" && raw !== null && "slug" in raw && typeof (raw as { slug: unknown }).slug === "string"
        ? (raw as { slug: string }).slug
        : `course-at-index-${i}`;

    const result = CourseSchema.safeParse(raw);
    if (!result.success) {
      const issueDetails = result.error.issues
        .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
        .join("\n");
      throw new Error(`Schema validation failed for course "${candidateSlug}":\n${issueDetails}`);
    }

    loaded.push(result.data);
  }

  const live = loaded
    .filter((course) => course.status === "live")
    .sort((a, b) => a.order - b.order);

  if (live.length === 0) {
    throw new Error("Zero live courses loaded. Course data bundle is empty or corrupted.");
  }

  return live;
}

// Module-level static cache evaluated at build time (bundled via static imports, no fs or runtime file access)
const liveCourses: Course[] = loadCourses();

export function getAllCourses(): Course[] {
  return liveCourses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return liveCourses.find((course) => course.slug === slug);
}

export function getFeaturedCourses(): Course[] {
  return liveCourses.filter((course) => course.featured);
}

export function getCoursesByTechnology(technology: Technology): Course[] {
  return liveCourses.filter((course) => course.technology === technology);
}

export function getTechnologies(): Technology[] {
  const seen = new Set<Technology>();
  for (const course of liveCourses) {
    seen.add(course.technology);
  }
  return Array.from(seen);
}
