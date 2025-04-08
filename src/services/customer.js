import { CustomerSchemaModel } from "../models/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import sendEmail from "../core/common/mailer.js";
import { registrationEmailTemplate } from "../Templete/user.js";
import  {SettingsSchemaModel} from '../models/email.js'


export const customerData = async (req) => {
   
      const { firstName, email, address, phoneNumber,status } = req?.body;
  
      const existingCustomer = await CustomerSchemaModel.findOne({ email });
      if (existingCustomer) {
        throw new CustomError(
          statusCodes?.badRequest,
          errorCodes?.already_exist,
          Message?.alreadyExist,
        );
      }

 const customerSchema = await CustomerSchemaModel.create({
        firstName, 
        email, address, phoneNumber, status,
        isDelete: false,
      });


      const settings = await SettingsSchemaModel.findOne();
      if (settings?.customerAdd) {
      await sendEmail(email, "Welcome to Pets Shop!", "",registrationEmailTemplate(firstName));
      }
   return customerSchema; 
    
  };
  
  export const countCustomer = async (req) => {
    const condition_obj = { isDelete: false };
     const customerCount = await CustomerSchemaModel.countDocuments(condition_obj);
    return customerCount
  };

export const getCustomerData = async () => {
  const condition_obj = { isDelete: false };
      const customers = await CustomerSchemaModel.find(condition_obj).sort({ createdAt: -1 });
  
      if (!customers) {
        throw new CustomError(
          statusCodes?.notFound,
          Message?.notFound ,
          errorCodes?.not_Found ,
        );
      }
    return customers;
    };


export const updateCustomerData  = async (req) =>{
         const {firstName,email,address,phoneNumber,status} = req?.body;
         console.log("req?.body----------------------------",req?.body);
         
         const {id} = req?.params
       if(firstName && !email && !address && !phoneNumber  && !status)
        {
            throw new CustomError(
            statusCodes?.badRequest,
            errorCodes?.server_error ,
        )

       }
    const customer = await CustomerSchemaModel.findById(id);

         if(!customer){
        throw new CustomError(
            statusCodes?.notFound,
            errorCodes?.server_error,
            Message?.notFound,
          )

       }


       customer.firstName = firstName || customer.firstName;
customer.email = email || customer.email;
customer.address = (address && address !== 'N/A') ? address : null;
customer.phoneNumber = (phoneNumber && phoneNumber !== 'N/A') ? phoneNumber : null;
customer.status = (status && status !== 'N/A') ? status : null;

 const  updateCustomer = await customer.save();
       return updateCustomer;
  }
  
  export const deleteCustomerData =  async (req) =>{
        const {id} = req?.params;   
        if(! id){
            throw new CustomError(
                statusCodes?.badRequest,
                errorCodes?.invalid_input ,
              );
        }
        const customer = await CustomerSchemaModel.findByIdAndUpdate( id,
          { isDelete: true },);

        if(!customer){
          throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound,
            errorCodes?.server_error 
        )
        }
     return customer;
     } 