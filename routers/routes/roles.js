const express = require("express");

const { createRole, getRole } = require("./../controllers/roles");
const authentication = require("./../middlewares/authentication");
const authorization = require("./../middlewares/authorization");

const rolesRouter = express.Router();

// require admin account.
rolesRouter.post("/createRole", authentication, authorization, createRole); // create role
rolesRouter.get("/getRole", authentication, authorization, getRole); // get all roles in database.

module.exports = rolesRouter;
