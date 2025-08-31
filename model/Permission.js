// models/Permission.js
import mongoose from "mongoose";

export const VALID_ROLES = ["Admin", "Editor", "User", "Viewer"];

const PermissionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId, // reference to User
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: VALID_ROLES,
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
