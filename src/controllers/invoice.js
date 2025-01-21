import {getInvoiceData,invoiceData} from "../services/invoice.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";




const invoice= async (req, res) => {
 
    const data = await invoiceData(req); 
 res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });

  };


const invoiceGet = async (req, res, next) => {
  const product= await getInvoiceData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.FetchSuccessfully,
      data: product,
    });
};

export default {invoiceGet,invoice}