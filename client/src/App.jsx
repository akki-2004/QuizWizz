import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import Quiz from './pages/Quiz';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import CreateQuiz from './pages/CreateQuiz';
import TakeQuiz from './pages/TakeQuiz';
import Results from './pages/Results';
import axios from 'axios';
import './App.css';
import { useState } from "react";
import Register from './Components/Register';
function App() {
  const [auth, setAuth] = useState(!!localStorage.getItem("token"));
  const role = localStorage.getItem("role");
  return (
    // <Router>
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/login" element={<Login setAuth={setAuth} />} />
        <Route path="/admin-dashboard" element={auth && role === "ADMIN" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/student-dashboard" element={auth && role === "STUDENT" ? <StudentDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/create-quiz" element={<CreateQuiz />} />
        <Route path="/quiz/take/:quizId" element={<TakeQuiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      </>
    // </Router>
  );
}

export default App;