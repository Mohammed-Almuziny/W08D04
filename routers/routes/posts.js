const express = require("express");

const {
  createPost,
  getUserPosts,
  updatePost,
} = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost);
postsRouter.get("/userPosts/:createrID", authentication, getUserPosts);
postsRouter.put("/update", authentication, updatePost);

module.exports = postsRouter;
