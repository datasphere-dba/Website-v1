import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";

// Placeholder footer. Real design comes from the "Main" artboard.
export function Footer() {
  return (
    <footer className="border-t-hairline border-paper/10 bg-ink text-paper">
      <Container className="py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand & info */}
          <div className="lg:col-span-5">
            <Link href="/" className="inline-flex items-center tracking-tight">
              <span className="font-serif text-[1.65rem] font-bold text-paper">Data</span>
              <span className="ml-1 inline-flex items-center rounded-full bg-[#0A6C38] px-3.5 py-0.5 font-serif text-[1.15rem] font-medium text-white">
                Sphere
              </span>
            </Link>

            <p className="mt-3 font-serif text-sm italic text-paper/85">
              Experience the difference.
            </p>

            <p className="mt-4 max-w-sm text-xs leading-relaxed text-paper/60">
              Datasphere Edu Solutions Pvt. Ltd. — live database administration
              training for working DBAs.
            </p>
          </div>

          {/* Nav links columns */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:col-span-7">
            {/* Column 1: Programs */}
            <div>
              <p className="font-mono text-[11px] tracking-wider text-paper/40 uppercase font-medium">
                PROGRAMS
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-paper/80">
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    Database Specialist MAP
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    Double Track: PM
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    PostgreSQL 17 DB Expert
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    MongoDB 8 DB Expert
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    AWS Cloud DB Expert
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2: Company */}
            <div>
              <p className="font-mono text-[11px] tracking-wider text-paper/40 uppercase font-medium">
                COMPANY
              </p>
              <ul className="mt-4 space-y-2.5 text-xs text-paper/80">
                <li>
                  <Link href="/about" className="hover:text-paper">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-paper">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-paper">
                    dbaStanza ↗
                  </Link>
                </li>
                <li>
                  <a
                    href={siteConfig.trainerCentralUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-paper"
                  >
                    Learner login ↗
                  </a>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-paper">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Registered office */}
            <div>
              <p className="font-mono text-[11px] tracking-wider text-paper/40 uppercase font-medium">
                REGISTERED OFFICE
              </p>
              <div className="mt-4 space-y-2 text-xs text-paper/70 leading-relaxed">
                <p>#20, 2nd Main Road, Kanaka Layout, BSK 2nd Stage, Bengaluru 560070</p>
                <p>
                  <a href={siteConfig.phoneHref} className="hover:text-paper">
                    {siteConfig.phone}
                  </a>
                </p>
                <p>
                  <a href={`mailto:${siteConfig.email}`} className="hover:text-paper">
                    {siteConfig.email}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom copyright & social */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-between gap-4 border-t-hairline border-paper/10 pt-6 text-xs text-paper/50 font-mono">
          <p>© 2026 Datasphere Edu Solutions Pvt. Ltd.</p>
          <div className="flex items-center gap-6">
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              LinkedIn
            </a>
            <a
              href={siteConfig.social.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              YouTube
            </a>
            <a
              href={siteConfig.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-paper"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
