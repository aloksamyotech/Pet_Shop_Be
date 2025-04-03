import mongoose,{Schema} from "mongoose";
const  chatBotSchema = new Schema({
name : {  type: String,
    required: true
  },
  message:{
    type: String ,
    required:true
  } ,
  proMessage:{
    type: String,
    required:true
}
},{timestamps:true})
export const ChatBotSchemaModel = mongoose.model("chatBot" , chatBotSchema)
