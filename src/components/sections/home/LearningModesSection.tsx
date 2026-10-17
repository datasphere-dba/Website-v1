import { LEARNING_MODES } from "@/config/learning-modes";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

export function LearningModesSection() {
  return (
    <section className="border-y border-ink/15 bg-linen py-16 sm:py-24">
      <Container>
        <SectionIntro
          eyebrow="02 — How you learn"
          title={
            <>
              Built around on-call rotations, not <br className="hidden lg:block" />
              the other way round.
            </>
          }
        />

        <div className="mt-12 grid grid-cols-1 border-t border-ink md:grid-cols-3 lg:mt-16">
          {LEARNING_MODES.map((mode, i) => (
            <div
              key={mode.code}
              className={`border-ink/15 py-8 md:pt-10 md:pb-2 ${
                i > 0 ? "border-t md:border-t-0 md:border-l md:pl-10" : ""
              } ${i < LEARNING_MODES.length - 1 ? "md:pr-10" : ""}`}
            >
              <p
                className={`font-mono text-4xl tracking-tight sm:text-5xl ${
                  mode.portal ? "text-green" : "text-ink"
                }`}
              >
                {mode.code}
              </p>
              <h3 className="mt-5 text-lg font-medium text-ink">{mode.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{mode.summary}</p>
              <ul className="mt-5 space-y-1.5 text-sm text-ink/85">
                {mode.points.map((point) => (
                  <li key={point}>— {point}</li>
                ))}
              </ul>
              {mode.portal && (
                <a
                  href={siteConfig.trainerCentralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-green hover:underline"
                >
                  Browse modules on the learner portal <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
