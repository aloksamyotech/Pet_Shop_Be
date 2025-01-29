  import mongoose, { Schema } from "mongoose";

  const customerSchema = new Schema(
    {
      firstName: {
        type: String,
        required: true,
        trim: true,
      },
      lastName: {
        type: String,
        required: true,
        trim: true,
      },
   
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      phoneNumber: {
        type: Number,
        required: true,
      },
           
      status: {
        type: String,
        enum: ["Active", "Inactive", "Blocked"],
        default: "Active",
      },
    },
    { timestamps: true }
  );
  
      
   

  export const CustomerSchemaModel = mongoose.model("Customer", customerSchema);
