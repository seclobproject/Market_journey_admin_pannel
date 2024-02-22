import express from "express";
const adminRouter = express.Router();
import {addDistrict, addPanchayath, addState, addZonal, adminLogin,  forgotPassword, viewAllDistricts, viewAllPanchayaths, viewAllZonals, viewParamsDistricts, viewStates} from "../controller/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";

adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/add-state", protectAdmin,addState);
adminRouter.post("/add-district", protectAdmin,addDistrict);
adminRouter.post("/add-zonal", protectAdmin,addZonal);
adminRouter.post("/add-panchayath", protectAdmin,addPanchayath);



adminRouter.get("/view-states", protectAdmin,viewStates);
adminRouter.get("/view-all-districts", protectAdmin,viewAllDistricts);
adminRouter.get("/view-all-zonals", protectAdmin,viewAllZonals);
adminRouter.get("/view-all-panchayaths", protectAdmin,viewAllPanchayaths);
adminRouter.get("/view-params-districts/:id", protectAdmin,viewParamsDistricts);





export default adminRouter;