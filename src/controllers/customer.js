import { customerData , getCustomerData,updateCustomerData,deleteCustomerData} from "../services/customer.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const customer = async (req, res, next) => {
    const data = await customerData(req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message: "Customer created successfully.",
      data 
    });
 
};


const getCustomer= async (req, res, next) => {
    const customers = await getCustomerData();
       res.status(statusCodes?.ok).json({ 
      success: true,
      message: "Customer fetched successfully.",
      data: customers,
    });
 
};




const updateCustomers  = async (req, res, next) =>{
const customers = await updateCustomerData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: "Customer  Data updated  successfully.",
  data: customers,
});
 
  }



  const deleteCustomers  = async (req, res, next) =>{
    const { customerId } = req.params;
  const customers = await deleteCustomerData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: "Customer  data delete  successfully.",
    data: customers,
  });
  }

  export default {
  customer,
  getCustomer,
  updateCustomers,
  deleteCustomers
};
