import { ProductSchemaModel } from "../models/product.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const productData = async (req) => {
  try {
    const { productName, type, price, discount } = req?.body;

    if (!productName || !type || !price || !discount) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput || "Invalid input.",
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
  } catch (error) {
    throw new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error creating product.",
      errorCodes?.server_error
    );
  }
};



export const getProductData = async () => {
    try {
      const products = await ProductSchemaModel.find();
  
      if (!products || products.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound || "No products found.",
          errorCodes?.not_Found || "NOT_FOUND"
        );
      }
  
      return products;
    } catch (error) {
      throw new CustomError(
        statusCodes?.internalServerError,
        error.message || "Error fetching products.",
        errorCodes?.server_error || "SERVER_ERROR"
      );
    }
  };


  export const updateProductData  = async (req) =>{

    try{
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

    catch(error){
        throw new CustomError(
            statusCodes?.internalServerError,
            error.message || "Error updating product.",
            errorCodes?.server_error || "SERVER_ERROR"
          );
    }
  }
  
  export const deleteProductData =  async (req,res, next) =>{

    try{

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

    catch(error){
        throw new CustomError(
            statusCodes?.internalServerError,
            error.message || "Error deleting  product.",
            errorCodes?.server_error || "SERVER_ERROR"
          );

    }
  } 