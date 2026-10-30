# acm2026

## Homepage logos

- Organizer row, left to right: VNU → IMBT → ACM.
- Sponsor row, reading order: ARC → TABC → Biển Xanh → Suran → TEKCO.
- On desktop, sponsors occupy the left side and the countdown is right-aligned on the same responsive strip: ARC → TABC → Biển Xanh → Suran → TEKCO | countdown. Below 1024px, the countdown stacks above a centered three-plus-two logo grid.
- Logo height scales with the sponsor container width using CSS container units and `clamp()`, rather than fixed per-logo pixel limits. Original proportions are preserved; the wide Suran lockup uses 75% of the shared height for optical balance.
- Logo centers, countdown digits, and separators share a horizontal axis. Countdown labels sit below that axis without shifting alignment.
- The countdown takes 30% of the desktop strip and fits the available width on smaller screens. Digits, labels, separators, row height, and spacing scale with its own container through `cqw` and `clamp()`.

The organizer layout is in `src/components/home/hero-banner.tsx`; the sponsor
artwork, display bounds, and countdown are configured in
`src/components/home/countdown.tsx`.

Sponsor artwork lives in `public/images/sponsors/`. ARC and TEKCO are cropped
vector exports from the supplied PDFs, retaining the original colors and
proportions.
