import { PurchaseSchemaModel } from "../models/purchase.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { ProductSchemaModel } from "../models/product.js";

export const purchaseData = async (req) => {
  const { productId, totalPrice, discount, quantity, paymentStatus, companyId } = req?.body;

  if (!productId || !totalPrice || !discount || !quantity || !paymentStatus || !companyId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  const product = await ProductSchemaModel.findById(productId);

  if (!product) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.productNotFound,
      errorCodes?.not_found
    );
  }

  console.log("datajjjjjjjjjjjjjjjjj",product)
 
  product.quantity =  product.quantity + quantity;
  await product.save();

 
  const purchaseSchema = await PurchaseSchemaModel.create({
    productId,
    totalPrice,
    discount,
    quantity,
    paymentStatus,
    companyId,
    isDelete: false,
  });

  return purchaseSchema;
};




export const getPurchaseData = async () => {
    
  const condition_obj = { isDelete: false };
      const purchase = await PurchaseSchemaModel.aggregate([
        { $match: condition_obj},
        {
          $lookup: {
            from: "products",
            localField: "productId",
            foreignField: "_id",
            as: "productName"
          } ,
         },
         {
          $lookup: {
            from: "companies",
            localField: "companyId",
            foreignField: "_id",
            as: "CompanyName"
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

    
       const {productName , type, totalPrice,discount,quantity,paymentStatus} = req?.body;
       const { id } = req?.params;
       if( !productName && !type && !totalPrice && !discount  && !quantity && !paymentStatus){

        throw new CustomError(
            statusCodes?.badRequest,
            Message?.notFound,
            errorCodes?.server_error ,
        )

       }
    const purchase = await PurchaseSchemaModel.findById(id);



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
    const { id } = req?.params;  

        if(! id){

            throw new CustomError(
                statusCodes?.badRequest,
                Message?.notFound ,
                errorCodes?.invalid_input ,
              );
        }


        const purchase = await PurchaseSchemaModel.findByIdAndUpdate(id,
          { isDelete: true },);

        if(!purchase){
            throw new CustomError(
                statusCodes?.notFound,
                Message?.notFound ,
                Message?.notFound ,
            )
        }

     return purchase;
    }
     