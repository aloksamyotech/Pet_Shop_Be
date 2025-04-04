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
  price: {
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
    orderId: {
      type: String,
      unique: true,
      
    },
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
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
    },
    customerPhone: {
      type: Number,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


orderSchema.pre("save", async function (next) {
  if (!this.orderId) {
    try {
      const lastOrder = await mongoose
        .model("Order")
        .findOne({}, {}, { sort: { createdAt: -1 } });

      let nextOrderNumber = 1;
      if (lastOrder && lastOrder.orderId) {
        const lastNumber = parseInt(lastOrder.orderId.split("-")[1], 10);
        if (!isNaN(lastNumber)) {
          nextOrderNumber = lastNumber + 1;
        }
      }

      this.orderId = `ORD-${nextOrderNumber.toString().padStart(6, "0")}`;
      next();
    } catch (error) {
      next(error);
    }
  } else {
    next();
  }
});


export const OrderSchemaModel = mongoose.model("Order", orderSchema);
