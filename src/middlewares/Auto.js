import jwt from "jsonwebtoken";
import { statusCodes,Message} from "../core/common/constant.js";



const secret = process.env.ACCESS_TOKEN_SECRET;

export const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(statusCodes.forbidden)
      .json({ success: false, message: Message.required });
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res
        .status(statusCodes.unauthorized)
        .json({ success: false, message: Message.invalid_format });
    }

    req.user = decoded;
    next();
  });
};
