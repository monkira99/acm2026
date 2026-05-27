# Welcome Page Redesign

## Goal

Replace the current placeholder welcome content under `/about` with a polished `/welcome` page that uses the prepared `WelcomeLetter.md` content and visually aligns with the updated home color palette without copying the home hero layout.

## Scope

- Create a dedicated `/welcome` route.
- Remove the existing `/about` route.
- Update navigation, footer links, and sitemap entries from `/about` to `/welcome`.
- Use the prepared `WelcomeLetter.md` text as the source content for the page.
- Correct the conference theme spelling from "Biooconomy" to "Bioeconomy" anywhere it appears in the visible site copy touched by this work.

## Non-Goals

- No markdown runtime or new content rendering dependency.
- No redirect from `/about` to `/welcome`.
- No large homepage redesign.
- No new animation system or heavy visual framework.

## Visual Direction

The welcome page should feel like a formal conference letter, not a clone of the homepage.

- Use the home palette for consistency:
  - Blue: `#2260AD`
  - Deep blue: `#143D78`
  - Green accent: `#80AF41`
  - Gold accent: `#C8A951`
- Avoid the home page's full-screen gradient hero.
- Use a compact page header with restrained blue/green/gold accents.
- Keep the reading experience central: generous whitespace, strong typography, comfortable line length, and clear paragraph rhythm.
- Avoid large cultural background patterns on this page. If decoration is used, limit it to one small gold or blue accent near the header or signature.

## Page Structure

### Compact Header

The page opens with a short, restrained header:

- Title: `Welcome`
- Subtitle: `A message from the ACM23 Organizing Committee`
- Visual treatment: light background, blue title, and a compact green/gold accent rule using the home palette.

### Letter Body

The body uses the content from `WelcomeLetter.md`.

- `Dear colleagues and friends,` appears as the letter salutation.
- The first body paragraph receives lead styling to establish hierarchy.
- Remaining paragraphs use readable prose styling with clear spacing.
- Content is rendered as structured JSX paragraphs for simplicity and control.

### Signature Block

The closing appears as a distinct formal signature section:

- `Best regards,`
- `Trung`
- `Chair of the Organizing Committee`

The block should use a subtle border or accent color, not a heavy card.

## Routing and Navigation

- Add `src/app/welcome/page.tsx`.
- Delete `src/app/about/page.tsx`.
- Change the "Welcome" link in the desktop navbar and mobile menu data from `/about` to `/welcome`.
- Change footer "Welcome" links from `/about` to `/welcome`.
- Replace `/about` with `/welcome` in `src/app/sitemap.ts`.
- Do not configure an `/about` redirect.

## Metadata

The `/welcome` page should define page metadata:

- Title: `Welcome`
- Description: `Welcome letter from the ACM23 Organizing Committee for the Hanoi 2026 meeting.`

## Implementation Notes

- Use existing Next.js App Router patterns already present in `src/app/*/page.tsx`.
- Use Tailwind utilities already configured in the project.
- Do not add dependencies.
- Keep the page self-contained unless existing shared components clearly fit.
- Preserve current user changes elsewhere in the working tree.

## Validation

After implementation, verify:

- `/welcome` renders the full welcome letter.
- `/about` no longer exists as a route.
- Navbar, mobile menu, footer, and sitemap point to `/welcome`.
- The visible typo `Biooconomy` is corrected to `Bioeconomy`.
- Lint/build pass if the local environment allows it.
