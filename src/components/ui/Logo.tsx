import Link from "next/link";

type LogoProps = {
  className?: string;
  theme?: "light" | "dark";
};

/** "Data" in serif + "Sphere" in a green pill (the one rounded shape in the design). */
export function Logo({ className = "", theme = "light" }: LogoProps) {
  const isDark = theme === "dark";

  return (
    <Link
      href="/"
      aria-label="DataSphere home"
      className={`group inline-flex items-center gap-1 font-serif text-2xl leading-none tracking-tight ${className}`}
    >
      <span
        className={`font-semibold transition-colors ${
          isDark ? "text-paper group-hover:text-sage" : "text-ink group-hover:text-green"
        }`}
      >
        Data
      </span>
      <span className="rounded-full bg-green px-2.5 pt-1 pb-1.5 text-paper">Sphere</span>
    </Link>
  );
}
