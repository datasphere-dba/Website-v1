# CLAUDE.md — DataSphere Website (Website-v1)

Instructions for Claude Code in this repo. Read this file fully at the start of every session.

@AGENTS.md

---

## 0. Session protocol (memory) — do this every time

**At the start of a session**
1. Read `docs/project-status.md` (current state, what's next, open questions).
2. Read `docs/decisions.md` (decisions already made — don't reopen them without a reason).
3. Run `git status` and `git log --oneline -10` to see uncommitted work and recent changes.
4. If the task touches Next.js APIs, read the matching guide in `node_modules/next/dist/docs/` first (see AGENTS.md).

**During the session**
- When a new decision is made (library, data model, route, naming, hosting, etc.), add it to `docs/decisions.md` straight away: date, decision, why, alternatives rejected.
- When something is blocked on the client/HR, add it to "Waiting on client" in `docs/project-status.md`.
- If you learn a gotcha (a Next 16 quirk, a Vercel limit, a Zoho API detail), add it to section 9 "Gotchas" of this file.

**Before ending the session (or when Venkatesh says "done", "wrap up", "bas")**
1. Update `docs/project-status.md`: "Current state", "Next steps", "Waiting on client", plus one line in "Session log" (date — what was done).
2. Keep these files short. They are a handoff note, not a diary. Replace outdated lines instead of piling up new ones.
3. Tell Venkatesh in 2–4 lines what changed and what's next.

**Memory file rules**
- `CLAUDE.md` (this file): stable rules and project facts. Committed to git, so the company owns it too. No secrets, no personal notes.
- `CLAUDE.local.md` (gitignored): Venkatesh's personal notes and machine-specific paths, if he wants any.
- `docs/project-status.md`: the running state. The source of truth for "where are we".
- `docs/decisions.md`: an append-only log of decisions (ADR-lite).
- If Venkatesh says "remember this" or "yaad rakh", put it in the right file above and say which file.
- The claude.ai project "DataSphere" keeps its own `claude/project-status.md`. When something big happens here (page done, deploy, decision), mention it so he can sync that doc from a claude.ai chat.

---

## 1. Who I'm working with

- **Venkatesh Biradar**, Software Development Intern at DataSphere (14 Sep 2026 – 13 Jan 2027), 3rd-year CSE at UVCE. GitHub: `biradarvenkatesh01`.
- Knows C/C++ and JavaScript. TypeScript, React Server Components and Next.js 16 may be newer to him, so **explain the "why" in simple words** when you introduce a new pattern. Keep it short.
- Often writes casual Hinglish, sometimes by voice-to-text. Understand intent and don't nitpick typos. Reply in clear, simple English.
- Dev machine is **Windows** (PowerShell / VS Code). Give Windows-friendly commands (no `rm -rf`, `export VAR=`, etc. without a PowerShell equivalent).
- Anything written for HR/managers: plain language, no jargon, no emojis.
- Ask before big or irreversible choices (new paid service, database/auth provider, deleting files, force-push, changing DNS). For small, obvious things, just do them.

---

## 2. The project

Rebuild of **datasphere.co.in** for **DataSphere Edu Solutions Pvt. Ltd.**, a Bengaluru company selling database/DBA training courses (Oracle, MySQL, PostgreSQL, MongoDB, etc.). The old site is WordPress + Elementor on GoDaddy. It is being replaced by this Next.js site.

**Goals of the new site:** found on Google (old site is `noindex`), fast on phones, every enquiry lands in Zoho CRM, and the team can edit courses and blog posts without a developer.

**Pages**
| Route | What |
|---|---|
| `/` | Home / landing |
| `/courses` | All courses (list + filters) |
| `/courses/[slug]` | One page per course |
| `/blog`, `/blog/[slug]` | Blog list + post (each post links to its course and ends with an enquiry form) |
| `/about` | About us |
| `/contact` | Contact + enquiry form |
| `/admin/*` | Custom admin panel: courses, batches, fees, blog posts (form editor **and** "paste whole post as Markdown"), testimonials, SEO text |

**Course page section order** (from the Oracle Universe page review): hero with price → roadmap/curriculum → how you learn → mentor → reviews/testimonials → plans & pricing → FAQ → ask us (form), plus a sticky enquiry/enrol bar on mobile. Show the price early, never on screen 14.

**Integrations**
- **Enrol / Login / Buy** → link out to TrainerCentral (`https://training.datasphere.co.in`, per-course URLs from the course sheet). No deep integration for now.
- **Lead forms** → server-side handler → **Zoho CRM** (Lead Source = `Website`, `Website – course page`, `Website – chatbot`; custom field `Course_Enquired`) + email alert to the team (Resend-like service).
- **Chatbot**: not decided. Zoho SalesIQ fit check first; a custom RAG bot is likely. Don't build it until it's decided in `docs/decisions.md`.
- **Analytics/SEO**: GA4, sitemap, robots, per-page metadata, Course + Organization structured data (JSON-LD), redirects from old WordPress URLs.

**Business facts** (use exactly. Don't invent fees, dates or batches. Placeholders must look like placeholders, e.g. `TODO: confirm price`):
- Datasphere Edu Solutions Pvt. Ltd., #20 2nd Main Road, Kanaka Layout, BSK 2nd Stage, Bengaluru 560070
- +91 99807 22144 · training@datasphere.co.in
- Address and company name to display are still being confirmed by HR; keep them in one config file (`src/config/site.ts`).

---

## 3. Tech stack (decided)

- **Next.js 16.4** (App Router, `src/` dir), **React 19.3**, **TypeScript strict**.
- `next.config.ts` has `cacheComponents: true` and `partialPrefetching: true`. Respect the Cache Components model (`"use cache"`, `cacheLife`, `cacheTag`, Suspense boundaries for dynamic data). Read the docs in `node_modules/next/dist/docs/` before using caching/data APIs. Don't rely on older Next.js habits.
- **Tailwind CSS v4** (CSS-first config: tokens in `@theme` inside `src/app/globals.css`, no `tailwind.config.js`). Loaded via `@tailwindcss/turbopack`. Add `@tailwindcss/typography` for Markdown blog posts.
- **ESLint 9** (`eslint-config-next`).
- Package manager: **npm** (`package-lock.json` is committed; don't switch to pnpm/yarn).
- **Hosting: Vercel Pro**. (Netlify rejected: free plan has a hard 300-credit monthly cap that pauses the site, 15 credits per production deploy). Vercel features (Vercel Blob, etc.) are allowed. GoDaddy stays as domain/DNS only.
- **Repo:** `github.com/DataSphere-Edu-Solutions-Pvt-Ltd/Website-v1`, owned by the company org. Venkatesh is a collaborator. `main` auto-deploys once Vercel Pro is connected.
- **Backend architecture:** Database (phase 2) = Neon Postgres via Vercel Marketplace (region `aws-ap-southeast-1` Singapore, functions region `sin1`), ORM Drizzle, auth Auth.js, images Vercel Blob (all phase 2). Enquiry emails = Resend. Launch course data = JSON files + zod (read strictly via `src/lib/courses.ts`). Chatbot: not decided yet (SalesIQ vs custom RAG).

---

## 4. Commands

```powershell
npm install          # install deps
npm run dev          # dev server at http://localhost:3000
npm run build        # production build. Must pass before any commit that touches code
npm run start        # serve the production build
npm run lint         # ESLint
npx tsc --noEmit     # type check
```

Before saying a task is done: `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass, and for UI work you've checked the page in the browser at desktop **and** 375px mobile width.

---

## 5. Folder structure (target)

```
src/
  app/
    (site)/              # public pages share header/footer layout
      page.tsx           # home
      courses/page.tsx
      courses/[slug]/page.tsx
      blog/page.tsx
      blog/[slug]/page.tsx
      about/page.tsx
      contact/page.tsx
    admin/               # admin panel (protected)
    api/                 # route handlers (leads → Zoho, etc.)
    layout.tsx           # root: fonts, metadata defaults
    globals.css          # Tailwind import + @theme tokens
    sitemap.ts, robots.ts
  components/
    ui/                  # small reusable pieces (Button, Tag, Rule, Field…)
    layout/              # Header, Footer, MobileStickyBar
    sections/            # page sections (Hero, CourseCard, BatchTimetable, FAQ…)
  lib/                   # data access, zoho client, markdown, seo helpers
  config/site.ts         # company name, contact, nav links, social links
  content/               # seed data (courses JSON, blog .md) until the DB exists
  types/
docs/                    # project-status.md, decisions.md, any reference notes
```

Change it if there's a good reason, but record the change in `docs/decisions.md`.

---

## 6. Design system

Source of truth: the "DataSphere New Website" design canvas (11 artboards: Home, HomeMobile, Courses, Blog, BlogPost, About, Contact, Admin, AdminBlog, AdminBlogMd, Chatbot) and the PNG mockups in `DataSphere page designs.zip`. Use them as **reference**. Rebuild as clean components; don't paste canvas HTML wholesale.

Tokens (put in `@theme`, use the token names in classes, never raw hex in components):
| Token | Value | Use |
|---|---|---|
| `--color-paper` | `#F6F3EC` | page background |
| `--color-ink` | `#121735` | text, navy |
| `--color-green` | `#0F6B3F` | primary actions, accents |
| `--color-sage` | `#DDE7D6` | soft highlight panels |
| `--color-linen` | `#EDE8DC` | secondary surfaces |

- Fonts via `next/font/google`: **Newsreader** (headlines), **Hanken Grotesk** (body), **IBM Plex Mono** (labels/meta). The canvas also uses EB Garamond in places, so check the canvas before adding it. Remove the Geist starter fonts.
- Look: modern, editorial "tech product" feel. **Sharp corners** (no rounded cards), hairline rules/borders, timetable-style batch listings, real mentor photo and real testimonials only.
- Mobile first. No sticky bar may cover content or the chatbot bubble (a bug on the old site).
- Accessibility: one `<h1>` per page, alt text on every image, visible focus states, labelled form fields, WCAG AA contrast.

---

## 7. Coding rules

- **Server Components by default.** Add `"use client"` only for interactivity (forms, menus, filters), and keep client components small and at the leaves.
- Use Server Actions or route handlers for form submits. **Validate every input on the server** (zod or similar). Never trust the client.
- **Secrets only in env vars** (`.env.local`, gitignored; Vercel env settings in production). Never hard-code or log keys, Zoho tokens or passwords, and never prefix a secret with `NEXT_PUBLIC_`. Keep `.env.example` updated with variable **names** only.
- Zoho CRM calls happen **only on the server** (OAuth refresh-token flow). Handle failure gracefully: if Zoho is down, still email the lead so nothing is lost.
- Forms: spam protection (honeypot and/or Turnstile), success and error states, a phone field that's actually a phone field (the old site stored phone in "message").
- Use `next/image` for images and `next/link` for internal links. Every page exports `metadata` or `generateMetadata` (title, description, canonical, Open Graph).
- TypeScript strict: no `any` unless commented why. Shared types in `src/types/`.
- Keep components small and named for what they show (`CourseCard`, `BatchTimetable`), not how (`Box2`).
- Content (course data, blog posts) goes in `src/content/` or the database, **never hard-coded inside JSX**, so the admin panel can take over later.
- Don't add a dependency without saying why in one line. Prefer small, well-maintained packages.
- No `console.log` left in committed code (except deliberate server error logging).

---

## 8. Git workflow

- `main` = deployable; it will auto-deploy to Vercel Pro. Don't push broken builds to `main`.
- Work on short branches: `feat/home-page`, `fix/mobile-nav`, `chore/tokens`. Open a PR into `main` (Vercel gives a preview URL per PR).
- Commit messages follow Conventional Commits, as in the existing history: `feat: …`, `fix: …`, `refactor: …`, `chore: …`, `docs: …`.
- Only commit or push when Venkatesh asks. Never force-push `main`, never rewrite pushed history, never commit `.env*`.
- `AGENTS.md` is managed by `next dev`; leave its block alone.

---

## 9. Gotchas (add to this as you learn)

- Next.js 16.4 differs from older versions (Cache Components, `LayoutProps<"/">` / `PageProps` global types, async `params`/`searchParams`). Check `node_modules/next/dist/docs/` rather than memory.
- The canvas fonts and the design-system doc don't fully agree (EB Garamond vs Hanken Grotesk). Confirm before finalising typography.
- Course data has duplicate course versions; which ones to show is still waiting on the client.
- `npx tsc --noEmit` can fail on stale `.next/dev/types` after routes are deleted/moved. Delete `.next` and run `npx next typegen` first.
- A layout's `title.template` applies to child segments only, not to the `page.tsx` in the same folder (e.g. `/admin`). Use `title: { absolute: … }` there.
- With Cache Components, unknown `[slug]` pages calling `notFound()` return 404, but the not-found UI is streamed in the RSC payload (raw HTML from curl has no `<h1>`). Check 404 pages in a browser.
- Course page prices on TrainerCentral contradict each other (e.g. ₹9,799 vs ₹9,999). Don't copy prices from there; use the confirmed course sheet only.

---

## 10. Reference material (outside the repo, on Venkatesh's laptop)

Folder: `Downloads\DataSphere Internship\DataSphere\`
- `Week 1 Backup (8 Oct 2026)\02 Course details – fees & enrol links.xlsx`: course sheet (69 public courses, fees, TrainerCentral enrol links). Main source for course data.
- `Week 1 Backup (8 Oct 2026)\04 Blog posts as Markdown (68 posts).zip` + `05 Blog posts index.csv`: blog import (also needed for old-URL redirects).
- `Week 1 Backup (8 Oct 2026)\03 Website pages – full text.docx`: current site copy.
- `Week 1 Backup (8 Oct 2026)\01 GoDaddy DNS records ….csv`: DNS backup (needed on launch day).
- `Week 1 Backup (8 Oct 2026)\07 Zoho CRM findings.docx`, `08 TrainerCentral findings.docx`
- `DataSphere page designs.zip`: 11 PNG mockups.
- `datasphere_website_setup_context.md`: GitHub/Vercel/DNS decisions + launch-day checklist.
- `DataSphere_Chatbot_Session_Context.md`: chatbot options research.

Don't copy these into the repo wholesale. Convert only what's needed (e.g. course sheet → `src/content/courses.json`) and say where it came from.

---

## 11. Launch rules (later, but never break these)

- Test fully on the `*.vercel.app` URL first.
- On GoDaddy, change **only** the A (`@`) and CNAME (`www`) records. **Never touch MX/TXT** (company email). Screenshot the DNS records first.
- Add 301 redirects from every old WordPress URL (pages + 68 blog posts) to the new URLs.
- Make sure the production site is indexable (no `noindex`), sitemap submitted, GA4 working.
- Never cancel or change the domain itself; only website records.
