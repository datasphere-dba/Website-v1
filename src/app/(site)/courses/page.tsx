import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { CoursesExplorer } from "@/components/courses/CoursesExplorer";
import { getAllCourses, getTechnologies } from "@/lib/courses";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Courses",
  description:
    "Comprehensive DBA and database courses in Oracle, PostgreSQL, MySQL, MongoDB, and Cloud. Learn with real production architectures and live guidance.",
  path: "/courses",
});

export default function CoursesPage() {
  const courses = getAllCourses();
  const technologies = getTechnologies();

  return (
    <div className="py-12 sm:py-16">
      <Container>
        {/* PAGE HEADER (from artboard) */}
        <header className="grid gap-6 border-b-hairline border-ink/20 pb-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="lg:col-span-7">
            <p className="font-mono text-xs tracking-wider text-green uppercase">
              Courses &amp; batches
            </p>
            <h1 className="mt-3 font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-ink">
              Every course, every batch,{" "}
              <span className="italic text-green">one page.</span>
            </h1>
          </div>
          <p className="text-base text-ink/75 sm:text-lg lg:col-span-5 leading-relaxed">
            Pick a program to see its syllabus, mode, and fee. Enrolment and classes happen on the
            DataSphere learner portal.
          </p>
        </header>

        {/* CLIENT FILTER BAR + COURSE LIST + ASIDE */}
        <CoursesExplorer courses={courses} technologies={technologies} />
      </Container>
    </div>
  );
}
