# Project status — DataSphere website

> Claude: read at the start of every session, update before ending. Keep it short.

**Last updated:** 17 Oct 2026

## Current state
- Repo `DataSphere-Edu-Solutions-Pvt-Ltd/Website-v1`: Next.js 16.4, React 19.3, TypeScript strict, App Router, `src/`, Tailwind v4, ESLint.
- Hosting target switched to Vercel Pro; architecture decisions recorded (Neon Postgres, Drizzle, Auth.js, Vercel Blob, Resend).
- Course schema (`src/lib/course-schema.ts`) and TypeScript types (`src/types/course.ts`) defined with Zod validation.
- 19 approved launch courses imported into individual JSON files (`src/content/courses/<slug>.json`) via `scripts/import-courses.ts` with HTML sanitization (`sanitize-html`).
- Data access layer `src/lib/courses.ts` loads and validates courses via Zod, returning live courses sorted by order; placeholder sample course file deleted.
- Existing `/courses`, `/courses/[slug]`, and `sitemap.ts` updated to build with new course model and `generateStaticParams`.
- TypeScript check (`npx tsc --noEmit`), ESLint (`npm run lint`), and production build (`npm run build`) all pass with 0 errors (37 static pages generated).

## Next steps
1. Build full course detail page (`/courses/[slug]`) and listing page (`/courses`) from the "Courses" artboard.
2. Blog: import the 68 Markdown posts; build `/blog` and `/blog/[slug]`.
3. About, Contact; enquiry form → Zoho CRM (server-side).
4. Connect Vercel Pro (org account), get preview URL.

## Waiting on client / HR
- Company name and address to display.
- Which duplicate course versions to show.
- Zoho CRM API access (and CRM Plus renewal, expires 25 Oct 2026).
- Vercel Pro account on the org email.
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
- 17 Oct 2026: Switched hosting to Vercel Pro and recorded phase-2 architecture decisions (branch chore/vercel-setup).
- 17 Oct 2026: Implemented course data schema, import script, launch courses JSON, and data access layer for 19 launch courses (branch feat/course-data).
