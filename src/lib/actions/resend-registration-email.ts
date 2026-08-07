"use server";

import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { verifyAdmin } from "@/lib/admin-session";
import { deliverRegistrationConfirmation } from "@/lib/registration-email";

interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Admin-only manual (re)send of a registration confirmation email. Reuses the
 * shared deliverRegistrationConfirmation() path (issue #7) so status is recorded
 * identically to the auto-send.
 */
export async function resendRegistrationEmailAction(
  confirmationId: string,
): Promise<ActionResult> {
  if (!(await verifyAdmin())) {
    return { success: false, error: "Unauthorized." };
  }

  await connectDB();
  const registration = await Registration.findOne({ confirmationId }).lean();
  if (!registration) {
    return { success: false, error: "Registration not found." };
  }

  const mail = await deliverRegistrationConfirmation({
    confirmationId: registration.confirmationId,
    email: registration.email,
    fullName: registration.fullName,
    country: registration.country,
  });

  revalidatePath("/admin/registrations");
  return mail.ok ? { success: true } : { success: false, error: mail.error };
}
