import { ProductSchemaModel } from "../models/product.js";
import { errorCodes, Message, statusCodes, image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const productData = async (req) => {

  const { productName, price, discount ,categoryId,quantity} = req?.body;

  if (!productName || !price || !discount ||!categoryId  ||!quantity) {

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
    categoryId,
    isDelete: false,
    quantity,
    image: req.file ? req.file.path : null,
  });


 
  return productSchema;
};


export const getTotalProducts = async () => {
  const totalProducts = await ProductSchemaModel.countDocuments({ isDelete: false });
  return totalProducts;
};


export const getProductData = async () => {
  const condition_obj = { isDelete: false };
 const products = await ProductSchemaModel.aggregate([
  { $match: condition_obj},
    {
      $lookup: {
        from: "categories",
        localField: "categoryId",
        foreignField: "_id",
        as: "category"
      } 
    },
    {
      $addFields: {
        imageUrl: {
          $ifNull: [{ $concat: [image_url.url, "$image"] }, ""],
        },
      },
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


  const { productName, type, price, discount } = req?.body;
  const { id } = req.params;

  if (productName && !type && !price && !discount) {
  throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.server_error 
    )

  }
  const product = await ProductSchemaModel.findById(id);

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
  const {id} = req?.params;

  if (! id) {

    throw new CustomError(
      statusCodes?.badRequest,
     errorCodes?.invalid_input,
     Message?.notFound
    );
  }
  const product = await ProductSchemaModel.findByIdAndUpdate( id,
    { isDelete: true },);

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