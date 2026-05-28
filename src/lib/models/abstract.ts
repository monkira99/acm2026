import mongoose, { Schema, type Document } from "mongoose";
import {
  ABSTRACT_TOPIC_VALUES,
  type AbstractTopic,
} from "@/lib/abstract-topics";

export interface AbstractAuthor {
  role: "presenting" | "co";
  name: string;
  affiliation: string;
  email?: string;
}

export interface IAbstract extends Document {
  title: string;
  authors: AbstractAuthor[];
  correspondingEmail: string;
  affiliation: string;
  abstractText: string;
  keywords: string[];
  presentationType: "oral" | "poster";
  topic: AbstractTopic;
  submittedAt: Date;
  submissionId: string;
}

const AbstractAuthorSchema = new Schema<AbstractAuthor>(
  {
    role: { type: String, required: true, enum: ["presenting", "co"] },
    name: { type: String, required: true },
    affiliation: { type: String, required: true },
    email: String,
  },
  { _id: false },
);

const AbstractSchema = new Schema<IAbstract>({
  title: { type: String, required: true },
  authors: { type: [AbstractAuthorSchema], required: true },
  correspondingEmail: { type: String, required: true },
  affiliation: { type: String, required: true },
  abstractText: { type: String, required: true },
  keywords: { type: [String], required: true },
  presentationType: { type: String, required: true, enum: ["oral", "poster"] },
  topic: {
    type: String,
    required: true,
    enum: [...ABSTRACT_TOPIC_VALUES],
  },
  submittedAt: { type: Date, default: Date.now },
  submissionId: { type: String, required: true, unique: true },
});

export const Abstract =
  mongoose.models.Abstract ??
  mongoose.model<IAbstract>("Abstract", AbstractSchema);
