# DataSphere Website (Website-v1)

Official website for **DataSphere Edu Solutions Pvt. Ltd.** (datasphere.co.in), offering live, instructor-led database administration (DBA) training in Oracle, PostgreSQL, MongoDB, and AWS cloud databases.

## Tech Stack

- **Framework**: Next.js 16.4 (App Router, Turbopack, Cache Components, Partial Prerendering)
- **Library**: React 19.3
- **Language**: TypeScript (strict)
- **Styling**: Tailwind CSS v4 (design tokens in `@theme` inside `src/app/globals.css`)
- **Package Manager**: npm
- **Hosting**: Vercel Pro

## Project Structure

```
src/
  app/            # Routes: (site)/, admin/, api/, layout, globals.css, sitemap, robots
  components/
    layout/       # Header, Footer, MainNav, MobileStickyBar, ChatLauncher
    sections/     # Page sections (home/, about/)
    ui/           # Reusable primitives (Button, Container, Logo, SectionIntro)
  config/         # site.ts (site-wide constants: contact, address, nav links)
  content/        # Seed data (courses json, blog markdown)
  lib/            # Utilities & data access (courses, blog, seo)
  types/          # Shared TypeScript type definitions
docs/             # project-status.md, decisions.md, prompts/
public/           # Static assets (images/mentor/, favicon)
```

## Getting Started

### Prerequisites
- Node.js 20+
- npm

### Installation & Development
```bash
# Install exact dependencies
npm ci

# Generate route types (required before tsc on fresh clone)
npx next typegen

# Run local development server (http://localhost:3000)
npm run dev

# Run type check & lint
npx tsc --noEmit
npm run lint

# Production build
npm run build
```

## Environment Variables

Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Key variables:
- `NEXT_PUBLIC_SITE_URL`: Canonical site URL (fallback: `https://datasphere.co.in`)

## Documentation

- `CLAUDE.md`: Binding developer rules, session protocols, design tokens, and gotchas.
- `docs/project-status.md`: Current state, next steps, and session logs.
- `docs/decisions.md`: Append-only architecture and technical decisions log.
