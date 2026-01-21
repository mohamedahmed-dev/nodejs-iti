const PostService = require("../services/posts");
const APIError = require("../utils/APIError");

const createPost = async (req, res) => {
  const post = await PostService.createPost(req.body, req.user.userId);
  res.status(201).json({ message: "Post created successfully", data: post });
};

const getAllPosts = async (req, res) => {
  const result = await PostService.getAllPosts(req.query, req.user.userId);
  res.json({ message: "Posts fetched successfully", ...result });
};

const getPostById = async (req, res) => {
  const post = await PostService.getPostById(req.params.id, req.user.userId);
  if (!post) throw new APIError("Post not found", 404);
  res.json({ message: "Post fetched successfully", data: post });
};

const updatePostById = async (req, res) => {
  const post = await PostService.updatePostById(
    req.params.id,
    req.body,
    req.user.userId,
  );
  if (!post) throw new APIError("Post not found", 404);
  res.json({ message: "Post updated successfully", data: post });
};

const deletePostById = async (req, res) => {
  const post = await PostService.deletePostById(req.params.id, req.user.userId);
  if (!post) throw new APIError("Post not found", 404);
  res.json({ message: "Post deleted successfully" });
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
};
