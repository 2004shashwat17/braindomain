import React, { useState } from "react";
import "./ShapeSorter.css";

const shapes = {
  low: ["circle", "square", "triangle"],
  medium: ["pentagon", "hexagon", "star"],
  hard: ["heart", "crescent", "parallelogram"],
};

const ShapeSorter = () => {
  const [difficulty, setDifficulty] = useState("low");
  const [draggedShape, setDraggedShape] = useState(null);

  const handleDragStart = (shape) => {
    setDraggedShape(shape);
  };

  const handleDrop = (outline) => {
    if (outline === draggedShape) {
      alert("Matched!");
    } else {
      alert("Try again!");
    }
    setDraggedShape(null);
  };

  return (
    <div className="shape-sorter">
      <h2>Shape Sorter</h2>
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
      <div className="shapes">
        {shapes[difficulty].map((shape, index) => (
          <div
            key={index}
            draggable
            onDragStart={() => handleDragStart(shape)}
            className={`shape ${shape}`}
          >
            {shape}
          </div>
        ))}
      </div>
      <div className="outlines">
        {shapes[difficulty].map((outline, index) => (
          <div
            key={index}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(outline)}
            className={`outline ${outline}`}
          >
            {outline}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShapeSorter;
