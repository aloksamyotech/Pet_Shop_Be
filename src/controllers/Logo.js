
  import { logoData,updateLogo,getLogoData} from "../services/Logo.js";
import { errorCodes, Message, statusCodes } from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


const logo = async (req, res) => {

  const data = await logoData(req);
  res.status(statusCodes?.created).json({
    success: true,
    message : Message.Successfully,
   data
  });

};

const getLogo = async (req, res, next) => {
 const logo = await getLogoData();
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.FetchSuccessfully,
    data: logo,
  });

};

const updateLogoData  = async (req,res) =>{
  const logo = await updateLogo(req);
  res.status(statusCodes?.ok).json({ 
    success: true,
    message: Message.successfullyUpdate,
    data: logo,
  });
}


export default {
    logo,
    updateLogoData,
    getLogo
  };