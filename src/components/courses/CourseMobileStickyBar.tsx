type CourseMobileStickyBarProps = {
  priceInr: number;
  enrolUrl: string;
};

/**
 * Mobile-only sticky bottom bar for course pages.
 * Overlays the site-wide mobile bar with course fee and direct enrol action.
 */
export function CourseMobileStickyBar({ priceInr, enrolUrl }: CourseMobileStickyBarProps) {
  return (
    <div
      role="region"
      aria-label="Enrol on mobile"
      className="fixed inset-x-0 bottom-0 z-20 flex h-14 items-center justify-between border-t-hairline border-ink/20 bg-paper px-4 md:hidden"
    >
      <div className="flex flex-col">
        <span className="font-mono text-[10px] text-ink/60 uppercase">Course fee</span>
        <span className="font-mono text-base font-semibold text-ink">
          ₹{priceInr.toLocaleString("en-IN")}
        </span>
      </div>
      <a
        href={enrolUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center border-hairline border-green bg-green px-6 py-2 font-sans text-sm font-medium text-paper transition-colors hover:bg-ink hover:border-ink"
      >
        Enrol ↗
      </a>
    </div>
  );
}
