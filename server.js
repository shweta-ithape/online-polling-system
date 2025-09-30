const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const pollsRoute = require("./routes/polls");
const votesRoute = require("./routes/votes");
const Poll = require("./models/Poll"); // ✅ Use model from models/Poll.js

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Custom Routes
app.use("/polls", pollsRoute);
app.use("/votes", votesRoute);

// MongoDB Connection
mongoose
  .connect("mongodb://localhost:27017/polling_system", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------- API Routes ----------------

// Create a new poll
app.post("/api/polls", async (req, res) => {
  try {
    const { title, options } = req.body;
    const newPoll = new Poll({ title, options });
    await newPoll.save();
    res.status(201).json(newPoll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all polls
app.get("/api/polls", async (req, res) => {
  try {
    const polls = await Poll.find().sort({ createdAt: -1 });
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single poll
app.get("/api/polls/:id", async (req, res) => {
  try {
    const poll = await Poll.findById(req.params.id);
    if (!poll) return res.status(404).json({ message: "Poll not found" });
    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a vote
// Submit a vote (only once per user)
app.patch("/api/polls/:pollId/vote/:optionId", async (req, res) => {
  try {
    const { pollId, optionId } = req.params;
    const { userId } = req.body; // ✅ frontend must send userId

    if (!userId) {
      return res.status(400).json({ message: "User ID is required to vote" });
    }

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    // ✅ Check if user already voted
    if (poll.voters.includes(userId)) {
      return res.status(400).json({ message: "You have already voted!" });
    }

    // ✅ Find the option and increment votes
    const option = poll.options.id(optionId);
    if (!option) return res.status(404).json({ message: "Option not found" });

    option.votes += 1;
    poll.voters.push(userId); // ✅ mark this user as voted
    await poll.save();

    res.json({ message: "Vote cast successfully", poll });
  } catch (error) {
    console.error("Error casting vote:", error);
    res.status(500).json({ message: "Error casting vote", error });
  }
});




// Update a poll
app.put("/api/polls/:id", async (req, res) => {
  try {
    const { title, options } = req.body;
    const poll = await Poll.findByIdAndUpdate(
      req.params.id,
      { title, options },
      { new: true, runValidators: true }
    );

    if (!poll) return res.status(404).json({ message: "Poll not found" });
    res.json(poll);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a poll
app.delete("/api/polls/:id", async (req, res) => {
  try {
    const poll = await Poll.findByIdAndDelete(req.params.id);

    if (!poll) {
      return res.status(404).json({ message: "Poll not found" });
    }

    res.status(200).json({ message: "Poll deleted successfully" });
  } catch (error) {
    console.error("Error deleting poll:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Start the server
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
