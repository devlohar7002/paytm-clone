import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minLength: 3,
    maxLength: 50,
  },
  firstName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    maxLength: 20,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    trim: true,
  },
});

export const User = mongoose.model("User", userSchema);
