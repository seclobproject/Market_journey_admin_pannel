import express from "express";
const adminRouter = express.Router();
import {acceptUser, addBonus, addDistrict, addPanchayath, addState, addZonal, adminLogin,  deleteDistrict,  deletePanchayath,  deleteState,  deleteZonal,  editDistrict,  editPanchayath,  editProfileByAdmin,  editState,  editZonal,  forgotPassword, getReadyToApproveUsers, processDematAccount, processWalletWithdrawal, rejectUser,viewAdminProfile,viewAllDistricts, viewAllPagePanchayath, viewAllPageUsers, viewAllPageZonal, viewAllPanchayaths, viewAllUsers, viewAllZonals, viewNotTakenDistricts, viewNotTakenZonals, viewParamsDistricts, viewParamsPanchayaths, viewParamsZonals, viewStates, viewUserDetails, viewWithdrawPendingPaginated} from "../controller/adminController.js";
import { protectAdmin } from "../middleware/authMiddleware.js";
import { addPackage, editPackage, viewPackages } from "../controller/packageController.js";
import { addUser } from "../controller/userController.js";
import { addAlert, addNews, deleteSingleAlert, deleteSingleAward, deleteSingleImage, deleteSingleNews, deleteSingleVideo, editAlert, editNews, updateAwardData, updateHomeVideo, uploadAwardDetails, uploadHomeImages, uploadHomeVideos, uploadPdf, viewAlert, viewAwardDetails, viewHomeImages, viewHomeVideos, viewNews } from "../controller/uploadController.js";
import { autoPoolHistory, bonusPaidReportPaginated, getApprovedDematesPaginated, getPendingDematesPaginated, totalWalletWithdrawHistory, viewPoolUsers } from "../controller/reportController.js";
import { addPoolPercentage, distributeAutoPoolWallet } from "../controller/incomeGereratorController.js";

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

adminRouter.post("/add-alert", protectAdmin,addAlert);
adminRouter.post("/edit-alert/:id", protectAdmin,editAlert);
adminRouter.post("/delete-alert/:id", protectAdmin,deleteSingleAlert);

adminRouter.post("/add-news", protectAdmin,addNews);
adminRouter.post("/edit-news/:id", protectAdmin,editNews);
adminRouter.post("/delete-news/:id", protectAdmin,deleteSingleNews);

adminRouter.post("/edit-district/:id", protectAdmin,editDistrict);
adminRouter.post("/edit-state/:id", protectAdmin,editState);
adminRouter.post("/edit-zonal/:id", protectAdmin,editZonal);
adminRouter.post("/edit-panchayath/:id", protectAdmin,editPanchayath);


adminRouter.post("/delete-district/:id", protectAdmin,deleteDistrict);
adminRouter.post("/delete-state/:id", protectAdmin,deleteState);
adminRouter.post("/delete-zonal/:id", protectAdmin,deleteZonal);
adminRouter.post("/delete-panchayath/:id", protectAdmin,deletePanchayath);

// approve and reject wallet withdrawal and demat account

adminRouter.post("/process-wallet-withdrawal/:id", protectAdmin,processWalletWithdrawal);
adminRouter.post("/process-demat-account/:id", protectAdmin,processDematAccount);

//add and edit autopool percentage

adminRouter.post("/update-pool-percentage", protectAdmin,addPoolPercentage);


//distribute autopool amount

adminRouter.post("/distribute-autowallet", protectAdmin,distributeAutoPoolWallet);

//add bonus 
adminRouter.post("/add-bonus/:id", protectAdmin,addBonus);

//upload pdf

adminRouter.post("/upload-pdf/:id", protectAdmin,uploadPdf);



adminRouter.get("/view-admin-profile", protectAdmin,viewAdminProfile);
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
adminRouter.get("/view-alert-details", viewAlert);
adminRouter.get("/view-news-details", viewNews);

//view withdraw request

adminRouter.get("/view-withdraw-request", protectAdmin,viewWithdrawPendingPaginated);
adminRouter.get("/all-withdraw-history", protectAdmin,totalWalletWithdrawHistory);

adminRouter.get("/autopool-credit-history", protectAdmin,autoPoolHistory );
adminRouter.get("/view-autopool-users", protectAdmin,viewPoolUsers );

adminRouter.get(
    "/view-ready-to-approved-users",
    protectAdmin,
    getReadyToApproveUsers
  );

  adminRouter.get(
    "/view-pending-demates",
    protectAdmin,
    getPendingDematesPaginated
  );
  adminRouter.get(
    "/view-approved-demates",
    protectAdmin,
    getApprovedDematesPaginated
  );


  //get bonus paid report

  adminRouter.get(
    "/view-bonus-paid-report",
    protectAdmin,
    bonusPaidReportPaginated
  );

export default adminRouter;