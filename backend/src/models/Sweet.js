import { Schema, model } from "mongoose";

const sweetSchema = new Schema(
  {
    name: { type: String, required: true, unique: true, trim: true, index: true },
    priceCents: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: "" },
    tag: { type: String, default: "" },        // e.g. "Dry", "Special"
    subtitle: { type: String, default: "" }
  },
  { timestamps: true }
);

export default model("Sweet", sweetSchema);
