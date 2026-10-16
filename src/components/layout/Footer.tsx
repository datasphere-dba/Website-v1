import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// Placeholder footer. Real design comes from the "Main" artboard.
export function Footer() {
  const { address } = siteConfig;

  return (
    <footer className="border-t-hairline border-ink/20 bg-linen">
      <Container className="grid gap-8 py-10 text-sm sm:grid-cols-2">
        <div>
          <p className="font-serif text-lg">{siteConfig.legalName}</p>
          <address className="mt-2 not-italic">
            {address.street}, {address.city} {address.postalCode}
          </address>
          <p className="mt-2">
            <a href={siteConfig.phoneHref} className="hover:text-green">
              {siteConfig.phone}
            </a>
            {" · "}
            <a href={`mailto:${siteConfig.email}`} className="hover:text-green">
              {siteConfig.email}
            </a>
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-col gap-2 sm:items-end">
          {siteConfig.nav.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-green">
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
