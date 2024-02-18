import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res
    .status(statusCode)
    .json({ statusCode, data: { message: err.message }, success: false });
};

export default errorHandler;
