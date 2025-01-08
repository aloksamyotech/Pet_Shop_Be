import { orderData , getOrderData,updateOrderData,deleteOderData} from "../services/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const order = async (req, res) => {
 
    const data = await orderData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });

  };


const getOrders = async (req, res, next) => {
  const order = await getOrderData();
    res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.FetchSuccessfully,
      data: order,
    });
};




const updateOrders  = async (req, res, next) =>{
 const orders = await updateOrderData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: Message.successfullyUpdate,
  data: orders,
});
  }



  const deleteOrders  = async (req, res, next) =>{
   const orders = await deleteOderData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "orders delete  successfully.",
    data: orders,
  });
   }





export default {
    order,
  getOrders,
  updateOrders,
  deleteOrders
};
