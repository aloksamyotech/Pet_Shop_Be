import mongoose, { Schema } from "mongoose";

const InvoiceSchema = new Schema(
  {
    invoiceId: {
      type: String,
      unique: true,
      
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "customers",
      required: true,
    },
  },
  { timestamps: true }
);

// Pre-save middleware to generate invoiceId
InvoiceSchema.pre("save", async function (next) {
  if (!this.invoiceId) {
    const lastInvoice = await mongoose
      .model("Invoice")
      .findOne({}, {}, { sort: { createdAt: -1 } });

    let nextInvoiceNumber = 1;

    if (lastInvoice && lastInvoice.invoiceId) {
      const lastNumber = parseInt(lastInvoice.invoiceId.split("-")[1], 10);
      if (!isNaN(lastNumber)) {
        nextInvoiceNumber = lastNumber + 1;
      }
    }

    this.invoiceId = `INV-${nextInvoiceNumber.toString().padStart(6, "0")}`;
  }
  next();
});

export const InvoiceSchemaModel = mongoose.model("Invoice", InvoiceSchema);
