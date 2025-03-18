import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const userSchema = new Schema(
  {
    firstname: { type: String, required: true, trim: true, default: "John" },
    company: { type: String, default: "Tech Solutions" },
    email: { type: String, required: true, unique: true, default: "priti.sahu@samyotech.com" },
    phoneNumber: { type: String, required: true, unique: true, default: "1234567890" },
    country: { type: String, default: "indain" },
    currencyCode: { type: String, default: "USD" },
    currencySymbol: { type: String, default: "$" },
    password: {
      type: String,
      default: "$2b$10$XCiGWJlbCYF63nb1QGM1LuPTjUbCjFhZ7TA4KF3n5k2LWMIjaelmC",
    },
    logoImage: { type: String, default: null },
    refreshToken: { type: String },
  },
  { timestamps: true }
);


userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});


userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};


userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
  );
};


userSchema.methods.generateRefreshToken = function () {
  return jwt.sign({ _id: this._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
  });
};

export const User = mongoose.model("User", userSchema);
