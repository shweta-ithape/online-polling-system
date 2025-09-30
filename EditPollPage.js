import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const EditPollPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPollForEdit();
  }, [id]);

  const fetchPollForEdit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/polls/${id}`);
      const data = await response.json();
      setTitle(data.title);
      setOptions(data.options.map(opt => ({ _id: opt._id, text: opt.text, votes: opt.votes })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching poll:', error);
      setLoading(false);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index].text = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, { text: '', votes: 0 }]);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = options.filter(opt => opt.text.trim() !== '');

    if (formattedOptions.length < 2) {
      alert('Please provide at least two options.');
      return;
    }

    try {
      await fetch(`http://localhost:5000/api/polls/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, options: formattedOptions }),
      });
      navigate('/');
    } catch (error) {
      console.error('Error updating poll:', error);
      alert('Could not update the poll. Please try again.');
    }
  };

  if (loading) {
    return <div className="text-center card-floating">Loading...</div>; // Added card-floating
  }

  return (
    <div className="card-floating"> {/* WRAP CONTENT HERE */}
      <h2>Edit Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3"> {/* Added mb-3 for spacing */}
          <label>Poll Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3"> {/* Added mb-3 for spacing */}
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={option._id || index} className="input-group mb-3"> {/* Added input-group and mb-3 */}
              <input
                type="text"
                className="form-control"
                value={option.text}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              <button type="button" onClick={() => removeOption(index)} className="btn btn-danger">
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption} className="btn btn-success mt-2">
            + Add Option
          </button>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Update Poll</button>
      </form>
    </div>
  );
};

export default EditPollPage;