import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CourseMobileStickyBar } from "@/components/courses/CourseMobileStickyBar";
import { TECHNOLOGY_DISPLAY_NAMES } from "@/components/courses/CoursesExplorer";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { getCourseModeDetails } from "@/config/learning-modes";
import { siteConfig } from "@/config/site";
import { getAllCourses, getCourseBySlug, getCoursesByTechnology, getFeaturedCourses } from "@/lib/courses";
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

  const cleanDescription =
    course.seo?.description ||
    course.subtitle ||
    course.descriptionHtml
      .replace(/<[^>]+>/g, " ")
      .replace(/\s+/g, " ")
      .trim()
      .slice(0, 155);

  return buildMetadata({
    title: course.seo?.title || course.title,
    description: cleanDescription,
    path: `/courses/${course.slug}`,
  });
}

export default async function CoursePage({ params }: PageProps<"/courses/[slug]">) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const modeDetails = getCourseModeDetails(course.mode);
  const techLabel = TECHNOLOGY_DISPLAY_NAMES[course.technology] ?? course.technology.toUpperCase();
  const modeLabel = course.mode === "live-workshop" ? "LIVE WORKSHOP" : course.mode.toUpperCase();
  const kindLabel = course.kind.toUpperCase();

  // Related courses: up to 3 other courses of the same technology (fall back to featured)
  let candidateRelated = getCoursesByTechnology(course.technology).filter(
    (c) => c.slug !== course.slug
  );
  if (candidateRelated.length < 3) {
    const featured = getFeaturedCourses().filter(
      (c) => c.slug !== course.slug && !candidateRelated.some((r) => r.slug === c.slug)
    );
    candidateRelated = [...candidateRelated, ...featured];
  }
  const relatedCourses = candidateRelated.slice(0, 3);

  return (
    <article className="py-10 sm:py-14">
      <Container>
        {/* BREADCRUMB */}
        <nav aria-label="Breadcrumb" className="font-mono text-xs text-ink/60">
          <Link href="/courses" className="hover:text-green transition-colors">
            Courses
          </Link>
          <span className="mx-2 text-ink/30">/</span>
          <span className="text-ink/80">{course.title}</span>
        </nav>

        {/* HERO HEADER */}
        <header className="mt-6 border-b-hairline border-ink/20 pb-10">
          <p className="font-mono text-xs tracking-wider text-green uppercase">
            {techLabel} · {kindLabel} · {modeLabel}
          </p>
          <h1 className="mt-3 font-serif text-3xl leading-[1.08] tracking-tight text-ink sm:text-4xl lg:text-5xl font-normal">
            {course.title}
          </h1>
          {course.subtitle && (
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink/75 sm:text-lg">
              {course.subtitle}
            </p>
          )}
        </header>

        {/* MASTER GRID: Detail content on left, Enrol rail on right */}
        <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
          {/* LEFT: Detailed curriculum & sections */}
          <div className="space-y-12 lg:col-span-8">
            {/* 1. CURRICULUM & DESCRIPTION */}
            <section aria-labelledby="curriculum-heading">
              <h2 id="curriculum-heading" className="font-mono text-xs text-green uppercase tracking-wider">
                Overview &amp; Curriculum
              </h2>
              {/* descriptionHtml is pre-sanitized at import time by scripts/import-courses.ts */}
              <div
                className="prose prose-ink mt-5 max-w-none prose-headings:font-serif prose-headings:font-normal prose-h2:text-2xl prose-h3:text-xl prose-p:leading-relaxed prose-li:my-1 text-ink/85"
                dangerouslySetInnerHTML={{ __html: course.descriptionHtml }}
              />
            </section>

            {/* 2. HOW YOU LEARN */}
            <section
              aria-labelledby="learning-mode-heading"
              className="border-t-hairline border-ink/15 pt-10"
            >
              <p className="font-mono text-xs text-green uppercase tracking-wider">Learning format</p>
              <h2
                id="learning-mode-heading"
                className="mt-2 font-serif text-2xl text-ink font-normal sm:text-3xl"
              >
                How you learn: {modeDetails.title}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-ink/80 max-w-2xl">
                {modeDetails.summary}
              </p>
              <ul className="mt-5 space-y-2 text-sm text-ink/85">
                {modeDetails.points.map((point) => (
                  <li key={point} className="flex items-start gap-2.5">
                    <span className="font-mono text-green">—</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* 3. ENQUIRE / ASK ABOUT THIS COURSE */}
            <section
              id="enquire"
              aria-labelledby="enquire-heading"
              className="scroll-mt-24 border-t-hairline border-ink/15 pt-10"
            >
              <p className="font-mono text-xs text-green uppercase tracking-wider">Direct support</p>
              <h2
                id="enquire-heading"
                className="mt-2 font-serif text-2xl text-ink font-normal sm:text-3xl"
              >
                Ask about this course
              </h2>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink/75 sm:text-base">
                Need guidance on whether your current skills match this track, or want to discuss
                corporate batch schedules? Connect directly with Mohan&apos;s team.
              </p>

              {/* TODO(lead-form): interactive lead capture form will replace or supplement direct contact actions */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Button href={siteConfig.phoneHref} variant="secondary">
                  Call {siteConfig.phone}
                </Button>
                <Button href={siteConfig.whatsappHref} external variant="primary">
                  WhatsApp Mohan&apos;s team ↗
                </Button>
                <a
                  href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Enquiry: ${course.title}`)}`}
                  className="inline-flex items-center justify-center border-hairline border-ink/20 bg-transparent px-5 py-2.5 font-sans text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-linen/50"
                >
                  Email {siteConfig.email}
                </a>
              </div>
            </section>

            {/* 4. RELATED COURSES */}
            {relatedCourses.length > 0 && (
              <section
                aria-labelledby="related-heading"
                className="border-t-hairline border-ink/15 pt-10"
              >
                <div className="flex items-center justify-between pb-3 border-b-hairline border-ink/20">
                  <h2 id="related-heading" className="font-mono text-xs text-green uppercase tracking-wider">
                    Related {techLabel} courses
                  </h2>
                  <Link href="/courses" className="font-mono text-xs text-ink/60 hover:text-green">
                    All courses →
                  </Link>
                </div>

                <div className="divide-y-hairline divide-ink/15 border-b-hairline border-ink/15">
                  {relatedCourses.map((rel) => {
                    const rKind = rel.kind.toUpperCase();
                    const rMode = rel.mode === "live-workshop" ? "LIVE WORKSHOP" : rel.mode.toUpperCase();

                    return (
                      <Link
                        key={rel.slug}
                        href={`/courses/${rel.slug}`}
                        className="group block py-5 px-3 -mx-3 transition-colors hover:bg-linen/40"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <span className="font-mono text-[11px] text-ink/60">
                            {rKind} · {rMode}
                          </span>
                          <span className="font-mono text-sm font-semibold text-ink">
                            ₹{rel.priceInr.toLocaleString("en-IN")}
                          </span>
                        </div>
                        <h3 className="mt-1 font-serif text-xl text-ink transition-colors group-hover:text-green">
                          {rel.title}
                        </h3>
                        {rel.subtitle && (
                          <p className="mt-0.5 text-xs text-ink/70 line-clamp-1">{rel.subtitle}</p>
                        )}
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT: Sticky Enrol Rail on Desktop */}
          <aside className="space-y-6 lg:col-span-4 lg:sticky lg:top-24">
            {/* ENROL RAIL CARD */}
            <div className="border-hairline border-ink/20 bg-linen/30 p-6 sm:p-7">
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs text-ink/60 uppercase tracking-wider">
                  Course fee
                </span>
                <span className="font-serif text-4xl text-ink font-normal sm:text-5xl">
                  ₹{course.priceInr.toLocaleString("en-IN")}
                </span>
                <span className="mt-1 text-xs text-ink/60 leading-relaxed">
                  Final price and offers are shown at checkout on the learner portal.
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <a
                  href={course.enrolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center border-hairline border-green bg-green px-5 py-3 text-center font-sans text-sm font-semibold text-paper transition-colors hover:bg-ink hover:border-ink"
                >
                  Enrol on learner portal ↗
                </a>

                <a
                  href="#enquire"
                  className="inline-flex w-full items-center justify-center border-hairline border-ink bg-transparent px-5 py-2.5 text-center font-sans text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                >
                  Ask about this course
                </a>
              </div>

              {/* Course summary specs */}
              <div className="mt-6 border-t-hairline border-ink/15 pt-5 space-y-2 text-xs font-mono text-ink/70">
                <div className="flex justify-between">
                  <span className="text-ink/50 uppercase">Format</span>
                  <span className="text-ink font-semibold">{modeDetails.code}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/50 uppercase">Category</span>
                  <span className="text-ink font-semibold">{kindLabel}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-ink/50 uppercase">Technology</span>
                  <span className="text-ink font-semibold">{techLabel}</span>
                </div>
              </div>
            </div>

            {/* MENTOR CARD (from artboard) */}
            <div className="border-hairline border-ink/20 bg-paper p-6">
              <div className="flex items-center gap-4">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border-hairline border-ink/20 bg-linen">
                  <Image
                    src="/images/mentor/mohan-kumar-portrait.jpg"
                    alt="Mohan Kumar S."
                    fill
                    sizes="56px"
                    className="object-cover object-[50%_35%] grayscale"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-lg text-ink font-medium leading-snug">
                    Mohan Kumar S.
                  </span>
                  <span className="font-mono text-xs text-ink/60 uppercase">
                    Lead Mentor · DBA Guru
                  </span>
                </div>
              </div>

              <p className="mt-4 font-serif text-sm italic leading-relaxed text-ink/80 border-t-hairline border-ink/10 pt-4">
                &ldquo;Every course is moderated by Mohan Kumar S. himself: concepts and architecture
                first, then real production scenarios, then practical support sessions until it
                clicks.&rdquo;
              </p>
            </div>
          </aside>
        </div>
      </Container>

      {/* MOBILE STICKY BOTTOM BAR */}
      <CourseMobileStickyBar priceInr={course.priceInr} enrolUrl={course.enrolUrl} />
    </article>
  );
}
