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

commentsRouter.post("/create", authentication, createComment); // create a comment
commentsRouter.get("/forPost/:postId", authentication, getPostComments); // get a post comments
commentsRouter.put("/", authentication, updateComment); // update a comment
commentsRouter.delete("/:commentId", authentication, deleteComment); // delete a comment

module.exports = commentsRouter;
