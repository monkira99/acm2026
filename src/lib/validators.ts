import { z } from "zod";
import {
  ABSTRACT_SESSION_VALUES,
  SCIENTIST_CATEGORY_VALUES,
} from "@/lib/abstract-topics";

// Normalise a human name: trim, collapse internal whitespace to single spaces,
// then Title-Case each word — capitalise the first letter, lower-case the rest
// (e.g. "  nHUNG  dOAN " → "Nhung Doan"). Unicode-aware (\p{L} + /u) so
// Vietnamese diacritics survive: "nguyễn thị" → "Nguyễn Thị". Only the letter
// after a space or the start is capitalised — casing after hyphens/apostrophes
// (e.g. "McDonald") is not special-cased.
const normalizeName = (value: string) =>
  value
    .replace(/\s+/g, " ")
    .toLocaleLowerCase()
    .replace(/(?:^|\s)\p{L}/gu, (match) => match.toLocaleUpperCase());
const nameField = (message: string, max = 200) =>
  z.string().trim().min(2, message).max(max).transform(normalizeName);

export const registrationSchema = z.object({
  fullName: nameField("Full name is required"),
  email: z.string().email("Invalid email address"),
  affiliation: z.string().min(2, "Affiliation is required").max(300),
  country: z.string().min(2, "Country is required").max(100),
  role: z.enum(["researcher", "student", "industry", "other"], {
    message: "Please select a role",
  }),
  dietaryRequirements: z.string().max(500).optional(),
  specialRequests: z.string().max(500).optional(),
});

export type RegistrationInput = z.infer<typeof registrationSchema>;

export const abstractSubmissionSchema = z.object({
  notificationEmail: z.string().email("Invalid email address"),
  scientistCategory: z.enum(SCIENTIST_CATEGORY_VALUES, {
    message: "Please select scientist category",
  }),
  sessionPreference: z.enum(ABSTRACT_SESSION_VALUES, {
    message: "Please select preferred session",
  }),
});

export type AbstractSubmissionInput = z.infer<typeof abstractSubmissionSchema>;

export const contactSchema = z.object({
  name: nameField("Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
