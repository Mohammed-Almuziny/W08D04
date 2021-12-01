const commentsModel = require("./../../db/models/comments");

const createComment = (req, res) => {
  try {
    const { desc, ref } = req.body;

    const newComment = new commentsModel({
      desc,
      creatorId: req.token.id,
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
    res.status(400).json({ error: err });
  }
};

const getPostComments = (req, res) => {
  try {
    const { postId } = req.params;

    commentsModel
      .find({ ref: postId })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const updateComment = (req, res) => {
  try {
    const { commentId, newDesc } = req.body;

    commentsModel
      .findOneAndUpdate(
        {
          _id: commentId,
          creatorId: req.token.id,
          isDel: false,
        },
        { desc: newDesc },
        { new: true }
      )
      .then((result) => {
        if (result) res.status(200).json(result);
        else res.status(404).json({ message: "this comment dose not exist" });
      })
      .catch((err) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = { createComment, getPostComments, updateComment };
