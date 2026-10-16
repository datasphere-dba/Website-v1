# Project status — DataSphere website

> Claude: read at the start of every session, update before ending. Keep it short.

**Last updated:** 16 Oct 2026

## Current state
- Repo `datasphere-dba/Website-v1`: Next.js 16.4, React 19.3, TypeScript strict, App Router, `src/`, Tailwind v4, ESLint.
- Base skeleton scaffolded on branch `chore/scaffold-structure` (not committed yet, waiting for review): all routes as placeholders, `(site)` + `admin` layouts, design tokens + fonts in `globals.css`/root layout, `src/config/site.ts`, sample content + `lib/` readers, sitemap/robots, `/api/leads` 501 stub, `.env.example`. Lint, tsc and build pass.
- Design canvas (11 artboards) and PNG mockups are ready as reference.

## Next steps
1. Review + commit the scaffold, open PR into `main`.
2. Build Header, Footer, mobile sticky bar for real from the canvas.
3. Build Home page from the canvas.
4. Convert course sheet → `src/content/courses.json`; build `/courses` and `/courses/[slug]`.
5. Blog: import the 68 Markdown posts; build `/blog` and `/blog/[slug]`.
6. About, Contact; enquiry form → Zoho CRM (server-side).
7. Decide admin panel DB + auth, then build `/admin`.
8. Connect Netlify (org account), get preview URL.

## Waiting on client / HR
- Company name and address to display.
- Which duplicate course versions to show.
- Zoho CRM API access (and CRM Plus renewal, expires 25 Oct 2026).
- Netlify account on the org email.
- Who receives lead alert emails.

## Session log
- 16 Oct 2026: Added CLAUDE.md and docs/ memory system.
- 16 Oct 2026: Scaffolded base folder structure (prompt 01); all routes render, build passes.
