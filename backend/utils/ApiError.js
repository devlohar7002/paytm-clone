class ApiError extends Error {
  constructor(statusCode, message, stack = "") {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.stack = stack;
    this.message = message || "Something went wrong";
  }
}

export default ApiError;
