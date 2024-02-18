import { Account } from "../models/account.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import mongoose from "mongoose";

const getBalance = async (req, res, next) => {
  try {
    const userId = req.userId;

    const account = await Account.findOne({ userId });

    if (!account) {
      throw new ApiError(403, "Account not found");
    }

    res
      .status(200)
      .send(new ApiResponse(200, { balance: account._doc.balance }));
  } catch (error) {
    next(error);
  }
};

const transferFunds = async (req, res, next) => {
  try {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    if (!amount || !to) {
      await session.abortTransaction();
      throw new ApiError(400, "All details are required");
    }

    if (amount && amount == 0) {
      await session.abortTransaction();
      throw new ApiError(400, "Amount should be greater than 0");
    }

    // Fetch the accounts within the transaction
    const account = await Account.findOne({ userId: req.userId }).session(
      session
    );

    if (!account || account.balance < amount) {
      await session.abortTransaction();
      throw new ApiError(400, "Insufficient balance");
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      throw new ApiError(400, "Invalid account");
    }

    // Perform the transfer
    await Account.updateOne(
      { userId: req.userId },
      { $inc: { balance: -amount } }
    ).session(session);
    await Account.updateOne(
      { userId: to },
      { $inc: { balance: amount } }
    ).session(session);

    // Commit the transaction
    await session.commitTransaction();
    res.status(200).send(
      new ApiResponse(200, {
        message: "Transfer successfull",
      })
    );
  } catch (error) {
    next(error);
  }
};

export { getBalance, transferFunds };
