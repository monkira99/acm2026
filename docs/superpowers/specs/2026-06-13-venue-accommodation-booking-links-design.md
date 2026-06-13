# Venue Accommodation Booking Links Design

## Goal

Complete the updated accommodation section by presenting each hotel's official
website, Booking.com page, Agoda page, and map as clearly differentiated links.
Keep the recently added hotels and keep the removed feature lists hidden.

## Scope

- Preserve the existing accommodation card layout and conference visual style.
- Keep the five current hotels.
- Remove obsolete feature data and commented feature markup.
- Normalize every hotel record to use `websiteUrl`, `bookingUrl`, `agodaUrl`,
  and `mapUrl`.
- Correct hotel image and map references that currently point to another hotel.
- Add compact brand-aware actions for Website, Booking.com, Agoda, and Map.

## Presentation

Use text buttons with small inline brand marks:

- Website uses a neutral external-link icon.
- Booking.com uses a compact blue `B.` mark and visible `Booking.com` text.
- Agoda uses a compact multicolor wordmark and visible `Agoda` text.
- Map remains a lower-emphasis link with the map-pin icon.

All booking actions remain readable without their icons, wrap on small screens,
and use accessible labels and keyboard focus styles. Brand marks are decorative
because the adjacent text already names each service.

## Data And Behavior

Each hotel displays only links present in its data. Links open in a new tab with
`noopener noreferrer`. The official website is visually primary; Booking.com and
Agoda are secondary branded options; Map remains tertiary.

No new package or remote image dependency is required. Brand marks are rendered
as lightweight local components so they stay crisp and do not add image-loading
overhead.

## Verification

- Add source-level tests for all five hotel names and the four action types.
- Confirm obsolete `features` data and commented markup are absent.
- Confirm each hotel image and map belongs to that hotel.
- Run the Venue tests, ESLint, and production build.
- Inspect the Venue page at desktop and mobile widths.
