// backend/routes/polls.js
const express = require("express");
const router = express.Router();
const Poll = require("../models/Poll");

// Create new poll
router.post("/", async (req, res) => {
  try {
    const { title, description, options } = req.body;

    const newPoll = new Poll({ title, description, options });
    await newPoll.save();

    res.json({ message: "Poll created successfully", poll: newPoll });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch all polls for homepage
router.get("/", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 }); // newest first
    res.json(polls);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
