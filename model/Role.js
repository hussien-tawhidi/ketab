// models/Role.js
import mongoose from "mongoose";

const RoleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // each role should be unique
      trim: true,
    },
    description: {
      type: String,
      default: "",
    },
    permissions: {
      type: [String], // list of responsibilities
      default: [],
    },
    createdBy: {
      type: String,

      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Role || mongoose.model("Role", RoleSchema);
