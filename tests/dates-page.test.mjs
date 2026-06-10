import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("dates page makes each deadline card visibly interactive", async () => {
  const source = await readFile(
    new URL("src/app/dates/page.tsx", root),
    "utf8",
  );

  assert.match(source, /href: "\/abstract"/);
  assert.match(source, /href: "\/registration"/);
  assert.match(source, /<Link[\s\S]*href=\{action\.href\}[\s\S]*<article/);
  assert.match(source, /group-hover:/);
  assert.match(source, /focus-visible:/);
  assert.match(source, /ArrowRight/);
  assert.match(
    source,
    /<ArrowRight[\s\S]*className="ml-auto h-5 w-5 shrink-0 self-center/,
  );
  assert.doesNotMatch(source, /Open abstract submission/);
  assert.doesNotMatch(source, /Open registration/);
  assert.doesNotMatch(source, /ArrowUpRight/);
  assert.doesNotMatch(source, />\s*Submit abstract\s*</);
  assert.doesNotMatch(source, />\s*Register now\s*</);
});
