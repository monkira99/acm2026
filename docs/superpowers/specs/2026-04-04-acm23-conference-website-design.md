# ACM23 Conference Website — Design Spec

## Overview

Website for the 23rd Annual Meeting of ACM (Asian Consortium for the Conservation and Sustainable Use of Microbial Resources), held in Hanoi, Vietnam, October 2026. The site serves as the primary information hub with online registration and abstract submission capabilities.

**Organization:** ACM — established 2004 in Tsukuba, Japan. 28 member organizations across 15 Asian countries/regions. Promotes collaboration for conservation and sustainable use of microbial resources.

**Existing presence:** `acm-mrc.asia` — minimal static site with basic text content.

## Goals

1. Present ACM23 as a professional international scientific conference
2. Showcase Vietnamese and Hanoi cultural identity through traditional design elements
3. Enable online registration and abstract submission with email confirmation
4. Provide comprehensive practical information for attendees from 15+ countries
5. Give organizers a simple admin dashboard to manage submissions

## Scope

**In scope:**
- 13 public pages with static + dynamic content
- Registration form with email confirmation
- Abstract submission form with PDF upload and email confirmation
- Admin dashboard (password-protected) for viewing/exporting data
- Responsive design (mobile, tablet, desktop)
- SEO optimization

**Out of scope:**
- Online payment/checkout
- Abstract review/scoring system
- User accounts/login for attendees
- Multi-language support (English only)
- CMS for content management

## Architecture

### Approach: Next.js App Router + Server Actions + MongoDB

- **Next.js 15+ App Router** as the full-stack framework
- **Server Actions** for form handling (registration, abstract submission)
- **MongoDB Atlas** for data persistence
- **Vercel** for deployment (zero-config with Next.js)
- **Static content in TypeScript files** (`src/data/`) — no CMS needed for a short-lived conference site

### Directory Structure

```
acm23-website/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout (nav, footer, fonts)
│   │   ├── page.tsx                  # Home
│   │   ├── about/page.tsx
│   │   ├── program/page.tsx
│   │   ├── speakers/page.tsx
│   │   ├── registration/page.tsx     # Registration form (Server Action)
│   │   ├── abstract/page.tsx         # Abstract submission (Server Action)
│   │   ├── dates/page.tsx
│   │   ├── committees/page.tsx
│   │   ├── venue/page.tsx
│   │   ├── sponsors/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── contact/page.tsx
│   │   └── admin/                    # Admin dashboard (protected)
│   │       ├── layout.tsx
│   │       ├── page.tsx              # Overview/stats
│   │       ├── registrations/page.tsx
│   │       └── abstracts/page.tsx
│   ├── components/
│   │   ├── layout/                   # Navbar, Footer, MobileMenu
│   │   ├── home/                     # HeroBanner, Countdown, Highlights
│   │   ├── cultural/                 # DragonPattern, LotusDecor, DongSonPattern, BorderPattern
│   │   ├── forms/                    # RegistrationForm, AbstractForm
│   │   └── ui/                       # Button, Card, Input, Modal...
│   ├── lib/
│   │   ├── mongodb.ts                # MongoDB connection singleton
│   │   ├── models/                   # Mongoose models
│   │   │   ├── registration.ts
│   │   │   └── abstract.ts
│   │   ├── actions/                  # Server Actions
│   │   │   ├── register.ts
│   │   │   ├── submit-abstract.ts
│   │   │   └── send-contact.ts
│   │   ├── email.ts                  # Email sending (Resend)
│   │   └── validators.ts            # Zod schemas
│   ├── data/                         # Static content (TypeScript)
│   │   ├── speakers.ts
│   │   ├── program.ts
│   │   ├── committees.ts
│   │   ├── sponsors.ts
│   │   ├── faq.ts
│   │   └── dates.ts
│   └── styles/
│       └── globals.css               # Tailwind + custom CSS variables
├── public/
│   ├── images/
│   │   ├── cultural/                 # Rồng Lý, hoa sen, trống đồng SVGs
│   │   ├── venue/                    # Hanoi/venue photos
│   │   ├── speakers/                 # Speaker headshots
│   │   ├── sponsors/                 # Sponsor logos
│   │   └── gallery/                  # Past ACM meeting photos
│   └── fonts/                        # Custom fonts if needed
├── .env.local                        # MONGODB_URI, RESEND_API_KEY, ADMIN_PASSWORD, BLOB_READ_WRITE_TOKEN
├── tailwind.config.ts
├── next.config.ts
└── package.json
```

