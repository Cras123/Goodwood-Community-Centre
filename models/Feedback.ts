import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userName: String,
    userPhone: String,
    userEmail: String,
    userMessage: String,
    ndaRequested: Boolean,
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
