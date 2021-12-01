const postsModel = require("./../../db/models/posts");
const likesModel = require("./../../db/models/likes");

const isLiked = async (req, res, next) => {
  try {
    const { postId } = req.body;

    postsModel
      .find({ _id: postId, isDel: false })
      .then((result) => {
        if (result) {
          likesModel
            .findOne({ user: req.token.id, postId: postId })
            .then((result) => {
              if (result) {
                req.isLiked = true;
                next();
              } else {
                req.isLiked = false;
                next();
              }
            })
            .catch((err) => {
              res.status(400).json({ error: err.message });
            });
        } else {
          res.status(404).json({ message: "this post dont exist" });
        }
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      });
  } catch (err) {
    res.status(403).json({ error: err.message });
  }
};

module.exports = isLiked;
