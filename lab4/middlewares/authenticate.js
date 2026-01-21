const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const APIError = require("../utils/APIError");

const verifyAsync = promisify(jwt.verify);

const authenticate = async (req, res, next) => {
  try {
    // Extract token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new APIError("No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
      throw new APIError("No token provided", 401);
    }

    // Verify token
    const decoded = await verifyAsync(token, process.env.JWT_SECRET);

    // Attach user information to request
    req.user = {
      userId: decoded.userId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    if (error instanceof APIError) {
      throw error;
    }
    throw new APIError("Invalid or expired token", 401);
  }
};

module.exports = authenticate;
