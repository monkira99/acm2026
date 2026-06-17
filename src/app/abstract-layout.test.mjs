import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

test("abstract form column stretches so the submit button can align with the template button", () => {
  const page = read("./abstract/page.tsx");
  const form = read("../components/forms/abstract-form.tsx");

  assert.match(
    page,
    /<section className="flex h-full min-w-0 flex-col bg-white\/85 px-5 py-6 shadow-sm shadow-\[#2260AD\]\/5 sm:px-6">/,
  );
  // The form fills the column height and distributes its fields evenly so the
  // submit button lands at the bottom — aligned with the template button —
  // without pooling empty space below the last field.
  assert.match(form, /className="flex h-full min-w-0 flex-col gap-5 lg:justify-between"/);
  assert.match(form, /className="flex h-12 w-full/);
});
