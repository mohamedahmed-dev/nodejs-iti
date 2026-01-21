const express = require("express");
const postsController = require("../controllers/posts");
const schemas = require("../schemas");
const validate = require("../middlewares/validate");

const router = express.Router();

// create post
router.post(
  "/",
  validate(schemas.posts.createPostSchema),
  postsController.createPost,
);

// get all posts
router.get(
  "/",
  validate(schemas.posts.getAllPostsSchema),
  postsController.getAllPosts,
);

// get post by id
router.get("/:id", postsController.getPostById);

// update post by id
router.patch(
  "/:id",
  validate(schemas.posts.updatePostSchema),
  postsController.updatePostById,
);

// delete post by id
router.delete("/:id", postsController.deletePostById);

module.exports = router;
