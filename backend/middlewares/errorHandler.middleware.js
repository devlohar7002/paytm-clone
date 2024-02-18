import ApiResponse from "../utils/ApiResponse.js";

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res
    .status(statusCode)
    .send(new ApiResponse(statusCode, { message: err.message }, err.success));
};

export default errorHandler;
