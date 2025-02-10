import mongoose, { Schema } from "mongoose";


const productOrderSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", 
    required: true,
  },
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  productPrice: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true, 
  }
});

const orderSchema = new Schema(
  {
    products: [productOrderSchema], 
    
    totalAmount: {
      type: Number,
      default: 0, 
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", 
      required: true,
    },
    customerName :{
      type: String ,
      required: true,

},

customerEmail:{
  type : String,
},
customerPhone :{
  type :Number,
}
    
  },
  { timestamps: true }
);



export const OrderSchemaModel = mongoose.model("Order", orderSchema);
