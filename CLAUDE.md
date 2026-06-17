# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

> The Next.js notice above is critical: this repo uses **Next.js 16 + React 19**. APIs differ from older versions — read `node_modules/next/dist/docs/` before writing Next.js code.

## Commands

```bash
npm run dev          # Start dev server (Next.js)
npm run build        # Production build
npm run start        # Serve production build
npm run lint         # ESLint (eslint-config-next, core-web-vitals + typescript)

node --test                          # Run all tests
node --test tests/dates-page.test.mjs # Run a single test file
```

There is no `test` npm script — tests are plain `node:test` files (`*.test.mjs`) run directly with `node --test`. They live in two places: the `tests/` directory and colocated next to source (`src/**/*.test.mjs`).

**Tests are source-inspection tests, not runtime tests.** Each test reads a component's `.tsx` file as a string and asserts against its content with regex (e.g. checking that a `<Link>` wraps a card, or that certain classNames/icons are present). When you change a component's markup, the corresponding test's regexes likely need updating — and these tests are the contract for layout/interaction decisions, so read them before refactoring UI.

## Architecture

ACM23 conference website (Asian Consortium for Microbial Resources, Hanoi, Nov 16–18 2026). Next.js App Router, MongoDB via Mongoose, Resend for email, Vercel Blob for file storage.

### Layout & routing
- `src/app/layout.tsx` — root layout, global metadata, and JSON-LD `Event` schema. Wraps everything in `SiteChrome`.
- `src/components/layout/site-chrome.tsx` — client component that branches on pathname: admin routes (`/admin/*`) render bare; public routes get `Navbar` + `PageFooter` (footer hidden on `/`).
- Public pages are top-level routes under `src/app/` (`abstract`, `registration`, `committees`, `program`, `venue`, `welcome`, `dates`, `speakers`, `contact`).
- `src/app/admin/(protected)/` — route group guarded by `layout.tsx`, which calls `verifyAdmin()` and redirects to `/admin/login` if unauthenticated.

### Data flow: forms → server actions → MongoDB → email
The three user-facing forms (abstract, registration, contact) all follow the same pipeline:
1. Client form component in `src/components/forms/` (react-hook-form + zod resolver).
2. Server action in `src/lib/actions/` (`"use server"`) re-validates with the **same zod schema** from `src/lib/validators.ts` (never trust the client), connects to DB, generates a sequential human-readable ID, saves, then sends a confirmation email.
3. IDs are generated as `ACM23-R-0001` (registrations) / `ACM23-A-0001` (abstracts) via `countDocuments() + 1` — note this is **not concurrency-safe** under simultaneous submissions.
4. Server actions return `{ success, error?, ...id }` objects rather than throwing; the form renders the error.

`src/lib/validators.ts` is the single source of truth for input shape. The abstract schema is notable: it `.transform()`s flat presenting-author + co-author form fields into a unified `authors[]` array with `role: "presenting" | "co"`, and derives `correspondingEmail`/`affiliation`. Mongoose models in `src/lib/models/` mirror these shapes.

### Database connection
`src/lib/mongodb.ts` caches the Mongoose connection on `global.mongoose` to survive hot-reload / serverless invocations. Always `await connectDB()` at the start of any action/route that touches the DB. Mongoose models use the `mongoose.models.X ?? mongoose.model(...)` guard to avoid re-registration errors.

### Auth
`src/lib/admin-session.ts` — password-based admin auth via an httpOnly cookie (`acm23_admin`). The cookie value is a **weak non-cryptographic hash** of `ADMIN_PASSWORD` (a custom rolling hash, not bcrypt). `verifyAdmin()` is the gate used by the admin layout and the export/blob API routes. This is intentionally lightweight for a low-stakes admin panel — do not treat it as strong auth.

### API routes
- `src/app/api/export/{abstracts,registrations}/route.ts` — admin-only CSV export (manual CSV serialization with quote-escaping).
- `src/app/api/admin/blob/route.ts` — admin-only proxy that streams Vercel Blob files (uploaded abstract documents) using the server-side `BLOB_READ_WRITE_TOKEN`.

### Static content & design
- `src/data/` — typed content arrays (committees, dates, program, speakers). Edit these to change page content.
- `src/lib/abstract-topics.ts` — canonical topic enum + labels, shared by validators, the Mongoose model, and the email templates. Add new topics here.
- `src/styles/globals.css` — Tailwind v4 (`@import "tailwindcss"` + `@theme`). Brand colors (`--color-primary` teal `#0D7377`, `--color-gold` `#C8A951`, etc.) and the `.content-rail` layout helper are defined here.
- `src/components/cultural/` — decorative Vietnamese-motif SVG components (Dong Son, dragon, lotus patterns).
- Email HTML is hand-written inline in `src/lib/email.ts` using the brand palette.

### Path alias
`@/*` → `src/*` (configured in `tsconfig.json`).

### Environment variables
See `.env.local.example`: `MONGODB_URI`, `RESEND_API_KEY`, `ADMIN_PASSWORD`, `BLOB_READ_WRITE_TOKEN`. Server actions allow up to `11mb` bodies (`next.config.ts`) for abstract file uploads.
