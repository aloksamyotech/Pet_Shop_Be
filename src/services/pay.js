import { InvoiceSchemaModel } from "../models/pay.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const invoiceData = async (req) => {
   const {name,price,quantity,total,invoiceNumber} = req?.body;
   console.log("req..........",req.body)

   if(!name || !price ||!quantity || !total || !invoiceNumber){
    throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );

   }
const InvoiceSchema=  await InvoiceSchemaModel.create({name,price,quantity,total,invoiceNumber});

return InvoiceSchema;
  };

  export default  invoiceData;