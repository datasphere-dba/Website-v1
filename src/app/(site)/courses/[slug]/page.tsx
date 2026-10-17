import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getAllCourses, getCourseBySlug } from "@/lib/courses";
import { buildMetadata } from "@/lib/seo";

// Prerender one page per known course at build time.
export function generateStaticParams() {
  return getAllCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/courses/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};

  return buildMetadata({
    title: course.seo?.title || course.title,
    description: course.seo?.description || course.subtitle || course.title,
    path: `/courses/${course.slug}`,
  });
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <Container className="py-16">
      <SectionHeading as="h1" eyebrow={course.technology.toUpperCase()} title={course.title} />
      {course.subtitle && <p className="mt-4 max-w-prose text-ink/80">{course.subtitle}</p>}
      <div className="mt-4 font-mono text-sm text-ink/70">
        <span>₹{course.priceInr.toLocaleString("en-IN")}</span> ·{" "}
        <span>Mode: {course.mode.toUpperCase()}</span> ·{" "}
        <span>Kind: {course.kind}</span>
      </div>
      <p className="mt-4 font-mono text-sm">
        TODO: build from the &quot;Courses&quot; artboard (course detail: hero with price →
        roadmap → how you learn → mentor → reviews → plans → FAQ → ask us).
      </p>
      <Button href={course.enrolUrl} external className="mt-8">
        Enrol on TrainerCentral
      </Button>
    </Container>
  );
}
