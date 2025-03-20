import mongoose, { Schema } from "mongoose";
const EmploySchema = new Schema({

    name:{
    type:String,
    required :true
}
,
email:{
    type:String,
    required:true,
    unique: true
},
phoneNumber :{
    type:Number,
    required:true,
},
EId :{
    type:Number,
    required:true,
}
,
salary :{
    type:Number,
    required:true
}
,address:{
    type:String,
    
},
isDelete  :{
    type : Boolean,
    default: false,
  } ,

    

},{timestamps:true})

export const EmploySchemaModel = mongoose.model("Employee",EmploySchema)