import { purchaseData , getPurchaseData,updatePurchaseData,deletePurchaseData} from "../services/purchase.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const purchase = async (req, res) => {
const data = await purchaseData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });
  };


const getPurchases = async (req, res, next) => {
      const purchases = await getPurchaseData();
      res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.FetchSuccessfully,
      data: purchases,
    });

};

const updatePurchases  = async (req, res, next) =>{
  const purchases = await updatePurchaseData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: Message.successfullyUpdate,
  data: purchases,
});
  }

const deletePurchases  = async (req, res) =>{
  const purchases = await deletePurchaseData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: purchases,
  });
  } 
  

export default {
  purchase,
  getPurchases,
  updatePurchases,
  deletePurchases
};
