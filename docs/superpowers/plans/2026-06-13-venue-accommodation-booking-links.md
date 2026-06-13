# Venue Accommodation Booking Links Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete the Venue accommodation cards with accurate hotel data and clearly differentiated Website, Booking.com, Agoda, and Map actions.

**Architecture:** Keep the hotel data and rendering in `accommodation-section.tsx`, matching the existing component style. Add two tiny decorative brand-mark components in the same file, render actions conditionally from normalized URL fields, and protect the behavior with source-level Node tests.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 4, `next/image`, Lucide React, Node test runner.

---

### Task 1: Add Accommodation Regression Coverage

**Files:**
- Modify: `tests/venue-page.test.mjs`

- [ ] **Step 1: Write the failing tests**

Add tests that read `src/components/venue/accommodation-section.tsx` and assert:

```js
test("accommodation lists all approved hotels and booking channels", async () => {
  const source = await read("src/components/venue/accommodation-section.tsx");

  for (const hotel of [
    "Legend Westlake Hotel",
    "InterContinental Hanoi Westlake",
    "Pan Pacific Hanoi",
    "The Hanoi Club Hotel",
    "Elegant Suites Westlake",
  ]) {
    assert.match(source, new RegExp(hotel));
  }

  assert.match(source, />Website</);
  assert.match(source, />Booking\\.com</);
  assert.match(source, />Agoda</);
  assert.match(source, />View on Map</);
});

test("accommodation data uses dedicated URLs and matching hotel images", async () => {
  const source = await read("src/components/venue/accommodation-section.tsx");

  assert.doesNotMatch(source, /features:/);
  assert.match(source, /websiteUrl:/);
  assert.match(source, /bookingUrl:/);
  assert.match(source, /agodaUrl:/);
  assert.match(source, /PanPacificHanoi\\.jpg/);
  assert.match(source, /elegant-suites-westlake\\.webp/);
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run:

```bash
node --test tests/venue-page.test.mjs
```

Expected: the new tests fail because the branded labels are absent, obsolete
feature data remains, and Pan Pacific uses the wrong image.

- [ ] **Step 3: Commit the failing tests**

```bash
git add tests/venue-page.test.mjs
git commit -m "test(venue): cover accommodation booking channels"
```

### Task 2: Normalize Hotel Data And Render Branded Actions

**Files:**
- Modify: `src/components/venue/accommodation-section.tsx`

- [ ] **Step 1: Remove obsolete implementation**

Delete the unused `framer-motion/client` and `CheckCircle2` imports, remove every
`features` array, and remove the commented feature-list JSX.

- [ ] **Step 2: Normalize each hotel record**

Give all five hotel records these four explicit properties:

```ts
websiteUrl: string;
bookingUrl: string;
agodaUrl: string;
mapUrl: string;
```

Use these exact URL corrections:

| Hotel | Website | Booking.com | Agoda |
| --- | --- | --- | --- |
| Legend Westlake | `https://www.legendwestlake.com/` | `https://www.booking.com/hotel/vn/legend-west-lake.vi.html` | `https://www.agoda.com/legend-west-lake-hotel/hotel/hanoi-vn.html` |
| InterContinental | `https://hanoi.intercontinental.com/?updatelang=yes` | `https://www.booking.com/hotel/vn/intercontinental-westlake.vi.html` | `https://www.agoda.com/intercontinental-hanoi-westlake/hotel/hanoi-vn.html` |
| Pan Pacific | `https://www.panpacific.com/en/hotels-and-resorts/pp-hanoi.html` | `https://www.booking.com/hotel/vn/pan-pacific-hanoi.html` | `https://www.agoda.com/pan-pacific-hanoi/hotel/hanoi-vn.html` |
| The Hanoi Club | `https://www.thehanoiclub.com/` | `https://www.booking.com/hotel/vn/hanoiclub-lake-palais-residences.vi.html` | `https://www.agoda.com/the-hanoi-club-hotel-lake-palais-residences/hotel/hanoi-vn.html` |
| Elegant Suites | `https://www.elegantsuites.com/westlake/home.htm` | `https://www.booking.com/hotel/vn/elegant-suites-westlake.html` | `https://www.agoda.com/elegant-suites-westlake/hotel/hanoi-vn.html` |

