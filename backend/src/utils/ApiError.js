class ApiError extends Error {
  constructor(
    status,
    message = "something went wrong",
    errors = [],
    stack = ""
  ) {
    super(message);
    this.message = message;
    this.status = status;
    this.errors = errors;
    this.data = null;
    this.success = false;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
