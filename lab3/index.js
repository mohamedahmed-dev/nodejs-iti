const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("./routers/users");
const postsRouter = require("./routers/posts");
const errorHandler = require("./middlewares/errorHandler");

require("dotenv").config();

const app = express();

// middleware
app.use(express.json());
app.use(cors());

// use routers
app.use("/users", usersRouter);
app.use("/posts", postsRouter);

// error handler middleware (must be last)
app.use(errorHandler);

// server setup
const PORT = Number(process.env.PORT);

app.listen(PORT, () => {
  mongoose
    .connect(`${process.env.MONGO_URI}/${process.env.DB_NAME}`)
    .then(() => {
      console.log("✅✅ connected to mongoDB");
    })
    .catch((err) => {
      console.log("❌❌ failed to connect to mongoDB");
      console.log(err);
    });
  console.log(`✅✅ server is running on Port:${PORT}`);
});
