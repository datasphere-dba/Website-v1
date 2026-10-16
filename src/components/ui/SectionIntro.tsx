import type { ReactNode } from "react";

type SectionIntroProps = {
  /** Small mono label, e.g. "01 — Programs". Sits bottom-left on desktop. */
  eyebrow: string;
  title: ReactNode;
  /** Optional short paragraph shown on the right on desktop. */
  aside?: ReactNode;
  tone?: "light" | "dark";
  className?: string;
};

/** Section header from the design: label left, big serif heading, optional text right. */
export function SectionIntro({
  eyebrow,
  title,
  aside,
  tone = "light",
  className = "",
}: SectionIntroProps) {
  const dark = tone === "dark";
  return (
    <div className={`grid gap-4 lg:grid-cols-12 lg:items-end lg:gap-8 ${className}`}>
      <p
        className={`font-mono text-xs lg:col-span-2 lg:pb-2 ${dark ? "text-sage" : "text-green"}`}
      >
        {eyebrow}
      </p>
      <h2
        className={`font-serif text-4xl leading-[1.05] tracking-[-0.015em] sm:text-5xl lg:text-6xl ${
          aside ? "lg:col-span-6" : "lg:col-span-10"
        } ${dark ? "text-paper" : "text-ink"}`}
      >
        {title}
      </h2>
      {aside && (
        <div
          className={`text-sm leading-relaxed sm:text-base lg:col-span-4 lg:pb-2 ${
            dark ? "text-paper/75" : "text-ink/75"
          }`}
        >
          {aside}
        </div>
      )}
    </div>
  );
}
