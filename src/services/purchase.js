import { PurchaseSchemaModel } from "../models/purchase.js";
import { errorCodes, Message, statusCodes,image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { ProductSchemaModel } from "../models/product.js";

export const purchaseData = async (req) => {
 const { productId , totalPrice,discount,quantity,paymentStatus,companyId,price } = req?.body;
    if (!productId || !totalPrice || !discount || !quantity || !paymentStatus || !companyId || !price) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }
        const product = await ProductSchemaModel.findById(productId);
       product.quantity = product.quantity + quantity; 
       await product.save();

    const purchaseSchema = await PurchaseSchemaModel.create({
      productId , totalPrice,discount,quantity,paymentStatus,companyId,price,
      isDelete: false,   
      PurchaseImage: req.file ? req.file.path :null,
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
                 $addFields: {
                   imageUrl: {
                     $ifNull: [{ $concat: [image_url.url, "$PurchaseImage"] }, ""],
                   },
                 },
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

  export const updatePurchaseData = async (req) => {
    const { productName, type, totalPrice, discount, quantity, paymentStatus, price, productId } = req?.body;
    const { id } = req?.params;
 
    if (!productName && !type && !totalPrice && !discount && !quantity && !paymentStatus && !price && !productId) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.badRequest
      );
    }
  
    const purchase = await PurchaseSchemaModel.findById(id);
    if (!purchase) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound,
        errorCodes?.server_error
      );
    }
  
   
    const product = await ProductSchemaModel.findById(productId);
    if (!product) {
      throw new CustomError(
        statusCodes?.notFound,
        Message?.productNotFound,
        errorCodes?.server_error
      );
    }
  const quantityDifference = quantity - purchase.quantity;
     product.quantity = product.quantity + quantityDifference;
    await product.save();

    purchase.productName = productName || purchase.productName;
    purchase.type = type || purchase.type;
    purchase.totalPrice = totalPrice || purchase.totalPrice;
    purchase.discount = discount || purchase.discount;
    purchase.quantity = quantity || purchase.quantity;
    purchase.paymentStatus = paymentStatus || purchase.paymentStatus;
    purchase.price = price || purchase.price;
    purchase.PurchaseImage = req.file ? req.file.path : purchase.PurchaseImage;
  
    const updatedPurchase = await purchase.save();
    
  
    return updatedPurchase;
  };
  
  
  
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
     