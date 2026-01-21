const User = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const APIError = require("../utils/APIError");

const signAsync = promisify(jwt.sign);

const signUp = async (data) => {
  // Check if user already exists
  const existingUser = await User.findOne({ email: data.email });
  if (existingUser) {
    throw new APIError("User with this email already exists", 400);
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(data.password, 12);

  // Create user with hashed password
  const user = await User.create({
    ...data,
    password: hashedPassword,
  });

  return user;
};

const signIn = async ({ email, password }) => {
  // Find user by email
  const user = await User.findOne({ email });
  if (!user) {
    throw new APIError("Invalid email or password", 401);
  }

  // Compare password
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new APIError("Invalid email or password", 401);
  }

  // Generate JWT token
  const token = await signAsync(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" },
  );

  // Return token and user data (without password)
  const userObject = user.toObject();
  delete userObject.password;

  return {
    token,
    user: userObject,
  };
};

const getAllUsers = async ({ page = 1, limit = 10 }) => {
  page = Number(page);
  limit = Number(limit);

  const usersPromise = User.find({}, { password: 0 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPromise = User.countDocuments();

  const [users, total] = await Promise.all([usersPromise, totalPromise]);

  return {
    users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getUserById = (id) => User.findById(id, { password: 0 });

const updateUserById = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });

const deleteUserById = (id) => User.findByIdAndDelete(id);

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
