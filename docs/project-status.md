# Project status — DataSphere website

> Claude: read at the start of every session, update before ending. Keep it short.

**Last updated:** 17 Oct 2026

## Current state
- Repo `DataSphere-Edu-Solutions-Pvt-Ltd/Website-v1`: Next.js 16.4, React 19.3, TypeScript strict, App Router, `src/`, Tailwind v4, ESLint.
- Home and About pages built and verified against design artboards; repo cleaned up and standardized to target folder structure.
- Sections built:
  - Layout: Header (announcement bar + nav + mobile menu), Footer (editorial dark with legal/social links), MainNav (active state), MobileStickyBar, ChatLauncher.
  - Home: HeroSection (portrait + live batches card), ProgramsSection, LearningModesSection, HomeMentorSection, TestimonialsSection, LeadEnquirySection.
  - About: AboutHeroSection, AboutMentorSection, TeachingRulesSection, CompanySection, AboutCtaSection.
- Assets reorganized: unused photos removed, mentor images moved to `public/images/mentor/`, `.gitkeep` placeholders removed.
- Components renamed to unique and consistent `*Section` naming; duplicate hard-coded values sourced from `src/config/site.ts`.
- TypeScript check (`npx tsc --noEmit`), ESLint (`npm run lint`), and production build (`npm run build`) all pass with 0 errors.

## Next steps
1. Convert course sheet → `src/content/courses.json`; build `/courses` and `/courses/[slug]`.
2. Blog: import the 68 Markdown posts; build `/blog` and `/blog/[slug]`.
3. About, Contact; enquiry form → Zoho CRM (server-side).
4. Decide admin panel DB + auth, then build `/admin`.
5. Connect Netlify (org account), get preview URL.

## Waiting on client / HR
- Company name and address to display.
- Which duplicate course versions to show.
- Zoho CRM API access (and CRM Plus renewal, expires 25 Oct 2026).
- Netlify account on the org email.
- Who receives lead alert emails.

## Waiting on the team (home page)
- Founding year ("Since 2012"), next batch date ("24th Feb"), batch timings, programme fees, LinkedIn/YouTube URLs.

## Session log
- 16 Oct 2026: Added CLAUDE.md and docs/ memory system.
- 16 Oct 2026: Scaffolded base folder structure (prompt 01); all routes render, build passes.
- 16 Oct 2026: Built full Home page from "Main" & "HomeMobile" artboards with high-fidelity components, responsive layouts, and verified in browser.
- 16 Oct 2026: Home page visual fixes: hero card no longer covers the photo, missing borders fixed (non-existent `divide-*-hairline` classes), section headers match design, mentor photo full-bleed, form error state, mobile tidy-up.
- 16 Oct 2026: Rebuilt About page, Header, Footer, and social/contact links to match reference mockups on branch feat/about-page.
- 17 Oct 2026: Repo cleanup (branch chore/repo-cleanup): removed unused assets, moved mentor images to public/images/mentor/, renamed section components to unique and consistent *Section names, sourced constants from site.ts, standardized TODO comments, rewrote README.md, updated org repo URLs.
