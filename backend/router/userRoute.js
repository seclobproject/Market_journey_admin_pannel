import express from "express";
import {
  addUser, userLogin, verifyUser, viewUserProfile,
} from "../controller/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add-user", protectUser, addUser);
router.post("/user-login", userLogin);
router.post("/user-verification", protectUser,verifyUser);

router.get("/view-user-profile", protectUser,viewUserProfile);


export default router;
