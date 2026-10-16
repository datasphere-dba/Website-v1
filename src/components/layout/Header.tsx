import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// Placeholder header. Real design comes from the "Main" / "HomeMobile" artboards.
// The mobile menu uses <details>, so it works without client JavaScript.
export function Header() {
  return (
    <header className="border-b-hairline border-ink/15">
      {/* Top dark notification bar */}
      <div className="bg-ink text-paper py-2 border-b-hairline border-paper/10">
        <Container className="flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="rounded-full border border-emerald-400/40 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-medium tracking-wider text-emerald-400 uppercase">
              ADMISSIONS OPEN
            </span>
            <span className="text-paper/75 text-xs">
              PostgreSQL 17, MongoDB 8 and AWS Cloud DB batches start [NEXT BATCH DATE]
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-5 font-mono text-xs text-paper/80">
            <a href={siteConfig.phoneHref} className="hover:text-paper">
              {siteConfig.phone}
            </a>
            <a
              href={siteConfig.trainerCentralUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              Learner login ↗
            </a>
          </div>
        </Container>
      </div>

      {/* Main navigation bar */}
      <div className="bg-paper">
        <Container className="flex h-16 items-center justify-between gap-6">
          <Link href="/" className="inline-flex items-center tracking-tight">
            <span className="font-serif text-[1.65rem] font-bold text-[#0B1B62]">Data</span>
            <span className="ml-1 inline-flex items-center rounded-full bg-[#0A6C38] px-3.5 py-0.5 font-serif text-[1.15rem] font-medium text-white">
              Sphere
            </span>
          </Link>

          <nav aria-label="Main" className="hidden items-center gap-8 md:flex text-sm">
            <Link href="/" className="text-ink/80 hover:text-green">
              Home
            </Link>
            <Link href="/courses" className="text-ink/80 hover:text-green">
              Courses
            </Link>
            <Link href="/courses" className="text-ink/80 hover:text-green">
              dbaStanza
            </Link>
            <Link href="/blog" className="text-ink/80 hover:text-green">
              Blog
            </Link>
            <Link
              href="/about"
              className="text-green font-medium underline underline-offset-8 decoration-2 decoration-green"
            >
              About
            </Link>
            <Link href="/contact" className="text-ink/80 hover:text-green">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/contact"
              className="rounded-sm bg-ink px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink/90"
            >
              Get batch details
            </Link>
          </div>

          <details className="relative md:hidden">
            <summary className="cursor-pointer list-none font-mono text-xs tracking-widest uppercase text-ink">
              Menu
            </summary>
            <nav
              aria-label="Mobile Main"
              className="absolute right-0 z-20 mt-3 flex w-56 flex-col gap-3 border-hairline border-ink/20 bg-paper p-4 text-sm"
            >
              <Link href="/" className="hover:text-green">
                Home
              </Link>
              <Link href="/courses" className="hover:text-green">
                Courses
              </Link>
              <Link href="/courses" className="hover:text-green">
                dbaStanza
              </Link>
              <Link href="/blog" className="hover:text-green">
                Blog
              </Link>
              <Link href="/about" className="text-green font-medium">
                About
              </Link>
              <Link href="/contact" className="hover:text-green">
                Contact
              </Link>
              <a
                href={siteConfig.trainerCentralUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 border-t-hairline border-ink/10 pt-2 font-mono text-xs text-green"
              >
                Learner login ↗
              </a>
            </nav>
          </details>
        </Container>
      </div>
    </header>
  );
}
