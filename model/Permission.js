// models/Permission.js
import mongoose from "mongoose";

const PermissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // reference to User
      ref: "User",
      required: true,
    },
    role: {
      type: String, // reference to User
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    responsibilities: {
      type: [String],
      default: [],
    },
    jobs: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

export default mongoose.models.Permission ||
  mongoose.model("Permission", PermissionSchema);
