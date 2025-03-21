import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { errorCodes, Message, statusCodes ,image_url} from "../core/common/constant.js";
import CustomError from "../utils/exception.js";
import sendEmail from "../core/common/mailer.js";
import  {SettingsSchemaModel} from '../models/email.js'



export const registerUser = async (req) => {
  const { firstname, company, email, password, phoneNumber,country ,logoImage,currencyCode,currencySymbol} = req.body;
  const isUserAlreadyExist = await User.findOne({ email });
  if (isUserAlreadyExist) {
    throw new CustomError(409, "User already exists", "already_exist");
  }


  const user = await User.create({ firstname, company, email, password, phoneNumber,country ,currencySymbol,currencyCode,
    logoImage: req.file ? req.file.path : logoImage,
  });
  return await User.findById(user._id).select("-password -refreshToken");
};



export const getUserData = async () => {
   const user = await User.aggregate([
 
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
  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      Message?.notFound,
      errorCodes?.not_found,
    );
  }
  return user;
};



export const updateUser = async (userId, userData) => {
  const { firstname, company, email, phoneNumber,country } = userData;
  const user = await User.findById(userId);
  if (!user) {
    throw new CustomError(404, "User not found", "user_not_found");
  }
  user.firstname = firstname || user.firstname;
  user.company = company || user.company;
  user.email = email || user.email;
  user.phoneNumber = phoneNumber || user.phoneNumber;
  user.country = country || user.country;
  const updatedUser = await user.save();
  return await User.findById(updatedUser._id).select("-password -refreshToken");
};


export const updatedCurrency = async(req) =>{
  const { currencyCode, currencySymbol} =  req?.body;
  const {id} = req?.params;
  if (!id) {
    throw new CustomError(statusCodes?.badRequest, errorCodes?.invalid_input);
  }
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new CustomError(statusCodes?.notFound, errorCodes?.not_found);
  }
  existingUser.currencyCode= currencyCode || existingUser.currencyCode;
  existingUser.currencySymbol = currencySymbol || existingUser.currencySymbol;

  const updateData = await existingUser.save();
  return updateData;
}


export const updateLogo = async (req) => {
  const { id } = req.params;
  if (!id) {
    throw new CustomError(statusCodes?.badRequest, errorCodes?.invalid_input);
  }
  
  const existingUser = await User.findById(id);
  if (!existingUser) {
    throw new CustomError(statusCodes?.notFound, errorCodes?.not_found);
  }

  const updatedData = {
    logoImage: req.file ? req.file.path : existingUser.logoImage,
  };

  const updatedLogo = await User.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedLogo;
};





const generateAccessAndRefreshTokens = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");
  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();
  user.refreshToken = refreshToken;
  await user.save({ validateBeforeSave: false });
  return { accessToken, refreshToken };
};

export const loginUser = async (req) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });


  if (!user) throw new CustomError(404, "User not found", "not_found");
  const passwordVerify = await user.isPasswordCorrect(password);
  if (!passwordVerify) throw new CustomError(400, "Invalid credentials", "invalid_credentials");
  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);


  const settings = await SettingsSchemaModel.findOne();
  if (settings?.login) {
 await sendEmail(email, "Welcome to Pets Shop!", "", "<h1>Hello, <p>You have successfully logged into the <strong>Pet Shop</strong> system.</p></h1>");

  }
   return {
    accessToken,
    refreshToken,
    loginUser: await User.findById(user._id).select("-password -refreshToken"),
  };
};



export const updatePasswordData = async (req) => {
  const { currentPassword, newPassword } = req.body;
  const { id } = req?.params;
  const user = await User.findById(id);
  if (!user) {
    throw new CustomError(
      statusCodes?.notFound,
      errorCodes?.server_error,
      Message?.notFound,)
  }

const passwordVerify = await user.isPasswordCorrect(currentPassword);
 
  if (!passwordVerify) {
    throw new CustomError(
      statusCodes?.password_mismatch,
    )
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  
  const userData = await user.updateOne({
    password : hashedPassword
  })
  return userData;

};
