import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import { errorHandler } from "./errorHandler.js";
import User from "../models/userModel.js";

export const protectAdmin = asyncHandler(async (req, res, next) => {

  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "MarketJourney");
      req.admin = await Admin.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      next(error);
    }
  }

  if (!token) {
    return next(errorHandler(401, "Not authenticated, No token"));
  }
});

export const protectUser = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "MarketJourney");
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch (error) {
      next(error);
    }
  }

  if (!token) {
    return next(errorHandler(401, "Not authenticated, No token"));
  }
});
