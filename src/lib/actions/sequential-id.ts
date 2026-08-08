import type { Model } from "mongoose";

/**
 * Next human-readable sequential ID for a collection, e.g. "ACM23-R-0041".
 *
 * Derived from the highest existing numeric suffix — NOT countDocuments().
 * countDocuments+1 is unsafe: once any record is deleted, count drops below
 * the largest live sequence number, so count+1 collides with an existing ID
 * and the unique index rejects the insert (this is exactly the bug that made
 * every new registration fail after test rows were deleted). Reading the max
 * is deletion-safe; callers should still retry on the rare concurrent-insert
 * collision via isDuplicateKeyError().
 */
export async function nextSequentialId<T>(
  model: Model<T>,
  prefix: string,
  field: string,
): Promise<string> {
  const escaped = prefix.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const docs = await model
    .find({ [field]: { $regex: `^${escaped}\\d+$` } })
    .select(field)
    .lean();

  const max = docs.reduce((acc, doc) => {
    const value = String((doc as Record<string, unknown>)[field] ?? "");
    const n = Number(value.slice(prefix.length));
    return Number.isFinite(n) && n > acc ? n : acc;
  }, 0);

  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}

/** True for a MongoDB duplicate-key (E11000) error on the given field. */
export function isDuplicateKeyError(error: unknown, field: string): boolean {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { code?: number }).code === 11000 &&
    Boolean((error as { keyPattern?: Record<string, unknown> }).keyPattern?.[field])
  );
}
