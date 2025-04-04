import { InvoiceSchemaModel } from "../models/invoice.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const invoiceData = async (req) => {
  const { orderId, customerId } = req?.body;
if (!orderId || !customerId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }
  const invoice = await InvoiceSchemaModel.create({ orderId, customerId });
return invoice;
};



export const getInvoiceData = async () => {
    const products = await InvoiceSchemaModel.aggregate([
       {
         $lookup: {
           from: "orders",
           localField: "orderId",
           foreignField: "_id",
           as: "order"
         } 
       },

       {
        $lookup: {
          from: "customers",
          localField: "customerId",
          foreignField: "_id",
          as: "customer"
        } 
      },
   
   
       {
         $sort:{
           createdAt : -1,
         }
        }
         
         ])
   
     if (!products) {
       throw new CustomError(
         statusCodes?.notFound,
         Message?.notFound ,
         errorCodes?.not_Found 
       );
     }
  return products;
   };