import mongoose from "mongoose";
import { database_urls } from "../common/constant.js";
import "dotenv/config";
import { User } from "../../models/user.js";
import { LogoSchemaModel } from "../../models/Logo.js";


const connectDB = async () => {
  try {
    const dbUri = database_urls.connection + database_urls.db_name;

    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected successfully");

    
    await createDefaultUser();
    await createDefaultLogo();
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};



const createDefaultUser = async () => {
  try {
    const existingUser = await User.findOne({ email:"rahul.malviya@samyotech.com" });
    if (!existingUser) {
      const defaultUser = new User({});
      await defaultUser.save();
     console.log("Default user created:", defaultUser);
    } else {
      console.log("Default user already exists.");
    }
  } catch (error) {
    console.error("Error creating default user:", error.message);
  }
};



const createDefaultLogo = async () => {
  try {
    const existingLogo = await LogoSchemaModel.findOne();

    if (!existingLogo) {
      const defaultLogo = new LogoSchemaModel(); 
      await defaultLogo.save();
      console.log("Default logo created:", defaultLogo);
    } else {
      console.log("Default logo already exists.");
    }
  } catch (error) {
    console.error("Error creating default logo:", error.message);
  }
};


export default connectDB;
