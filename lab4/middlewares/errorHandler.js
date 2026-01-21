const APIError = require("../utils/APIError");

module.exports = (err, req, res, next) => {
  let error = err;

  // invalid objectid
  if (err.name === "CastError") {
    error = new APIError("Invalid ID format", 400);
  }

  // duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    error = new APIError(`${field} already exists`, 400);
  }

  // mongoose validation
  if (err.name === "ValidationError") {
    error = new APIError(err.message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.message || "Internal Server Error",
    isClientError: error.isClientError || false,
  });
};
