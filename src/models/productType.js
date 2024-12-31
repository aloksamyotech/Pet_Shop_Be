  import mongoose, { Schema } from "mongoose";

  const productTypeSchema = new Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        trim: true,
      }
    },
    { timestamps: true },
  );

  export const ProductTypeSchemaModel = mongoose.model("ProductType", productTypeSchema);
