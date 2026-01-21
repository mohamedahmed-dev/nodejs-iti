const UserService = require("../services/users");
const APIError = require("../utils/APIError");

const createUser = async (req, res) => {
  const user = await UserService.createUser(req.body);
  res.status(201).json({ message: "User created successfully", data: user });
};

const getAllUsers = async (req, res) => {
  const result = await UserService.getAllUsers(req.query);
  res.json({ message: "Users fetched successfully", ...result });
};

const getUserById = async (req, res) => {
  const user = await UserService.getUserById(req.params.id);
  if (!user) throw new APIError("User not found", 404);
  res.json({ message: "User fetched successfully", data: user });
};

const updateUserById = async (req, res) => {
  const user = await UserService.updateUserById(req.params.id, req.body);
  if (!user) throw new APIError("User not found", 404);
  res.json({ message: "User updated successfully", data: user });
};

const deleteUserById = async (req, res) => {
  const user = await UserService.deleteUserById(req.params.id);
  if (!user) throw new APIError("User not found", 404);
  res.json({ message: "User deleted successfully" });
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
