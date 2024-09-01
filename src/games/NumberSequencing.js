import React, { useState, useEffect } from 'react';
import './NumberSequencing.css';

const NumberSequencing = () => {
  const [difficulty, setDifficulty] = useState('low');
  const [sequence, setSequence] = useState([]);
  const [score, setScore] = useState(0);

  const numbers = {
    low: [1, 2, 3, 4, 5],
    medium: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    hard: Array.from({ length: 20 }, (_, i) => i + 1),
  };

  useEffect(() => {
    setSequence(numbers[difficulty].sort(() => Math.random() - 0.5));
  }, [difficulty]);

  const handleDrop = (event, index) => {
    event.preventDefault();
    const newSequence = [...sequence];
    const draggedIndex = Number(event.dataTransfer.getData('text/plain'));
    const draggedItem = newSequence[draggedIndex];
    newSequence.splice(draggedIndex, 1);
    newSequence.splice(index, 0, draggedItem);
    setSequence(newSequence);

    if (JSON.stringify(newSequence) === JSON.stringify(numbers[difficulty].sort((a, b) => a - b))) {
      setScore(score + 1); // Award 1 point for correct sequence
      alert('Correct Sequence! You earned 1 point.');
    }
  };

  const handleDragStart = (event, index) => {
    event.dataTransfer.setData('text/plain', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="number-sequencing">
      <h2>Number Sequencing</h2>
      <div className="difficulty-selector">
        <label>
          <input
            type="radio"
            name="difficulty"
            value="low"
            checked={difficulty === 'low'}
            onChange={() => setDifficulty('low')}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            checked={difficulty === 'medium'}
            onChange={() => setDifficulty('medium')}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={difficulty === 'hard'}
            onChange={() => setDifficulty('hard')}
          />
          Hard
        </label>
      </div>
      <div className="sequence-grid">
        {sequence.map((num, index) => (
          <div
            key={index}
            className="number-box"
            draggable
            onDragStart={(event) => handleDragStart(event, index)}
            onDrop={(event) => handleDrop(event, index)}
            onDragOver={handleDragOver}
          >
            {num}
          </div>
        ))}
      </div>
      <div className="score">
        <h3>Score: {score}</h3>
      </div>
    </div>
  );
};

export default NumberSequencing;
