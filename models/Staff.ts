import mongoose, { Schema, model, models } from "mongoose";

const StaffSchema = new Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  imageUrl: { type: String, required: true },
  quote: { type: String, required: true },
});

// ✅ Check if model already exists (important during Hot Reload!)
const Staff = models.Staff || model("Staff", StaffSchema);

export default Staff;
