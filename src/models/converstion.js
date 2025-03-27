import mongoose , {Schema} from "mongoose";
const  converSchema = new Schema({

 user_id: {  type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'User'
  }
  ,
  chat_bot_id:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref:'chatBot'
  }
  ,
  lastMessage:{
    type: String,
    default:''
}


},{timestamps:true})

export const CoverSchemaModel = mongoose.model("cover" , converSchema)
