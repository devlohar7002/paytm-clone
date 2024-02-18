import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { User } from "../models/user.model.js";

export const verifyUser = async (req, _, next) => {
  try {
    const authHeader = req.cookies?.accessToken || req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(403, "Unauthorized request");
    }
    const token = authHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    console.log(decodedToken);
    const userId = decodedToken.id;
    const currentUser = await User.findById(userId).select("-password");

    if (!currentUser) {
      throw new ApiError(401, "Invalid Access Token");
    }
    req.userId = userId;
    next();
  } catch (error) {
    next(error);
  }
};
