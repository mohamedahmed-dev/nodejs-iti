const Post = require("../models/posts");
const APIError = require("../utils/APIError");

const createPost = (data, userId) => {
  return Post.create({ ...data, userId });
};

const getAllPosts = async ({ page = 1, limit = 10 }, userId) => {
  page = Number(page);
  limit = Number(limit);

  const postsPromise = Post.find()
    .populate("userId", "name email")
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPromise = Post.countDocuments();

  const [posts, total] = await Promise.all([postsPromise, totalPromise]);

  // Add isOwner flag to each post
  const postsWithOwnership = posts.map((post) => {
    const postObj = post.toObject();
    postObj.isOwner = postObj.userId._id.toString() === userId.toString();
    return postObj;
  });

  return {
    posts: postsWithOwnership,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const getPostById = async (id, userId) => {
  const post = await Post.findById(id).populate("userId", "name email");

  if (!post) {
    return null;
  }

  const postObj = post.toObject();
  postObj.isOwner = postObj.userId._id.toString() === userId.toString();

  return postObj;
};
const updatePostById = async (id, data, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return null;
  }

  // Check if user is the author
  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You can only update your own posts", 403);
  }

  const updatedPost = await Post.findByIdAndUpdate(id, data, { new: true });
  return updatedPost;
};
const deletePostById = async (id, userId) => {
  const post = await Post.findById(id);

  if (!post) {
    return null;
  }

  // Check if user is the author
  if (post.userId.toString() !== userId.toString()) {
    throw new APIError("You can only delete your own posts", 403);
  }

  const deletedPost = await Post.findByIdAndDelete(id);
  return deletedPost;
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
