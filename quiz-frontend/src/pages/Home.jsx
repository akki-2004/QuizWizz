import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Home() {
  const { role, username } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    if (role === "STUDENT") {
      api.get("/quiz/all")
        .then((res) => setQuiz(res.data))
        .catch(() => console.log("Failed to fetch quiz"));
    }

    if (role === "ADMIN") {
      api.get("/admin/scores") // backend route for fetching all user scores
        .then((res) => setScores(res.data))
        .catch(() => console.log("Failed to fetch scores"));
    }
  }, [role]);

  if (role === "ADMIN") {
    return (
      <div className="container mt-5 text-light">
        <h2 className="mb-4">📊 Admin Dashboard</h2>
        <Link to="/admin/create" className="btn btn-warning me-3">➕ Create New Quiz</Link>
        <h4 className="mt-4 mb-3">Student Scores</h4>
        {scores.length === 0 ? (
          <p>No scores submitted yet.</p>
        ) : (
          <table className="table table-dark table-striped table-hover">
            <thead>
              <tr>
                <th>User</th>
                <th>Quiz Title</th>
                <th>Score</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {scores.map((s, idx) => (
                <tr key={idx}>
                  <td>{s.username}</td>
                  <td>{s.quizTitle}</td>
                  <td>{s.score}/{s.total}</td>
                  <td>{s.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    );
  }

  // STUDENT View
  return (
    <div className="container mt-5 text-light">
      <h2 className="text-center mb-4">🎯 Latest Quiz</h2>
      {quiz ? (
        <div className="card p-4 bg-dark text-light rounded-4 shadow-lg">
          <h3>{quiz.title}</h3>
          <p>Total Questions: {quiz.questions.length}</p>
          <Link
            to={`/quiz/${quiz.id}`}
            className="btn btn-primary rounded-pill px-4"
          >
            Start Quiz 🚀
          </Link>
        </div>
      ) : (
        <div className="text-center">Loading quiz...</div>
      )}
    </div>
  );
}
