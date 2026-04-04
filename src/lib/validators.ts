import { z } from "zod";

export const registrationSchema = z.object({
  fullName: z.string().min(2, "Full name is required").max(200),
  email: z.string().email("Invalid email address"),
  affiliation: z.string().min(2, "Affiliation is required").max(300),
  country: z.string().min(2, "Country is required").max(100),
  role: z.enum(["researcher", "student", "industry", "other"], {
    required_error: "Please select a role",
  }),
  dietaryRequirements: z.string().max(500).optional(),
  specialRequests: z.string().max(500).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const abstractSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(300),
  authors: z.string().min(2, "Authors are required").max(500),
  correspondingEmail: z.string().email("Invalid email address"),
  affiliation: z.string().min(2, "Affiliation is required").max(300),
  abstractText: z
    .string()
    .min(50, "Abstract must be at least 50 characters")
    .refine(
      (text) => text.split(/\s+/).filter(Boolean).length <= 300,
      "Abstract must not exceed 300 words"
    ),
  keywords: z
    .string()
    .min(1, "Keywords are required")
    .transform((val) =>
      val.split(",").map((k) => k.trim()).filter(Boolean)
    )
    .refine((arr) => arr.length >= 3 && arr.length <= 5, "Please provide 3-5 keywords"),
  presentationType: z.enum(["oral", "poster"], {
    required_error: "Please select presentation type",
  }),
});

export type AbstractInput = z.infer<typeof abstractSchema>;

export const contactSchema = z.object({
  name: z.string().min(2, "Name is required").max(200),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
