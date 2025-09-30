import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreatePollPage = () => {
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState(['', '']);
  const navigate = useNavigate();

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const addOption = () => {
    setOptions([...options, '']);
  };

  const removeOption = (index) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formattedOptions = options.filter(opt => opt.trim() !== '').map(opt => ({ text: opt }));

    if (formattedOptions.length < 2) {
      alert('Please provide at least two options.');
      return;
    }

    await fetch('http://localhost:5000/api/polls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, options: formattedOptions }),
    });

    navigate('/');
  };

  return (
    <div className="card-floating"> {/* WRAP CONTENT HERE */}
      <h2>Create New Poll</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label>Poll Title:</label>
          <input
            type="text"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group mb-3">
          <label>Options:</label>
          {options.map((option, index) => (
            <div key={index} className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => removeOption(index)}
                className="btn btn-danger"
              >
                -
              </button>
            </div>
          ))}
          <button type="button" onClick={addOption} className="btn btn-success mt-2">
            + Add Option
          </button>
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Poll</button>
      </form>
    </div>
  );
};

export default CreatePollPage;