import { PurchaseSchemaModel } from "../models/purchase.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const purchaseData = async (req) => {
 
    const { productName , type, totalPrice,discount,quantity,paymentStatus } = req?.body;

    if (!productName|| !type || !totalPrice || !discount || !quantity || !paymentStatus) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const purchaseSchema = await PurchaseSchemaModel.create({
      productName , type, totalPrice,discount,quantity,paymentStatus
    });
    
    return purchaseSchema; 
 
};



export const getPurchaseData = async () => {
    
      const purchase = await PurchaseSchemaModel.find();
  
      if (!purchase || purchase.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound ,
          errorCodes?.not_Found 
        );
      }
  
      return purchase;
    
  };


  export const updatePurchaseData  = async (req) =>{

    
       const {purchaseId , productName , type, totalPrice,discount,quantity,paymentStatus} = req?.body;
       if(!purchaseId || (!productName && !type && !totalPrice && !discount  && !quantity && !paymentStatus)){

        throw new CustomError(
            statusCodes?.badRequest,
            Message?.notFound || "invalidInput",
            errorCodes?.server_error || "invalid_input"
        )

       }
    const purchase = await PurchaseSchemaModel.findById(purchaseId);



       if(!purchase){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound || "invalidInput",
            errorCodes?.server_error || "NOT_FOUND")

       }


        purchase.productName = productName || purchase.productName;
       purchase.type = type || purchase.type;
       purchase.totalPrice = totalPrice || purchase.totalPrice;
       purchase.discount = discount || purchase.discount;
       purchase.quantity = quantity || purchase.quantity;
       purchase.paymentStatus = paymentStatus || purchase.paymentStatus;



       const  updatePurchase = await purchase.save();

       return updatePurchase;


   
  }
  
  export const deletePurchaseData =  async (req) =>{
        const {purchaseId} = req.params;    

        if(!purchaseId){

            throw new CustomError(
                statusCodes?.badRequest,
                Message?.notFound || "invalidInput",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }


        const purchase = await PurchaseSchemaModel.findByIdAndDelete(purchaseId);

        if(!purchase){
            throw new CustomError(
                statusCodes?.notFound,
                Message?.notFound || "invalidInput",
                Message?.notFound || "invalidInput",
            )
        }

     return purchase;
    }
     