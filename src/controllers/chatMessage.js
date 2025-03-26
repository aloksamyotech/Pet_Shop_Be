import { sendMessage } from "../services/chatMessage.js";
import { errorCodes, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const chatMessage = async (req, res) => {
    const DataChat = await sendMessage(req);
    res.status(statusCodes?.created).json({ 
        success: true,
        data : DataChat,
      });

};

export default { chatMessage };
