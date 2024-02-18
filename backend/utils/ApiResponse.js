class ApiResponse {
  constructor(statusCode, data) {
    this.statusCode = statusCode;
    this.data = data;
    this.success = true;
  }
}

export default ApiResponse;
