import { siteConfig } from "@/config/site";

// Floating "Which batch fits my shift?" button from the design (desktop only;
// on mobile the sticky bar does this job).
// TODO: open the chatbot here once it's decided. Until then it opens WhatsApp.
export function ChatLauncher() {
  const href = `${siteConfig.whatsappHref}?text=${encodeURIComponent(
    "Hi, which DBA batch fits my work shift?",
  )}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-6 bottom-6 z-30 hidden items-center gap-3 md:flex"
    >
      <span className="border-hairline border-ink/15 bg-paper px-3.5 py-2 text-sm text-ink shadow-sm transition-colors group-hover:text-green">
        Which batch fits my shift?
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-ink text-paper shadow-lg ring-1 ring-paper/25 transition-colors group-hover:bg-green">
        <svg
          aria-hidden="true"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M4 5h16v11H9l-5 4z" />
          <path d="M8 9h8M8 12h5" />
        </svg>
      </span>
    </a>
  );
}
