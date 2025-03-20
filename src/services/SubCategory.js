import { SubCategorySchemaModel } from "../models/SubCategory.js";
import { errorCodes, Message, statusCodes ,image_url} from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import {CategorySchemaModel} from "../models/category.js"


export const categoryData = async (req) => {
  const { name, description ,categoryId,categoryName} = req?.body;
  if (!name || !description || !categoryId ||!categoryName) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

 
  const  exitCategory = await SubCategorySchemaModel.findOne({name});
  if(exitCategory){
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.alreadyExist )
  }
   const categorySchema = await SubCategorySchemaModel.create({
    name, description,categoryId,categoryName,
isDelete: false,
  });
  return categorySchema;
};

export const getCategoryData = async () => {
  const condition_obj = { isDelete: false };
   const category = await SubCategorySchemaModel.aggregate([
    { $match: condition_obj},
      
      
      {
        $sort:{
          createdAt : -1,
        }
       }
        
        ])
  ;
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
  const { name, description,categoryId } = req.body;
    const { id } = req.params;
 

  if (!name && !description && !categoryId) {
    throw new CustomError(
      statusCodes?.badRequest,
     Message?.notFound,
      errorCodes?.server_error ,
  )
  }

  const category = await SubCategorySchemaModel.findById(id);
  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  category.name = name || category.name;
  category.description = description || category.description;
  category.categoryId = categoryId || category.categoryId;

  const updatedCategory = await category.save();

  if (!updatedCategory) {
    throw new CustomError(
      statusCodes?.internalServerError,
      Message?.updateFailed,
      errorCodes?.internal_server_error,
    );
  }

  return updatedCategory;
};


export const deleteCategoryData = async (req) => {
  const { id } = req?.params;
  if (!id) {
    throw new CustomError(statusCodes?.badRequest, errorCodes?.not_found);
  }
  const category = await SubCategorySchemaModel.findByIdAndUpdate(
    id,
    { isDelete: true },
   );

  if (!category) {
    throw new CustomError(statusCodes?.notFound, errorCodes?.notFound);
  }
  return category;
};





