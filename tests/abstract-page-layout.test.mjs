import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("abstract page balances both desktop columns and their actions", async () => {
  const page = await read("src/app/abstract/page.tsx");
  const form = await read("src/components/forms/abstract-form.tsx");
  const aside = page.slice(
    page.indexOf("<aside"),
    page.indexOf("</aside>") + "</aside>".length,
  );

  assert.match(page, /lg:grid-cols-2/);
  assert.doesNotMatch(page, /lg:grid-cols-\[0\.95fr_1\.35fr\]/);
  assert.equal(
    aside.match(/<section/g)?.length,
    1,
    "guidance and template should share one card",
  );
  assert.match(
    aside,
    /<section className="[^"]*flex[^"]*h-full[^"]*flex-col[^"]*"/,
  );
  assert.match(aside, /Submission guidance[\s\S]*border-t[\s\S]*Abstract template/);
  // The guidance list grows and distributes its cards so whitespace spreads
  // evenly instead of pooling above the template, keeping the two action
  // buttons aligned without a large gap.
  assert.match(aside, /<ul className="[^"]*lg:flex-1[^"]*lg:justify-between/);
  assert.match(form, /className="flex h-full min-w-0 flex-col gap-5 lg:justify-between"/);
  // The abstract dropzone is a compact row: icon anchored left, with the
  // description text centered in the remaining space.
  assert.match(form, /items-center gap-3[^"]*py-3[^"]*text-center/);
  assert.match(form, /min-w-0 flex-1/);
  // A notification email is collected on the form.
  assert.match(form, /name="notificationEmail"[\s\S]*type="email"/);
  assert.match(
    page,
    /<a[\s\S]*className="[^"]*h-12[^"]*"[\s\S]*Download abstract template/,
  );
  assert.match(
    form,
    /<button[\s\S]*className="[^"]*h-12[^"]*"[\s\S]*Submit abstract/,
  );
});
