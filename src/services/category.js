import { CategorySchemaModel } from "../models/category.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const categoryData = async (req) => {
  
    const { name , description} = req?.body;
    console.log("value+++++++++++++++++++++",req.body)

    if (!name || !description  ) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const categorySchema = await CategorySchemaModel.create({
        name , description
    });
    return categorySchema; 
 
};



export const getCategoryData = async () => {
   
      const category= await CategorySchemaModel.find();
      console.log("data>>>>>>>>>>>>>>>>>>>>>>",category);
  
      if (!category || category.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound ,
          errorCodes?.not_found,
        );
      }
  
      return category;
   
  };


   export const updateCategoryData  = async (req) =>{
    const {Name , description , categoryId  , active } = req?.body
       if(!categoryId || !Name  ||  !description || !active ){
        throw new CustomError(
            statusCodes?.badRequest,
            Message?.incorrect_payload ,
            errorCodes?.bad_request,
        )
       }
    const category = await CategorySchemaModel.findById(categoryId);

       if(!category){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.not_found,
        )
           }

        category.Name = Name || category.Name;
       category.active = active || category.active;
       category.description = description || category.description;

     const  updateCategory= await category.save();
     return updateCategory;
}

  export const deleteCategoryData =  async (req,res, next) =>{

        const {categoryId} = req.params;    

        if(!categoryId){

            throw new CustomError(
                statusCodes?.badRequest,
                "company ID is required for deletion.",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }


        const category = await CategorySchemaModel.findByIdAndDelete(categoryId);
       

        if(!category){
            throw new CustomError(
                statusCodes?.notFound,
                "Company not found",
                errorCodes?.notFound
            )
        }

     return category;
   
  } 