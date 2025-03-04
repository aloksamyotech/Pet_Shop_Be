import { CategorySchemaModel } from "../models/category.js";
import { errorCodes, Message, statusCodes ,image_url} from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const categoryData = async (req) => {
  const { name, description } = req?.body;
  if (!name || !description) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

 
  const  exitCategory = await CategorySchemaModel.findOne({name});
  if(exitCategory){
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.alreadyExist )
  }
   const categorySchema = await CategorySchemaModel.create({
    name, description,
    categoryImage: req.file ? req.file.path :null,
    isDelete: false,
  });
  return categorySchema;
};

export const getCategoryData = async () => {
  const condition_obj = { isDelete: false };
   const category = await CategorySchemaModel.aggregate([
    { $match: condition_obj},
      
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
  const { name, description } = req.body;
    const { id } = req.params;
    console.log("id777777777777",id)

  if (!name && !description) {
    throw new CustomError(
      statusCodes?.badRequest,
     Message?.notFound,
      errorCodes?.server_error ,
  )
  }

  const category = await CategorySchemaModel.findById(id);
  if (!category) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  


 
  category.name = name || category.name;
  category.description = description || category.description;

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
  const category = await CategorySchemaModel.findByIdAndUpdate(
    id,
    { isDelete: true },
   );

  if (!category) {
    throw new CustomError(statusCodes?.notFound, errorCodes?.notFound);
  }
  return category;
};





