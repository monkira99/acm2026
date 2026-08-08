"use server";

import { connectDB } from "@/lib/mongodb";
import { Registration } from "@/lib/models/registration";
import { registrationSchema, type RegistrationInput } from "@/lib/validators";
import { deliverRegistrationConfirmation } from "@/lib/registration-email";
import { nextSequentialId, isDuplicateKeyError } from "@/lib/actions/sequential-id";

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

    // Allocate the sequential ID from the current max and save. Retry if a
    // concurrent registration grabbed the same confirmationId first.
    let confirmationId = "";
    for (let attempt = 0; ; attempt++) {
      confirmationId = await nextSequentialId(Registration, "ACM23-R-", "confirmationId");
      try {
        await new Registration({ ...parsed.data, confirmationId }).save();
        break;
      } catch (error) {
        if (isDuplicateKeyError(error, "email")) {
          return { success: false, error: "This email is already registered." };
        }
        if (isDuplicateKeyError(error, "confirmationId") && attempt < 5) {
          continue;
        }
        throw error;
      }
    }

    // Email is non-fatal: the registration is already saved, so a send failure
    // must not fail the action — it's recorded on the doc and recoverable via
    // admin manual resend (issue #8).
    const mail = await deliverRegistrationConfirmation({
      confirmationId,
      email: parsed.data.email,
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
