const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  imgUrl: { type: String },
  desc: { type: String, required: true },
  createrID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comments",
    },
  ],
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Likes",
    },
  ],
  isDel: { type: Boolean, default: false },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Posts", posts);
