import mongoose from "mongoose";
import { database_urls } from "../common/constant.js";
import "dotenv/config";
import { User } from "../../models/user.js";
import { LogoSchemaModel } from "../../models/Logo.js";


const connectDB = async () => {
  try {
    const dbUri = database_urls.connection + database_urls.db_name;

    await mongoose.connect(dbUri);
    await createDefaultUser();
    await createDefaultLogo();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

const defaultUser = {
  email:"admin@gmail.com",
  password:"admin123",
  phoneNumber : 9847365789
};

const createDefaultUser = async () => {
  const existingUser = await User.findOne({ email: "admin@gmail.com" });
  
  if (!existingUser) {
      const admin = new User(defaultUser);
      await admin.save();
  }  
  
};


const createDefaultLogo = async () => {
  try {
    const existingLogo = await LogoSchemaModel.findOne();

    if (!existingLogo) {
      const defaultLogo = new LogoSchemaModel(); 
      await defaultLogo.save();
    } 
  } catch (error) {
    console.error("Error creating default logo:", error.message);
  }
};

export default connectDB;
