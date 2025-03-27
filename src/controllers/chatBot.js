import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { chatBotData ,chatBotGetData } from "../services/chatBot.js";

const ChatBot = async( req,res) =>{

    const DataChatBot = await chatBotData(req);
     res.status(statusCodes?.created).json({ 
          success: true,
          data : DataChatBot,
        });

}

const ChatBotGet = async (req,res) =>{
    const DataChatBot = await chatBotGetData(req);
    res.status(statusCodes?.created).json({ 
        success: true,
        data : DataChatBot,
      });

}

export  default{ChatBot,ChatBotGet}