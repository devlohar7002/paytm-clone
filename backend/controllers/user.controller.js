import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import z from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const getHashedPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);
  return hash;
};

const generateAccessToken = (payload) => {
  const token = jwt.sign({ ...payload }, process.env.ACCESS_TOKEN_SECRET);
  return token;
};

const signup = async (req, res, next) => {
  try {
    let { username, firstName, lastName, password } = req.body;

    if (!username || !password || !firstName || !lastName) {
      throw new ApiError(400, "All fields are mandatory");
    }

    [username, firstName, lastName, password] = [
      username,
      firstName,
      lastName,
      password,
    ].map((entry) => entry.trim());

    const emailSchema = z.string().email();
    if (!emailSchema.safeParse(username).success) {
      throw new ApiError(400, "Email is not valid");
    }
    const passwordSchema = z.string().min(6);
    if (!passwordSchema.safeParse(password).success) {
      throw new ApiError(400, "Password should be of minimum 6 characters");
    }

    const existingUser = await User.findOne({ username: username });

    if (existingUser) {
      throw new ApiError(409, "username already exists");
    }
    const user = await User.create({
      username,
      firstName,
      lastName,
      password: getHashedPassword(password),
    });

    const currentUser = await User.findById(user._id).select("-password");
    if (!currentUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    const accessToken = generateAccessToken({
      id: currentUser._id,
      username: currentUser.username,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(201)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(201, {
          message: "User registered sccessfully",
          user: currentUser._doc,
          accessToken,
        })
      );
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const userDetails = [req.body.username, req.body.password].map((entry) =>
      entry?.trim()
    );
    const [username, password] = userDetails;

    if (!username || !password) {
      throw new ApiError(400, "All fields are mandatory");
    }

    const user = await User.findOne({ username });

    if (!user) {
      throw new ApiError(404, "User does not exists");
    }

    const match = await bcrypt.compare(password, user.password);

    if (match == false) {
      throw new ApiError(404, "Wrong Password");
    }

    const loggedUser = await User.findById(user._id).select("-password");
    console.log(loggedUser);
    if (!loggedUser) {
      throw new ApiError(500, "Something went wrong while logging. Try Again");
    }

    const accessToken = generateAccessToken({
      id: loggedUser._id,
      username: loggedUser.username,
    });

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(200, {
          message: "User logged in successfully",
          user: loggedUser._doc,
          accessToken,
        })
      );
  } catch (error) {
    next(error);
  }
};

const updateUserDetails = async (req, res, next) => {
  try {
    const updateBody = z.object({
      password: z.string().optional(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
    });

    const { success } = updateBody.safeParse(req.body);
    if (!success) {
      throw new ApiError(411, "Error while updating information");
    }

    await User.updateOne({ _id: req.userId }, req.body);

    const updatedUser = await User.findById(req.userId);

    res.status(200).send(new ApiResponse(200, { ...updatedUser._doc }));
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const filter = req.query.filter || "";

    const users = await User.find({
      $or: [
        {
          firstName: {
            $regex: filter,
          },
        },
        {
          lastName: {
            $regex: filter,
          },
        },
      ],
    });

    res.status(200).send(
      new ApiResponse(200, {
        user: users.map((user) => ({
          username: user.username,
          firstName: user.firstName,
          lastName: user.lastName,
          _id: user._id,
        })),
      })
    );
  } catch (error) {
    next(error);
  }
};

export { signup, signin, updateUserDetails, getUsers };
