export function formatAdminDate(value: unknown): string {
  if (!value) return "—";
  const date = new Date(value as string | Date);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function formatRole(role: string): string {
  return role.charAt(0).toUpperCase() + role.slice(1);
}

export interface AuthorRow {
  role?: string;
  name?: string;
  affiliation?: string;
  email?: string;
}

export function parseAuthors(authors: unknown): AuthorRow[] {
  if (!Array.isArray(authors)) return [];
  return authors as AuthorRow[];
}
