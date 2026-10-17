import Image from "next/image";
import { Container } from "@/components/ui/Container";

const pillars = [
  { title: "Taught by a DBA", text: "Years of running real production databases." },
  { title: "Practicals support", text: "Live lab sessions until it works on your machine." },
  { title: "Use it Monday", text: "Skills you apply at work the next day." },
];

/** Dark split section: text on the left, photo filling the right half edge to edge. */
export function HomeMentorSection() {
  return (
    <section className="relative overflow-hidden bg-ink text-paper">
      <Container className="py-16 sm:py-24 lg:min-h-[44rem]">
        <div className="lg:w-[52%] lg:pr-14">
          <h2 className="font-mono text-xs text-sage">03 — Your mentor</h2>

          <figure className="mt-6">
            <blockquote className="font-serif text-3xl leading-[1.18] italic sm:text-4xl lg:text-[2.75rem]">
              &ldquo;The program at DataSphere is specific to DBAs, with excellent teaching by
              Mohan.&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-sm text-paper/65">
              Deepak G — Oracle DBA, Oracle India Pvt Ltd
            </figcaption>
          </figure>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-paper/80">
            Every course is moderated by Mohan Kumar S. himself: concepts and architecture first,
            then real production scenarios, then practical support sessions until it clicks.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 border-t border-paper/15 pt-8 sm:grid-cols-3">
            {pillars.map((pillar) => (
              <div key={pillar.title}>
                <h3 className="text-[15px] font-medium text-paper">{pillar.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-paper/60">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>

      <div className="relative aspect-[5/6] sm:aspect-[4/3] lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[44%]">
        <Image
          src="/images/mentor/mohan-kumar-portrait.jpg"
          alt="Mohan Kumar S."
          fill
          sizes="(min-width: 1024px) 44vw, 100vw"
          className="object-cover object-[50%_40%] contrast-110 grayscale"
        />
        <div className="absolute bottom-6 left-6 bg-paper px-5 py-3.5 text-ink sm:bottom-10 sm:left-10">
          <p className="font-serif text-2xl">Mohan Kumar S.</p>
          <p className="mt-0.5 text-xs text-ink/65">DBA Guru · Edupreneur</p>
        </div>
      </div>
    </section>
  );
}
