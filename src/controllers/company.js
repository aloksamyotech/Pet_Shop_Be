import { companyData , getCompanyData,updateCompanyData,deleteCompanyData,countCompany} from "../services/company.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const getCompanyCount = async (req, res) => {
  try {
    const companyCount = await countCompany(req);
    res.status(statusCodes.ok).json({
      success: true,
      count: companyCount,
    });
  } catch (error) {
    res.status(statusCodes.internalServerError).json({
      success: false,
     
      error: error.message,
    });
  }
};





const company = async (req, res, next) => {
  
    const data = await companyData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });
  };


const getCompany= async (req, res, next) => {
      const company = await getCompanyData();
   res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.FetchSuccessfully,
      data: company,
    });
 };




const updateCompany  = async (req, res, next) =>{
    const company = await updateCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.successfullyUpdate,
    data: company,
  });
}



  const deleteCompany = async (req, res, next) =>{
   const company = await deleteCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: company,
  });
   }

export default {
  company,
  getCompany,
  updateCompany,
  deleteCompany,
  getCompanyCount
  };