## Pages

### Public Pages (13)

| Page | Route | Render | Description |
|---|---|---|---|
| Home | `/` | SSG | Hero banner, countdown, highlights, dates preview, venue preview, sponsors |
| About | `/about` | SSG | About ACM, history, objectives, member organizations |
| Scientific Program | `/program` | SSG | Session schedule, topics, workshop details |
| Keynote Speakers | `/speakers` | SSG | Speaker cards with photo, bio, affiliation, talk title |
| Registration | `/registration` | Dynamic | Registration form with Server Action |
| Abstract Submission | `/abstract` | Dynamic | Abstract form + PDF upload with Server Action |
| Important Dates | `/dates` | SSG | Timeline of all deadlines and milestones |
| Committees | `/committees` | SSG | Organizing, scientific, local committees with member lists |
| Venue & Travel | `/venue` | SSG | Venue info, maps, accommodation, travel tips, Hanoi guide |
| Sponsors | `/sponsors` | SSG | Sponsor tiers (platinum, gold, silver) with logos |
| Gallery | `/gallery` | SSG | Photo gallery from past ACM meetings (static images in `public/images/gallery/`) |
| FAQ | `/faq` | SSG | Accordion-style Q&A |
| Contact | `/contact` | Dynamic | Contact info, organizer details, contact form (Server Action sends email to organizers) |

### Admin Pages (3)

| Page | Route | Description |
|---|---|---|
| Overview | `/admin` | Stats dashboard: total registrations, abstracts, countries |
| Registrations | `/admin/registrations` | Table with search/filter, view details |
| Abstracts | `/admin/abstracts` | Table with search/filter, download PDFs, view abstract text |

All admin pages protected by password auth via HTTP-only encrypted cookie.

## Home Page Layout

Six sections from top to bottom:

1. **Hero Banner** — gradient teal-to-dark background with Ly Dynasty dragon SVG pattern (low opacity). ACM logo, conference title, location + date, two CTA buttons: "Register Now" (gold) and "Submit Abstract" (white outline).

2. **Countdown Timer** — live countdown to conference opening date. Large numbers in teal on light background.

3. **Conference Highlights** — 3 cards in a row: Scientific Sessions, Keynote Speakers, Networking. Each with gradient icon and short description.

4. **Important Dates** — vertical timeline with 3-4 key milestones. Color-coded dots from the palette.

5. **Venue & Hanoi Preview** — dark split-layout section. Left: text introducing Hanoi as "City of the Ascending Dragon". Right: photo of Hanoi. Link to venue page.

6. **Sponsors & Partners** — minimal logo grid on light background.

**Persistent elements:** Fixed navbar (logo + menu + CTA button), footer with contact info, quick links, ACM logo, and Vietnamese cultural decoration strip.

## Data Models

### Registration

```typescript
{
  fullName: string           // required
  email: string              // required, unique
  affiliation: string        // organization/university
  country: string            // country name
  role: "researcher" | "student" | "industry" | "other"
  dietaryRequirements?: string
  specialRequests?: string
  registeredAt: Date         // auto
  confirmationId: string     // auto-generated, format "ACM23-R-0001"
}
```

### Abstract Submission

```typescript
{
  title: string              // required
  authors: string            // author list
  correspondingEmail: string // required
  affiliation: string        // organization
  abstractText: string       // max 300 words
  keywords: string[]         // 3-5 keywords
  pdfFileUrl?: string        // Vercel Blob URL
  presentationType: "oral" | "poster"
  submittedAt: Date          // auto
  submissionId: string       // auto-generated, format "ACM23-A-0001"
}
```

## Server Action Flow

Both registration and abstract submission follow the same flow:

1. **User submits form** — client-side Zod validation, then Server Action is called
2. **Server-side validation** — Zod re-validates, sanitize inputs, check for duplicate email (registration only)
3. **File upload** (abstract only) — PDF uploaded to Vercel Blob Storage, URL stored
4. **Save to MongoDB** — generate confirmation/submission ID, save document
5. **Send confirmation email** — via Resend API, HTML email with ID and submitted details
6. **Return success** — redirect to success page with confirmation information

## Cultural Design System

Four SVG element groups, all vector-based for crisp rendering at any size:

