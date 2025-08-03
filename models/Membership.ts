import mongoose, { Document, Schema } from "mongoose";

export interface IMembership extends Document {
  name: string;
  email: string;
  gender?: string;
  phone?: string;
  address?: string;
  postcode?: string;
  photoConsent: boolean;
  membershipType: "New Member" | "Renewal";
  agreeToConduct: boolean;
  createdAt: Date;
}

const MembershipSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    gender: { type: String },
    phone: { type: String },
    address: { type: String },
    postcode: { type: String },
    photoConsent: { type: Boolean, required: true },
    membershipType: {
      type: String,
      enum: ["New Member", "Renewal"],
      required: true,
    },
    agreeToConduct: { type: Boolean, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Membership ||
  mongoose.model<IMembership>("Membership", MembershipSchema);
