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
    originalPrice:
      {
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
   categoryName: {
      type: String,
      trim: true,
    },

    isDelete  :{
      type : Boolean,
      default: false,
    } ,
    
   image :{
      type: String
      },
      quantity:{
        type: Number,
        default:0
      }

    
  },
{ timestamps: true },
);

export const ProductSchemaModel = mongoose.model("Product", productSchema);
