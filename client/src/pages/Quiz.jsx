import React from 'react';
import { useParams, Link } from 'react-router-dom';

const Quiz = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Quiz {id}</h1>
      <Link to={`/quiz/take/${id}`}>Start Quiz</Link>
    </div>
  );
};

export default Quiz;