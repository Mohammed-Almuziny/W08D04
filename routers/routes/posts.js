const express = require("express");

const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
  handleLike,
} = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");
const isLiked = require("./../middlewares/likeMiddleware");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost);
postsRouter.get("/userPosts", authentication, getUserPosts);
postsRouter.put("/update", authentication, updatePost);
postsRouter.delete("/:postId", authentication, deletePost);
postsRouter.get("/allPosts", authentication, getAllPosts);
postsRouter.post("/like", authentication, isLiked, handleLike);

module.exports = postsRouter;
