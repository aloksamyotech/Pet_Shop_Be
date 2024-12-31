import { purchaseData , getPurchaseData,updatePurchaseData,deletePurchaseData} from "../services/purchase.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const purchase = async (req, res) => {
  try {
    const data = await purchaseData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Product created successfully.",
      data 
    });
  } catch (error) {
   console.log(error);
  }
};


const getPurchases = async (req, res, next) => {
  try {
    const purchases = await getPurchaseData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Products fetched successfully.",
      data: purchases,
    });
  } catch (error) {
   
      new CustomError(
        statusCodes?.internalServerError,
        error.message || "Error fetching products.",
        errorCodes?.server_error || "SERVER_ERROR"
      )
    
  }
};

const updatePurchases  = async (req, res, next) =>{
  try{  
const purchases = await updatePurchaseData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: "Products updated  successfully.",
  data: purchases,
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



  const deletePurchases  = async (req, res) =>{
  const purchases = await deletePurchaseData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Products delete  successfully.",
    data: purchases,
  });
  } 
  

export default {
  purchase,
  getPurchases,
  updatePurchases,
  deletePurchases
};
