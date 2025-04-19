import mongoose, { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema({
  title: { type: String, required: true },
  description: String,
  category: String, // e.g., Free or Paid
  imageUrl: String,
});

const Service = models.Service || model("Service", ServiceSchema);
export default Service;
