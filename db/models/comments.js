const mongoose = require("mongoose");

const posts = new mongoose.Schema({
  desc: { type: String, required: true },
  createrID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Users",
  },
  ref: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Posts" },
  date: { type: Date, default: new Date() },
});

module.exports = mongoose.model("Posts", posts);
