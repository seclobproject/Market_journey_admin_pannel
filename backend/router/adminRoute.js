import express from "express";
const adminRouter = express.Router();
import {adminLogin,  forgotPassword} from "../controller/adminController.js";

adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/forgot-password", forgotPassword);



export default adminRouter;