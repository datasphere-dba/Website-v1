import type { Course } from "@/types/course";
import sampleCourses from "@/content/courses.sample.json";

// Imported as a module, so Next.js treats it as build-time data
// (no "use cache" or Suspense needed under Cache Components).
// JSON imports widen literal types (e.g. "TODO", "online"), hence the cast.
const courses = sampleCourses as Course[];

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseBySlug(slug: string): Course | undefined {
  return courses.find((course) => course.slug === slug);
}
