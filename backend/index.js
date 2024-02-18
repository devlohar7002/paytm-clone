import dotenv from "dotenv";
import { connectDB } from "./db.js";
import { app } from "./app.js";

dotenv.config();

try {
  connectDB();
  console.log("Database connection successfull");
} catch (err) {
  console.log("Error connecting ot Database");
}

app.listen(process.env.PORT, function (err) {
  if (err) console.log(err);
  console.log("Server listening on PORT", process.env.PORT);
});
