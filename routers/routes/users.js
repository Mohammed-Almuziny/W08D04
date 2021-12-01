const express = require("express");

const {
  register,
  logIn,
  getAllUsers,
  deleteUser,
} = require("./../controllers/users");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register); // create new user.
usersRouter.post("/logIn", logIn); // log in by eamil and password.

// require admin account.
usersRouter.get("/allUsers", authentication, authorization, getAllUsers); // get all users in databas
usersRouter.delete("/users/:id", authentication, authorization, deleteUser); // delete a user.

module.exports = usersRouter;
