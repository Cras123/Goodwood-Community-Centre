// models/Event.ts
import mongoose, { Schema, model, models } from "mongoose";

const EventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date },
  time: { type: String },
  address: { type: String },
  category: { type: String },
  imageUrl: { type: String },
  cost: { type: String },
});

const Event = models.Event || model("Event", EventSchema);
export default Event;
