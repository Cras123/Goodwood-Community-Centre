import mongoose from "mongoose";

const OfferingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Offering ||
  mongoose.model("Offering", OfferingSchema);
