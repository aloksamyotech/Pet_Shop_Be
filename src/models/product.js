import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    discount: {
      type: Number,
      default:0,
      min: 0,
    },
    categoryId:{
      type: mongoose.Schema.Types.ObjectId,
      ref :'Category',  
      required:true
    }

    
  },
{ timestamps: true },
);

export const ProductSchemaModel = mongoose.model("Product", productSchema);
