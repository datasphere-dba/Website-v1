import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const { address } = siteConfig;

  return (
    <footer className="bg-ink pt-16 pb-12 text-paper md:pb-28">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-paper/10">
          {/* Brand info */}
          <div className="flex flex-col items-start">
            <Logo theme="dark" />
            <p className="mt-4 font-serif italic text-lg sm:text-xl text-paper/90">
              Experience the difference.
            </p>
            <p className="mt-3 text-xs leading-relaxed text-paper/60 max-w-xs">
              {siteConfig.legalName} — live database administration training for working DBAs.
            </p>
          </div>

          {/* Programs */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-4">
              Programs
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="#programs" className="text-paper/80 hover:text-sage transition-colors">
                  Database Specialist MAP
                </a>
              </li>
              <li>
                <a href="#programs" className="text-paper/80 hover:text-sage transition-colors">
                  Double Track: PM
                </a>
              </li>
              <li>
                <Link href="/courses" className="text-paper/80 hover:text-sage transition-colors">
                  PostgreSQL 17 DB Expert
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-paper/80 hover:text-sage transition-colors">
                  MongoDB 8 DB Expert
                </Link>
              </li>
              <li>
                <Link href="/courses" className="text-paper/80 hover:text-sage transition-colors">
                  AWS Cloud DB Expert
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="text-paper/80 hover:text-sage transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-paper/80 hover:text-sage transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <a
                  href={siteConfig.trainerCentralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/80 hover:text-sage inline-flex items-center gap-1 transition-colors"
                >
                  dbaStanza <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.trainerCentralUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-paper/80 hover:text-sage inline-flex items-center gap-1 transition-colors"
                >
                  Learner login <span aria-hidden="true">↗</span>
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-paper/80 hover:text-sage transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Registered Office */}
          <div>
            <h3 className="font-mono text-xs uppercase tracking-wider text-paper/50 mb-4">
              Registered Office
            </h3>
            <address className="max-w-[17rem] not-italic text-sm text-paper/70 space-y-2 leading-relaxed">
              <p>
                {address.street}, {address.city} {address.postalCode}
              </p>
              <p className="pt-1">
                <a
                  href={siteConfig.phoneHref}
                  className="hover:text-sage text-paper/80 transition-colors"
                >
                  {siteConfig.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-sage text-paper/80 transition-colors"
                >
                  {siteConfig.email}
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper/50">
          <p>© 2026 {siteConfig.legalName}. All rights reserved.</p>
          <div className="flex items-center gap-5">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors"
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
