import express from "express";
import {
  getBalance,
  transferFunds,
} from "../controllers/account.controller.js";

import { verifyUser } from "../middlewares/authVerification.middleware.js";

const router = express.Router();

// private routes
router.route("/balance").get(verifyUser, getBalance);
router.route("/transfer").post(verifyUser, transferFunds);

export default router;
