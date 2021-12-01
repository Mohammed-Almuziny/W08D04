const commentsModel = require("./../../db/models/comments");

const createComment = (req, res) => {
  try {
    const { desc, ref } = req.body;

    const newComment = new commentsModel({
      desc,
      createrID: req.token.id,
      ref,
    });

    newComment
      .save()
      .then((result) => {
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    res.status(404).json({ error: err });
  }
};

module.exports = { createComment };
