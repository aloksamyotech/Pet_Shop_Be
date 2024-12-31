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
      gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
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
      dateOfBirth: {
        type: Date,
        required: true,
       
      },
      customerType: {
        type: String,
        enum: ["regular", "Premium", "Business"],
        default: "Regular",
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
