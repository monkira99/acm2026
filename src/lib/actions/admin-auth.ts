"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession } from "@/lib/admin-session";

export async function adminLoginAction(
  _prevState: { error: string } | null,
  formData: FormData
): Promise<{ error: string }> {
  const password = formData.get("password") as string;
  if (password === process.env.ADMIN_PASSWORD) {
    await setAdminSession();
    redirect("/admin");
  }
  return { error: "Invalid password" };
}

export async function adminLogoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
