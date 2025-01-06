  import mongoose, { Schema } from "mongoose";

  const companySchema = new Schema(
    {
      companyName: {
        type: String,
        required: true,
        trim: true,
      },
      address: {
        type: String,
        required: true,
        trim: true,
      },
      description: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
     
      phoneNumber: {
        type: Number,
        required: true,
      },
      
      companyType: {
        type: String,
        enum: ["regular", "premium", "business"],
        default: "regular",
      },
      status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "active",
      },
    },
    { timestamps: true }
  );
  
      
   

  export const CompanySchemaModel = mongoose.model("Company", companySchema);
