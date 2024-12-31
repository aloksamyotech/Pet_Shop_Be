import { CompanySchemaModel } from "../models/Comapny.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const companyData = async (req) => {
  
    const { companyName, address, description, email,phoneNumber,companyType,status} = req?.body;

    if (!companyName || !address ||!description ||!email ||! phoneNumber || !companyType ||!status) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const companySchema = await CompanySchemaModel.create({
        companyName, address, description, email,phoneNumber,companyType,status
    });
    
    return companySchema; 
 
};



export const getCompanyData = async () => {
   
      const company = await CompanySchemaModel.find();
  
      if (!company || company.length === 0) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound || "No products found.",
          errorCodes?.not_Found || "NOT_FOUND"
        );
      }
  
      return company;
   
  };


  



  export const updateCompanyData  = async (req) =>{

    
       const {companyId,companyName, address, description, email,phoneNumber,companyType,status } = req?.body;
       if(!companyId || (!companyName && !address && !description && !email && ! phoneNumber && !companyType && !status)){

        throw new CustomError(
            statusCodes?.badRequest,
            error.message || "invalidInput",
            errorCodes?.server_error || "invalid_input"
        )

       }
    const company = await CompanySchemaModel.findById(companyId);



       if(!company){
        throw new CustomError(
            statusCodes?.notFound,
            error.message || "Product not found",
            errorCodes?.server_error || "NOT_FOUND")

       }


       company.companyName = companyName || company.companyName;
       company.address = address || company.address;
       company.email = email || company.email;
       company.phoneNumber = phoneNumber || company.phoneNumber;
       company.companyType = companyType || company.companyType;
       company.status = status || company.status;
       company.description = description || company.description;



       const  updateCompany= await company.save();

       return updateCompany;


  }

  export const deleteCompanyData =  async (req,res, next) =>{

        const {companyId} = req.params;    

        if(!companyId){

            throw new CustomError(
                statusCodes?.badRequest,
                "company ID is required for deletion.",
                errorCodes?.invalid_input || "INVALID_INPUT"
              );
        }


        const company = await CompanySchemaModel.findByIdAndDelete(companyId);

        if(!company){
            throw new CustomError(
                statusCodes?.notFound,
                "Company not found",
                errorCodes?.notFound
            )
        }

     return company;
   
  } 