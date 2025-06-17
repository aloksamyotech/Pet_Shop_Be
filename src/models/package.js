import mongoose, { Schema } from "mongoose";

const Package = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    PackageImage: {
      type: String,
    },
  },
  { timestamps: true }
);

export const PackageModelSchema = mongoose.model("PackageModel", Package);
