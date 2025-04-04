import mongoose, { Schema } from "mongoose";

    const SubCategorySchema = new Schema(
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        description: {
          type: String,
         
        },
         isDelete  :{
          type : Boolean,
          default: false,
        } , 
        categoryId:{
         type: mongoose.Schema.Types.ObjectId,
           ref :'Category',  
          required:true
        },
        categoryName: {
            type: String,
            trim: true,
          },
       
      },
      { timestamps: true }
    );

    export const SubCategorySchemaModel = mongoose.model("SubCategory", SubCategorySchema);
