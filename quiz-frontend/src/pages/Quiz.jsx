import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Quiz() {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [quizTitle, setQuizTitle] = useState("Untitled Quiz");
  const navigate = useNavigate();

  useEffect(() => {
    api.get(`/quiz/get/${id}`).then((res) => {
      setQuestions(res.data);
    });

    api.get("/quiz/all").then((res) => {
      if (res.data && res.data.title) {
        setQuizTitle(res.data.title);
      }
    });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = Object.keys(answers).map(Number);
    const ans = Object.values(answers);
    const res = await api.post('/quiz/score', { ids, answers: ans });

    const score = res.data;
    const totalQuestions = questions.length;

    // ✅ Save score to localStorage history
    const username = localStorage.getItem("username");
    const historyKey = `history-${username}`;
    const existingHistory = JSON.parse(localStorage.getItem(historyKey) || "[]");

    const newEntry = {
      date: new Date().toLocaleString(),
      title: quizTitle || `Quiz ${id}`,
      score,
      total: totalQuestions
    };

    localStorage.setItem(historyKey, JSON.stringify([...existingHistory, newEntry]));

    // ✅ Store score for score page and redirect
    localStorage.setItem('score', score);
    navigate('/score');
  };

  return (
    <div className="container mt-5 text-light">
      <h3 className="text-center mb-4">🧠 Quiz Time</h3>
      <form onSubmit={handleSubmit}>
        {questions.map((q, idx) => (
          <div key={q.id} className="card bg-dark border-secondary mb-4 p-3 shadow-sm">
            <h5>Q{idx + 1}: {q.questionTitle}</h5>
            {[q.option1, q.option2, q.option3, q.option4].map((opt, i) => (
              <div className="form-check" key={i}>
                <input
                  className="form-check-input"
                  type="radio"
                  name={q.id}
                  value={opt}
                  onChange={(e) => setAnswers({ ...answers, [q.id]: e.target.value })}
                  required
                />
                <label className="form-check-label">{opt}</label>
              </div>
            ))}
          </div>
        ))}
        <button className="btn btn-primary w-100 rounded-pill">Submit Quiz ✅</button>
      </form>
    </div>
  );
}
