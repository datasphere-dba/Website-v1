import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/config/site";

// Admin pages must never appear in search results. Child pages inherit this
// `robots` value because they don't set their own.
// TODO(auth): protect /admin with auth once the DB + auth provider is decided.
export const metadata: Metadata = {
  title: { template: `%s | Admin | ${siteConfig.name}`, default: `Admin | ${siteConfig.name}` },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex flex-1 flex-col md:flex-row">
      <aside className="border-b-hairline border-ink/20 bg-ink p-4 text-paper md:w-56 md:border-b-0">
        <p className="font-mono text-xs tracking-widest uppercase">{siteConfig.name} admin</p>
        <nav aria-label="Admin" className="mt-4 flex gap-4 text-sm md:flex-col md:gap-2">
          {siteConfig.adminNav.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-sage">
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-4 sm:p-8">{children}</main>
    </div>
  );
}
