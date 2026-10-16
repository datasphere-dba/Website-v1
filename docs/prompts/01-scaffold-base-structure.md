# Task: Scaffold the base folder structure of the DataSphere website

## Context
You are working in the DataSphere website repo (Next.js 16.4, React 19.3, TypeScript strict, App Router, `src/`, Tailwind CSS v4, npm). It is still the create-next-app starter.

Before you write anything:
1. Read `CLAUDE.md` fully, then `docs/project-status.md` and `docs/decisions.md`. They are binding.
2. Read the relevant guides in `node_modules/next/dist/docs/`: App Router project structure, route groups, layouts/pages, `next/font`, metadata (`metadata`, `sitemap.ts`, `robots.ts`), dynamic routes, and Cache Components (`cacheComponents: true` is on). Don't rely on older Next.js knowledge. If anything below conflicts with the docs, follow the docs and tell me.
3. Run `git status`. If there are uncommitted changes, stop and ask me. Then create a branch `chore/scaffold-structure`.

## Goal
Create the **skeleton** only: folders, routes, layouts, design tokens, fonts, config and empty or placeholder components, so that every route renders and the build passes. This is not the real UI or real data. Real pages come later, one by one, from the design canvas.

## What to create

### 1. Clean up the starter
- Remove the starter content in `src/app/page.tsx`, the Geist fonts, and the unused SVGs in `public/` (file, globe, next, vercel, window).
- Keep `src/app/favicon.ico` for now.

### 2. Routes (App Router)
Use a route group `(site)` for public pages (shared header/footer) and a separate `admin` segment with its own layout.

```
src/app/
  layout.tsx                 # root: <html lang="en">, fonts, default metadata, body classes
  globals.css                # Tailwind import + @theme tokens
  not-found.tsx
  sitemap.ts                 # lists static routes now; course/blog slugs come later
  robots.ts                  # allow all, point to sitemap. Must NOT noindex.
  (site)/
    layout.tsx               # <Header/> + <main> + <Footer/> + <MobileStickyBar/>
    page.tsx                 # Home
    courses/page.tsx
    courses/[slug]/page.tsx  # async params; generateStaticParams + generateMetadata from sample data
    blog/page.tsx
    blog/[slug]/page.tsx     # same pattern as courses/[slug]
    about/page.tsx
    contact/page.tsx
  admin/
    layout.tsx               # simple sidebar shell; robots noindex for admin only
    page.tsx                 # dashboard placeholder
    courses/page.tsx
    blog/page.tsx
    blog/new/page.tsx        # placeholder noting two modes: form editor + "paste Markdown"
  api/
    leads/route.ts           # POST stub: returns 501 "not implemented", with a TODO for Zoho CRM + email alert
```

Every page:
- exports `metadata` or `generateMetadata` (title, description, canonical);
- has exactly one `<h1>`;
- shows a clear placeholder: page name plus a one-line `TODO:` naming the canvas artboard it will be built from (Main, HomeMobile, Courses, Blog, BlogPost, About, Contact, Admin, AdminBlog, AdminBlogMd).
- Unknown slugs call `notFound()`.

### 3. Design tokens and fonts
- In `globals.css`, use `@import "tailwindcss";` and an `@theme` block with:
  - colors: `paper #F6F3EC`, `ink #121735`, `green #0F6B3F`, `sage #DDE7D6`, `linen #EDE8DC`;
  - font families: `--font-serif` (Newsreader, headlines), `--font-sans` (Hanken Grotesk, body), `--font-mono` (IBM Plex Mono, labels);
  - border radius tokens set to 0 (sharp corners), plus a hairline border width.
- Body defaults: paper background, ink text, sans font.
- Load the three fonts with `next/font/google` in the root layout as CSS variables wired to the `@theme` font tokens. No EB Garamond yet (pending decision).
- Install `@tailwindcss/typography` and register it the Tailwind v4 way (`@plugin`), for blog posts later.

### 4. Shared code folders
```
src/
  components/
    layout/   Header.tsx, Footer.tsx, MobileStickyBar.tsx   # minimal, using site config + tokens
    ui/       Button.tsx, Container.tsx, SectionHeading.tsx  # tiny, typed, token-based
    sections/ .gitkeep                                       # page sections come later
  config/site.ts      # name, legal name, address, phone, email, TrainerCentral URL, nav links. Values from CLAUDE.md, TODO comment where HR must confirm
  lib/
    courses.ts        # getAllCourses(), getCourseBySlug(): read src/content/courses.sample.json
    blog.ts           # getAllPosts(), getPostBySlug(): read src/content/blog/*.md (frontmatter only for now, no Markdown rendering yet)
    seo.ts            # helper to build metadata (title template, canonical, OG)
  content/
    courses.sample.json   # 2 obviously fake sample courses, marked SAMPLE, fees as "TODO"
    blog/sample-post.md   # 1 sample post with frontmatter (title, slug, date, excerpt, relatedCourse)
  types/
    course.ts         # Course, Batch, Fee types (slug, title, category, summary, durationHours?, fees[], batches[], enrolUrl, faq[], seo)
    blog.ts           # BlogPost type
```
- The Header nav goes to Home, Courses, Blog, About, Contact, plus an external "Login / Enrol" link to TrainerCentral (opens in a new tab with `rel="noopener noreferrer"`).
- Use Server Components everywhere. The only client component allowed is a mobile menu toggle in the Header, if you need one.
- Use `@/` imports.

### 5. Env and config
- Add `.env.example` with names only: `ZOHO_CLIENT_ID`, `ZOHO_CLIENT_SECRET`, `ZOHO_REFRESH_TOKEN`, `ZOHO_API_DOMAIN`, `LEAD_ALERT_EMAIL_TO`, `EMAIL_API_KEY`, `NEXT_PUBLIC_SITE_URL`. Make sure `.gitignore` still ignores `.env*` but not `.env.example`.
- Don't change `next.config.ts` unless the build requires it. If you do, explain why.

## Out of scope (don't do these)
- Real page designs, real course or blog data, the Markdown importer.
- Database, authentication, admin forms, Zoho integration, email sending, chatbot, analytics.
- Any Vercel-specific package. Hosting is Netlify.
- Dependencies other than `@tailwindcss/typography`. Ask first for anything else.

## Done when
1. `npm run lint`, `npx tsc --noEmit` and `npm run build` all pass with no errors. Fix warnings you introduced.
2. `npm run dev`: every route above returns 200 (an unknown slug gives the 404 page), checked at desktop width and 375px.
3. You show me the final folder tree (`src/` only) and a short list of anything you chose differently from this prompt and why.
4. Update `docs/project-status.md` (current state, next steps, session log) and add any new decisions to `docs/decisions.md`.
5. Don't commit. Show me `git status` and propose a commit message (`chore: scaffold base folder structure`). I'll review first.
