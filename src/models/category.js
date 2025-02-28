

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
         isDelete  :{
          type : Boolean,
          default: false,
        } ,
        categoryImage: {
        type:String ,
}
      },
      { timestamps: true }
    );

    export const CategorySchemaModel = mongoose.model("Category", categorySchema);
