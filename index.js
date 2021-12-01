const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./db");

const rolesRouter = require("./routers/routes/roles");
const usersRouter = require("./routers/routes/users");
const todosRouter = require("./routers/routes/todos");

const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(rolesRouter);
app.use(usersRouter);
app.use("/todos", todosRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`SERVER ON ${PORT}`);
});
