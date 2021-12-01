const express = require("express");

const { createPost, getUserPost } = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost);
postsRouter.get("/userPosts/:createrID", authentication, getUserPost);

module.exports = postsRouter;
