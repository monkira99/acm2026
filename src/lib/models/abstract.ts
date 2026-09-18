import mongoose, { Schema, type Document } from "mongoose";
import {
  ABSTRACT_SESSION_VALUES,
  PRESENTATION_TYPE_VALUES,
  SCIENTIST_CATEGORY_VALUES,
  type AbstractSession,
  type PresentationType,
  type ScientistCategory,
} from "@/lib/abstract-topics";

export interface IAbstract extends Document {
  submissionId: string;
  notificationEmail: string;
  scientistCategory: ScientistCategory;
  sessionPreference: AbstractSession;
  presentationType: PresentationType;
  fileUrl: string;
  fileName: string;
  fileSize: number;
  submittedAt: Date;
  emailSent?: boolean;
  emailSentAt?: Date;
  lastEmailError?: string;
}

const AbstractSchema = new Schema<IAbstract>({
  submissionId: { type: String, required: true, unique: true },
  notificationEmail: { type: String, required: true },
  scientistCategory: {
    type: String,
    required: true,
    enum: [...SCIENTIST_CATEGORY_VALUES],
  },
  sessionPreference: {
    type: String,
    required: true,
    enum: [...ABSTRACT_SESSION_VALUES],
  },
  presentationType: {
    type: String,
    required: true,
    enum: [...PRESENTATION_TYPE_VALUES],
  },
  fileUrl: { type: String, required: true },
  fileName: { type: String, required: true },
  fileSize: { type: Number, required: true },
  submittedAt: { type: Date, default: Date.now },
  emailSent: { type: Boolean, default: false },
  emailSentAt: { type: Date },
  lastEmailError: { type: String },
});

export const Abstract =
  mongoose.models.Abstract ??
  mongoose.model<IAbstract>("Abstract", AbstractSchema);
