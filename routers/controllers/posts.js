const postsModel = require("./../../db/models/posts");
const rolesModel = require("./../../db/models/roles");
const likesModel = require("./../../db/models/likes");

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
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getUserPosts = (req, res) => {
  try {
    postsModel
      .find({ createrID: req.token.id, isDel: false })
      .populate({ path: "createrID", select: "name", match: { isDel: false } })
      .populate({
        path: "comments",
        select: "desc creatorId",
        match: { isDel: false },
        populate: { path: "creatorId", select: "name" },
      })
      .populate({
        path: "likes",
        select: "user",
        populate: { path: "user", select: "name" },
      })
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

const updatePost = async (req, res) => {
  try {
    const { postId, imgUrl, desc } = req.body;

    postsModel
      .findOneAndUpdate(
        { createrID: req.token.id, _id: postId },
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
        res.status(400).json({ error: err.message });
      });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const user = await rolesModel.findById(req.token.role);

    if (user.role === "admin") {
      postsModel
        .findOneAndUpdate(
          { _id: postId, isDel: false },
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
    } else {
      postsModel
        .findOneAndUpdate(
          { createrID: req.token.id, _id: postId, isDel: false },
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

const getAllPosts = (req, res) => {
  try {
    postsModel
      .find({ isDel: false })
      .populate({ path: "createrID", select: "name", match: { isDel: false } })
      .populate({
        path: "comments",
        select: "desc creatorId",
        match: { isDel: false },
        populate: { path: "creatorId", select: "name" },
      })
      .populate({
        path: "likes",
        select: "user",
        populate: { path: "user", select: "name" },
      })
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

const handleLike = (req, res) => {
  try {
    const { postId } = req.body;

    console.log(req.isLiked);

    if (req.isLiked) {
      likesModel
        .findOneAndDelete({ user: req.token.id, post: postId })
        .then((result) => {
          res.status(201).json({ unlike: result });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    } else {
      const newLike = new likesModel({
        user: req.token.id,
        post: postId,
      });

      newLike
        .save()
        .then((result) => {
          postsModel
            .findByIdAndUpdate(postId, { $push: { likes: result._id } })
            .then((result) => {
              console.log(result);
            })
            .catch((err) => {
              console.log(err);
            });

          res.status(201).json({ like: result });
        })
        .catch((err) => {
          res.status(400).json({ error: err.message });
        });
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const checkLike = (req, res) => {
  try {
    res.status(200).json(req.isLiked);
  } catch (error) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = {
  createPost,
  getUserPosts,
  updatePost,
  deletePost,
  getAllPosts,
  handleLike,
  checkLike,
};
