import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { MainNav } from "@/components/layout/MainNav";

export function Header() {
  return (
    <header className="sticky top-0 z-40 w-full bg-paper">
      {/* Top announcement bar */}
      <div className="bg-ink py-2 text-xs text-paper/90">
        <Container className="flex items-center justify-between gap-4">
          <p className="flex min-w-0 items-center gap-3">
            <span className="shrink-0 font-mono text-[11px] tracking-wider text-sage uppercase">
              Admissions open
            </span>
            {/* TODO: confirm the next batch date with the team. */}
            <span className="truncate text-paper/85">
              PostgreSQL 17, MongoDB 8 and AWS Cloud DB batches start 24th Feb
            </span>
          </p>

          <div className="hidden shrink-0 items-center gap-5 sm:flex">
            <a
              href={siteConfig.phoneHref}
              className="text-paper/80 transition-colors hover:text-paper"
            >
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.trainerCentralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-paper transition-colors hover:text-sage"
            >
              Learner login <span aria-hidden="true">↗</span>
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation */}
      <div className="border-b-hairline border-ink/15">
        <Container className="flex h-16 items-center justify-between gap-6 sm:h-[4.75rem]">
          <Logo />

          <nav aria-label="Main" className="hidden items-center gap-5 md:flex lg:gap-9">
            <MainNav links={siteConfig.nav} variant="desktop" />
          </nav>

          <a
            href="#enquire"
            className="hidden items-center justify-center bg-ink px-4 py-2.5 text-[13px] font-medium text-paper transition-colors hover:bg-green md:inline-flex lg:px-5 lg:py-3 lg:text-sm"
          >
            Get batch details
          </a>

          {/* Mobile: call + menu */}
          <div className="flex items-center gap-1 md:hidden">
            <a
              href={siteConfig.phoneHref}
              aria-label="Call DataSphere"
              className="p-2 text-ink hover:text-green"
            >
              <svg
                aria-hidden="true"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </a>

            <details className="relative">
              <summary
                aria-label="Open menu"
                className="flex cursor-pointer list-none items-center justify-center p-2 text-ink hover:text-green [&::-webkit-details-marker]:hidden"
              >
                <svg
                  aria-hidden="true"
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                >
                  <line x1="4" x2="20" y1="9" y2="9" />
                  <line x1="4" x2="20" y1="15" y2="15" />
                </svg>
              </summary>
              <nav
                aria-label="Mobile"
                className="absolute right-0 z-50 mt-3 flex w-64 flex-col gap-3 border-hairline border-ink/20 bg-paper p-5 shadow-lg"
              >
                <MainNav links={siteConfig.nav} variant="mobile" />
                <div className="flex flex-col gap-2 border-t-hairline border-ink/15 pt-3">
                  <a
                    href="#enquire"
                    className="inline-flex items-center justify-center bg-ink py-2.5 text-sm font-medium text-paper transition-colors hover:bg-green"
                  >
                    Get batch details
                  </a>
                  <a
                    href={siteConfig.trainerCentralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center border-hairline border-ink py-2 text-sm font-medium text-ink transition-colors hover:bg-ink hover:text-paper"
                  >
                    Learner login ↗
                  </a>
                </div>
              </nav>
            </details>
          </div>
        </Container>
      </div>
    </header>
  );
}
