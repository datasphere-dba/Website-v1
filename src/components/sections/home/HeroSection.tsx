import Image from "next/image";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// TODO: replace with real batch data (course sheet / admin panel) once confirmed.
const nextBatches = [
  { course: "PostgreSQL 17", mode: "OLT", time: "Sat-Sun · 9:30am" },
  { course: "PostgreSQL 17", mode: "OLT", time: "Mon-Wed · 6:00am" },
  { course: "MongoDB 8", mode: "OLT", time: "Weekday · Evening" },
  { course: "AWS Cloud DB", mode: "HML", time: "Weekend · Flexible" },
];

const learnerCompanies = ["Oracle India", "Aricent", "Isoft"];

export function HeroSection() {
  const whatsappHref = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
    "Hi, I would like to know more about DataSphere DBA batches and syllabus.",
  )}`;

  return (
    <section className="pt-10 pb-16 sm:pt-16 lg:pt-24 lg:pb-28">
      <Container>
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Left: headline and actions */}
          <div className="lg:col-span-7">
            {/* TODO: confirm the founding year with the team. */}
            <p className="font-mono text-xs tracking-[0.18em] text-ink/65 uppercase">
              Live DBA training · Online<span className="hidden sm:inline"> · Since 2012</span>
            </p>

            <h1 className="mt-5 font-serif text-[2.9rem] leading-[1] tracking-[-0.02em] text-ink sm:text-7xl lg:text-[5.5rem]">
              Become the DBA <br className="hidden sm:block" />
              that production <span className="text-green italic">trusts.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-relaxed text-ink/80 sm:text-lg">
              Live, hands-on administration courses in PostgreSQL, MongoDB and AWS cloud
              databases, taught end to end by Mohan Kumar S. and scheduled around a working
              DBA&apos;s week.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-8">
              <a
                href="#programs"
                className="inline-flex items-center justify-center gap-3 bg-green px-7 py-4 text-[15px] font-medium text-paper transition-colors hover:bg-ink"
              >
                See courses and batches <span aria-hidden="true">→</span>
              </a>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-hairline border-ink/40 py-4 text-[15px] font-medium text-ink transition-colors hover:text-green sm:border-0 sm:border-b-hairline sm:border-ink sm:py-0.5 sm:hover:border-green"
              >
                Ask on WhatsApp
              </a>
            </div>

            <div className="mt-14 hidden max-w-xl border-t-hairline border-ink/15 pt-7 sm:block">
              <p className="font-mono text-xs tracking-[0.18em] text-ink/55 uppercase">
                Our learners work at
              </p>
              <ul className="mt-3 flex flex-wrap items-baseline gap-x-9 gap-y-2 font-serif text-xl text-ink/75 sm:text-2xl">
                {learnerCompanies.map((name) => (
                  <li key={name}>{name}</li>
                ))}
                <li className="text-ink/35">[+ more]</li>
              </ul>
            </div>
          </div>

          {/* Right: mentor photo with the next-batches card overlapping its bottom-left */}
          <div className="lg:col-span-5">
            <div className="flex items-baseline justify-between gap-4 pb-3 text-xs">
              <p className="text-ink">
                <span className="font-medium">Mohan Kumar S.</span>{" "}
                <span className="text-ink/60">
                  — DBA Guru<span className="hidden sm:inline">, Edupreneur</span>
                </span>
              </p>
              <p className="shrink-0 font-mono text-[11px] tracking-wider text-ink/60 uppercase">
                Mentor<span className="hidden sm:inline"> · Every batch</span>
              </p>
            </div>

            <div className="relative aspect-[6/7] overflow-hidden bg-linen">
              <Image
                src="/mohan-kumar-portrait.jpg"
                alt="Mohan Kumar S., lead DBA mentor at DataSphere"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[50%_35%] contrast-110 grayscale"
              />
            </div>

            <div className="relative z-10 mt-5 border-hairline border-ink/20 bg-paper shadow-[0_18px_40px_-18px_rgb(18_23_53/0.35)] lg:-mt-14 lg:-ml-28 lg:w-[25rem]">
              <div className="flex items-center justify-between border-b-hairline border-ink/15 px-5 py-3.5">
                <span className="font-mono text-xs tracking-[0.18em] text-ink uppercase">
                  Next batches
                </span>
                <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wider text-green uppercase">
                  <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-green" />
                  Seats open
                </span>
              </div>

              <ul className="divide-y divide-ink/10">
                {nextBatches.map((batch) => (
                  <li
                    key={`${batch.course}-${batch.time}`}
                    className="grid grid-cols-[1fr_auto] items-center gap-4 px-5 py-3 text-sm sm:grid-cols-[9rem_3rem_1fr]"
                  >
                    <span className="font-medium text-ink">{batch.course}</span>
                    <span className="hidden font-mono text-[11px] text-ink/55 sm:block">
                      {batch.mode}
                    </span>
                    <span className="text-right text-ink/80 sm:text-left">{batch.time}</span>
                  </li>
                ))}
              </ul>

              <div className="flex items-center justify-between border-t-hairline border-ink/10 bg-linen/60 px-5 py-3.5 text-sm">
                <span className="text-ink/65">Starts 24th Feb · IST</span>
                <a
                  href="#enquire"
                  className="inline-flex items-center gap-1 font-medium text-green hover:underline"
                >
                  Reserve a seat <span aria-hidden="true">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
