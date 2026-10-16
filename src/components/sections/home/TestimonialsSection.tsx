import { Container } from "@/components/ui/Container";
import { SectionIntro } from "@/components/ui/SectionIntro";

const testimonials = [
  {
    quote: "Mr. Mohan Kumar teaches in a crisp, short and sweet manner that saves a lot of time.",
    author: "Vinayak DV",
    role: "IT Architect, Independent Consultant",
  },
  {
    quote: "Mohan Sir is a great instructor and made the content very digestible.",
    author: "Srinivas D.K.",
    role: "Data Engineer, Aricent",
  },
  {
    quote:
      "The topics are covered with real-time examples, so we are able to understand in a better way.",
    author: "Sivanand V",
    role: "Senior Software Engineer",
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <SectionIntro eyebrow="04 — From the batches" title="What DBAs say afterwards." />

        <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12 lg:mt-16">
          {testimonials.map((item) => (
            <figure key={item.author} className="flex flex-col border-t border-ink pt-8">
              <blockquote className="font-serif text-2xl leading-snug text-ink sm:text-[1.65rem]">
                &ldquo;{item.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-auto pt-6 text-sm">
                <span className="block font-medium text-ink">{item.author}</span>
                <span className="block text-ink/65">{item.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
