const express = require("express");

const {
  createComment,
  getPostComments,
  updateComment,
} = require("./../controllers/comments");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/create", authentication, createComment);
commentsRouter.get("/forPost/:postId", authentication, getPostComments);
commentsRouter.put("/", authentication, updateComment);

module.exports = commentsRouter;
