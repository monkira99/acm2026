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

test("all image-driven Venue sections use VenueDetailRow", async () => {
  const files = [
    "src/components/venue/accommodation-section.tsx",
    "src/components/venue/discover-hanoi-section.tsx",
    "src/components/venue/taste-of-hanoi-section.tsx",
  ];

  for (const file of files) {
    const source = await read(file);
    assert.match(source, /import \{ VenueDetailRow \}/);
    assert.match(source, /<VenueDetailRow/);
  }
});
