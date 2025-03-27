import mongoose , {Schema} from "mongoose";
const  ChatSchema = new Schema({

 user_id: {  type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
  ,
  
  cover_id: {  type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'cover'
  }
  ,
  chat_bot_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'chatBot'
  }
  ,
 userMessage:{
    type: String,
    default: ""
 },
 AImessage:{
    type:String,
    default:''
 }

},{timestamps:true})

export const ChatSchemaModel = mongoose.model("chat" , ChatSchema)
