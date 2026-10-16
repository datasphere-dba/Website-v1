import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

// TODO: move to src/content once the course sheet is converted; fees still to confirm.
const packages = [
  {
    meta: "Package · 3 tracks · 6 courses",
    badge: "Most complete",
    title: "Database Specialist MAP",
    summary:
      "MongoDB, AWS Cloud DB and PostgreSQL in one program, for DBAs expected to run NoSQL, managed cloud and hybrid databases side by side.",
    tags: ["MongoDB", "AWS RDS · DBaaS", "PostgreSQL"],
    dark: true,
  },
  {
    meta: "Package · 2 tracks · 4 courses",
    title: "Double Track: PM",
    summary:
      "PostgreSQL and MongoDB administration in parallel. Run relational and document workloads with the same confidence.",
    tags: ["PostgreSQL × 2 courses", "MongoDB × 2 courses"],
    dark: false,
  },
];

const tracks = [
  {
    code: "T-01",
    title: "PostgreSQL 17 DB Expert",
    summary:
      "Architecture to performance tuning, then HA and DR with standby replication. All topics included.",
    meta: "2 courses · OLT / HML",
  },
  {
    code: "T-02",
    title: "MongoDB 8 DB Expert",
    summary: "Schema design, replication for HA and DR, MQL and sharding for document workloads at scale.",
    meta: "2 courses · OLT / HML",
  },
  {
    code: "T-03",
    title: "AWS Cloud DB Expert",
    summary: "Sizing, provisioning, tuning and scaling the top 5 databases on AWS RDS and DBaaS.",
    meta: "OLT / HML",
  },
];

export function ProgramsSection() {
  return (
    <section id="programs" className="scroll-mt-28 border-t-hairline border-ink/15 py-16 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="01 — Programs"
          title={
            <>
              Master one database.
              <br />
              Or three.
            </>
          }
          aside="Each track pairs an administration course with an advanced course. Packages combine tracks for DBAs moving across relational, document and cloud databases."
        />

        {/* Packages */}
        <div className="mt-12 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2">
          {packages.map((pkg) => (
            <article
              key={pkg.title}
              className={`flex flex-col p-7 sm:p-10 ${pkg.dark ? "bg-ink text-paper" : "bg-sage text-ink"}`}
            >
              <div
                className={`flex items-center justify-between gap-4 font-mono text-[11px] tracking-[0.16em] uppercase ${
                  pkg.dark ? "text-sage" : "text-green"
                }`}
              >
                <span>{pkg.meta}</span>
                {pkg.badge && (
                  <span className="hidden tracking-normal text-paper/50 normal-case sm:inline">{pkg.badge}</span>
                )}
              </div>

              <h3 className="mt-4 font-serif text-3xl tracking-tight sm:text-[2.6rem] sm:leading-tight">
                {pkg.title}
              </h3>
              <p
                className={`mt-4 max-w-lg text-[15px] leading-relaxed ${pkg.dark ? "text-paper/75" : "text-ink/75"}`}
              >
                {pkg.summary}
              </p>

              <ul className="mt-6 hidden flex-wrap gap-2 sm:flex">
                {pkg.tags.map((tag) => (
                  <li
                    key={tag}
                    className={`rounded-full border px-3.5 py-1.5 text-xs ${
                      pkg.dark ? "border-paper/30 text-paper/90" : "border-ink/25 bg-paper/40 text-ink"
                    }`}
                  >
                    {tag}
                  </li>
                ))}
              </ul>

              {/* Spacer keeps the fee row pinned to the bottom when cards differ in height. */}
              <div aria-hidden="true" className="min-h-8 flex-1 sm:min-h-12" />
              <div
                className={`flex items-end justify-between gap-4 border-t pt-5 sm:pt-6 ${
                  pkg.dark ? "border-paper/15" : "border-ink/15"
                }`}
              >
                <div className="hidden sm:block">
                  <span className={`block text-xs ${pkg.dark ? "text-paper/60" : "text-ink/60"}`}>
                    Program fee
                  </span>
                  {/* TODO: real fee from the confirmed course sheet. */}
                  <span className="font-serif text-3xl">₹ [FEE]</span>
                </div>
                <a
                  href="#enquire"
                  className={`inline-flex items-center gap-1.5 text-sm font-medium transition-colors ${
                    pkg.dark ? "text-paper hover:text-sage" : "text-green hover:text-ink"
                  }`}
                >
                  View program <span aria-hidden="true">→</span>
                </a>
              </div>
            </article>
          ))}
        </div>

        {/* Individual tracks */}
        <ul className="mt-6 border-t border-ink">
          {tracks.map((track) => (
            <li key={track.code} className="border-b border-ink/15">
              {/* TODO: link to /courses/[slug] once course pages exist. */}
              <a
                href="#enquire"
                className="group grid grid-cols-[1fr_auto] items-center gap-x-8 gap-y-2 py-5 sm:py-7 lg:grid-cols-[4.5rem_minmax(0,1.35fr)_minmax(0,1.5fr)_10rem_auto]"
              >
                <span className="hidden font-mono text-xs text-ink/45 lg:block">{track.code}</span>
                <h3 className="font-serif text-2xl text-ink transition-colors group-hover:text-green sm:text-3xl lg:text-[1.9rem]">
                  {track.title}
                </h3>
                <p className="hidden text-sm leading-relaxed text-ink/75 lg:block">{track.summary}</p>
                <span className="hidden font-mono text-[11px] tracking-wider text-ink/55 uppercase lg:block">
                  {track.meta}
                </span>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-ink transition-colors group-hover:text-green">
                  <span className="hidden sm:inline">Details</span>
                  <span aria-hidden="true" className="text-lg sm:text-sm">
                    →
                  </span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
