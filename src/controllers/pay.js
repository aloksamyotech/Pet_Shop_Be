import invoiceData from "../services/pay.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const invoice = async (req, res) => {

  const data = await invoiceData(req);
  console.log("data...........",data)
  res.status(statusCodes?.created).json({
    success: true,
    message : Message.Successfully,
   data
  });

};

export default invoice;