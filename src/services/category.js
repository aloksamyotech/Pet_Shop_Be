import { CategorySchemaModel } from "../models/category.js";
import { errorCodes, Message, statusCodes ,image_url} from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const categoryData = async (req) => {


  console.log("9999999",req.file)
  const { name, description } = req?.body;


  if (!name || !description) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  const categorySchema = await CategorySchemaModel.create({
    name, description,
    categoryImage : req.file ? req.file.path : null
  });
  return categorySchema;

};



export const getCategoryData = async () => {

  const category = await CategorySchemaModel.aggregate([
     {
          $addFields: {
            imageUrl: {
              $ifNull: [{ $concat: [image_url.url, "$categoryImage"] }, ""],
            },
          },
        },
        {
          $sort:{
            createdAt : -1,
          }
         }
  ])


  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }

  return category;

};


export const updateCategoryData = async (req) => {
  const { name, description, categoryId, active } = req?.body
  if (!categoryId || !name || !description || !active) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.incorrect_payload,
      errorCodes?.bad_request,
    )
  }
  const category = await CategorySchemaModel.findById(categoryId);

  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    )
  }

  category.name = name || category.name;
  category.active = active || category.active;
  category.description = description || category.description;

  const updateCategory = await category.save();

  if (!updateCategory) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    )
  }
  return updateCategory;
}

export const deleteCategoryData = async (req, res, next) => {

  const { categoryId } = req.params;

  if (!categoryId) {
    throw new CustomError(
      statusCodes?.badRequest,
      errorCodes?.not_found,
    );
  }


  const category = await CategorySchemaModel.findByIdAndDelete(categoryId);


  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      errorCodes?.notFound
    )
  }

  return category;

} 

export const categoryBulk = async (req) => {

  const categories = req.body;
 

  if (!Array.isArray(categories)) {
        throw new CustomError(
            statusCodes?.badRequest,
            Message?.invalidInput,
            errorCodes?.invalid_input
        )
    }

    
    const result = await CategorySchemaModel.insertMany(categories)
    
    return result;



}