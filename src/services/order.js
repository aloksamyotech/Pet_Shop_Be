import { OrderSchemaModel } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const orderData = async (req) => {
  
    const products= req?.body;
    console.log("data----------", products)

    if (! Array.isArray(products))  {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

     const orderSchema = await OrderSchemaModel.insertMany(products);
    
    return orderSchema; 
 
};



export const getOrderData = async () => {
   
      const order = await OrderSchemaModel.find();
  
      if (!order) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound ,
          errorCodes?.not_Found ,
        );
      }
  
      return order;
   
  };


  



  export const updateOrderData  = async (req) =>{

    
       const {orderId,customerName,productName,totalPrice,paymentStatus} = req?.body;
       if(!orderId || (!customerName && !productName && !totalPrice && !paymentStatus)){

        throw new CustomError(
            statusCodes?.badRequest,
            Message?.notFound ,
            errorCodes?.server_error,
        )

       }
    const order = await OrderSchemaModel.findById(orderId);



       if(!order){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.server_error 
          )

       }


       order.customerName = customerName || order.customerName;
       order.productName = productName || order.productName;
       order.totalPrice = totalPrice || order.totalPrice;
       order.paymentStatus= paymentStatus || order.paymentStatus;
       


       const  updateOrder= await order.save();

       if(!updateOrder){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.server_error 
          )

       }

       return updateOrder;


  }

  export const deleteOderData =  async (req,res, next) =>{

        const {orderId} = req.params;    

        if(!orderId){

            throw new CustomError(
                statusCodes?.badRequest,
                Message?.notFound ,
              );
        }


        const order = await OrderSchemaModel.findByIdAndDelete(orderId);

        if(!order){
            throw new CustomError(
                statusCodes?.notFound,
              errorCodes?.notFound
            )
        }

     return order;
   
  } 