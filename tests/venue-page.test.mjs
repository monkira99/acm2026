import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("VenueDetailRow keeps image first and applies the approved responsive layout", async () => {
  const source = await read("src/components/venue/venue-detail-row.tsx");

  assert.match(source, /grid-template-columns:54%_46%/);
  assert.match(source, /grid-template-columns:46%_54%/);
  assert.match(source, /sizes="\(min-width: 720px\) 54vw, 100vw"/);
  assert.ok(
    source.indexOf("<Image") < source.indexOf("{children}"),
    "image must precede content in DOM order",
  );
});

test("all image-driven Venue sections use compact image cards", async () => {
  const files = [
    "src/components/venue/accommodation-section.tsx",
    "src/components/venue/discover-hanoi-section.tsx",
    "src/components/venue/taste-of-hanoi-section.tsx",
  ];

  for (const file of files) {
    const source = await read(file);
    assert.match(source, /import Image from "next\/image"/);
    assert.match(source, /className="grid/);
    assert.doesNotMatch(source, /<VenueDetailRow/);
  }
});

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

  assert.match(source, />\s*Website\s*<ExternalLink/);
  assert.match(source, /Booking\.com\s*<\/a>/);
  assert.match(source, /Agoda\s*<\/a>/);
  assert.match(source, /View on Map\s*<\/a>/);
});

test("accommodation data uses dedicated URLs and matching hotel images", async () => {
  const source = await read("src/components/venue/accommodation-section.tsx");

  assert.doesNotMatch(source, /features:/);
  assert.match(source, /websiteUrl:/);
  assert.match(source, /bookingUrl:/);
  assert.match(source, /agodaUrl:/);
  assert.match(source, /PanPacificHanoi\.jpg/);
  assert.match(source, /elegant-suites-westlake\.webp/);
});

test("accommodation eagerly loads only the first hotel image", async () => {
  const source = await read("src/components/venue/accommodation-section.tsx");

  assert.match(source, /hotels\.map\(\(hotel, index\)/);
  assert.match(source, /loading=\{index === 0 \? "eager" : "lazy"\}/);
});
