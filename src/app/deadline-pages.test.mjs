import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

function read(relativePath) {
  return readFileSync(new URL(relativePath, import.meta.url), "utf8");
}

function labelIndex(source, label) {
  return source.search(new RegExp(`<p[^>]*>\\s*${label}\\s*</p>`));
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

test("registration sidebar lists location before registration deadline", () => {
  const source = read("./registration/page.tsx");
  const datesIndex = labelIndex(source, "Dates");
  const locationIndex = labelIndex(source, "Location");
  const deadlineIndex = labelIndex(source, "Registration deadline");

  assert.ok(datesIndex !== -1, "Dates card should be present");
  assert.ok(locationIndex !== -1, "Location card should be present");
  assert.ok(deadlineIndex !== -1, "Registration deadline card should be present");
  assert.ok(datesIndex < locationIndex, "Location should be second after Dates");
  assert.ok(
    locationIndex < deadlineIndex,
    "Registration deadline should be third after Location",
  );
});

test("registration deadline card uses neutral styling", () => {
  const source = read("./registration/page.tsx");
  const card = registrationDeadlineCard(source);

  assert.doesNotMatch(card, /border-l-4/);
  assert.doesNotMatch(card, /border-\[#80AF41\]/);
  assert.doesNotMatch(card, /font-black/);
  assert.match(card, /text-sm font-semibold text-\[#263D5C\]/);
});

test("registration intro card uses neutral styling", () => {
  const source = read("./registration/page.tsx");
  const card = registrationIntroCard(source);

  assert.doesNotMatch(card, /border-l-4/);
  assert.doesNotMatch(card, /border-\[#80AF41\]/);
});

test("abstract page renders the abstract submission deadline from important dates", () => {
  const source = read("./abstract/page.tsx");

  assert.match(source, /import \{ importantDates \} from "@\/data\/dates";/);
  assert.match(source, /label === "Abstract Submission"/);
  assert.match(source, /Submission deadline/);
  assert.match(source, /abstractDeadline\.date/);
});
