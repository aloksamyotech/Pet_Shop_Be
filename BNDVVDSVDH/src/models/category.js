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
         
        },
         isDelete  :{
          type : Boolean,
          default: false,
        } , 
        categoryImage: {
        type:String ,
},
   SubcategoryId:{
         type: mongoose.Schema.Types.ObjectId,
           ref :'SubCategory'
        },
      },
      { timestamps: true }
    );

    export const CategorySchemaModel = mongoose.model("Category", categorySchema);
