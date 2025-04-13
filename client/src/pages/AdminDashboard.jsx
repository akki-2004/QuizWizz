import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    axios.get('/quiz/all')
      .then(res => {
        console.log("API Response:", res.data);
        setQuizzes(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => console.error(err));
  }, []);
  

  return (
    <div>
        <button onClick={() => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.location.href = "/login";
}}>
  Logout
</button>

      <h1>Admin Dashboard</h1>
      <Link to="/admin/create-quiz">Create Quiz</Link>
      <ul>
      {Array.isArray(quizzes) && quizzes.map(quiz => (
  <li key={quiz.id}>{quiz.title}</li>
))}

      </ul>
    </div>
  );
};

export default AdminDashboard;