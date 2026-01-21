const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    age: { type: Number, min: 18, max: 100 },
  },
  { timestamps: true },
);

userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", userSchema);
