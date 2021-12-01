const express = require("express");

const { createPost } = require("./../controllers/posts");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const postsRouter = express.Router();

postsRouter.post("/create", authentication, createPost);

module.exports = postsRouter;
