import mongoose, { Schema } from "mongoose";

const productTypeSchema = new Schema(
  {
    personName: {
      type: String,
      required: true,
      trim: true,
    },
    productType: {
      type: String,
      default: null,
    },
    quantity: {
      type: Number,
      required: true,
     
    },
    companyName: {
      type: Number,
      required: true,
    },
    description: {
        type: String,
        default: null,
      },
  },
  { timestamps: true },
);

export const ProductTypeSchemaModel = mongoose.model("ProductType", productTypeSchema);
