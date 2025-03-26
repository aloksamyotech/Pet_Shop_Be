import {ChatBotSchemaModel} from '../models/chatBot.js'
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const chatBotData = async (req) =>{
const {name , message,proMessage} = req?.body;
if( !name && !message && !proMessage) 
{
    throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
}

const ChatData = await ChatBotSchemaModel.create({name, message,proMessage})
return ChatData
}



export const chatBotGetData = async (req) =>{

    const  ChatData = await ChatBotSchemaModel.find();
    return ChatData;

}