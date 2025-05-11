import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: Date,
    time: String,
    address: String,
    category: String,
    cost: String,
    imageUrl: String,
    repeatWeekly: {
      type: Boolean,
      default: false,
    },
    endRepeatDate: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
