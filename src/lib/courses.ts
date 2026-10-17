import fs from "node:fs";
import path from "node:path";
import { CourseSchema } from "@/lib/course-schema";
import type { Course, Technology } from "@/types/course";

const COURSES_DIR = path.join(process.cwd(), "src", "content", "courses");

function loadCourses(): Course[] {
  if (!fs.existsSync(COURSES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(COURSES_DIR).filter((file) => file.endsWith(".json"));
  const loaded: Course[] = [];

  for (const file of files) {
    const filePath = path.join(COURSES_DIR, file);
    const content = fs.readFileSync(filePath, "utf-8");
    let json: unknown;
    try {
      json = JSON.parse(content);
    } catch (err) {
      throw new Error(`Failed to parse JSON in course file "${file}": ${(err as Error).message}`);
    }

    const result = CourseSchema.safeParse(json);
    if (!result.success) {
      const issueDetails = result.error.issues
        .map((issue) => `  - [${issue.path.join(".")}] ${issue.message}`)
        .join("\n");
      throw new Error(`Schema validation failed for course file "${file}":\n${issueDetails}`);
    }

    loaded.push(result.data);
  }

  return loaded
    .filter((course) => course.status === "live")
    .sort((a, b) => a.order - b.order);
}

// Module-level cache evaluated at build time (predictable build-time data, no runtime fs in request handlers)
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
