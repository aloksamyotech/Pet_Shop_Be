import { employeeData,getEmployData ,updateEmployData,deleteEmployData} from "../services/Employee.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const employee = async (req, res, next) => {
    const data = await employeeData (req); 
    res.status(statusCodes?.created).json({ 
      success: true,
      message : Message.Successfully,
      data 
    });
 
};


const getEmployee= async (req, res, next) => {
    const customers = await getEmployData();
       res.status(statusCodes?.ok).json({ 
      success: true,
      message: Message.successfullyUpdate,
      data: customers,
    });
 
};

const updateEmployee  = async (req, res, next) =>{
const customers = await updateEmployData(req);
res.status(statusCodes?.ok).json({ 
  success: true,
  message: Message.DeleteSuccessfully,
  data: customers,
});
 
  }



  const deleteEmployee  = async (req, res, next) =>{
    const { customerId } = req.params;
  const customers = await deleteEmployData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: customers,
  });
  }

  export default {
    employee,
    getEmployee,
    updateEmployee,
    deleteEmployee,
  
};
