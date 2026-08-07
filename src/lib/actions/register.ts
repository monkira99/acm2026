"use server";

import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { registrationSchema, type RegistrationInput } from "@/lib/validators";
import { sendRegistrationConfirmation } from "@/lib/email";

interface ActionResult {
  success: boolean;
  confirmationId?: string;
  error?: string;
}

export async function registerAction(data: RegistrationInput): Promise<ActionResult> {
  const parsed = registrationSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.issues[0].message };
  }

  try {
    await connectDB();

    const existing = await Registration.findOne({ email: parsed.data.email });
    if (existing) {
      return { success: false, error: "This email is already registered." };
    }

    const count = await Registration.countDocuments();
    const confirmationId = `ACM23-R-${String(count + 1).padStart(4, "0")}`;

    const registration = new Registration({
      ...parsed.data,
      confirmationId,
    });
    await registration.save();

    // Email is non-fatal: the registration is already saved, so a send failure
    // must not fail the action (recovery via admin manual resend — issue #8).
    const mail = await sendRegistrationConfirmation(parsed.data.email, {
      fullName: parsed.data.fullName,
      country: parsed.data.country,
    });
    if (!mail.ok) {
      console.error(`Registration ${confirmationId}: confirmation email failed — ${mail.error}`);
    }

    return { success: true, confirmationId };
  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, error: "An unexpected error occurred. Please try again." };
  }
}
