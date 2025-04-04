import { orderData ,getOrderData,updateOrderData,deleteOrderData,getTotalOrders,getTotalSalesForMonth,getTotalQuantityForMonth} from "../services/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";



const getOrderCount = async (req, res) => {
  const totalOrders = await getTotalOrders();
  res.status(statusCodes?.ok).json({
    success: true,
    message: Message.FetchSuccessfully,
    totalOrders
  });

};

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
   const orders = await deleteOrderData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message:Message.DeleteSuccessfully,
    data: orders,
  });
   }



   export const getMonthlySalesReport = async (req, res) => {
     const salesData = await getTotalSalesForMonth(req);
      res.status(statusCodes.ok).json({
        success: true,
        data: salesData
      });
    
  };
  
export const getTotalQuantity = async (req, res) => {
    
      const salesData = await getTotalQuantityForMonth(req);
      res.status(statusCodes.ok).json({
        success: true,
        data: salesData
      });
   
  };  

export default {
    order,
  getOrders,
  updateOrders,
  deleteOrders,
  getOrderCount,
  getMonthlySalesReport,
  getTotalQuantity
};
