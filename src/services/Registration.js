import { RegistrationSchemaModel } from "../models/Registration.js";
import { errorCodes, Message, statusCodes,image_url } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import mongoose from "mongoose";
import sendEmail from "../core/common/mailer.js";
import { generateBookingApprovalEmail } from "../Templete/approved.js";
import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";
import generateInvoicePDFBooking from "../Invoice/bookingInvoice.js";
import { generateBookingRejectionEmail } from "../Templete/rejected.js";
import { generateBookingPendingEmail } from "../Templete/padding.js";

export const RegistrationData =  async (req) =>{
    const {name , phone,email,petType,pacKage,gender,petAge,city,service,size,startDate,endDate,pickupLocation} = req?.body;

    const existingCustomer =  await RegistrationSchemaModel.findOne({email})

     if (existingCustomer) {
            throw new CustomError(
              statusCodes?.badRequest,
              errorCodes?.already_exist,
              Message?.alreadyExist,
            );
          }
const createDate = await RegistrationSchemaModel.create({name,phone,email,petType,pacKage,gender,petAge,city,service,size,startDate,endDate,pickupLocation});

const customerName=createDate.name;
const customerEmail= createDate.email;
const customerPhone= createDate.phone;


if(createDate.status == "pending"){
  const html = generateBookingPendingEmail(customerName, customerEmail, customerPhone);
await sendEmail(customerEmail, "We Received Your Grooming Booking – Pending Confirmation", "", html, null);

}
    return createDate;
}


export const FetchRegistrationData = async () =>{
    const condition_obj = { isDelete: false };
    const UserData = await RegistrationSchemaModel.aggregate([
        { $match: condition_obj},
        {
            $lookup: {
              from: "packagemodels",
              localField: "pacKage",
              foreignField: "_id",
              as: "package"
            } 
          },
          {
            $sort:{
              createdAt : -1,
            }
           }
    ]);
    
if(!UserData){
    throw new CustomError(
        statusCodes?.notFound,
        Message?.notFound ,
        errorCodes?.not_Found ,
      );}
return UserData
}

export const UpdateRegistrationUser = async (req) =>{

    const {id} = req?.params;
    const  {name , phone,email,petType,pacKage,genderPet,petAge,city,service,size,startDate,endDate} = req?.body
        const UserData = await RegistrationSchemaModel.findById(id);

    UserData.name = name || UserData.name,
    UserData.phone = phone || UserData.phone,
    UserData.email = email || UserData.email,
    UserData.petType = petType || UserData.petType,
    UserData.pacKage = pacKage || UserData.pacKage,
    UserData.genderPet = genderPet || UserData.genderPet,
    UserData.petAge = petAge || UserData.petAge,
    UserData.city = city || UserData.city,
    UserData.service= service|| UserData.service,
    UserData.size = size || UserData.size,
    UserData.startDate = startDate || UserData.startDate,
    UserData.endDate = endDate || UserData.endDate

    const UpdatedUserData = await UserData.save();
    return UpdatedUserData
  }


  export const DeleteUserData =  async (req) =>{
const {id} = req.params;
const UserData = await RegistrationSchemaModel.findById(id);

if(!UserData){
    throw new CustomError(
                    statusCodes?.badRequest,
                    Message?.notFound ,
                    errorCodes?.invalid_input ,
                  );}
const deleteUser = await RegistrationSchemaModel.findByIdAndUpdate(id,{isDelete:true});
return deleteUser

}

export const statusUpdated = async (req) =>{
   const {id} = req?.params;
  const {status} = req?.body;
    const UserData = await RegistrationSchemaModel.findById(id);

    if(!UserData){
        throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.not_Found ,
          );
    }
UserData.status = status || UserData.status;
const customerName =UserData.name;
const customerEmail = UserData.email;
const customerPhone = UserData.phone;

if(UserData.status == "approved"){
  const html = generateBookingApprovalEmail(customerName, customerEmail, customerPhone);
await sendEmail(customerEmail, "Your Grooming Booking is Approved", "", html);
}

if(UserData.status == "rejected"){
  const html = generateBookingRejectionEmail(customerName, customerEmail, customerPhone);
await sendEmail(customerEmail, "Your Grooming Booking Was Not Approved", "", html, null);

}


if(UserData.status == "completed")
{

    const datePart = new Date().toISOString().slice(0,10).replace(/-/g,"");
    const randomPart = Math.floor(1000 + Math.random() * 9000);
    UserData.customerID = `BK-${randomPart}`;
}
const UpdatedStatus = await UserData.save();
return UpdatedStatus;
}


export const userIdData = async(req) =>{
const {id} = req?.params;

if (!mongoose.Types.ObjectId.isValid(id)) {
  throw new Error("Invalid ID format");
}
const findUserData = await RegistrationSchemaModel.aggregate([
{
    $match:{
      _id: new mongoose.Types.ObjectId(id), }
},
{
    $lookup: {
      from: "packagemodels",
      localField: "pacKage",
      foreignField: "_id",
      as: "package"
    } 
  },
  {
    $sort:{
      createdAt : -1,
    }
   }

])

return findUserData;
}


export const bookingToday = async () => {
  const now = new Date();
  const startOfDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    0, 0, 0, 0
  ));
  const endOfDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    23, 59, 59, 999
  ));

  const TodayData = await RegistrationSchemaModel.aggregate([
    {
      $match: {
        isDelete: false,
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      }
    },
    {
      $sort: {
        createdAt: -1
      }
    }
  ]);

  return TodayData;
};



export const bookingByStatusData = async (req) =>{

  const status = req.query.status;

  if(!status){
    throw new Error("status is not get");
  }

  const statusData = await RegistrationSchemaModel.find({
    status: status,
    isDelete: false
  })
  return statusData;
}


export const sendEmailToUser = async (req) => {
  const { id } = req?.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid ID format");
  }

  const findUserData = await RegistrationSchemaModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "packagemodels",
        localField: "pacKage",
        foreignField: "_id",
        as: "package",
      },
    },
    {
      $sort:{
        createdAt : -1,
      }
     }
  ]);

  if (!findUserData || findUserData.length === 0) {
    throw new Error("User not found");
  }

  const user = findUserData[0];
  const customerEmail = user?.email;

  const invoiceDir = path.join(process.cwd(), 'invoice');
  if (!fs.existsSync(invoiceDir)) {
    fs.mkdirSync(invoiceDir, { recursive: true });
  }

  const pdfPath = path.join(invoiceDir, `invoice_${id}.pdf`);

  const invoiceData = {
    bookingId: user.customerID,
    petName: user.petType,
    breed: user.breed || "N/A",
    bookingStatus: user.status,
    packageName: user.package?.[0]?.name || "N/A",
    bookingDateTime: new Date(user.createdAt).toLocaleString(),
    service: user.service,
    customerInfo: {
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.city,
    },
    paymentInfo: {
      status: "Paid",
      price: user.package?.[0]?.price || 0,
      type: "Credit Card", 
      date: new Date().toLocaleDateString(),
      paid: user.package?.[0]?.price || 0,
      advance: 500, 
    },
    extraItems: [], 
  };

  await generateInvoicePDFBooking(invoiceData, pdfPath);

  const subject = "Your Order Invoice";
  const text = "Please find your invoice attached.";
  const html = `
    <p>Dear ${user.name},</p>
    <p>Thank you for your order! Please find your invoice attached.</p>
    <p>Best Regards,<br>Pet Shop System</p>
  `;

  await sendEmail(customerEmail, subject, text, html, pdfPath);

  return findUserData;
};