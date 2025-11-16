import { Schema, model } from "mongoose";

const userSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, lowercase: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["USER", "ADMIN"], default: "USER" }
  },
  { timestamps: true }
);

export default model("User", userSchema);
