import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function registrationDeadlineCard(source) {
  const start = source.indexOf("{registrationDeadline ? (");
  const end = source.indexOf(") : null}", start);

  assert.ok(start !== -1, "Registration deadline conditional should be present");
  assert.ok(end !== -1, "Registration deadline conditional should close");

  return source.slice(start, end);
}

function registrationIntroCard(source) {
  const introTextIndex = source.indexOf("Complete the form to register your attendance");
  const start = source.lastIndexOf("<div className=", introTextIndex);
  const end = source.indexOf("</div>", introTextIndex);

  assert.ok(introTextIndex !== -1, "Registration intro text should be present");
  assert.ok(start !== -1, "Registration intro card should be present");
  assert.ok(end !== -1, "Registration intro card should close");

  return source.slice(start, end);
}

test("registration page renders the registration deadline from important dates", () => {
  const source = read("./registration/page.tsx");

  assert.match(source, /import \{ importantDates \} from "@\/data\/dates";/);
  assert.match(source, /label === "Registration"/);
  assert.match(source, /Registration deadline/);
  assert.match(source, /registrationDeadline\.date/);
});

test("registration deadline card matches the abstract deadline styling", () => {
  const source = read("./registration/page.tsx");
  const card = registrationDeadlineCard(source);

  // Consistent with /abstract: green accent border, calendar icon, and a
  // bold navy date.
  assert.match(card, /border-l-4/);
  assert.match(card, /border-\[#80AF41\]/);
  assert.match(card, /<CalendarDays/);
  assert.match(card, /text-sm font-black text-\[#143D78\]/);
});

test("registration intro card shares the abstract accent styling", () => {
  const source = read("./registration/page.tsx");
  const card = registrationIntroCard(source);

  assert.match(card, /border-l-4/);
  assert.match(card, /border-\[#80AF41\]/);
});

test("abstract page renders the abstract submission deadline from important dates", () => {
  const source = read("./abstract/page.tsx");

  assert.match(source, /import \{ importantDates \} from "@\/data\/dates";/);
  assert.match(source, /label === "Abstract Submission"/);
  assert.match(source, /Submission deadline/);
  assert.match(source, /abstractDeadline\.date/);
});
