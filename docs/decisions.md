# Decisions log

> Append new decisions at the bottom. Format: date: decision. Why. (Rejected: …)

- 16 Sep 2026: Rebuild on Next.js, replacing WordPress. Better SEO, speed, custom admin.
- 2 Oct 2026: Add a Blog (list + post pages); admin must allow pasting a whole post as Markdown.
- Oct 2026: One page per course (`/courses/[slug]`) plus a `/courses` listing.
- Oct 2026: Leads go to Zoho CRM (Lead Source "Website…", field `Course_Enquired`) + email alert.
- Oct 2026: Enrol/login/purchase stay on TrainerCentral; the site links out.
- 13–14 Oct 2026: Code owned by the company GitHub org; Venkatesh is a collaborator.
- 13–14 Oct 2026: Hosting on Netlify free. (Rejected: Vercel Hobby, not allowed for commercial/org repos; GoDaddy shared hosting can't run Next.js properly.) GoDaddy = DNS only. (superseded 17 Oct 2026 — see Vercel Pro below)
- 14 Oct 2026: TypeScript + App Router + Tailwind CSS v4 (tokens in `@theme`, typography plugin for blog).
- 16 Oct 2026: Course page order: hero with price → roadmap → how you learn → mentor → reviews → plans → FAQ → ask us, sticky bar on mobile.
- 16 Oct 2026: Public pages live in route group `(site)` (shared Header/Footer/sticky bar); `/admin` has its own layout with `robots: noindex`. (Rejected: separate root layouts, they force full page reloads between groups.)
- 16 Oct 2026: Seed content read at build time: courses via JSON module import, blog frontmatter via sync `fs` reads with a tiny built-in parser. Both count as "predictable" under Cache Components, so no `use cache`/Suspense needed. (Rejected: `gray-matter` for now, no new dependency until the Markdown importer.)
- 16 Oct 2026: Mobile menu uses native `<details>`, no client JS. (Rejected: `"use client"` toggle, not needed yet.)
- 16 Oct 2026: Font CSS variables are `--font-newsreader`, `--font-hanken-grotesk`, `--font-ibm-plex-mono`, mapped to `font-serif/sans/mono` via `@theme inline`. Hairline borders via `border-hairline`, `border-t-hairline`, `border-b-hairline` utilities (Tailwind has no border-width theme namespace).
- 16 Oct 2026: Proprietary LICENSE (all rights reserved, Datasphere Edu Solutions Pvt. Ltd.) + package.json "license": "UNLICENSED". No open-source licence. Company legal name still to be confirmed by HR.
- 17 Oct 2026: Repo cleanup structure: all section components use distinct names ending in *Section (e.g. HomeMentorSection vs AboutMentorSection, AboutHeroSection, AboutCtaSection, TeachingRulesSection). Mentor images organized under public/images/mentor/ (mohan-kumar-portrait.jpg for color hero/spotlight, mentor-mohan-kumar.jpg for about section); unreferenced duplicates removed. Hardcoded values sourced from src/config/site.ts.
- 17 Oct 2026: Hosting = Vercel Pro (Netlify rejected: free plan has a hard 300-credit monthly cap that pauses the site, 15 credits per production deploy).
- 17 Oct 2026: Database (phase 2) = Neon Postgres via Vercel Marketplace, region `aws-ap-southeast-1` Singapore, functions region `sin1`. ORM = Drizzle, auth = Auth.js, images = Vercel Blob (all phase 2).
- 17 Oct 2026: Enquiry emails = Resend.
- 17 Oct 2026: Launch course data = JSON files + zod (one JSON file per course in the repo, read strictly through `src/lib/courses.ts`).
- Open: chatbot (SalesIQ vs custom RAG).


