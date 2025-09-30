const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  user_id: { type: String, required: true },
  poll_id: { type: mongoose.Schema.Types.ObjectId, ref: "Poll", required: true },
  option_id: { type: String, required: true }
}, { timestamps: true });

// Ensure one vote per user per poll
voteSchema.index({ user_id: 1, poll_id: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);
