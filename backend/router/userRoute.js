import express from "express";
import {
  addReferalUser,
  addUser,
  changePassword,
  editProfile,
  renewalRequest,
  userLogin,
  verifyUser,
  viewAddOn,
  viewConvertPackages,
  viewLevel1User,
  viewLevel2User,
  viewRenewalPackages,
  viewUserProfile,
  walletWithdrawRequest,
} from "../controller/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";
import {
  addDemateAccount,
  addNomineeDetails,
  addUserBankAccount,
  getAlertsForUser,
} from "../controller/uploadController.js";
import {
  bonusCreditedReport,
  directIncomeReportPaginated,
  filteredUsers,
  getAutoPoolAmount,
  getAutoPoolCountAmount,
  inDirectIncomeReportPaginated,
  levelIncomeReportPaginated,
  subscriptionHistoryUser,
  totalTransactionsHistory,
  userAutoPoolIncomeHistory,
  userDemateAccounts,
  walletWithdrawReportUser,
} from "../controller/reportController.js";

const router = express.Router();

router.post("/add-user", protectUser, addUser);
router.post("/user-login", userLogin);
router.post("/user-verification", protectUser, verifyUser);
router.post("/change-password", protectUser, changePassword);
router.post("/edit-profile", protectUser, editProfile);
router.post("/add-bank-account", protectUser, addUserBankAccount);
router.post("/add-nominee", protectUser, addNomineeDetails);
router.post("/add-demate-account", protectUser, addDemateAccount);
router.post("/add-referal-user", addReferalUser);

//withdraw request

router.post("/withdraw-wallet", protectUser, walletWithdrawRequest);

//renewal request

router.post("/user-renewal-request", protectUser, renewalRequest);

router.get("/view-user-profile", protectUser, viewUserProfile);
router.get("/view-level1-user", protectUser, viewLevel1User);
router.get("/view-level2-user", protectUser, viewLevel2User);
router.get("/view-demate-accounts", protectUser, userDemateAccounts);

//Reports

router.get("/direct-referal-report", protectUser, directIncomeReportPaginated);
router.get(
  "/indirect-referal-report",
  protectUser,
  inDirectIncomeReportPaginated
);
router.get("/level-income-report", protectUser, levelIncomeReportPaginated);
router.get("/wallet-withdraw-report", protectUser, walletWithdrawReportUser);
router.get("/user-subscription-report", protectUser, subscriptionHistoryUser);
router.get("/autopool-credit-report", protectUser, userAutoPoolIncomeHistory);

//get autopool count and amount
router.get("/get-pool-count-amount", protectUser, getAutoPoolCountAmount);

//get autopool count and amount
router.get("/get-pool-amount", protectUser, getAutoPoolAmount);
//get credit bonus history

router.get("/view-credit-bonus-report", protectUser, bonusCreditedReport);

//get all transactions

router.get("/view-all-credits", protectUser, totalTransactionsHistory);

//view user alert

router.get("/view-user-alerts", protectUser, getAlertsForUser);

//view filtered users

router.post("/view-district-Users", protectUser, filteredUsers);

//view AddOn signals

router.get("/view-addon-signals", protectUser, viewAddOn);

//view AddOn signals

router.get("/view-convert-packages", protectUser, viewConvertPackages);

//view renewal packages

router.get("/view-renewal-packages", protectUser, viewRenewalPackages);

export default router;
