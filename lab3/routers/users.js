const router = require("express").Router();
const controller = require("../controllers/users");
const validate = require("../middlewares/validate");
const schemas = require("../schemas");

router.post(
  "/",
  validate(schemas.users.createUserSchema),
  controller.createUser,
);
router.get(
  "/",
  validate(schemas.users.getAllUsersSchema),
  controller.getAllUsers,
);
router.get("/:id", controller.getUserById);
router.patch(
  "/:id",
  validate(schemas.users.updateUserSchema),
  controller.updateUserById,
);
router.delete("/:id", controller.deleteUserById);

module.exports = router;
