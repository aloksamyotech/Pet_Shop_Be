  import mongoose, { Schema } from "mongoose";

  const customerSchema = new Schema(
    {
      firstName: {
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
        default: null,
        trim: true,
      },
      phoneNumber: {
        type: Number,
        default: null
      },
           
      status: {
        type: String,
        enum: ["Active", "Inactive", "Blocked"],
        default: "Active",
      },
      isDelete  :{
        type : Boolean,
        default: false,
      } ,
    
    },
    { timestamps: true }
  );
  
      
   

  export const CustomerSchemaModel = mongoose.model("Customer", customerSchema);
