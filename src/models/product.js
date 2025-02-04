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
    },

    isDelete  :{
      type : Boolean,
      default: false,
    } ,
    quantity:{
      type : String,
      default :0,
    },
   image :{
      type: String
      }
 },
{ timestamps: true },
);

export const ProductSchemaModel = mongoose.model("Product", productSchema);
