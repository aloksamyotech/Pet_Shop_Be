import { OrderSchemaModel } from "../models/order.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import { ProductSchemaModel } from "../models/product.js";
import sendEmail from "../core/common/mailer.js";
import fs from "fs";
import path from "path";
import generateInvoicePDF from "../Invoice/invoice.js"
import PDFDocument from "pdfkit";
import  {SettingsSchemaModel} from '../models/email.js'



export const getTotalOrders = async () => {
   const totalOrders = await OrderSchemaModel.countDocuments();
    return totalOrders;
 };

 export const orderData = async (req) => {
  const { products, customerId, customerName, customerEmail, customerPhone } = req?.body;



  if (!Array.isArray(products)) {
    throw new CustomError(
      statusCodes?.badRequest,
      Message?.invalidInput,
      errorCodes?.invalid_input
    );
  }

  let totalAmount = 0;
  for (const item of products) {
    const product = await ProductSchemaModel.findById(item.productId);

    if (!product) {
      throw new CustomError(
        statusCodes?.notFound,
        errorCodes?.not_found
      );
    }

    if (product.quantity < item.quantity) {
      throw new CustomError(
        statusCodes?.badRequest,
        errorCodes?.out_of_stock
      );
    }

    totalAmount += product.price * item.quantity;
    product.quantity -= item.quantity;
    await product.save();
  }

  const order = await OrderSchemaModel.create({
    products,
    totalAmount,
    customerId,
    customerName,
    customerEmail,
    customerPhone,
    isDelete: false,
  });


  const settings = await SettingsSchemaModel.findOne();

  if (settings?.order) {
    const invoiceDir = path.join(process.cwd(), 'invoice');
 if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }
  
    const pdfPath = path.join(invoiceDir, `invoice_${order._id}.pdf`);
    await generateInvoicePDF(order, pdfPath);
  
    const subject = "Your Order Invoice";
    const text = `Dear ${customerName},\n\nThank you for your order! Please find your invoice attached.\n\nBest Regards,\nYour Company Name`;
    const html = `<p>Dear ${customerName},</p><p>Thank you for your order! Please find your invoice attached.</p><p>Best Regards,<br>Your Company Name</p>`;
  
    await sendEmail(customerEmail, subject, text, html, pdfPath);
  }

  return order;
};

export const getOrderData = async () => {
  const condition_obj = { isDelete: false };
  const orders = await OrderSchemaModel.aggregate([
   
    { $match: condition_obj},
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
export const getTotalSalesForMonth = async (req) => {
  try {
    const {year} = req?.query;
    const condition_obj = { isDelete: false };
   if (year) {
      condition_obj["createdAt"] = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }
    const total = await OrderSchemaModel.aggregate([
      { $match: condition_obj },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total_sales_amount: { $sum: "$totalAmount" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedData = months.map((month, index) => {
      const monthData = total.find((data) => data._id === index + 1);
      return monthData ? monthData.total_sales_amount : 0;
    });
    return formattedData;
  } catch (error) {
    console.error("Error fetching total sales for the month:", error);
    throw new Error(data_not_found);
  }
};

export const getTotalQuantityForMonth = async (req) => {
  try {
    const { year } = req?.query;
    const condition_obj = { isDelete: false };
    
    if (year) {
      condition_obj["createdAt"] = {
        $gte: new Date(`${year}-01-01`),
        $lt: new Date(`${parseInt(year) + 1}-01-01`),
      };
    }
    const totalQuantity = await OrderSchemaModel.aggregate([
      {
        $match: condition_obj,
      },
      {
        $unwind: "$products",
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalQuantitySold: { $sum: "$products.quantity" },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const formattedData = months.map((month, index) => {
      const monthData = totalQuantity.find((data) => data._id === index + 1);
      return monthData ? monthData.totalQuantitySold : 0;
    });
    return formattedData;
  } catch (error) {
    throw new Error(data_not_found);
  }
};









