const mongoose = require("mongoose");

const likes = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Users" },
  post: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Posts" },
});

module.exports = mongoose.model("Likes", likes);
