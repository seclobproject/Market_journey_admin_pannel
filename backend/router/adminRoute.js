import express from "express";
const adminRouter = express.Router();
import {addDistrict, addState, adminLogin,  forgotPassword, viewStates} from "../controller/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/add-state", protectAdmin,addState);
adminRouter.post("/add-district", protectAdmin,addDistrict);


adminRouter.get("/view-states", protectAdmin,viewStates);




export default adminRouter;