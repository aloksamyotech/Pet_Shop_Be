

  import mongoose, { Schema } from "mongoose";

  const orderSchema = new Schema(
    {
      customerName: {
        type: String,
        required: true,
        trim: true,
      },
      
      productName: {
        type: String,
        required: true,
      },
      totalPrice:{
        type:String,
        default: "active",
      },
      paymentStatus:{
        type: String,
        enum: ["online","offline"],
        required: true,
      }
     },
    { timestamps: true }
  );

  export const OrderSchemaModel = mongoose.model("Order", orderSchema);
