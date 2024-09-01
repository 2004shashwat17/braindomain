import React, { useState, useEffect } from "react";
import "./MemoryMatch.css";

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [moves, setMoves] = useState(0);
  const [difficulty, setDifficulty] = useState("low");
  const [score, setScore] = useState(0); 
  const [levelCleared, setLevelCleared] = useState(false); // Track if the level is cleared

  const cardImages = ["🐶", "🐱", "🐭", "🐰", "🦊", "🐻", "🐼", "🐯", "🦁", "🐮"];

  useEffect(() => {
    initializeGame();
  }, [difficulty]);

  const initializeGame = () => {
    let pairs = difficulty === "low" ? 3 : difficulty === "medium" ? 6 : 10;
    const shuffledCards = [
      ...cardImages.slice(0, pairs),
      ...cardImages.slice(0, pairs),
    ]
      .sort(() => Math.random() - 0.5)
      .map((card, index) => ({ id: index, content: card, flipped: false }));

    setCards(shuffledCards);
    setFlippedCards([]);
    setMatchedCards([]);
    setMoves(0);
    setLevelCleared(false); // Reset the level cleared status
  };

  const flipCard = (id) => {
    const newFlippedCards = [...flippedCards, id];
    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlippedCards;
      if (cards[first].content === cards[second].content) {
        setMatchedCards([...matchedCards, first, second]);
      }
      setTimeout(() => setFlippedCards([]), 1000);
    }
  };

  useEffect(() => {
    // Check if the game is won
    if (matchedCards.length === cards.length && cards.length > 0 && !levelCleared) {
      setScore(score + 1); // Increment score when a level is cleared
      setLevelCleared(true); // Mark the level as cleared
    }
  }, [matchedCards, cards.length, score, levelCleared]);

  return (
    <div className="memory-match">
      {/* <h2>Memory Match Game</h2> */}
      <div className="difficulty-selector">
        <label>
          <input
            type="radio"
            name="difficulty"
            value="low"
            checked={difficulty === "low"}
            onChange={() => setDifficulty("low")}
          />
          Low
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="medium"
            checked={difficulty === "medium"}
            onChange={() => setDifficulty("medium")}
          />
          Medium
        </label>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={difficulty === "hard"}
            onChange={() => setDifficulty("hard")}
          />
          Hard
        </label>
      </div>
      <div className="board">
        {cards.map((card, index) => (
          <div
            key={index}
            className={`card ${
              flippedCards.includes(index) || matchedCards.includes(index)
                ? "flipped"
                : ""
            }`}
            onClick={() =>
              flippedCards.length < 2 &&
              !flippedCards.includes(index) &&
              !matchedCards.includes(index) &&
              flipCard(index)
            }
          >
            <div className="card-inner">
              <div className="card-front">❓</div>
              <div className="card-back">{card.content}</div>
            </div>
          </div>
        ))}
      </div>
      <p>Moves: {moves}</p>
      <p>Score: {score}</p> {/* Display the score */}
    </div>
  );
};

export default MemoryMatch;
