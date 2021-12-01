const postsModel = require("./../../db/models/posts");
const rolesModel = require("./../../db/models/roles");

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

const getUserPosts = (req, res) => {
  try {
    const { createrID } = req.params;

    postsModel
      .find({ createrID: createrID, isDel: false })
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((error) => {
        res.status(400).json({ error: err });
      });
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

const updatePost = async (req, res) => {
  try {
    const { postId, createrId, imgUrl, desc } = req.body;

    const user = await rolesModel.findById(req.token.role);

    if (user.role === "admin") {
      postsModel
        .findByIdAndUpdate(
          postId,
          { imgUrl, desc },
          {
            new: true,
          }
        )
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).json({ message: "this post dont exist" });
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    } else {
      postsModel
        .findOneAndUpdate(
          { createrID: req.token.id, _Id: postId },
          { imgUrl, desc },
          {
            new: true,
          }
        )
        .then((result) => {
          if (result) res.status(200).json(result);
          else res.status(400).json({ message: "this post dont exist" });
        })
        .catch((err) => {
          res.status(400).json({ error: err });
        });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ error: err });
  }
};

module.exports = { createPost, getUserPosts, updatePost };
