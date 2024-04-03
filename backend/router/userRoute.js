import express from "express";
import {
  addReferalUser,
  addUser, changePassword, editProfile, userLogin, verifyUser, viewLevel1User, viewLevel2User, viewUserProfile, walletWithdrawRequest,
} from "../controller/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";
import { addDemateAccount, addNomineeDetails, addUserBankAccount } from "../controller/uploadController.js";
import { directIncomeReportPaginated, inDirectIncomeReportPaginated, levelIncomeReportPaginated, userDemateAccounts, walletWithdrawReportUser } from "../controller/reportController.js";

const router = express.Router();


router.post("/add-user", protectUser, addUser);
router.post("/user-login", userLogin);
router.post("/user-verification", protectUser,verifyUser);
router.post("/change-password", protectUser,changePassword);
router.post("/edit-profile", protectUser,editProfile);
router.post("/add-bank-account", protectUser,addUserBankAccount);
router.post("/add-nominee", protectUser,addNomineeDetails);
router.post("/add-demate-account", protectUser,addDemateAccount);
router.post("/add-referal-user",addReferalUser);

//withdraw request

router.post("/withdraw-wallet",protectUser,walletWithdrawRequest);



router.get("/view-user-profile", protectUser,viewUserProfile);
router.get("/view-level1-user", protectUser,viewLevel1User);
router.get("/view-level2-user", protectUser,viewLevel2User);
router.get("/view-demate-accounts", protectUser,userDemateAccounts);


//Reports

router.get("/direct-referal-report", protectUser,directIncomeReportPaginated);
router.get("/indirect-referal-report", protectUser,inDirectIncomeReportPaginated);
router.get("/level-income-report", protectUser,levelIncomeReportPaginated);
router.get("/wallet-withdraw-report", protectUser,walletWithdrawReportUser);





export default router;
