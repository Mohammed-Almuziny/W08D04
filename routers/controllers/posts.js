const postsModel = require("./../../db/models/posts");

const createPost = (req, res) => {
  try {
    const { desc } = req.body;

    const newPost = new postsModel({
      desc,
      createrID: req.token.id,
    });

    newPost
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const getUserPost = (req, res) => {
  try {
    const { createrID } = req.params;

    postsModel
      .find({ createrID: createrID, isDel: false })
      .then((result) => {
        res.status(200).json(result);
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { createPost, getUserPost };