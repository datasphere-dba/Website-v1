import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCourses } from "@/lib/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Courses",
  description: "All DataSphere database and DBA courses, with fees, batches and enrol links.",
  path: "/courses",
});

export default function CoursesPage() {
  const courses = getAllCourses();

  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow="Courses" title="Courses" />
      <p className="mt-4 font-mono text-sm">TODO: build from the &quot;Courses&quot; artboard.</p>

      <ul className="mt-8 divide-y divide-ink/20 border-t-hairline border-b-hairline border-ink/20">
        {courses.map((course) => (
          <li key={course.slug} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <Link href={`/courses/${course.slug}`} className="font-serif text-lg text-ink hover:text-green">
                {course.title}
              </Link>
              {course.subtitle && <p className="text-sm text-ink/70">{course.subtitle}</p>}
            </div>
            <div className="flex shrink-0 items-center gap-3 font-mono text-xs text-ink/60">
              <span className="uppercase">{course.technology}</span>
              <span>·</span>
              <span className="uppercase">{course.mode}</span>
              <span>·</span>
              <span className="font-bold text-ink">₹{course.priceInr.toLocaleString("en-IN")}</span>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}
