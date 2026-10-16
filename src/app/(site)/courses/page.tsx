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
          <li key={course.slug} className="py-3">
            <Link href={`/courses/${course.slug}`} className="hover:text-green">
              {course.title}
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