Use `/images/venue/PanPacificHanoi.jpg` for Pan Pacific and keep
`/images/venue/elegant-suites-westlake.webp` for Elegant Suites. Set Pan
Pacific's map to
`https://www.google.com/maps/search/?api=1&query=Pan+Pacific+Hanoi` and correct
Elegant Suites' location to `10B Dang Thai Mai, West Lake, Hanoi`.

- [ ] **Step 3: Add lightweight decorative brand marks**

Add local `BookingMark` and `AgodaMark` components before the section component:

```tsx
function BookingMark() {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 place-items-center rounded-sm bg-[#003B95] text-[11px] font-black text-white"
    >
      B.
    </span>
  );
}

function AgodaMark() {
  return (
    <span aria-hidden="true" className="text-[11px] font-black tracking-tight">
      <span className="text-[#E44746]">A</span>
      <span className="text-[#F29D38]">g</span>
      <span className="text-[#6DBE45]">o</span>
      <span className="text-[#4A90D9]">d</span>
      <span className="text-[#8D5BB7]">a</span>
    </span>
  );
}
```

- [ ] **Step 4: Replace the generic booking action**

Render four accessible links with explicit focus styles:

```tsx
<a
  href={hotel.websiteUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-10 items-center gap-2 rounded bg-[#2260AD] px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
>
  Website
  <ExternalLink size={14} aria-hidden="true" />
</a>
<a
  href={hotel.bookingUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-10 items-center gap-2 rounded border border-[#003B95]/25 bg-white px-3.5 py-2 text-sm font-semibold text-[#003B95] transition-colors hover:bg-[#F2F7FF] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#003B95]"
>
  <BookingMark />
  Booking.com
</a>
<a
  href={hotel.agodaUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-10 items-center gap-2 rounded border border-[#D5DCE7] bg-white px-3.5 py-2 text-sm font-semibold text-[#263D5C] transition-colors hover:bg-[#F8FAFD] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
>
  <AgodaMark />
  Agoda
</a>
<a
  href={hotel.mapUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="inline-flex min-h-10 items-center gap-1.5 rounded-sm px-1 text-sm font-semibold text-[#2260AD] transition-colors hover:text-[#143D78] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2260AD]"
>
  <MapPin size={14} aria-hidden="true" />
  View on Map
</a>
```

Use the existing blue primary treatment for Website, outlined white treatments
for Booking.com and Agoda, and the existing text treatment for Map.

- [ ] **Step 5: Run focused tests**

Run:

```bash
node --test tests/venue-page.test.mjs src/components/venue/venue-layout.test.mjs
```

Expected: all Venue tests pass.

- [ ] **Step 6: Commit the implementation**

```bash
git add src/components/venue/accommodation-section.tsx
git commit -m "feat(venue): add branded hotel booking links"
```

### Task 3: Verify The Completed Venue Section

**Files:**
- Verify: `src/components/venue/accommodation-section.tsx`
- Verify: `tests/venue-page.test.mjs`

- [ ] **Step 1: Run static checks**

Run:

```bash
npm run lint
npm run build
```

Expected: both commands exit successfully.

- [ ] **Step 2: Inspect the rendered page**

Start the development server and inspect `/venue` at desktop and mobile widths.
Confirm all five cards render, action rows wrap without overflow, all four
destinations are visually distinguishable, and Pan Pacific shows its own image.

- [ ] **Step 3: Review the final diff**

Run:

```bash
git diff --check
git status --short
```

Expected: no whitespace errors; unrelated pre-existing changes remain untouched.
