import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PollDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 Get or create unique userId from localStorage
  const getUserId = () => {
    let storedId = localStorage.getItem("userId");
    if (!storedId) {
      storedId = "user-" + Math.random().toString(36).substring(2, 12);
      localStorage.setItem("userId", storedId);
    }
    return storedId;
  };
  const userId = getUserId();

  useEffect(() => {
    fetchPoll();
  }, [id]);

  const fetchPoll = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/polls/${id}`);
      if (!response.ok) {
        throw new Error('Poll not found');
      }
      const data = await response.json();
      setPoll(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching poll:', error);
      setLoading(false);
      setPoll(null);
    }
  };

  // 🔹 Cast vote (only once per user per poll)
  const handleVote = async (optionId) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/polls/${id}/vote/${optionId}`,
        {
          method: 'PATCH',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }), // ✅ send unique userId
        }
      );

      const data = await res.json();
      if (res.ok) {
        alert("Vote cast successfully!");
        fetchPoll(); // refresh poll
      } else {
        alert(data.message || "Error casting vote");
      }
    } catch (error) {
      console.error("Error voting:", error);
      alert("Could not cast vote. Please try again.");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this poll?")) {
      try {
        const response = await fetch(`http://localhost:5000/api/polls/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          navigate('/');
        } else {
          throw new Error('Failed to delete poll');
        }
      } catch (error) {
        console.error('Error deleting poll:', error);
        alert('Could not delete the poll. Please try again.');
      }
    }
  };

  if (loading) {
    return <div className="text-center card-floating">Loading...</div>;
  }

  if (!poll) {
    return <div className="text-center card-floating">Poll not found.</div>;
  }

  const totalVotes = poll.options.reduce((sum, option) => sum + option.votes, 0);

  return (
    <div className="card-floating">
      <h2>{poll.title}</h2>
      <div className="poll-options mb-4">
        {poll.options.map((option) => {
          const percentage = totalVotes === 0 ? 0 : ((option.votes / totalVotes) * 100).toFixed(1);
          return (
            <div
              key={option._id}
              className="d-flex justify-content-between align-items-center bg-light p-3 rounded mb-2 shadow-sm"
            >
              <div className="flex-grow-1 me-3">{option.text}</div>
              <div className="vote-info d-flex align-items-baseline">
                <span className="fw-bold me-1">{option.votes} votes</span>
                <span className="text-muted">({percentage}%)</span>
              </div>
              <button
                onClick={() => handleVote(option._id)}
                className="btn btn-primary btn-sm ms-3"
              >
                Vote
              </button>
            </div>
          );
        })}
      </div>
      <p className="text-center fw-bold">Total Votes: {totalVotes}</p>
      <div className="text-center mt-4">
        <button onClick={handleDelete} className="btn btn-danger">
          Delete Poll
        </button>
      </div>
    </div>
  );
};

export default PollDetailPage;
