import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { isPastDeadline, SUBMISSION_GRACE_MS } from "../src/lib/deadline.ts";

const root = new URL("../", import.meta.url);

test("isPastDeadline honours the exact instant, the grace window and the UTC offset", () => {
  const deadline = "2026-09-30T23:59:59+07:00";
  const cases = [
    // [now, graceMs, expected]
    ["2026-09-30T23:59:59+07:00", 0, false],
    ["2026-09-30T16:59:59.001Z", 0, true],
    ["2026-10-01T00:10:00+07:00", 0, true],
    ["2026-10-01T00:10:00+07:00", SUBMISSION_GRACE_MS, false],
    ["2026-10-01T00:15:00+07:00", SUBMISSION_GRACE_MS, true],
    // 23:59 in UTC on Sept 30 is already Oct 1 in Hanoi.
    ["2026-09-30T23:59:00Z", 0, true],
  ];

  for (const [now, graceMs, expected] of cases) {
    assert.equal(
      isPastDeadline(deadline, new Date(now), graceMs),
      expected,
      `now=${now} grace=${graceMs}`,
    );
  }
});

test("server actions reject a closed window before any upload, DB write or email", async () => {
  const actions = [
    ["src/lib/actions/submit-abstract.ts", "Abstract Submission"],
    ["src/lib/actions/register.ts", "Registration"],
  ];

  for (const [path, label] of actions) {
    const source = await readFile(new URL(path, root), "utf8");
    const body = source.slice(source.indexOf("export async function"));
    const guard = body.indexOf(`isWindowClosed("${label}", { grace: true })`);

    assert.ok(guard !== -1, `${path} should guard the ${label} window`);
    for (const sideEffect of ["connectDB(", "put(", "deliver"]) {
      const at = body.indexOf(sideEffect);
      if (at !== -1) {
        assert.ok(guard < at, `${path}: window guard must run before ${sideEffect}`);
      }
    }
  }
});
