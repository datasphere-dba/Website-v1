import { Container } from "@/components/ui/Container";

/**
 * "Three rules every course follows" — dark ink background section.
 * Matches the About artboard: full-width ink band, three italic roman numerals
 * with rule name + description below each.
 */

const rules = [
  {
    numeral: "i.",
    title: "Concepts before commands",
    body: "Architecture and internals first, so you can handle the database in any environment — not just the lab.",
  },
  {
    numeral: "ii.",
    title: "Practicals until it works",
    body: "Live practicals support sessions, assignments and an exam — you leave having done the work, not watched it.",
  },
  {
    numeral: "iii.",
    title: "Fit the DBA's calendar",
    body: "Weekday and weekend batches, early mornings and late evenings, and a hybrid mode for on-call weeks.",
  },
] as const;

export function TeachingRules() {
  return (
    <section
      aria-labelledby="rules-heading"
      className="bg-ink py-20 text-paper sm:py-24"
    >
      <Container className="max-w-[1100px] px-6 lg:px-10">
        {/* Header row */}
        <div className="grid gap-4 md:grid-cols-12 md:items-baseline">
          <p className="font-mono text-xs tracking-wider text-emerald-400 uppercase md:col-span-3">
            How we teach
          </p>

          <h2
            id="rules-heading"
            className="font-serif text-3xl sm:text-4xl lg:text-[40px] text-paper font-normal leading-tight md:col-span-9"
          >
            Three rules every course follows.
          </h2>
        </div>

        {/* Cards grid */}
        <div className="mt-16 grid gap-10 md:grid-cols-3 lg:gap-14">
          {rules.map(({ numeral, title, body }) => (
            <div key={numeral} className="flex flex-col">
              <p className="font-serif text-4xl sm:text-5xl italic text-emerald-400 leading-none">
                {numeral}
              </p>
              <h3 className="mt-5 font-sans text-base sm:text-lg font-semibold text-paper">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-paper/70">
                {body}
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
