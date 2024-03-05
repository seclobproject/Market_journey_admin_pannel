import express from "express";
import {
  addUser, changePassword, editProfile, userLogin, verifyUser, viewLevel1User, viewLevel2User, viewUserProfile,
} from "../controller/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add-user", protectUser, addUser);
router.post("/user-login", userLogin);
router.post("/user-verification", protectUser,verifyUser);
router.post("/change-password", protectUser,changePassword);
router.post("/edit-profile", protectUser,editProfile);


router.get("/view-user-profile", protectUser,viewUserProfile);
router.get("/view-level1-user", protectUser,viewLevel1User);
router.get("/view-level2-user", protectUser,viewLevel2User);



export default router;
