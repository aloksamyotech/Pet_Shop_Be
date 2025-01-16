import { ProductSchemaModel } from "../models/product.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const productData = async (req) => {

  const { productName, price, discount ,categoryId} = req?.body;

  if (!productName || !price || !discount ||!categoryId ) {

    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }


  const productSchema = await ProductSchemaModel.create({
    productName,
    price,
    discount,
    categoryId
    
  });


 
  return productSchema;
};

export const getProductData = async () => {
 const products = await ProductSchemaModel.aggregate([
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
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


export const updateProductData = async (req) => {


  const { productId, productName, type, price, discount } = req?.body;

  if (!productId || (!productName && !type && !price && !discount)) {
  throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.server_error 
    )

  }
  const product = await ProductSchemaModel.findById(productId);

  if (!product) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.server_error ,
    
    )
  }

  product.productName = productName || product.productName;
  product.type = type || product.type;
  product.price = price || product.price;
  product.discount = discount || product.discount;


  const updateProduct = await product.save();

  if (!updateProduct) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound ,
      errorCodes?.not_Found 
    );
  }
  return updateProduct;


}

export const deleteProductData = async (req) => {
  const { productId } = req.params;

  if (!productId) {

    throw new CustomError(
      statusCodes?.badRequest,
     errorCodes?.invalid_input,
     Message?.notFound
    );
  }
  const product = await ProductSchemaModel.findByIdAndDelete(productId);

  if (!product) {
    throw new CustomError(
      statusCodes?.notFound, 
      Message?.notFound,
      errorCodes?.notFound
    )
  }

  return product;


} 

export const productBulk = async (req) =>{

  const products = req?.body;
  
  if(! Array.isArray(products)){
    throw new CustomError(
      statusCodes?.notFound, 
      Message?.notFound,
      errorCodes?.notFound
      ) }

const result =  await ProductSchemaModel.insertMany(products);
return result;


}