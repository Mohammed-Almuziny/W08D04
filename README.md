# W08D04

## social media API

this API is social media useing crud operations

## Features

create role.
get all roles in database.
create new user.
log in by eamil and password.
get all users in database.
delete a user.
create post.
get user post.
upadet post.
delete post.
get all post.
like a post.
create comment.
get comment for one post.
delete comment.

## used library

- express
- cors
- morgan
- dotenv
- mongoose
- bcrypt
- jsonwebtoken

## routers

users router

```
usersRouter.post("/register", register); // create new user.
usersRouter.post("/logIn", logIn); // log in by eamil and password.

// require admin account.
usersRouter.get("/allUsers", authentication, authorization, getAllUsers); // get all users in databas
usersRouter.delete("/users/:id", authentication, authorization, deleteUser); // delete a user.
```

roles router

```
// require admin account.
rolesRouter.post("/createRole", authentication, authorization, createRole); // create role
rolesRouter.get("/getRole", authentication, authorization, getRole); // get all roles in database.
```

posts routers

```
postsRouter.post("/create", authentication, createPost); // create a new post
postsRouter.get("/userPosts", authentication, getUserPosts); // get the user posts
postsRouter.put("/update", authentication, updatePost); // update the post
postsRouter.delete("/:postId", authentication, deletePost); // delete the post
postsRouter.get("/allPosts", authentication, getAllPosts); //  get all posts
postsRouter.post("/like", authentication, isLiked, handleLike); // like a post
```

comments router

```
commentsRouter.post("/create", authentication, createComment); // create a comment
commentsRouter.get("/forPost/:postId", authentication, getPostComments); // get a post comments
commentsRouter.put("/", authentication, updateComment); // update a comment
commentsRouter.delete("/:commentId", authentication, deleteComment); // delete a comment
```

## database models

users model

```
const users = new mongoose.Schema({
  avatar: { type: String, default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"},
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Roles",
    default: "61a735c3931d13080ac69fef",
  },
  isDel: { type: Boolean, default: false },
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

posts model

```
const posts = new mongoose.Schema({
  imgUrl: { type: String },
  desc: { type: String, required: true },
  createrID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  isDel: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
});
```

comments model

```
const comments = new mongoose.Schema({
  desc: { type: String, required: true },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  ref: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Posts" },
  date: { type: Date, default: new Date() },
  isDel: { type: Boolean, default: false },
});
```

like model

```
const likes = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Posts" },
});
```

## Diagrams

### ER Diagrams

 <img src="./ERDiagram.png" alt="ER Diagram" style="zoom:75%;" />
