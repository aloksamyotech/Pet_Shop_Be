import { ProfileSchemaModel } from "../models/Proflie.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

export const ProfileData = async (req) => {
    const { name, email ,phoneNumber } = req?.body;
    const profileSchema = await ProfileSchemaModel.create({
      name, email, phoneNumber
      });
        return profileSchema; 
    
  };
  
export const getProfileData = async () => {
    const profile = await ProfileSchemaModel.find();
        return profile;
   
  };


 
  
 