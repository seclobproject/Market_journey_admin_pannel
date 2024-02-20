import jwt from "jsonwebtoken";
import Admin from "../models/adminModel.js";
import asyncHandler from "express-async-handler";
import { errorHandler } from "./errorHandler.js";

export const protectAdmin = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "Albetros");
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
