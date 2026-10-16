import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// Placeholder header. Real design comes from the "Main" / "HomeMobile" artboards.
// The mobile menu uses <details>, so it works without client JavaScript.
export function Header() {
  return (
    <header className="border-b-hairline border-ink/20">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl">
          {siteConfig.name}
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-6 md:flex">
          {siteConfig.nav.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm hover:text-green">
              {link.label}
            </Link>
          ))}
          <LoginLink />
        </nav>

        <details className="relative md:hidden">
          <summary className="cursor-pointer list-none font-mono text-xs tracking-widest uppercase">
            Menu
          </summary>
          <nav
            aria-label="Main"
            className="absolute right-0 z-20 mt-3 flex w-56 flex-col gap-3 border-hairline border-ink/20 bg-paper p-4"
          >
            {siteConfig.nav.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm hover:text-green">
                {link.label}
              </Link>
            ))}
            <LoginLink />
          </nav>
        </details>
      </Container>
    </header>
  );
}

function LoginLink() {
  return (
    <a
      href={siteConfig.trainerCentralUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-sm font-medium text-green hover:text-ink"
    >
      Login / Enrol
    </a>
  );
}
