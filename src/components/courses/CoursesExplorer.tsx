"use client";

import { useEffect, useState, useTransition } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import type { Course, CourseKind, CourseMode, Technology } from "@/types/course";

export const TECHNOLOGY_DISPLAY_NAMES: Record<Technology, string> = {
  oracle: "Oracle",
  postgresql: "PostgreSQL",
  mysql: "MySQL",
  sqlserver: "SQL Server",
  nosql: "NoSQL",
  cloud: "Cloud",
};

const MODE_DISPLAY_NAMES: Record<string, string> = {
  all: "Any",
  hml: "HML",
  olt: "OLT",
  "live-workshop": "Live workshop",
};

type KindFilter = "all" | CourseKind;
type TechFilter = "all" | Technology;
type ModeFilter = "all" | CourseMode;

type CoursesExplorerProps = {
  courses: Course[];
  technologies: Technology[];
};

export function CoursesExplorer({ courses, technologies }: CoursesExplorerProps) {
  const [selectedKind, setSelectedKind] = useState<KindFilter>("all");
  const [selectedTech, setSelectedTech] = useState<TechFilter>("all");
  const [selectedMode, setSelectedMode] = useState<ModeFilter>("all");
  const [, startTransition] = useTransition();

  // Read URL query parameters on initial client mount without server de-opt
  useEffect(() => {
    if (typeof window === "undefined") return;

    const syncFromLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const k = params.get("kind");
      const t = params.get("tech");
      const m = params.get("mode");

      if (k && ["all", "course", "package", "workshop"].includes(k)) {
        setSelectedKind(k as KindFilter);
      }
      if (t && (technologies.includes(t as Technology) || t === "all")) {
        setSelectedTech(t as TechFilter);
      }
      if (m && ["all", "hml", "olt", "live-workshop"].includes(m)) {
        setSelectedMode(m as ModeFilter);
      }
    };

    if (window.location.search) {
      queueMicrotask(syncFromLocation);
    }

    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [technologies]);

  const updateFilters = (k: KindFilter, t: TechFilter, m: ModeFilter) => {
    startTransition(() => {
      setSelectedKind(k);
      setSelectedTech(t);
      setSelectedMode(m);
    });

    if (typeof window !== "undefined") {
      const params = new URLSearchParams();
      if (k !== "all") params.set("kind", k);
      if (t !== "all") params.set("tech", t);
      if (m !== "all") params.set("mode", m);
      const qs = params.toString();
      const newUrl = qs ? `${window.location.pathname}?${qs}` : window.location.pathname;
      window.history.replaceState(null, "", newUrl);
    }
  };

  const handleClearFilters = () => {
    updateFilters("all", "all", "all");
  };

  // Counts for Kind tabs
  const countAll = courses.length;
  const countPackages = courses.filter((c) => c.kind === "package").length;
  const countSingleCourses = courses.filter((c) => c.kind === "course").length;
  const countWorkshops = courses.filter((c) => c.kind === "workshop").length;

  const kindOptions: { id: KindFilter; label: string; count: number }[] = [
    { id: "all", label: "All", count: countAll },
    { id: "package", label: "Packages", count: countPackages },
    { id: "course", label: "Courses", count: countSingleCourses },
    { id: "workshop", label: "Workshops", count: countWorkshops },
  ];

  const modeOptions: { id: ModeFilter; label: string }[] = [
    { id: "all", label: "Any" },
    { id: "hml", label: "HML" },
    { id: "olt", label: "OLT" },
    { id: "live-workshop", label: "Live workshop" },
  ];

  // Filtered & sorted courses
  const filteredCourses = courses
    .filter((course) => {
      if (selectedKind !== "all" && course.kind !== selectedKind) return false;
      if (selectedTech !== "all" && course.technology !== selectedTech) return false;
      if (selectedMode !== "all" && course.mode !== selectedMode) return false;
      return true;
    })
    .sort((a, b) => {
      if (a.featured !== b.featured) {
        return a.featured ? -1 : 1;
      }
      return a.order - b.order;
    });

  const isFiltered = selectedKind !== "all" || selectedTech !== "all" || selectedMode !== "all";

  return (
    <div className="mt-8">
      {/* FILTER BAR */}
      <section
        aria-label="Course filters"
        className="border-t-hairline border-b-hairline border-ink/20 py-4"
      >
        <div className="flex flex-col gap-4">
          {/* Top row: Kind tabs + Mode selector */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Kind tabs */}
            <div
              role="toolbar"
              aria-label="Filter by program kind"
              className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0"
            >
              {kindOptions.map((opt) => {
                const active = selectedKind === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => updateFilters(opt.id, selectedTech, selectedMode)}
                    className={`shrink-0 border-hairline px-3.5 py-1.5 font-sans text-xs sm:text-sm font-medium transition-colors ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-linen/50"
                    }`}
                  >
                    {opt.label} · {opt.count}
                  </button>
                );
              })}
            </div>

            {/* Mode selector */}
            <div
              role="toolbar"
              aria-label="Filter by mode"
              className="flex items-center gap-2 shrink-0 overflow-x-auto pb-1 sm:pb-0"
            >
              <span className="font-mono text-xs text-ink/60 uppercase">Mode:</span>
              <div className="flex border-hairline border-ink/20">
                {modeOptions.map((opt) => {
                  const active = selectedMode === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => updateFilters(selectedKind, selectedTech, opt.id)}
                      className={`px-3 py-1 text-xs font-medium transition-colors ${
                        active
                          ? "bg-sage text-ink font-semibold"
                          : "bg-transparent text-ink/75 hover:bg-linen/50 hover:text-ink"
                      }`}
                    >
                      {opt.label}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Bottom row: Technology chips */}
          <div
            role="toolbar"
            aria-label="Filter by technology"
            className="flex items-center gap-2 overflow-x-auto border-t-hairline border-ink/10 pt-3"
          >
            <span className="font-mono text-xs text-ink/60 uppercase shrink-0">Technology:</span>
            <button
              type="button"
              aria-pressed={selectedTech === "all"}
              onClick={() => updateFilters(selectedKind, "all", selectedMode)}
              className={`shrink-0 border-hairline px-3 py-1 font-mono text-xs transition-colors ${
                selectedTech === "all"
                  ? "border-ink bg-ink text-paper"
                  : "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-linen/50"
              }`}
            >
              ALL
            </button>
            {technologies.map((tech) => {
              const active = selectedTech === tech;
              const label = TECHNOLOGY_DISPLAY_NAMES[tech] ?? tech;
              return (
                <button
                  key={tech}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    updateFilters(selectedKind, active ? "all" : tech, selectedMode)
                  }
                  className={`shrink-0 border-hairline px-3 py-1 font-mono text-xs transition-colors uppercase ${
                    active
                      ? "border-green bg-green text-paper"
                      : "border-ink/20 bg-transparent text-ink hover:border-ink hover:bg-linen/50"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* MASTER / DETAIL GRID: List on left, Sticky Aside on right */}
      <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start lg:gap-10">
        {/* LEFT COLUMN: Course list */}
        <div className="lg:col-span-8">
          <div className="flex items-center justify-between pb-3 border-b-hairline border-ink/20">
            <p className="font-mono text-xs text-ink/60 uppercase tracking-wider">
              Showing {filteredCourses.length} of {courses.length}{" "}
              {filteredCourses.length === 1 ? "program" : "programs"}
            </p>
            {isFiltered && (
              <button
                type="button"
                onClick={handleClearFilters}
                className="font-mono text-xs text-green hover:underline cursor-pointer"
              >
                Clear all filters
              </button>
            )}
          </div>

          {filteredCourses.length === 0 ? (
            /* EMPTY STATE */
            <div
              role="status"
              className="mt-8 border-hairline border-ink/20 bg-linen/40 p-8 sm:p-12 text-center"
            >
              <p className="font-mono text-xs text-ink/60 uppercase tracking-widest">
                No matching courses
              </p>
              <h3 className="mt-2 font-serif text-2xl text-ink sm:text-3xl">
                No courses match your filter criteria.
              </h3>
              <p className="mt-2 text-sm text-ink/70 max-w-md mx-auto leading-relaxed">
                Try selecting a different technology or learning mode, or clear your filters to view
                the complete catalog.
              </p>
              <div className="mt-6">
                <Button variant="secondary" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              </div>
            </div>
          ) : (
            /* COURSE LIST */
            <div className="divide-y-hairline divide-ink/15 border-b-hairline border-ink/15">
              {filteredCourses.map((course) => {
                const kindLabel = course.kind.toUpperCase();
                const modeLabel = MODE_DISPLAY_NAMES[course.mode] ?? course.mode.toUpperCase();
                const techLabel =
                  TECHNOLOGY_DISPLAY_NAMES[course.technology] ?? course.technology.toUpperCase();

                return (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="group block py-6 sm:py-7 px-3 -mx-3 transition-colors hover:bg-linen/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green"
                  >
                    <div className="flex flex-col gap-2">
                      {/* Eyebrow & Price row */}
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] text-ink/60">
                          <span className="font-semibold text-ink/75">{kindLabel}</span>
                          <span>·</span>
                          <span>{modeLabel}</span>
                          {course.featured && (
                            <span className="bg-sage px-1.5 py-0.5 text-[10px] font-semibold text-ink uppercase tracking-wider">
                              Featured
                            </span>
                          )}
                        </div>
                        <span className="font-mono text-base font-semibold text-ink sm:text-lg shrink-0">
                          ₹{course.priceInr.toLocaleString("en-IN")}
                        </span>
                      </div>

                      {/* Title */}
                      <h2 className="font-serif text-2xl text-ink transition-colors group-hover:text-green sm:text-[28px] leading-snug">
                        {course.title}
                      </h2>

                      {/* Subtitle */}
                      {course.subtitle && (
                        <p className="text-sm text-ink/75 line-clamp-2 leading-relaxed">
                          {course.subtitle}
                        </p>
                      )}

                      {/* Tech tag and link affordance */}
                      <div className="mt-2 flex items-center justify-between font-mono text-xs text-ink/60">
                        <span className="text-[11px] tracking-wider uppercase">{techLabel}</span>
                        <span className="flex items-center gap-1 font-sans text-sm font-medium text-green group-hover:underline">
                          View course <span aria-hidden="true">→</span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Aside on desktop, stacked below list on mobile */}
        <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          {/* HELP BOX (from artboard) */}
          <div className="border-hairline border-ink/15 bg-linen p-6">
            <p className="font-mono text-xs text-green uppercase tracking-wider">Advisory</p>
            <h3 className="mt-2 font-serif text-xl text-ink font-normal sm:text-2xl">
              Not sure which one fits?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-ink/80">
              Call or WhatsApp Mohan’s team for guidance on which curriculum matches your current DBA
              role and career goals.
            </p>

            <div className="mt-5 flex flex-col gap-2.5">
              <a
                href={siteConfig.phoneHref}
                className="inline-flex items-center justify-center border-hairline border-ink bg-paper px-4 py-2 font-sans text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
              >
                Call {siteConfig.phone}
              </a>
              <a
                href={siteConfig.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-hairline border-green bg-green px-4 py-2 font-sans text-sm font-medium text-paper transition-colors hover:bg-ink hover:border-ink"
              >
                WhatsApp Mohan&apos;s team ↗
              </a>
            </div>
          </div>

          {/* LEARNER PORTAL BOX */}
          <div className="border-hairline border-ink/15 bg-paper p-6">
            <p className="font-mono text-xs text-ink/60 uppercase tracking-wider">Learner portal</p>
            <h4 className="mt-2 font-serif text-lg text-ink font-normal">
              Already enrolled in a batch?
            </h4>
            <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
              Enrolment, live class links, assignments, and recorded sessions are managed on the
              DataSphere learner portal.
            </p>
            <a
              href={siteConfig.trainerCentralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green hover:underline"
            >
              Learner login <span aria-hidden="true">↗</span>
            </a>
          </div>

          {/* DBASTANZA BOX (from artboard) */}
          <div className="border-hairline border-ink/15 bg-paper p-6">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-green uppercase tracking-wider">dbaStanza</span>
              <span className="font-mono text-[11px] text-ink/50 uppercase">Modular</span>
            </div>
            <h4 className="mt-2 font-serif text-lg text-ink font-normal">
              Daily DBA live modules
            </h4>
            <p className="mt-1.5 text-xs text-ink/70 leading-relaxed">
              Short, high-intensity modules on RAC, Data Guard, ASM, High Availability, Migration,
              and Upgrades designed for working DBAs.
            </p>
            <a
              href={siteConfig.trainerCentralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-green hover:underline"
            >
              Browse modules on portal <span aria-hidden="true">↗</span>
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
