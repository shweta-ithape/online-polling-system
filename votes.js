// backend/routes/votes.js
const express = require("express");
const router = express.Router();
const Vote = require("../models/Vote"); // your Vote model
const Poll = require("../models/Poll"); // your Poll model

// Cast a vote (avoid multiple votes)
router.post("/", async (req, res) => {
  try {
    const { user_id, poll_id, option_id } = req.body;

    // Check if user already voted in this poll
    const existingVote = await Vote.findOne({ user_id, poll_id });
    if (existingVote) {
      return res.status(400).json({ message: "You have already voted in this poll." });
    }

    // Save new vote
    const newVote = new Vote({ user_id, poll_id, option_id });
    await newVote.save();

    res.json({ message: "Vote cast successfully", vote: newVote });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
