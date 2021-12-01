const mongoose = require("mongoose");

const users = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: mongoose.Schema.Types.ObjectId, ref: "Roles", default: "61a735c3931d13080ac69fef" },
});

module.exports = mongoose.model("Users", users);
