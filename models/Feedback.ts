import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
    },
    userPhone: {
      type: String,
      validate: {
        validator: function (v: string) {
          return /^[0-9+\s()-]*$/.test(v); // optional but must be valid
        },
        message: "Phone number format is invalid",
      },
    },
    userEmail: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v: string) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: "Email format is invalid",
      },
    },
    userMessage: {
      type: String,
      required: [true, "Message is required"],
      minlength: [10, "Message must be at least 10 characters"],
    },
    ndaRequested: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Feedback ||
  mongoose.model("Feedback", FeedbackSchema);
