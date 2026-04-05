import { cookies } from "next/headers";

const ADMIN_COOKIE = "acm23_admin";

export async function verifyAdmin(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE);
  if (!session) return false;
  return session.value === hashPassword(adminPassword);
}

export function hashPassword(password: string): string {
  const encoder = new TextEncoder();
  const data = encoder.encode(password + "acm23-salt");
  let hash = 0;
  for (const byte of data) {
    hash = ((hash << 5) - hash + byte) | 0;
  }
  return Math.abs(hash).toString(36);
}

export async function setAdminSession() {
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("ADMIN_PASSWORD not configured");
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, hashPassword(adminPassword), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  // Delete cookie at both paths to handle legacy cookies set with path: "/admin"
  cookieStore.delete({ name: ADMIN_COOKIE, path: "/" });
  cookieStore.delete({ name: ADMIN_COOKIE, path: "/admin" });
}
