import { customerData , getCustomerData,updateCustomerData,deleteCustomerData} from "../services/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const customer = async (req, res, next) => {
  try {
    const data = await customerData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Customer created successfully.",
      data 
    });
  } catch (error) {
   console.log(error)
  }
};


const getCustomer= async (req, res, next) => {
  try {
    const customers = await getCustomerData();

    res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Customer fetched successfully.",
      data: customers,
    });
  } catch (error) {
   
      new CustomError(
        statusCodes?.internalServerError,
        error.message || "Error fetching customer.",
        errorCodes?.server_error || "SERVER_ERROR"
      )
    
  }
};




const updateCustomers  = async (req, res, next) =>{
  try{ 

const customers = await updateCustomerData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: "Customer  Data updated  successfully.",
  data: customers,
});
} 

catch(error){

  
  new CustomError(
    statusCodes?.internalServerError,
    error.message || "Error updating customers.",
    errorCodes?.server_error || "SERVER_ERROR"
  )


}


  }



  const deleteCustomers  = async (req, res, next) =>{
    try{  
        const { customerId } = req.params;
  const customers = await deleteCustomerData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Customer  data delete  successfully.",
    data: customers,
  });
  } 
  
  catch(error){
  
    
    new CustomError(
      statusCodes?.internalServerError,
      error.message || "Error updating customers.",
      errorCodes?.server_error || "SERVER_ERROR"
    )
  
  
  }
  
  
    }





export default {
  customer,
  getCustomer,
  updateCustomers,
  deleteCustomers
};
