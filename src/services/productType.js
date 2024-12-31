import { ProductTypeSchemaModel } from "../models/productType.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const productData = async (req) => {
    const { name, description} = req?.body;

    if (!name || !description) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput || "Invalid input.",
        errorCodes?.invalid_input
      );
    }
   const productTypeSchema = await ProductTypeSchemaModel.create({
        name,description 
    });

    return productTypeSchema; 
  };



export const getProductData = async () => {
   
      const products = await ProductTypeSchemaModel.find();
  
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

   
       const {productId,personName,productType,quantity,companyName,description} = req?.body;
       if(!productId || (!personName && !productType && !quantity && !companyName && !description)){

        throw new CustomError(
            statusCodes?.badRequest,
            error.message || "invalidInput",
            errorCodes?.server_error || "invalid_input"
        )

       }
    const product = await ProductTypeSchemaModel.findById(productId);



       if(!product){
        throw new CustomError(
            statusCodes?.notFound,
            error.message || "Product not found",
            errorCodes?.server_error || "NOT_FOUND")
           }
      product.name = name || product.name;
      product.description = description || product.description;
      
      const  updateProduct = await product.save();

       return updateProduct;
       }
  
  export const deleteProductData =  async (req,res, next) =>{

   

        const {productId} = req.params;    
        if(!productId){

            throw new CustomError(
                statusCodes?.badRequest,
                "Product ID is required for deletion.",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }


        const product = await ProductTypeSchemaModel.findByIdAndDelete(productId);

        if(!product){
            throw new CustomError(
                statusCodes?.notFound,
                "Product not found",
                errorCodes?.notFound
            )
        }
 return product;
    
  } 