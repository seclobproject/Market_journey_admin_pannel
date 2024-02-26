import express from "express";
import {
  addUser, userLogin,
} from "../controller/userController.js";
import { protectUser } from "../middleware/authMiddleware.js";

const router = express.Router();


router.post("/add-user", protectUser, addUser);
router.post("/user-login", userLogin);

export default router;
