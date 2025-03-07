 import mongoose, { Schema } from "mongoose";
 

    const logoSchema = new Schema(
      {
       
        logoImage: {
        type:String ,
        default:'uploads/cat.jpg'
}
      },
      { timestamps: true }
    );

    export const LogoSchemaModel = mongoose.model("Logo",logoSchema);
