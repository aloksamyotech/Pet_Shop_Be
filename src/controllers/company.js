import { companyData , getCompanyData,updateCompanyData,deleteCompanyData} from "../services/company.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const company = async (req, res, next) => {
  
    const data = await companyData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Company data created successfully.",
      data 
    });
  };


const getCompany= async (req, res, next) => {
      const company = await getCompanyData();
   res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Company data fetched successfully.",
      data: company,
    });
 };




const updateCompany  = async (req, res, next) =>{
    const company = await updateCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Products updated  successfully.",
    data: company,
  });
}



  const deleteCompany = async (req, res, next) =>{
   const company = await deleteCompanyData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "data delete  successfully.",
    data: company,
  });
   }

export default {
  company,
  getCompany,
  updateCompany,
  deleteCompany
};
