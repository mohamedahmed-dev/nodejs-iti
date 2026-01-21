const Post = require("../models/posts");

const createPost = (data) => Post.create(data);

const getAllPosts = async ({ page = 1, limit = 10 }) => {
  page = Number(page);
  limit = Number(limit);

  const postsPromise = Post.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPromise = Post.countDocuments();

  const [posts, total] = await Promise.all([postsPromise, totalPromise]);

  return {
    posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPostById = (id) => Post.findById(id);
const updatePostById = (id, data) =>
  Post.findByIdAndUpdate(id, data, { new: true });
const deletePostById = (id) => Post.findByIdAndDelete(id);

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
