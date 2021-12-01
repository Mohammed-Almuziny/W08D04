const express = require("express");

const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
} = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost);
postsRouter.get("/userPosts", authentication, getUserPosts);
postsRouter.put("/update", authentication, updatePost);
postsRouter.delete("/:postId", authentication, deletePost);
postsRouter.get("/allPosts", authentication, getAllPosts);

module.exports = postsRouter;
