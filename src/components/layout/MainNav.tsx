"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/config/site";

type MainNavProps = {
  links: NavLink[];
  variant: "desktop" | "mobile";
};

/** Nav links with the current page highlighted (needs the URL, so it's a client component). */
export function MainNav({ links, variant }: MainNavProps) {
  const pathname = usePathname();
  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  const linkClass =
    variant === "desktop"
      ? "inline-flex items-center gap-1 text-[13px] transition-colors hover:text-green lg:text-sm"
      : "inline-flex items-center justify-between py-1 text-base transition-colors hover:text-green";

  return (
    <>
      {links.map((link) => {
        if (link.href.startsWith("http")) {
          return (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${linkClass} text-ink/80`}
            >
              {link.label}
              <span aria-hidden="true" className="text-[10px] text-ink/40">
                ↗
              </span>
            </a>
          );
        }
        const active = isActive(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={active ? "page" : undefined}
            className={`${linkClass} ${active ? "font-medium text-green" : "text-ink/80"}`}
          >
            {link.label}
          </Link>
        );
      })}
    </>
  );
}
