import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Results = () => {
  const [score, setScore] = useState(null);

  useEffect(() => {
    const storedScore = localStorage.getItem('quizScore');
    if (storedScore) {
      setScore(storedScore);
    }
  }, []);

  return (
    <div>
      <h1>Quiz Results</h1>
      {score !== null ? <h2>Your Score: {score}</h2> : <p>No results available</p>}
    </div>
  );
};

export default Results;