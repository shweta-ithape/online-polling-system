const mongoose = require("mongoose");

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 },
});

const pollSchema = new mongoose.Schema({
  title: { type: String, required: true },
  options: [optionSchema],
  createdAt: { type: Date, default: Date.now },
  voters: [{ type: String }] // ✅ track userIds who already voted
});

module.exports = mongoose.model("Poll", pollSchema);
