const { model } = require("mongoose");
const todos = require("./../../db/models/todos");
const todosModel = require("./../../db/models/todos");

const createTodo = (req, res) => {
  try {
    const { name } = req.body;

    const newTodo = new todosModel({
      name,
      ref: req.token.id,
    });

    newTodo
      .save()
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getUserTodos = (req, res) => {
  try {
    todosModel
      .find({ id: req.token.id, isDel: false })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json(error);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getTodoById = (req, res) => {
  try {
    const { id } = req.body;

    todosModel
      .findById(id)
      .then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json("todos dose not exist");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(404).json(err);
  }
};

const updateTodo = (req, res) => {
  try {
    const { id, newName } = req.body;
    todosModel
      .findByIdAndUpdate(id, { name: newName })
      .then((result) => {
        if(result) res.status(200).json(result);
        else res.status(404).json("the todo is not exist")
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const deleteTodo = (req, res) => {
  try {
    const { id } = req.params;

    todosModel
      .findByIdAndUpdate(id, { $set: { isDel: true } })
      .then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json("the todo is not exist");
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

const getAllTodos = (req, res) => {
  try {
    console.log(true);
    todosModel
      .find({ isDel: false })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (err) {
    res.status(400).json(err);
  }
};

module.exports = {
  createTodo,
  getUserTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getAllTodos,
};
