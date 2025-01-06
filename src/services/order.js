import { OrderSchemaModel } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const orderData = async (req) => {
  
    const { customerName,productName,totalPrice,paymentStatus} = req?.body;

    if (!customerName ||! productName|| !totalPrice|| !paymentStatus) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const orderSchema = await OrderSchemaModel.create({
        customerName,productName,totalPrice,paymentStatus
    });
    
    return orderSchema; 
 
};



export const getOrderData = async () => {
   
      const order = await OrderSchemaModel.find();
  
      if (!order || order.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound || "No products found.",
          errorCodes?.not_Found || "NOT_FOUND"
        );
      }
  
      return order;
   
  };


  



  export const updateOrderData  = async (req) =>{

    
       const {orderId,customerName,productName,totalPrice,paymentStatus} = req?.body;
       if(!orderId || (!customerName && !productName && !totalPrice && !paymentStatus)){

        throw new CustomError(
            statusCodes?.badRequest,
            error.message || "invalidInput",
            errorCodes?.server_error || "invalid_input"
        )

       }
    const order = await OrderSchemaModel.findById(orderId);



       if(!order){
        throw new CustomError(
            statusCodes?.notFound,
            error.message || "Product not found",
            errorCodes?.server_error || "NOT_FOUND")

       }


       order.customerName = customerName || order.customerName;
       order.productName = productName || order.productName;
       order.totalPrice = totalPrice || order.totalPrice;
       order.paymentStatus= paymentStatus || order.paymentStatus;
       


       const  updateOrder= await order.save();

       return updateOrder;


  }

  export const deleteOderData =  async (req,res, next) =>{

        const {orderId} = req.params;    

        if(!orderId){

            throw new CustomError(
                statusCodes?.badRequest,
                "company ID is required for deletion.",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }


        const order = await OrderSchemaModel.findByIdAndDelete(orderId);

        if(!order){
            throw new CustomError(
                statusCodes?.notFound,
                "Company not found",
                errorCodes?.notFound
            )
        }

     return order;
   
  } 