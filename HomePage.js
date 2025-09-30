import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const [polls, setPolls] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Replace this with actual logged-in userId from auth later
  const userId = "66eeb9a9c5d31babc1234567"; // Example user ID for testing

  // Fetch polls from backend on component mount
  useEffect(() => {
    fetchPolls();
  }, []);

  const fetchPolls = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/polls');
      const data = await response.json();
      setPolls(data);
    } catch (error) {
      console.error('Error fetching polls:', error);
    }
  };

  // Delete poll handler
  const handleDelete = async (pollId) => {
    if (window.confirm('Are you sure you want to delete this poll?')) {
      try {
        await fetch(`http://localhost:5000/api/polls/${pollId}`, {
          method: 'DELETE',
        });
        fetchPolls(); // refresh polls after deletion
      } catch (error) {
        console.error('Error deleting poll:', error);
      }
    }
  };

  // ✅ Cast Vote handler
  const castVote = async (pollId, optionId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/polls/${pollId}/vote/${optionId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }), // send userId
      });

      const data = await res.json();
      if (res.ok) {
        alert("Vote cast successfully!");
        setPolls(prev => prev.map(p => (p._id === pollId ? data : p))); // update poll in UI
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error casting vote:", error);
    }
  };

  // Calculate total votes for each poll
  const pollsWithVotes = polls.map((poll) => ({
    ...poll,
    votes: poll.options ? poll.options.reduce((sum, o) => sum + o.votes, 0) : 0,
  }));

  // Filter polls based on search term
  const filteredPolls = pollsWithVotes.filter((poll) =>
    poll.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to show relative time
  const getRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    const minutes = Math.floor(diffInSeconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const weeks = Math.floor(days / 7);

    if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    return 'just now';
  };

  return (
    <>
      <div className="card-floating text-center mb-5">
        <h1 className="mb-4">Online Polling System</h1>
        <p className="lead">Available Polls</p>
        <Link to="/create" className="btn btn-primary d-inline-block mt-3">
          Create a New Poll
        </Link>
      </div>

      <div className="card-floating">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0">Recent Polls</h2>
          <div className="search-bar">
            <input
              type="text"
              className="form-control"
              placeholder="Search polls..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ul className="list-unstyled">
          {filteredPolls.length > 0 ? (
            filteredPolls.map((poll) => (
              <li
                key={poll._id}
                className="poll-list-item mb-4"
              >
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="d-flex align-items-center">
                    <span style={{ fontSize: '1rem', color: '#e74c3c' }}>&#9679;</span>
                    <span className="ms-2 me-3">{poll.title}</span>
                  </div>
                  <span className="poll-meta me-3">
                    {poll.votes} vote{poll.votes !== 1 ? 's' : ''} &bull;{' '}
                    {poll.createdAt ? getRelativeTime(poll.createdAt) : 'just now'}
                  </span>
                </div>

                {/* ✅ Show options with vote buttons */}
                <ul>
                  {poll.options && poll.options.map(option => (
                    <li key={option._id} className="d-flex justify-content-between align-items-center mb-1">
                      <span>{option.text} ({option.votes} votes)</span>
                      <button
                        onClick={() => castVote(poll._id, option._id)}
                        className="btn btn-sm btn-primary"
                      >
                        Vote
                      </button>
                    </li>
                  ))}
                </ul>

                <div className="poll-actions d-flex gap-2 mt-2">
                  <Link to={`/polls/${poll._id}`} className="btn btn-sm btn-view">
                    View
                  </Link>
                  <Link to={`/edit/${poll._id}`} className="btn btn-sm btn-edit">
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(poll._id)}
                    className="btn btn-sm btn-delete"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))
          ) : (
            <p className="text-center text-muted">No polls found.</p>
          )}
        </ul>
      </div>
    </>
  );
};

export default HomePage;
