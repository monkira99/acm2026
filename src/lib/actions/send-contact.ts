"use server";

import { contactSchema, type ContactInput } from "@/lib/validators";
import { sendContactNotification } from "@/lib/email";

interface ActionResult {
  success: boolean;
  error?: string;
}

export async function sendContactAction(data: ContactInput): Promise<ActionResult> {
  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  // Contact messages are delivered by email only (no DB copy), so a send
  // failure must surface to the user to retry.
  const mail = await sendContactNotification(parsed.data);
  if (!mail.ok) {
    console.error("Contact form email failed:", mail.error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
  return { success: true };
}
