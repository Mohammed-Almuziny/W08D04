const commentsModel = require("./../../db/models/comments");
const postsModel = require("./../../db/models/posts");
const rolesModel = require("./../../db/models/roles");

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

        postsModel
          .findByIdAndUpdate(ref, { $push: { comments: result._id } })
          .then((result) => {
            console.log(result);
          })
          .catch((err) => {
            console.log(err);
          });
        res.status(201).json(result);
      })
      .catch((err) => {
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
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
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;

    const user = await rolesModel.findById(req.token.role);

    if (user.role === "admin") {
      commentsModel
        .findOneAndUpdate(
          { _id: commentId, isDel: false },
          { isDel: true },
          {
            new: true,
          }
        )
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).json({ message: "this comment dont exist" });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } else {
      commentsModel
        .findOneAndUpdate(
          { creatorID: req.token.id, _id: commentId, isDel: false },
          { isDel: true },
          {
            new: true,
          }
        )
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).json({ message: "this post dont exist" });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createComment,
  getPostComments,
  updateComment,
  deleteComment,
};
