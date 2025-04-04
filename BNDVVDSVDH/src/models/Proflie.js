 import mongoose, { Schema } from "mongoose";

    const profileSchema = new Schema(
      {
        name: {
          type: String,
          required: true,
          default: "AbCD",
          trim: true,
        },
        
        email: {
          type: String,
          default:"AbCD@gmail.com",
          required: true,
        },
        
        

 },
      { timestamps: true }
    );

    export const ProfileSchemaModel = mongoose.model("Profile", profileSchema);
