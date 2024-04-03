import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

import dotenv from "dotenv";
dotenv.config();

// verify the incoming requests whether authenticated or not
export const protect = async (req, res, next) => {
  try {
    let token;
    token = req.cookies.jwt;

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } else {
      return res.status(401).json({
        message: "Not Authorized,no token",
      });
    }
  } catch (error) {
    console.log(error);
  }
};
