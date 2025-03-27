import { ProductSchemaModel } from "../models/product.js";
import { errorCodes, Message, statusCodes, image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import {CategorySchemaModel} from "../models/category.js"

export const productData = async (req) => {
  const { productName, price, discount, categoryId,SubCategoryId } = req?.body;
if (!productName || !price || discount === undefined || !categoryId || !SubCategoryId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  const finalPrice = Math.max(0, price - discount);

  
  const productSchema = await ProductSchemaModel.create({
    productName,
    originalPrice: price, 
    price: finalPrice, 
    discount,
    categoryId,
    isDelete: false,
    SubCategoryId,
    image: req.file ? req.file.path : null,
  });

  return productSchema;
};




export const getTotalProducts = async () => {
  const totalProducts = await ProductSchemaModel.countDocuments({ isDelete: false });
  return totalProducts;
};


export const getProductData = async (sortPrice) => {
  const condition_obj = { isDelete: false };

  let sortByPrice = { createdAt: -1 }; 

  if (sortPrice === "High to Low") {
    sortByPrice = { price: -1 }; 
  } else if (sortPrice === "Low to High") {
    sortByPrice = { price: 1 };
  }


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
      $lookup: {
        from: "subcategories",
        localField: "SubCategoryId",
        foreignField: "_id",
        as: "SubCategory"
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
      $sort :sortByPrice
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
  const { productName, type, price, discount, categoryId ,categoryName,SubCategoryId} = req?.body; 
  const { id } = req.params;
 
  if (!productName && !type && !price && !discount && !categoryId && !categoryName && !SubCategoryId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.inValid,
      errorCodes?.server_error
    );
  }
const product = await ProductSchemaModel.findById(id);

  if (!product) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.server_error
    );
  }


  product.productName = productName || product.productName;
  product.type = type || product.type;
  product.price = price || product.price;
  product.discount = discount || product.discount;
  product.categoryName = categoryName || product.categoryName;
  product.SubCategoryId = SubCategoryId || product.SubCategoryId;
  product.image =req.file ? req.file.path : product.image;
  
 
  if (categoryId) {
     const categoryExists = await CategorySchemaModel.findById(categoryId);
    if (!categoryExists) {
      throw new CustomError(
        statusCodes?.notFound,
       errorCodes?.not_Found
      );
    }
    product.categoryId = categoryId;

  }

  const updatedProduct = await product.save();

  if (!updatedProduct) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_Found
    );
  }

  return updatedProduct;
};


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