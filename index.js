const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const passport = require("passport");
const session = require("express-session");
require("dotenv").config();

require("./db");
require("./utils/auth");

const rolesRouter = require("./routers/routes/roles");
const usersRouter = require("./routers/routes/users");
const postsRouter = require("./routers/routes/posts");
const commentsRouter = require("./routers/routes/comments");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.use(rolesRouter);
app.use(usersRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
