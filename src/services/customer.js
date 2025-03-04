import { CustomerSchemaModel } from "../models/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

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
        firstName, email, address, phoneNumber, status,
        isDelete: false,
      });
   return customerSchema; 
    
  };
  
  export const countCustomer = async (req) => {
    const condition_obj = { isDelete: false };
     const customerCount = await CustomerSchemaModel.countDocuments(condition_obj);
    if (customerCount === 0) {
      return { success: false, Message: "No data found" };
    }
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
         const {firstName,email,address,phoneNumber,customerType,status} = req?.body;
         const {id} = req?.params
       if(firstName && !email && !address && !phoneNumber  && !customerType && !status)
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
      customer.address = address || customer.address;
      customer.phoneNumber = phoneNumber || customer.phoneNumber;
   customer.customerType = customerType || customer.customerType;
      customer.status = status || customer.status;
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