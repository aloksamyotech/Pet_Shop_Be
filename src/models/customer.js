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
        enum: ["male", "female", "other"],
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
        enum: ["regular", "premium", "business"],
        default: "Regular",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active",
      },
    },
    { timestamps: true }
  );
  
      
   

  export const CustomerSchemaModel = mongoose.model("Customer", customerSchema);
