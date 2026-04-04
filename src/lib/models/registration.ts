import mongoose, { Schema, type Document } from "mongoose";

export interface IRegistration extends Document {
  fullName: string;
  email: string;
  affiliation: string;
  country: string;
  role: "researcher" | "student" | "industry" | "other";
  dietaryRequirements?: string;
  specialRequests?: string;
  registeredAt: Date;
  confirmationId: string;
}

const RegistrationSchema = new Schema<IRegistration>({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  affiliation: { type: String, required: true },
  country: { type: String, required: true },
  role: { type: String, required: true, enum: ["researcher", "student", "industry", "other"] },
  dietaryRequirements: String,
  specialRequests: String,
  registeredAt: { type: Date, default: Date.now },
  confirmationId: { type: String, required: true, unique: true },
});

export const Registration =
  mongoose.models.Registration ??
  mongoose.model<IRegistration>("Registration", RegistrationSchema);
