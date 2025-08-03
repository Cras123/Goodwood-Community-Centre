import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [100, "Title must be less than 100 characters"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
    },
    date: {
      type: Date,
      required: [true, "Date is required"],
    },
    time: {
      type: String,
      required: [true, "Time is required"],
      match: [/^\d{1,2}:\d{2}( ?[APap][Mm])?$/, "Invalid time format"],
    },
    address: {
      type: String,
      required: [true, "Address is required"],
      trim: true,
    },
    category: {
      type: String,
      enum: [
        "Weekly Events", // e.g., yoga classes, craft sessions
        "Workshops & Programs", // e.g., job readiness, art classes
        "Family & Fun", // e.g., kids activities, movie nights
        "Festivals & Celebrations", // e.g., multicultural nights
        "Markets & Fairs", // e.g., community market
        "Social & Networking", // e.g., meetups, senior morning teas
        "Volunteering & Join Us", // e.g., volunteering drives
        "Other", // fallback or uncategorized
      ],
      required: [true, "Category is required"],
    },
    cost: {
      type: String,
      default: "Free",
    },
    imageUrl: {
      type: String,
      required: [true, "Image URL is required"],
    },
    repeatWeekly: {
      type: Boolean,
      default: false,
    },
    endRepeatDate: {
      type: Date,
      default: null,

      message: "End repeat date is required if event repeats weekly.",
    },
  },

  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
