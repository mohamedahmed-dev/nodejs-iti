const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    likes: { type: Number, default: 0 },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Post", postSchema);
