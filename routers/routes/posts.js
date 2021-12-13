const express = require("express");

const {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
  handleLike,
  checkLike,
} = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");
const isLiked = require("./../middlewares/likeMiddleware");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost); // create a new post
postsRouter.get("/userPosts", authentication, getUserPosts); // get the user posts
postsRouter.put("/update", authentication, updatePost); // update the post
postsRouter.delete("/:postId", authentication, deletePost); // delete the post
postsRouter.get("/allPosts", authentication, getAllPosts); //  get all posts
postsRouter.post("/like", authentication, isLiked, handleLike); // like a post
postsRouter.post("/checkLike", authentication, isLiked, checkLike);

module.exports = postsRouter;
