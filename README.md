# W08D03

## sample todo list API

this API is simple todo list useing crud operations

## Features

create role.
get all roles in database.
create new user.
log in by eamil and password.
get all users in database.
delete a user.
create todo tasks.
get todos list to the user.
get todo task by id.
update todo task.
delete todo task.
get all todo tasks.

## used library

- express
- cors
- morgan
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

## routes

users route

```
usersRouter.post("/register", register); // create new user.
usersRouter.post("/logIn", logIn); // log in by eamil and password.

// require admin account.
usersRouter.get("/allUsers", authentication, authorization, getAllUsers); // get all users in databas
usersRouter.delete("/users/:id", authentication, authorization, deleteUser); // delete a user.
```

roles routes

```
// require admin account.
rolesRouter.post("/createRole", authentication, authorization, createRole); // create role
rolesRouter.get("/getRole", authentication, authorization, getRole); // get all roles in database.
```

todos routes

```
todosRouter.post("/create", authentication, createTodo); // create todo tasks.
todosRouter.get("/", authentication, getUserTodos); //  get todos list to the user.
todosRouter.post("/todoById", getTodoById); // get todo task by id.
todosRouter.put("/update", authentication, updateTodo); //  update todo task.
todosRouter.delete("/delete/:id", authentication, deleteTodo); //  delete todo task.

// require admin account.
todosRouter.get("/allTodos", authentication, authorization, getAllTodos); // get all todo tasks.
```

## database models
users model 
```
const mongoose = require("mongoose");

const users = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles" },
});
```
roles model
```
const mongoose = require("mongoose");

const roles = new mongoose.Schema({
  role: { type: String, required: true },
  permissions: { type: Array, required: true },
});
```
todos model 
```
const mongoose = require("mongoose");

const todos = new mongoose.Schema({
  name: { type: String, required: true },
  isDel: { type: Boolean, default: false, required: true },
  ref: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Todos", todos);
```
