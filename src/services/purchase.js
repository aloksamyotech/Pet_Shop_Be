import { PurchaseSchemaModel } from "../models/purchase.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { ProductSchemaModel } from "../models/product.js";

export const purchaseData = async (req) => {
 
    const { productId , totalPrice,discount,quantity,paymentStatus } = req?.body;

    console.log(req?.body)

   
    if (!productId|| !totalPrice || !discount || !quantity || !paymentStatus) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const purchaseSchema = await PurchaseSchemaModel.create({
      productId , totalPrice,discount,quantity,paymentStatus
    });
    
    
    return purchaseSchema; 
 
};



export const getPurchaseData = async () => {
    
      const purchase = await PurchaseSchemaModel.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productName"
          } ,
         },

         {
          $sort:{
            createdAt : -1,
          }
         }
        
        ]
      );
  
      if (!purchase) {
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
            Message?.notFound,
            errorCodes?.server_error ,
        )

       }
    const purchase = await PurchaseSchemaModel.findById(purchaseId);



       if(!purchase){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.server_error,
          )

       }

      
        purchase.productName = productName || purchase.productName;
       purchase.type = type || purchase.type;
       purchase.totalPrice = totalPrice || purchase.totalPrice;
       purchase.discount = discount || purchase.discount;
       purchase.quantity = quantity || purchase.quantity;
       purchase.paymentStatus = paymentStatus || purchase.paymentStatus;



       const  updatePurchase = await purchase.save();

       if(!updatePurchase){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.server_error,
          )

       }

       return updatePurchase;


   
  }
  
  export const deletePurchaseData =  async (req) =>{
        const {purchaseId} = req.params;    

        if(!purchaseId){

            throw new CustomError(
                statusCodes?.badRequest,
                Message?.notFound ,
                errorCodes?.invalid_input ,
              );
        }


        const purchase = await PurchaseSchemaModel.findByIdAndDelete(purchaseId);

        if(!purchase){
            throw new CustomError(
                statusCodes?.notFound,
                Message?.notFound ,
                Message?.notFound ,
            )
        }

     return purchase;
    }
     