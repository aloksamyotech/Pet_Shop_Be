import { EmploySchemaModel } from "../models/Employee.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const employeeData = async (req) => {
   const { name, email, address, phoneNumber ,salary,EId} = req?.body;
     const existingEmployee = await EmploySchemaModel.findOne({ email });
      if (existingEmployee) {
        throw new CustomError(
          statusCodes?.badRequest,
          errorCodes?.already_exist,
          Message?.alreadyExist,
        );
      }
const employSchema = await EmploySchemaModel.create({
        name, email, address, phoneNumber,salary,EId,
        isDelete: false,
      });
return employSchema; 
    
  };
  export const getEmployData = async () => {
    const condition_obj = { isDelete: false };
        const customers = await EmploySchemaModel.find(condition_obj).sort({ createdAt: -1 });
    
        if (!customers) {
          throw new CustomError(
            statusCodes?.notFound,
            Message?.notFound ,
            errorCodes?.not_Found ,
          );
        }
      return customers;
      };
  
  
  export const updateEmployData  = async (req) =>{
           const {name,email,address,phoneNumber,salary,EId} = req?.body;
           const {id} = req?.params
         if(name && !email && !address && !phoneNumber  && salary && EId)
          {
              throw new CustomError(
              statusCodes?.badRequest,
              errorCodes?.server_error ,
          )
  
         }
      const customer = await EmploySchemaModel.findById(id);
  
           if(!customer){
          throw new CustomError(
              statusCodes?.notFound,
              errorCodes?.server_error,
              Message?.notFound,
            )
  
         }
  
      customer.name = name || customer.name;
          customer.email = email || customer.email;
        customer.address = address || customer.address;
        customer.phoneNumber = phoneNumber || customer.phoneNumber;
        customer.salary = salary || customer.salary;
        customer.EId = EId || customer.EId;
      const  updateCustomer = await customer.save();
         return updateCustomer;
    }
    
    export const deleteEmployData =  async (req) =>{
          const {id} = req?.params;   
          if(! id){
              throw new CustomError(
                  statusCodes?.badRequest,
                  errorCodes?.invalid_input ,
                );
          }
          const customer = await EmploySchemaModel.findByIdAndUpdate( id,
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