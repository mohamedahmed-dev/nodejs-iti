const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());

// User schema
const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    age: { type: Number, required: true, min: 18, max: 100 },
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

// *** Post Schema ***
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true },
);

const Post = mongoose.model("Post", postSchema);

//*users Routes

// Create User
app.post("/users", async (req, res) => {
  const { name, email, password, age } = req.body;

  if (!name || !email || !password || !age) {
    return res.status(400).json({ message: "all fields are required" });
  }

  const user = await User.create({ name, email, password, age });

  res.status(201).json({
    message: "User created successfully",
    data: user,
  });
});

// Get all Users
app.get("/users", async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const usersPromise = User.find({}, { password: 0 })
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPromise = User.countDocuments();

  const [users, total] = await Promise.all([usersPromise, totalPromise]);

  res.json({
    message: "Users fetched successfully",
    data: users,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Get user By ID
app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const user = await User.findById(id, { password: 0 });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "User fetched successfully",
    data: user,
  });
});

// Update User
app.patch("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const { name, email, age } = req.body;

  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    { name, email, age },
    { new: true },
  );

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "User updated successfully",
    data: updatedUser,
  });
});

// Delete User
app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  const deletedUser = await User.findOneAndDelete({ _id: id });

  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({ message: "User deleted successfully" });
});

// ***Posts Routes***
// Create Post
app.post("/posts", async (req, res) => {
  const { title, content, author, tags, published } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({
      message: "Title, content, and author are required",
    });
  }

  const post = await Post.create({
    title,
    content,
    author,
    tags,
    published,
  });

  res.status(201).json({
    message: "Post created successfully",
    data: post,
  });
});

// Get All Posts
app.get("/posts", async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = Number(page);
  limit = Number(limit);

  const postsPromise = Post.find()
    .skip((page - 1) * limit)
    .limit(limit);

  const totalPromise = Post.countDocuments();

  const [posts, total] = await Promise.all([postsPromise, totalPromise]);

  res.json({
    message: "Posts fetched successfully",
    data: posts,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  });
});

// Get Post By ID
app.get("/posts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const post = await Post.findById(id);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({
    message: "Post fetched successfully",
    data: post,
  });
});

// Update Post
app.patch("/posts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const { title, content, author, tags, published } = req.body;

  const updatedPost = await Post.findOneAndUpdate(
    { _id: id },
    { title, content, author, tags, published },
    { new: true },
  );

  if (!updatedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({
    message: "Post updated successfully",
    data: updatedPost,
  });
});

// Delete Post
app.delete("/posts/:id", async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const deletedPost = await Post.findOneAndDelete({ _id: id });

  if (!deletedPost) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.json({ message: "Post deleted successfully" });
});

// Mongoos
mongoose
  .connect("mongodb://localhost:27017/iti-node")
  .then(() => {
    console.log("Connected to mongoDB (iti-node)");
    app.listen(3000, () => {
      console.log(" Server running on port 3000");
    });
  })
  .catch((err) => {
    console.error(" MongoDB connection error:", err);
  });
