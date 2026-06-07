import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

test("conference venue block remains in the Venue page", () => {
  const page = read("../../app/venue/page.tsx");

  assert.match(page, /Conference venue/);
  assert.match(page, /Legend Westlake Hotel/);
  assert.match(page, /Map to Legend Westlake Hotel/);
});

test("travel detail sections use compact grouped cards, not oversized detail rows", () => {
  const detailSectionFiles = [
    "./accommodation-section.tsx",
    "./discover-hanoi-section.tsx",
    "./taste-of-hanoi-section.tsx",
  ];

  for (const file of detailSectionFiles) {
    const source = read(file);

    assert.doesNotMatch(source, /VenueDetailRow/);
    assert.match(source, /next\/image/);
    assert.match(source, /grid/);
  }
});

test("venue card metadata is aligned in reserved bottom groups", () => {
  const tasteSource = read("./taste-of-hanoi-section.tsx");
  const discoverSource = read("./discover-hanoi-section.tsx");

  assert.match(tasteSource, /className="mt-auto pt-4"/);
  assert.match(discoverSource, /className="mt-auto space-y-4 pt-4"/);
  assert.match(discoverSource, /className="min-h-\[2\.5rem\]"/);
  assert.match(discoverSource, /className="min-h-\[1\.5rem\]"/);
});

test("arrival information omits the separate arrival tips panel", () => {
  const source = read("./transportation-section.tsx");

  assert.doesNotMatch(source, /Arrival tips/);
  assert.doesNotMatch(source, /arrivalTips/);
  assert.match(source, /Estimated fare/);
  assert.doesNotMatch(source, /lg:grid-cols-5/);
});
