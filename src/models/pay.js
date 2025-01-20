import mongoose from "mongoose";
const invoiceSchema = new mongoose.Schema({
invoiceNumber :'String',
items:[
    {
        name :String,
        quantity:Number,
        price:Number,
        total:Number
    }
]



})

export const InvoiceSchemaModel = mongoose.model('Invoice',invoiceSchema);

