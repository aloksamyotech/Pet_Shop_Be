

    import mongoose, { Schema } from "mongoose";

    const categorySchema = new Schema(
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        
        description: {
          type: String,
          required: true,
        },
        active :{
          type:String,
          enum: ["active", "inactive", "blocked"],
          default: "active",
        }
      },
      { timestamps: true }
    );

    export const CategorySchemaModel = mongoose.model("Category", categorySchema);
