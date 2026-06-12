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
  assert.match(aside, /className="mt-6 border-t[^"]*lg:mt-auto/);
  assert.match(form, /className="min-w-0 space-y-5"/);
  assert.match(form, /gap-2[^"]*py-6/);
  assert.match(
    page,
    /<a[\s\S]*className="[^"]*h-12[^"]*"[\s\S]*Download abstract template/,
  );
  assert.match(
    form,
    /<button[\s\S]*className="[^"]*h-12[^"]*"[\s\S]*Submit abstract/,
  );
});
