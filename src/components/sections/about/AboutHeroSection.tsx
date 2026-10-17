import { Container } from "@/components/ui/Container";

/**
 * About page hero — "Taught by DBAs. Specific to DBAs."
 * Matches the top section of the About artboard: large serif headline,
 * two-column copy beneath (left: what DataSphere trains; right: why it's different).
 */
export function AboutHeroSection() {
  return (
    <section
      aria-labelledby="about-hero-heading"
      className="border-b-hairline border-ink/15 py-14 sm:py-20"
    >
      <Container className="max-w-[1100px] px-6 lg:px-10">
        {/* Breadcrumb / Eyebrow */}
        <p className="font-mono text-xs tracking-[0.2em] text-ink/50 uppercase">
          ABOUT · DATASPHERE
        </p>

        {/* Main headline */}
        <h1
          id="about-hero-heading"
          className="mt-5 font-serif text-5xl sm:text-6xl lg:text-[4.25rem] leading-[1.08] tracking-[-0.01em] text-ink"
        >
          Taught by DBAs.{" "}
          <span className="font-serif italic text-green font-normal">Specific</span>
          <br className="hidden sm:inline" />
          {" "}to DBAs.
        </h1>

        {/* Two-column body copy */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:gap-14 items-start">
          <p className="text-[14.5px] sm:text-[15px] lg:text-[15.5px] leading-[1.6] text-ink font-medium">
            <span className="md:block md:whitespace-nowrap">DataSphere trains working database administrators to keep up</span>
            <span className="md:block md:whitespace-nowrap">as the role shifts — from a single RDBMS to hybrid, NoSQL and</span>
            <span className="md:block md:whitespace-nowrap">cloud databases running side by side.</span>
          </p>
          <p className="text-[12.5px] sm:text-[13px] lg:text-[13.5px] leading-[1.65] text-ink/65 font-normal pt-0.5">
            <span className="md:block md:whitespace-nowrap">Traditional DBA tasks are being automated. The work that remains is harder:</span>
            <span className="md:block md:whitespace-nowrap">choosing the right database, migrating to it, and running it in production. That is</span>
            <span className="md:block md:whitespace-nowrap">what every DataSphere course is built around.</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
