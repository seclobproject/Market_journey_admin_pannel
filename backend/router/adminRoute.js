import express from "express";
const adminRouter = express.Router();
import {acceptUser, addDistrict, addPanchayath, addState, addZonal, adminLogin,  editProfileByAdmin,  forgotPassword, getReadyToApproveUsers, rejectUser, viewAllDistricts, viewAllPagePanchayath, viewAllPageUsers, viewAllPageZonal, viewAllPanchayaths, viewAllUsers, viewAllZonals, viewNotTakenDistricts, viewNotTakenZonals, viewParamsDistricts, viewParamsPanchayaths, viewParamsZonals, viewStates, viewUserDetails} from "../controller/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { addPackage, editPackage, viewPackages } from "../controller/packageController.js";
import { addUser } from "../controller/userController.js";
import { deleteSingleAward, deleteSingleImage, deleteSingleVideo, updateAwardData, updateHomeVideo, uploadAwardDetails, uploadHomeImages, uploadHomeVideos, viewAwardDetails, viewHomeImages, viewHomeVideos } from "../controller/uploadController.js";

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

adminRouter.post("/edit-user-details/:id", protectAdmin, editProfileByAdmin);
adminRouter.post("/upload-home-image", protectAdmin,uploadHomeImages);
adminRouter.post("/delete-home-image/:id", protectAdmin,deleteSingleImage);

adminRouter.post("/upload-home-video", protectAdmin,uploadHomeVideos);
adminRouter.post("/edit-home-video/:id", protectAdmin,updateHomeVideo);
adminRouter.post("/delete-home-video/:id", protectAdmin,deleteSingleVideo);

adminRouter.post("/upload-award-details", protectAdmin,uploadAwardDetails);
adminRouter.post("/edit-award-details/:id", protectAdmin,updateAwardData);
adminRouter.post("/delete-award/:id", protectAdmin,deleteSingleAward);






adminRouter.get("/view-states",viewStates);
adminRouter.get("/view-all-districts", protectAdmin,viewAllDistricts);
adminRouter.get("/view-all-zonals", protectAdmin,viewAllZonals);
adminRouter.get("/view-all-panchayaths", protectAdmin,viewAllPanchayaths);
adminRouter.get("/view-dropdown-districts/:id",viewParamsDistricts);
adminRouter.get("/view-nottaken-districts/:id",viewNotTakenDistricts);
adminRouter.get("/view-nottaken-zonals/:id",viewNotTakenZonals);
adminRouter.get("/view-dropdown-zonals/:id",viewParamsZonals);
adminRouter.get("/view-dropdown-panchayaths/:id",viewParamsPanchayaths);
adminRouter.get("/view-package",viewPackages);
adminRouter.get("/view-all-users", protectAdmin,viewAllUsers);
adminRouter.get("/view-paginated-users", protectAdmin,viewAllPageUsers);
adminRouter.get("/view-paginated-zonal", protectAdmin,viewAllPageZonal);
adminRouter.get("/view-paginated-panchayath", protectAdmin,viewAllPagePanchayath);
adminRouter.get("/view-user-profile/:id", protectAdmin, viewUserDetails);
adminRouter.get("/view-home-images", viewHomeImages);
adminRouter.get("/view-home-videos", viewHomeVideos);
adminRouter.get("/view-award-details", viewAwardDetails);






adminRouter.get(
    "/view-ready-to-approved-users",
    protectAdmin,
    getReadyToApproveUsers
  );





export default adminRouter;