import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      trim: true,
      unique: true,
    },
    phone: {
      type: String,
      trim: true,
      require: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      trim: true,
      require: true,
    },
    bio: {
      type: String,
      default: "",
    },
    orders: [
      {
        type: Number,
        default: 0,
      },
    ],
    addresses: [
      {
        type: String,
        trim: true,
      },
    ],
    avatar: {
      type: String,
      default: "/avatar.png",
    },
    gender: {
      type: String,
    },
    birthday: {
      type: Date,
    },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", userSchema);
