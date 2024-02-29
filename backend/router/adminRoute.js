import express from "express";
const adminRouter = express.Router();
import {acceptUser, addDistrict, addPanchayath, addState, addZonal, adminLogin,  forgotPassword, getReadyToApproveUsers, rejectUser, viewAllDistricts, viewAllPanchayaths, viewAllUsers, viewAllZonals, viewParamsDistricts, viewParamsPanchayaths, viewParamsZonals, viewStates} from "../controller/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { addPackage, editPackage, viewPackages } from "../controller/packageController.js";
import { addUser } from "../controller/userController.js";

adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/forgot-password", forgotPassword);
adminRouter.post("/add-state", protectAdmin,addState);
adminRouter.post("/add-district", protectAdmin,addDistrict);
adminRouter.post("/add-zonal", protectAdmin,addZonal);
adminRouter.post("/add-panchayath", protectAdmin,addPanchayath);
adminRouter.post("/add-package", protectAdmin,addPackage);
adminRouter.post("/edit-package/:id", protectAdmin,editPackage);
adminRouter.post("/add-user", protectAdmin, addUser);
adminRouter.post("/accept-user/:id", protectAdmin, acceptUser);
adminRouter.post("/reject-user/:id", protectAdmin, rejectUser);





adminRouter.get("/view-states",viewStates);
adminRouter.get("/view-all-districts", protectAdmin,viewAllDistricts);
adminRouter.get("/view-all-zonals", protectAdmin,viewAllZonals);
adminRouter.get("/view-all-panchayaths", protectAdmin,viewAllPanchayaths);
adminRouter.get("/view-dropdown-districts/:id",viewParamsDistricts);
adminRouter.get("/view-dropdown-zonals/:id",viewParamsZonals);
adminRouter.get("/view-dropdown-panchayaths/:id",viewParamsPanchayaths);
adminRouter.get("/view-package",viewPackages);
adminRouter.get("/view-all-users", protectAdmin,viewAllUsers);


adminRouter.get(
    "/view-ready-to-approved-users",
    protectAdmin,
    getReadyToApproveUsers
  );





export default adminRouter;