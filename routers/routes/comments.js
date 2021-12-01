const express = require("express");

const { createComment } = require("./../controllers/comments");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const commentsRouter = express.Router();

commentsRouter.post("/create", authentication, createComment);

module.exports = commentsRouter;
