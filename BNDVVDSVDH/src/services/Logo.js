import { LogoSchemaModel } from "../models/Logo.js";
import { errorCodes, Message, statusCodes ,image_url} from "../core/common/constant.js";
import CustomError from "../utils/exception.js";


export const logoData = async (req) => {
 const logoSchema = await LogoSchemaModel.create({
    logoImage: req.file ? req.file.path :null,
  
  });
  return logoSchema;
};


export const getLogoData = async () => {
    const Logo = await LogoSchemaModel.aggregate([
      
          
          {
            $addFields: {
              imageUrl: {
                $ifNull: [{ $concat: [image_url.url, "$logoImage"] }, ""],
              },
            },
          },
          {
            $sort:{
              createdAt : -1,
            }
           }
            
            ])
      ;
        return Logo;
  };



export const updateLogo = async (req) => {
  const { id } = req.params; 
  if (!id) {
    throw new CustomError(
      statusCodes?.badRequest,
     errorCodes?.invalid_input
    );
  }

 
  const existingLogo = await LogoSchemaModel.findById(id);
  if (!existingLogo) {
    throw new CustomError(
      statusCodes?.notFound,
      errorCodes?.not_found
    );
  }
  const updatedData = {
    logoImage: req.file ? req.file.path : existingLogo.logoImage, 
  };

 
  const updatedLogo = await LogoSchemaModel.findByIdAndUpdate(id, updatedData, {
    new: true, 
    runValidators: true, 
  });

  return updatedLogo;
};
