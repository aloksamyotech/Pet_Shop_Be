  import mongoose, { Schema } from "mongoose";

  const InvoiceSchema = new Schema(
    {
      orderId:{
           type: mongoose.Schema.Types.ObjectId,
           ref :'Order',  
           required:true
         },

         customerId:{
            type: mongoose.Schema.Types.ObjectId,
            ref :'customers',  
            required:true

         }
      },
    { timestamps: true }
  );
  
      
   

  export const InvoiceSchemaModel = mongoose.model("Invoice", InvoiceSchema);
