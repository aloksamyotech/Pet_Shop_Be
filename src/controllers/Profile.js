import { ProfileData, getProfileData} from "../services/Profile.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";

const profile = async (req, res) => {
 const data = await ProfileData(req);
  res.status(statusCodes?.created).json({
    success: true,
    message : Message.Successfully,
   data
  });

};

const getProfile = async (req, res, next) => {
 const category = await getProfileData();
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.FetchSuccessfully,
    data: category,
  });

};
export default {
    profile,
    getProfile
   
  };