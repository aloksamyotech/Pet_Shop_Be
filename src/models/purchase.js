import mongoose, { Schema } from "mongoose";

const purchaseSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      
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
        enum: ["Pending", "Completed", "Failed"],
        default: "Pending",
      },
  },    
  { timestamps: true },
);

export const PurchaseSchemaModel = mongoose.model("Purchase", purchaseSchema);
