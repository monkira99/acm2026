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
    return { success: false, error: parsed.error.errors[0].message };
  }

  try {
    await sendContactNotification(parsed.data);
    return { success: true };
  } catch (error) {
    console.error("Contact form error:", error);
    return { success: false, error: "Failed to send message. Please try again." };
  }
}
