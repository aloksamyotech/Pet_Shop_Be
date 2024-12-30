import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      default: null,
    },
    price: {
      type: Number,
      required: true,
     
    },
    discount: {
      type: Number,
      required: true,
    }
  },
  { timestamps: true },
);

export const ProductSchemaModel = mongoose.model("Product", productSchema);
