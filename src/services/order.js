import { OrderSchemaModel } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const orderData = async (req) => {
  const {products,customerId ,customerName ,customerEmail,customerPhone }= req?.body;
 

  if (!Array.isArray(products)) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

const totalAmount = products.reduce(
    (total, product) => total + product.productPrice * product.quantity,
    0
  );

  const order = await OrderSchemaModel.create({ products, totalAmount, customerId ,customerName,customerEmail,customerPhone});
  return order;
};




export const getOrderData = async () => {
  const orders = await OrderSchemaModel.aggregate([
   
    {
      $lookup: {
        from: "customers",
        localField: "customerId",
        foreignField: "_id",
        as: "customer"
      } 
    },
    
  ]);

  if (!orders) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_Found
    );
  }

  return orders;
};



  



export const updateOrderData = async (req) => {
  const { orderId, products, totalAmount } = req?.body;

  if (!orderId || (!products && totalAmount === undefined)) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  const order = await OrderSchemaModel.findById(orderId);

  if (!order) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_Found
    );
  }

  if (products) order.products = products;
  if (totalAmount !== undefined) order.totalAmount = totalAmount;

  const updatedOrder = await order.save();

  return updatedOrder;
};


export const deleteOrderData = async (req) => {
  const { orderId } = req.params;

  if (!orderId) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  const order = await OrderSchemaModel.findByIdAndDelete(orderId);

  if (!order) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_Found
    );
  }

  return order;
};
