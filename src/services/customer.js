import { CustomerSchemaModel } from "../models/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const customerData = async (req) => {
   
      const { firstName, lastName, gender, email, address, phoneNumber, dateOfBirth, customerType, status } = req?.body;
  
      const existingCustomer = await CustomerSchemaModel.findOne({ email });
      if (existingCustomer) {
        throw new CustomError(
          statusCodes?.badRequest,
          errorCodes?.already_exist,
          Message?.alreadyExist,
        );
      }

 const customerSchema = await CustomerSchemaModel.create({
        firstName, lastName, gender, email, address, phoneNumber, dateOfBirth, customerType, status
      });
  
      return customerSchema; 
    
  };
  



export const getCustomerData = async () => {
   
      const customers = await CustomerSchemaModel.find().sort({createdAt: -1});
  
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

       const {customerId, firstName,lastName,gender,email,address,phoneNumber,dateOfBirth,customerType,status} = req?.body;
       if(!customerId || (!firstName && !lastName && !gender && !email && !address && !phoneNumber  && !dateOfBirth && !customerType && !status)){

        throw new CustomError(
            statusCodes?.badRequest,
            errorCodes?.server_error ,
        )

       }
    const customer = await CustomerSchemaModel.findById(customerId);

         if(!customer){
        throw new CustomError(
            statusCodes?.notFound,
            errorCodes?.server_error,
            Message?.notFound,
          )

       }


         customer.firstName = firstName || customer.firstName;
       customer.lastName = lastName || customer.lastName;
       customer.gender = gender || customer.gender;
       customer.email = email || customer.email;
      customer.address = address || customer.address;
      customer.phoneNumber = phoneNumber || customer.phoneNumber;
    customer.dateOfBirth = dateOfBirth || customer.dateOfBirth;
    customer.customerType = customerType || customer.customerType;
      customer.status = status || customer.status;



       const  updateCustomer = await customer.save();

       return updateCustomer;


    
  }
  
  export const deleteCustomerData =  async (req) =>{

   

        const {customerId} = req.params;    

        if(!customerId){

            throw new CustomError(
                statusCodes?.badRequest,
                errorCodes?.invalid_input ,
              );
        }


        const customer = await CustomerSchemaModel.findByIdAndDelete(customerId);

        if(!customer){
            throw new CustomError(
                statusCodes?.notFound,
                errorCodes?.notFound,
                Message?.notFound
            )
        }

     return customer;
   
  } 