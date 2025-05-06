import { RegistrationData ,FetchRegistrationData,UpdateRegistrationUser,DeleteUserData,statusUpdated,userIdData,bookingToday,bookingByStatusData} from "../services/Registration.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";



const bookingStatus = async (req,res,next) =>{

  const DataStatus = await bookingByStatusData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message : Message.Successfully,
    data : DataStatus,
  });

}



const bookingTodayData = async (req,res,next) =>{
  const BookingData = await bookingToday();
  res.status(statusCodes?.ok).json({ 
       success: true,
       message : Message.Successfully,
       data : BookingData,
     });



}


const registrationUserData = async (req,res,next) =>{

    const UserData = await RegistrationData(req);
     res.status(statusCodes?.ok).json({ 
          success: true,
          message : Message.Successfully,
          data :UserData
        });

}

const registrationUserFetch = async(req,res,next) =>{

    const UserData = await FetchRegistrationData();
    res.status(statusCodes?.ok).json({ 
        success: true,
        message : Message.Successfully,
        data :UserData
      });

}

const registrationUpdated = async (req,res,next) =>{



    const UserData =  await UpdateRegistrationUser(req);
    res.status(statusCodes?.ok).json({ 
        success: true,
        message: Message.successfullyUpdate,
        data: purchases,
      });

}

const registrationDelete = async(req,res,next) =>{


    const UserData = await DeleteUserData(req);
     res.status(statusCodes?.ok).json({ 
        success: true,
        message: Message.DeleteSuccessfully,
        data: UserData,
      });

}


const UpdatedStatus =  async (req,res,next) =>{

    const UserData = await statusUpdated(req);
    res.status(statusCodes?.ok).json({ 
        success: true,
        message: Message.DeleteSuccessfully,
        data: UserData,
      });


}


const UserFind = async (req, res,next) =>{

  const UserData = await userIdData(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.DeleteSuccessfully,
    data: UserData,
  });


}


export default {registrationUserData,registrationUserFetch,registrationUpdated,registrationDelete,UpdatedStatus,UserFind ,bookingTodayData,bookingStatus}