| Element | Description | Usage |
|---|---|---|
| **Ly Dynasty Dragon** | Soft, flowing silhouette unique to Vietnamese dragons. Gold or white, low opacity. | Hero banner background, About page header, certificate borders |
| **Lotus Flower** | Vietnam's national flower. Minimalist SVG. | Section icons, bullet points, footer decoration, email templates |
| **Dong Son Drum Pattern** | Concentric circles inspired by the bronze drum face. | Section dividers, loading spinner, countdown timer border |
| **Border Ornaments** | Inspired by Bat Trang ceramics and Temple of Literature architecture. | Navbar bottom border, card frames, page section separators |

**Design principle:** Use cultural elements tastefully, not excessively. Each page features 1-2 prominent cultural elements; the rest maintains a clean scientific design foundation.

## Color Palette

| Color | Hex | CSS Variable | Usage |
|---|---|---|---|
| Teal Dark | `#0D7377` | `--color-primary` | Headers, CTA buttons, primary accents |
| Teal Light | `#14919B` | `--color-secondary` | Links, hover states, secondary accents |
| Green Accent | `#0AD3A1` | `--color-accent` | Nature/microbiology elements, success states |
| Bronze Gold | `#C8A951` | `--color-gold` | Cultural elements, highlights, premium feel |
| Dark | `#1A2332` | `--color-dark` | Text, footer background, admin sidebar |
| Light | `#F5F7FA` | `--color-light` | Page backgrounds, card backgrounds |
| White | `#FFFFFF` | `--color-white` | Cards, content areas |

## Tech Stack

### Dependencies

| Package | Version | Purpose |
|---|---|---|
| next | ^15.x | App Router + Server Actions |
| react | ^19.x | UI framework |
| mongoose | ^8.x | MongoDB ODM |
| zod | ^3.x | Form validation (client + server) |
| resend | ^4.x | Email API |
| @vercel/blob | latest | PDF upload storage |
| lucide-react | latest | Icon library |
| framer-motion | ^11.x | Scroll animations, page transitions |
| react-hook-form | ^7.x | Form state management |
| @hookform/resolvers | ^3.x | Zod integration for react-hook-form |
| tailwindcss | ^4.x | Utility-first CSS |
| typescript | ^5.x | Type safety |

### Environment Variables

```
MONGODB_URI=              # MongoDB Atlas connection string
RESEND_API_KEY=           # Resend email API key
ADMIN_PASSWORD=           # Admin dashboard password
BLOB_READ_WRITE_TOKEN=    # Vercel Blob storage token
```

## SEO Strategy

- **Next.js Metadata API** — per-page title templates ("Page | ACM23 Hanoi"), descriptions, keywords
- **Open Graph images** — auto-generated via Next.js OG Image API with ACM23 branding
- **Structured data** — JSON-LD `Event` schema for Google rich results
- **Sitemap + robots.txt** — auto-generated at build time

## Performance Strategy

- **10/13 pages SSG** — static generation at build time for all content pages. Sub-second load times. Dynamic pages: registration, abstract, contact.
- **Server Components by default** — `"use client"` only for: countdown timer, forms, mobile menu, gallery lightbox
- **next/image** — automatic optimization for venue/speaker photos
- **SVG for cultural elements** — vector graphics, no heavy image downloads

## Responsive Design

| Breakpoint | Width | Layout |
|---|---|---|
| Mobile | <640px | Single column, hamburger menu, compact hero |
| Tablet | 640-1024px | 2-column grid, condensed navigation |
| Desktop | >1024px | Full layout, 3-column cards, full navbar |

Mobile-first approach using Tailwind CSS responsive utilities.

## Admin Dashboard

### Authentication
Simple password-based auth using `ADMIN_PASSWORD` environment variable. Login form at `/admin`. Session stored in HTTP-only encrypted cookie. No full auth system needed for 1-2 admin users.

### Features
- **Overview** — stat cards: total registrations, abstracts submitted, unique countries
- **Registrations** — sortable/searchable table, view detail modal, export CSV
- **Abstracts** — sortable/searchable table, view abstract text, download PDF, export CSV
- **Export CSV** — Server Action generates CSV from MongoDB query, triggers browser download

### Layout
Dark sidebar navigation (left) + light main content area (right). Functional design, not styled to the same level as the public site.

## Deployment

- **Platform:** Vercel (free tier)
- **CI/CD:** Auto-deploy from Git (push to main = production deploy)
- **Database:** MongoDB Atlas free tier (512MB storage, shared cluster)
- **Email:** Resend free tier (3,000 emails/month)
- **File storage:** Vercel Blob free tier (500MB)
- **Domain:** Custom domain configurable in Vercel dashboard
