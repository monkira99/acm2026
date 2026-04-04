import mongoose, { Schema, type Document } from "mongoose";

export interface IAbstract extends Document {
  title: string;
  authors: string;
  correspondingEmail: string;
  affiliation: string;
  abstractText: string;
  keywords: string[];
  pdfFileUrl?: string;
  presentationType: "oral" | "poster";
  submittedAt: Date;
  submissionId: string;
}

const AbstractSchema = new Schema<IAbstract>({
  title: { type: String, required: true },
  authors: { type: String, required: true },
  correspondingEmail: { type: String, required: true },
  affiliation: { type: String, required: true },
  abstractText: { type: String, required: true },
  keywords: { type: [String], required: true },
  pdfFileUrl: String,
  presentationType: { type: String, required: true, enum: ["oral", "poster"] },
  submittedAt: { type: Date, default: Date.now },
  submissionId: { type: String, required: true, unique: true },
});

export const Abstract =
  mongoose.models.Abstract ??
  mongoose.model<IAbstract>("Abstract", AbstractSchema);
