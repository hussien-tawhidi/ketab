import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true, unique: true, sparse: true },
    phone: { type: String, trim: true, unique: true, sparse: true },
    isActive: { type: Boolean, default: false },
    role: { type: String, default: "user" },
    bio: { type: String, default: "" },
    orders: { type: [Number], default: [] },
    addresses: { type: [String], trim: true, default: [] },
    avatar: { type: String, default: "/avatar.png" },
    gender: { type: String },
    birthday: { type: Date },
  },
  { timestamps: true }
);

userSchema.path("phone").validate(function (value) {
  if (!value && !this.email) {
    return false; // must have at least one
  }
  return true;
}, "Either phone or email is required");

export default mongoose.models.User || mongoose.model("User", userSchema);
