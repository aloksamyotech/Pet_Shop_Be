import { companyData , getCompanyData,updateCompanyData,deleteCompanyData} from "../services/company.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const company = async (req, res, next) => {
  try {
    const data = await companyData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Company data created successfully.",
      data 
    });
  } catch (error) {
 
    new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error posting customer.",
      errorCodes?.server_error || "SERVER_ERROR"
    )
  }
};


const getCompany= async (req, res, next) => {
  try {
    const company = await getCompanyData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Company data fetched successfully.",
      data: company,
    });
  } catch (error) {
   
      new CustomError(
        statusCodes?.internalServerError,
        error.message || "Error fetching customer.",
        errorCodes?.server_error || "SERVER_ERROR"
      )
    
  }
};




const updateCompany  = async (req, res, next) =>{
    try{  
  
  const company = await updateCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Products updated  successfully.",
    data: company,
  });
  } 
  
  catch(error){
  
    
    new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error updating products.",
      errorCodes?.server_error || "SERVER_ERROR"
    )
  
  
  }
  
  
    }



  const deleteCompany = async (req, res, next) =>{
    try{  
  
  const company = await deleteCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "data delete  successfully.",
    data: company,
  });
  } 
  
  catch(error){
  
    
    new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error deleting data.",
      errorCodes?.server_error || "SERVER_ERROR"
    )
  
  
  }
  
  
    }





export default {
  company,
  getCompany,
  updateCompany,
  deleteCompany
};
