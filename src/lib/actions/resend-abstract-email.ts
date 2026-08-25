"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { Abstract } from "@/lib/models/abstract";
import { verifyAdmin } from "@/lib/admin-session";
import { deliverAbstractConfirmation } from "@/lib/abstract-email";

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Admin-only manual (re)send of an abstract confirmation email. Reuses the
 * shared deliverAbstractConfirmation() path so status is recorded identically.
 */
export async function resendAbstractEmailAction(
  submissionId: string,
): Promise<ActionResult> {
  if (!(await verifyAdmin())) {
    return { success: false, error: "Unauthorized." };
  }

  await connectDB();
  const abstract = await Abstract.findOne({ submissionId }).lean();
  if (!abstract) {
    return { success: false, error: "Abstract not found." };
  }

  const mail = await deliverAbstractConfirmation({
    submissionId: abstract.submissionId,
  });

  revalidatePath("/admin/abstracts");
  return mail.ok ? { success: true } : { success: false, error: mail.error };
}
