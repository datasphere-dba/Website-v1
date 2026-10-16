import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");

// Reads frontmatter only. Markdown body rendering comes with the blog importer.
// Synchronous fs reads are allowed during prerendering with Cache Components
// (they count as "predictable values"), so no "use cache" is needed here.

/** Parses simple `key: value` frontmatter between `---` lines. No nesting or lists. */
function parseFrontmatter(source: string): Record<string, string> {
  const match = /^---\r?\n([\s\S]*?)\r?\n---/.exec(source);
  if (!match) return {};

  const fields: Record<string, string> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const separator = line.indexOf(":");
    if (separator === -1) continue;
    const key = line.slice(0, separator).trim();
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^["']|["']$/g, "");
    if (key) fields[key] = value;
  }
  return fields;
}

function readPost(fileName: string): BlogPost {
  const source = fs.readFileSync(path.join(BLOG_DIR, fileName), "utf8");
  const data = parseFrontmatter(source);
  return {
    slug: data.slug || fileName.replace(/\.md$/, ""),
    title: data.title ?? "Untitled",
    date: data.date ?? "",
    excerpt: data.excerpt ?? "",
    relatedCourse: data.relatedCourse || undefined,
  };
}

/** All posts, newest first. */
export function getAllPosts(): BlogPost[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((fileName) => fileName.endsWith(".md"))
    .map(readPost)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}
