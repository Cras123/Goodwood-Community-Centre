import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    address: { type: String },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Free"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Participant =
  mongoose.models.Participant ||
  mongoose.model("Participant", participantSchema);

export default Participant;
