import { CompanySchemaModel } from "../models/company.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { companyNotificationTemplate } from "../Templete/company.js";
import sendEmail from "../core/common/mailer.js";
import  {SettingsSchemaModel} from '../models/email.js'

export const companyData = async (req) => {
  
    const { companyName, address, description, email,phoneNumber,status} = req?.body;

    if (!companyName || !address ||!description ||!email ||! phoneNumber  ||!status) {
      throw new CustomError(
        statusCodes?.badRequest,
        Message?.invalidInput,
        errorCodes?.invalid_input
      );
    }

    const existingCompany = await CompanySchemaModel.findOne({ email });
      if (existingCompany) {
        throw new CustomError(
          statusCodes?.badRequest,
          errorCodes?.already_exist,
          Message?.alreadyExist,
        );
      }

    const companySchema = await CompanySchemaModel.create({
        companyName, address, description, email,phoneNumber,status,
        isDelete: false,
    });


    
      const settings = await SettingsSchemaModel.findOne();
      if (settings?.purchase) {
    await sendEmail(email, "Welcome to Pets Shop!", "",companyNotificationTemplate(companyName,email,phoneNumber,address));
      }

    
    return companySchema; 
 
};



export const countCompany = async (req) => {
  const condition_obj = { isDelete: false };
  const companyCount = await CompanySchemaModel.countDocuments(condition_obj);
  return companyCount;
};



export const getCompanyData = async () => {
  const condition_obj = { isDelete: false };
   const company = await CompanySchemaModel.find(condition_obj).sort({ createdAt: -1 });
      if (!company) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound ,
          errorCodes?.not_Found,
        );
      }
  
      return company;
   
  };


  export const updateCompanyData  = async (req) =>{

    
       const {companyName, address, description, email,phoneNumber,companyType,status } = req?.body;
       const { id } = req.params;
       if(!companyName && !address && !description && !email && ! phoneNumber && !companyType && !status){

        throw new CustomError(
            statusCodes?.badRequest,
           Message?.notFound,
            errorCodes?.server_error ,
        )

       }
    const company = await CompanySchemaModel.findById(id);
       if(!company){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound,
            errorCodes?.server_error  )
}
       company.companyName = companyName || company.companyName;
       company.address = address || company.address;
       company.email = email || company.email;
       company.phoneNumber = phoneNumber || company.phoneNumber;
       company.companyType = companyType || company.companyType;
       company.status = status || company.status;
       company.description = description || company.description;



       const  updateCompany= await company.save();

       if(!updateCompany){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound,
            errorCodes?.server_error 
        )

       }

       return updateCompany;


  }

  export const deleteCompanyData =  async (req) =>{

        const {id} = req?.params;    

        if(!id){

            throw new CustomError(
                statusCodes?.badRequest,
                errorCodes?.invalid_input ,
              );
        }
const company = await CompanySchemaModel.findByIdAndUpdate(id,
          { isDelete: true },);

        if(!company){
            throw new CustomError(
                statusCodes?.notFound,
               errorCodes?.notFound
            )
        }

     return company;
   
  } 

  