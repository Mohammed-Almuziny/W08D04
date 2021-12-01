const express = require("express");

const {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
} = require("./../controllers/comments");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/create", authentication, createComment);
commentsRouter.get("/forPost/:postId", authentication, getPostComments);
commentsRouter.put("/", authentication, updateComment);
commentsRouter.delete("/:commentId", authentication, deleteComment);

module.exports = commentsRouter;
