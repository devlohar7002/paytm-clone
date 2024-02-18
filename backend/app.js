import express from "express";
import rootRouter from "./routes/index.js";
import cors from "cors";
import errorHandler from "./middlewares/errorHandler.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/app/v1", rootRouter);

app.use(errorHandler);

export { app };
