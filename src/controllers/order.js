import { orderData ,getOrderData,updateOrderData,deleteOrderData,getTotalOrders,getTotalSalesForMonth,getTotalQuantityForMonth} from "../services/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const getOrderCount = async (req, res) => {
  const totalOrders = await getTotalOrders();
  res.status(statusCodes?.ok).json({
    success: true,
    message: 'Successfully fetched total orders',
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
    message: "orders delete  successfully.",
    data: orders,
  });
   }



   export const getMonthlySalesReport = async (req, res) => {
    try {
      const salesData = await getTotalSalesForMonth(req);
      res.status(statusCodes.ok).json({
        success: true,
        data: salesData
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "errro "
      });
    }
  };
  



  

  export const getTotalQuantity = async (req, res) => {
    try {
      const salesData = await getTotalQuantityForMonth(req);
      res.status(statusCodes.ok).json({
        success: true,
        data: salesData
      });
    } catch (error) {
      res.status(statusCodes.internalServerError).json({
        success: false,
        message: "error"
      });
    }
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
