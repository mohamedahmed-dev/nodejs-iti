const User = require("../models/users");

const createUser = (data) => User.create(data);

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
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
