const express = require("express");
const passport = require("passport");

const {
  register,
  verifyUser,
  logIn,
  getAllUsers,
  deleteUser,
} = require("./../controllers/users");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const usersRouter = express.Router();

usersRouter.post("/register", register); // create new user.
usersRouter.get("/user/verify/:id", verifyUser);
usersRouter.post("/logIn", logIn); // log in by eamil and password.
usersRouter.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);
usersRouter.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/auth/google/failure",
  })
);

// require admin account.
usersRouter.get("/allUsers", authentication, authorization, getAllUsers); // get all users in databas
usersRouter.delete("/users/:id", authentication, authorization, deleteUser); // delete a user.

module.exports = usersRouter;
