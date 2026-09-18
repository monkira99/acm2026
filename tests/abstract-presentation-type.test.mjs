import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

async function read(path) {
  return readFile(new URL(path, root), "utf8");
}

test("abstract form has required presentation type field right below preferred session", async () => {
  const form = await read("src/components/forms/abstract-form.tsx");

  // Verify session preference select exists
  const sessionIndex = form.indexOf('id="sessionPreference"');
  assert.ok(sessionIndex !== -1, "sessionPreference field should exist");

  // Verify presentation type select exists
  const presentationIndex = form.indexOf('id="presentationType"');
  assert.ok(presentationIndex !== -1, "presentationType field should exist");

  // Verify presentation type comes after session preference
  assert.ok(
    presentationIndex > sessionIndex,
    "presentationType field must be placed below sessionPreference",
  );

  // Verify exact label text and required star
  assert.match(
    form,
    /Would you like to give an oral or poster presentation\?\s*\{" "\}\s*<span className="text-red-500">\*<\/span>/,
  );

  // Verify required select field
  assert.match(
    form,
    /<select[\s\S]*?id="presentationType"[\s\S]*?name="presentationType"[\s\S]*?required/,
  );

  // Verify default placeholder option and options loop
  assert.match(form, /Select presentation type/);
  assert.match(form, /PRESENTATION_TYPE_OPTIONS\.map/);
});

test("abstract-topics defines presentation type values and labels", async () => {
  const topics = await read("src/lib/abstract-topics.ts");

  assert.match(topics, /PRESENTATION_TYPE_VALUES\s*=\s*\[\s*"oral",\s*"poster",?\s*\]/);
  assert.match(topics, /oral:\s*"Oral presentation"/);
  assert.match(topics, /poster:\s*"Poster presentation"/);
  assert.match(topics, /export function formatPresentationType/);
});

test("validation schema requires presentationType and accepts both forms", async () => {
  const validators = await read("src/lib/validators.ts");

  assert.match(validators, /presentationType:/);
  assert.match(validators, /PRESENTATION_TYPE_VALUES/);
  assert.match(validators, /Please select presentation type/);
});

test("Mongoose model includes presentationType as required", async () => {
  const model = await read("src/lib/models/abstract.ts");

  assert.match(model, /presentationType:\s*PresentationType/);
  assert.match(model, /presentationType:\s*\{\s*type:\s*String,\s*required:\s*true/);
});

test("server action reads presentationType", async () => {
  const action = await read("src/lib/actions/submit-abstract.ts");

  assert.match(action, /presentationType:\s*String\(\s*formData\.get\("presentationType"\)/);
});

test("admin abstracts table retains Date and includes Presentation Type", async () => {
  const adminPage = await read("src/app/admin/(protected)/abstracts/page.tsx");

  assert.match(adminPage, /<th[^>]*>Presentation Type<\/th>/);
  assert.match(adminPage, /<th[^>]*>Date<\/th>/);
  assert.match(adminPage, /formatAdminDate\(a\.submittedAt\)/);
});

test("export route retains File URL, Submitted At, and includes Presentation Type", async () => {
  const exportRoute = await read("src/app/api/export/abstracts/route.ts");

  assert.match(exportRoute, /"Presentation Type"/);
  assert.match(exportRoute, /"File URL"/);
  assert.match(exportRoute, /"Submitted At"/);
});
