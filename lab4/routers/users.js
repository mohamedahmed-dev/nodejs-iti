const router = require("express").Router();
const controller = require("../controllers/users");
const validate = require("../middlewares/validate");
const schemas = require("../schemas");
const authenticate = require("../middlewares/authenticate");
const restrictTo = require("../middlewares/restrictTo");

// Public routes
router.post(
  "/sign-up",
  validate(schemas.users.signUpSchema),
  controller.signUp,
);
router.post(
  "/sign-in",
  validate(schemas.users.signInSchema),
  controller.signIn,
);

// Protected routes (admin only)
router.get(
  "/",
  authenticate,
  restrictTo(["admin"]),
  validate(schemas.users.getAllUsersSchema),
  controller.getAllUsers,
);
router.get("/:id", authenticate, restrictTo(["admin"]), controller.getUserById);
router.patch(
  "/:id",
  authenticate,
  restrictTo(["admin"]),
  validate(schemas.users.updateUserSchema),
  controller.updateUserById,
);
router.delete(
  "/:id",
  authenticate,
  restrictTo(["admin"]),
  controller.deleteUserById,
);

module.exports = router;
