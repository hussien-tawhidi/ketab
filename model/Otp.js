import mongoose, { Schema } from "mongoose";

const otpSchema = new Schema(
  {
    contact: {
      type: String, // phone or email
      required: true,
      index: true,
    },
    code: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    verified: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Otp || mongoose.model("Otp", otpSchema);
