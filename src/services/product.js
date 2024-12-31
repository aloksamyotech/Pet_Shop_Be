import { ProductSchemaModel } from "../models/product.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const productData = async (req) => {
 
  const { productName, type, price, discount } = req?.body;

    if (!productName || !type || !price || !discount) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const productSchema = await ProductSchemaModel.create({
      productName,
      type,
      price,
      discount,
    });

    return productSchema; 
   
    
    
  
};



export const getProductData = async () => {
    
      const products = await ProductSchemaModel.find();
  
      if (!products || products.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound || "No products found.",
          errorCodes?.not_Found || "NOT_FOUND"
        );
      }
  
      return products;
    
  };


  export const updateProductData  = async (req) =>{

   
       const {productId , productName, type, price,discount} = req?.body;
       if(!productId || (!productName && !type && !price && !discount)){

        throw new CustomError(
            statusCodes?.badRequest,
            error.message || "invalidInput",
            errorCodes?.server_error || "invalid_input"
        )

       }
    const product = await ProductSchemaModel.findById(productId);

      if(!product){
        throw new CustomError(
            statusCodes?.notFound,
            error.message || "Product not found",
            errorCodes?.server_error || "NOT_FOUND")
           }

      product.productName = productName || product.productName;
       product.type = type || product.type;
       product.price = price || product.price;
       product.discount = discount || product.discount;

         const  updateProduct = await product.save();
        return updateProduct;


  }
  
  export const deleteProductData =  async (req) =>{
   const {productId} = req.params;    
    
   if(!productId){

            throw new CustomError(
                statusCodes?.badRequest,
                "Product ID is required for deletion.",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }
       const product = await ProductSchemaModel.findByIdAndDelete(productId);

        if(!product){
            throw new CustomError(
                statusCodes?.notFound,
                "Product not found",
                errorCodes?.notFound
            )
        }

     return product;
    

  } 