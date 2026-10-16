type SectionHeadingProps = {
  title: string;
  /** Small mono label above the title, e.g. "Courses". */
  eyebrow?: string;
  /** Use "h1" only for the page's single main heading. */
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  eyebrow,
  as: Heading = "h2",
  className = "",
}: SectionHeadingProps) {
  return (
    <div className={className}>
      {eyebrow && (
        <p className="font-mono text-xs tracking-widest text-green uppercase">{eyebrow}</p>
      )}
      <Heading className="mt-2 font-serif text-3xl leading-tight sm:text-4xl">{title}</Heading>
    </div>
  );
}
