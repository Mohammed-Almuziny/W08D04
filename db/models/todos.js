const mongoose = require("mongoose");

const todos = new mongoose.Schema({
  name: { type: String, required: true },
  isDel: { type: Boolean, default: false, required: true },
  ref: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
});

module.exports = mongoose.model("Todos", todos);
