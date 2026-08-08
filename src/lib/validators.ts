import { z } from "zod";
import { ABSTRACT_TOPIC_VALUES } from "@/lib/abstract-topics";

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

const presentingAuthorSchema = z.object({
  name: nameField("Presenting Author is required"),
  affiliation: z.string().min(2, "Affiliation is required").max(300),
  email: z.string().email("Invalid email address"),
});

const coAuthorSchema = z.object({
  name: nameField("Co-Author name is required"),
  affiliation: z.string().min(2, "Co-Author affiliation is required").max(300),
});

const abstractTopicSchema = z.enum(ABSTRACT_TOPIC_VALUES, {
  message: "Please select topic",
});

export const abstractSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(300),
  presentingAuthor: presentingAuthorSchema,
  coAuthors: z.array(coAuthorSchema).max(20, "Please limit co-authors to 20"),
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
    message: "Please select presentation type",
  }),
  topic: abstractTopicSchema,
}).transform(({ presentingAuthor, coAuthors, ...data }) => ({
  ...data,
  authors: [
    { role: "presenting" as const, ...presentingAuthor },
    ...coAuthors.map((author) => ({
      role: "co" as const,
      ...author,
    })),
  ],
  correspondingEmail: presentingAuthor.email,
  affiliation: presentingAuthor.affiliation,
}));

export type AbstractInput = z.infer<typeof abstractSchema>;

export const contactSchema = z.object({
  name: nameField("Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(2, "Subject is required").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(2000),
});

export type ContactInput = z.infer<typeof contactSchema>;
