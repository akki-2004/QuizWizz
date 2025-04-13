import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [quizzes, setQuizzes] = useState([]); // Ensure default is an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    axios.get('http://localhost:8080/quiz/all') // Ensure correct API endpoint
      .then(res => {
        console.log("API Response:", res.data); // Debugging log
        if (res.data && typeof res.data === 'object') { // Ensure it's an object
          setQuizzes([res.data]); // Convert object to an array
        } else {
          setError("Unexpected response format");
        }
      })
      .catch(err => {
        console.error("API Error:", err);
        setError("Failed to fetch quizzes");
      })
      .finally(() => setLoading(false));
  }, []);
  

  if (loading) return <p>Loading quizzes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
        <button onClick={() => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}}>
  Logout
</button>

      <h1>Student Dashboard</h1>
      <ul>
        {quizzes.map(quiz => (
          <li key={quiz.id}>
            <Link to={`/quiz/take/${quiz.id}`}>{quiz.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudentDashboard;
