const express = require("express");

const {
  createTodo,
  getUserTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getAllTodos,
} = require("./../controllers/todos");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const todosRouter = express.Router();

todosRouter.post("/create", authentication, createTodo); // create todo tasks.
todosRouter.get("/", authentication, getUserTodos); //  get todos list to the user.
todosRouter.post("/todoById", getTodoById); // get todo task by id.
todosRouter.put("/update", authentication, updateTodo); //  update todo task.
todosRouter.delete("/delete/:id", authentication, deleteTodo); //  delete todo task.

// require admin account.
todosRouter.get("/allTodos", authentication, authorization, getAllTodos); // get all todo tasks.

module.exports = todosRouter;
