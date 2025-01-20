

  import mongoose, { Schema } from "mongoose";
  import { ProductSchemaModel } from "./product.js";
import category from "../controllers/category.js";

  const productSchema = new mongoose.Schema({
    productId:{
      type: mongoose.Schema.Types.ObjectId,
      ref :'Product',  
      required:true
    },
    productName:{
      type:String,
      required:true
    },
    price:{
      type: Number,
      required:true,
    },
  discount:{
      type: Number,
      required:true,
    },

    categoryId:{
      type:Number,
      required:true
    }
  })

  const orderSchema = new Schema(
    
    {  products: [productSchema],

      totalPrice:{
        type:Number,
      },

      quantity:{
        type:Number,
        required:true,
      },
    tax:{
      type:Number,
      required:true
    }
       },
    { timestamps: true }
  );

  export const OrderSchemaModel = mongoose.model("Order", orderSchema);
