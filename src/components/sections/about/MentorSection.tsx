import Image from "next/image";
import { Container } from "@/components/ui/Container";

/**
 * "The mentor" section — photo on the left, bio on the right.
 * Matches the About artboard: "One mentor on every batch, from the first
 * session to the exam."  Three expertise columns below (Oracle, PostgreSQL/
 * MongoDB, AWS) separated by hairline rules.
 */
export function MentorSection() {
  return (
    <section
      aria-labelledby="mentor-heading"
      className="border-b-hairline border-ink/15 py-14 sm:py-20"
    >
      <Container>
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 lg:items-start">
          {/* Mentor photo */}
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-linen">
              <Image
                src="/mentor-mohan-kumar.jpg"
                alt="Mohan Kumar S. — DataSphere lead mentor"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className="object-cover object-top grayscale"
                priority
              />
            </div>
            {/* Caption bar */}
            <div className="mt-2.5 flex items-baseline justify-between font-mono text-[11px] text-ink/50 uppercase tracking-wider">
              <span>Mohan Kumar S.</span>
              <span>DBA GURU · 20+YEARS EXP</span>
            </div>
          </div>

          {/* Bio copy */}
          <div className="lg:col-span-7 lg:pl-4">
            {/* Eyebrow */}
            <p className="font-sans text-xs font-semibold tracking-wider text-green">
              The mentor
            </p>

            <h2
              id="mentor-heading"
              className="mt-3 font-serif text-3xl leading-snug sm:text-4xl lg:text-[2.65rem] text-ink"
            >
              One mentor on every batch, from the first session to the exam.
            </h2>

            <p className="mt-6 text-[15px] sm:text-base leading-relaxed text-ink/80">
              Mohan Kumar S. moderates every DataSphere program himself. Learners
              describe his teaching the same way — crisp, practical, and grounded
              in real production work rather than slides.
            </p>

            <p className="mt-5 text-sm leading-relaxed text-ink/60">
              [SHORT BIO — years in the field, databases administered, organisations worked with. To be supplied by DataSphere.]
            </p>

            {/* Expertise columns */}
            <div className="mt-8 grid grid-cols-3 divide-x divide-ink/20 border-t-hairline border-ink/20 pt-6">
              <div className="pr-4">
                <p className="font-serif text-lg text-ink font-normal">
                  Oracle
                </p>
                <p className="mt-1 text-xs text-ink/60 leading-normal">
                  RAC · Data Guard · ASM modules
                </p>
              </div>

              <div className="px-4">
                <p className="font-serif text-lg text-ink font-normal">
                  PostgreSQL · MongoDB
                </p>
                <p className="mt-1 text-xs text-ink/60 leading-normal">
                  Hybrid and NoSQL tracks
                </p>
              </div>

              <div className="pl-4">
                <p className="font-serif text-lg text-ink font-normal">
                  AWS
                </p>
                <p className="mt-1 text-xs text-ink/60 leading-normal">
                  RDS and DBaaS track
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
