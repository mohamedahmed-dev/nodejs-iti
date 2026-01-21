const UserService = require("../services/users");
const APIError = require("../utils/APIError");

const signUp = async (req, res) => {
  const user = await UserService.signUp(req.body);
  res.status(201).json({ message: "User registered successfully", data: user });
};

const signIn = async (req, res) => {
  const result = await UserService.signIn(req.body);
  res.status(200).json({ message: "Signed in successfully", data: result });
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
  signUp,
  signIn,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
