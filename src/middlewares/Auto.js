import jwt from "jsonwebtoken";
import { statusCodes, messages } from "../common/constant.js";
const secret =  process.env.ACCESS_TOKEN_SECRET;
export const authenticateJWT = (req, res, next) => {

  let token = req.headers["Authorization"]?.split(" ")[1]?.replace(/^"|"$/g, "").trim();
  if (!token) {
    return res
      .status(statusCodes.forbidden) 
      .json({ success: false, message: messages.required });
  }
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(statusCodes.unauthorized)
        .json({ success: false, message: messages.invalid_format });
    }
    req.user = decoded;
    next();
  });
};






