import Link from "next/link";
import { Container } from "@/components/ui/Container";

/**
 * About page CTA card — "Find the batch that fits your week."
 * Matches the bottom sage card on the About screenshot with solid green button
 * and outlined secondary button.
 */
export function AboutCTA() {
  return (
    <section aria-labelledby="about-cta-heading" className="pb-16 sm:pb-24">
      <Container className="max-w-[1100px] px-6 lg:px-10">
        <div className="rounded-sm bg-[#DCECE1] px-8 py-10 sm:px-12 sm:py-12">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <h2
              id="about-cta-heading"
              className="font-serif text-2xl leading-snug sm:text-3xl lg:text-[32px] text-ink"
            >
              Find the batch that fits your week.
            </h2>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <Link
                href="/courses"
                className="rounded-sm bg-green px-5 py-2.5 text-sm font-medium text-paper transition-colors hover:bg-green/90"
              >
                See courses and batches
              </Link>
              <Link
                href="/contact"
                className="rounded-sm border border-ink/30 bg-transparent px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-ink/5"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
