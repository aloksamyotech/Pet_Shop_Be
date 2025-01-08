import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    productId: {
     type: mongoose.Schema.Types.ObjectId,
          ref :'Product',  
          required:true
    },
   
   totalPrice: {
      type: Number,
      required: true,
     
    },
    discount: {
      type: Number,
      default:0
    },
    quantity: {
        type: Number,
        default:0
      },
      paymentStatus: {
        type: String,
        enum: ["pending", "completed", "failed"],
        default: "pending",
      },
  },    
  { timestamps: true },
);

export const PurchaseSchemaModel = mongoose.model("Purchase", purchaseSchema);
