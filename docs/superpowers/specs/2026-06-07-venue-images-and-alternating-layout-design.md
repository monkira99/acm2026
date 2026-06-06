# Venue Images and Alternating Layout Design

## Goal

Replace inaccurate and poorly cropped images on the Venue page with relevant,
high-quality photos, then redesign image-based cards as alternating two-column
rows. The page must remain consistent with the existing conference visual
system and work cleanly on mobile.

## Scope

Update the image-driven content in:

- `AccommodationSection`
- `DiscoverHanoiSection`
- `TasteOfHanoiSection`

The conference venue map and `TransportationSection` remain structurally
unchanged. Existing copy, links, colors, typography, and section order remain
unchanged.

## Image Sources

Use a mixed sourcing strategy:

- Official hotel websites for Legend Westlake Hotel, InterContinental Hanoi
  Westlake, and Elegant Suites Westlake.
- Wikimedia Commons for landmarks, cultural experiences, cyclo, and food.
- A reputable reusable stock source such as Pexels only when an accurate
  Wikimedia image is unavailable, notably for the Hanoi City Tour bus.

Every downloaded image must:

- Show the exact subject named by the card.
- Have enough resolution for its rendered desktop size.
- Have a composition that survives the intended crop.
- Be stored locally under `public/images/venue/`.
- Use a descriptive filename matching the subject.
- Include source URL, author where available, and license/usage note in
  `public/images/venue/README.md`.

An official-site image without documented reuse permission must not be shipped
without the owner's approval. In that case, use an accurately identified image
from Wikimedia Commons or another source with explicit reuse terms.

Remove the three invalid `.jpg` files that contain Wikimedia error HTML:

- `ho-chi-minh-mausoleum.jpg`
- `imperial-citadel.jpg`
- `temple-of-literature.jpg`

## Required Replacements

Replace all known incorrect or placeholder uses, including:

- Ho Chi Minh Mausoleum currently using Hoan Kiem Lake.
- Elegant Suites Westlake currently using the Hanoi skyline.
- Hanoi City Tour Bus currently using the Hanoi skyline.
- Egg Coffee currently using Hoan Kiem Lake.
- Placeholder images for Imperial Citadel, Temple of Literature, Train Street,
  Water Puppet Theatre, Cyclo Tour, InterContinental Hanoi Westlake, pho, and
  bun cha.
- The portrait Legend Westlake image with a suitable horizontal image.

## Layout

Each item becomes one full-width row with two columns:

- One column contains the image.
- One column contains the existing title, description, metadata, and actions.
- Odd rows show image left and content right.
- Even rows show content left and image right.
- Rows use the current white surface, blue text, gold category badge, and
  restrained shadow treatment.
- Desktop columns use a `54% / 46%` image-to-content split.
- Content is vertically centered and keeps the current CTA hierarchy.

The main venue hotel remains visually emphasized through its existing badge and
venue metadata, not through a different card structure.

## Image Ratios and Cropping

Use ratio classes by content type rather than forcing every image into one
shape:

- Hotels: `16:9`.
- Landmarks and experiences: `3:2`.
- Food: `4:3`.

Use `object-cover` with an explicit per-image `object-position` only when the
default center crop loses the subject. Images should be prepared close to the
display ratio before shipping to reduce browser work and unpredictable crops.

## Responsive Behavior

Below `720px`:

- Every row becomes a single column.
- The image always appears before the content, including rows that are reversed
  on desktop.
- Image height remains bounded to avoid oversized portrait sections.
- Content padding decreases while preserving readable touch targets.
- Links and buttons wrap without horizontal overflow.

Desktop alternation is purely presentational. DOM order remains image first,
content second for consistent mobile and accessibility behavior.

## Accessibility

- Keep accurate, subject-specific alt text.
- Decorative overlays and badges must not replace visible text.
- Preserve keyboard focus styles on map and booking links.
- Maintain sufficient text contrast over solid surfaces; do not place body copy
  directly on images.
- External links retain `target="_blank"` and `rel="noopener noreferrer"`.

## Performance

- Continue using `next/image`.
- Resize and compress downloaded assets to a maximum of 1800 pixels on the long
  edge.
- Prefer WebP where conversion does not introduce visible artifacts.
- Keep responsive `sizes` accurate for the new two-column rows.
- Do not add new image or gallery dependencies.

## Verification

- Visually inspect Venue at desktop and mobile widths.
- Confirm each card image matches its title and description.
- Confirm alternating desktop order and image-first mobile order.
- Confirm no subject is cropped out at common breakpoints.
- Confirm every image file is a real image, not an HTML response.
- Run ESLint and the production build.

## Out of Scope

- Changing transportation content or pricing.
- Adding a carousel, lightbox, or image modal.
- Rewriting Venue page copy.
- Changing the site-wide design system.
