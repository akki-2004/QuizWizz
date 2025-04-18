import React from 'react';

export default function Score() {
  const score = localStorage.getItem("score");

  return (
    <div className="container text-center text-light mt-5">
      <div className="card bg-dark shadow-lg p-5 rounded-4 border-success">
        <h2 className="mb-4">🎉 Quiz Completed!</h2>
        <h1 className="display-3 text-success fw-bold">{score}</h1>
        <p className="lead">Well done! Check the leaderboard or take another quiz.</p>
      </div>
    </div>
  );
}
