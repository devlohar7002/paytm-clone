import express from "express";
import {
  signup,
  signin,
  updateUserDetails,
  getUsers,
} from "../controllers/user.controller.js";

import { verifyUser } from "../middlewares/authVerification.middleware.js";

const router = express.Router();

router.route("/signup").post(signup);
router.route("/signin").post(signin);

// private routes
router.route("/updateUser").put(verifyUser, updateUserDetails);
router.route("/bulk").get(verifyUser, getUsers);

export default router;
