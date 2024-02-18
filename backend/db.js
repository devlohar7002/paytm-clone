import mongoose from "mongoose";

async function connectDB() {
  try {
    await mongoose.connect(process.env.URI);
  } catch (err) {
    console.log("Error connecting to database: ", err);
  }
}

export { connectDB };
