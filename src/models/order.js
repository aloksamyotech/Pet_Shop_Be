import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    productPrice: {
      type: Number,
      required : true,
     
    },
  
   quantity:{
    type:Number,
    default:0,
 },
 

    
  },
{ timestamps: true },
);

export const OrderSchemaModel = mongoose.model("Order", orderSchema);

