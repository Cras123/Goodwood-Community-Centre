import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "users" } // ✅ force the collection name
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
