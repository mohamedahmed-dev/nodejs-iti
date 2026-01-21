const APIError = require("../utils/APIError");

const restrictTo = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      throw new APIError("User not authenticated", 401);
    }

    if (!allowedRoles.includes(req.user.role)) {
      throw new APIError(
        "You do not have permission to perform this action",
        403,
      );
    }

    next();
  };
};

module.exports = restrictTo;
