#!/bin/bash

# === Create Project ===
npx create-react-app quiz-frontend
cd quiz-frontend

# === Install Dependencies ===
npm install bootstrap axios react-router-dom jwt-decode

# === Setup index.js ===
cat <<EOT > src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
EOT

# === Create Folders ===
mkdir -p src/pages src/components src/context src/services

# === Setup App.js ===
cat <<EOT > src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Score from "./pages/Score";
import History from "./pages/History";
import Admin from "./pages/Admin";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/score" element={<ProtectedRoute><Score /></ProtectedRoute>} />
          <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
EOT

# === Auth Context ===
cat <<EOT > src/context/AuthContext.js
import { createContext, useContext, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const username = token ? jwtDecode(token).sub : null;

  const login = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.clear();
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, login, logout, isLoggedIn: !!token }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
EOT

# === API Setup ===
cat <<EOT > src/services/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080"
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

export default api;
EOT

# === ProtectedRoute.jsx ===
cat <<EOT > src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/login" />;
}
EOT

# === Navbar.jsx ===
cat <<EOT > src/components/Navbar.jsx
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <Link className="navbar-brand" to="/">QuizWizz</Link>
      <div className="ms-auto">
        {isLoggedIn ? (
          <>
            <span className="text-white me-3">Hi, {username}</span>
            <Link to="/history" className="btn btn-light btn-sm me-2">History</Link>
            <Link to="/admin" className="btn btn-warning btn-sm me-2">Admin</Link>
            <button onClick={logout} className="btn btn-danger btn-sm">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="btn btn-light btn-sm me-2">Login</Link>
            <Link to="/register" className="btn btn-light btn-sm">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
EOT

# === Pages: Login/Register ===
cat <<EOT > src/pages/Login.jsx
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [form, setForm] = useState({ username: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.post("/auth/login", form);
    login(res.data.token);
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-success w-100">Login</button>
      </form>
    </div>
  );
}
EOT

cat <<EOT > src/pages/Register.jsx
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    alert("Registered successfully");
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Username" onChange={e => setForm({ ...form, username: e.target.value })} />
        <input className="form-control mb-3" type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
        <button className="btn btn-primary w-100">Register</button>
      </form>
    </div>
  );
}
EOT

# === Home Page ===
cat <<EOT > src/pages/Home.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Home() {
  const [quiz, setQuiz] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/quiz/all").then((res) => setQuiz(res.data));
  }, []);

  return (
    <div className="container mt-5">
      <h1>Welcome to QuizWizz</h1>
      {quiz ? (
        <div className="card p-4">
          <h3>{quiz.title}</h3>
          <p>Questions: {quiz.questions.length}</p>
          <button onClick={() => navigate(\`/quiz/\${quiz.id}\`)} className="btn btn-success">Start Quiz</button>
        </div>
      ) : (
        <p>Loading latest quiz...</p>
      )}
    </div>
  );
}
EOT

# === Quiz Page ===
cat <<EOT > src/pages/Quiz.jsx
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Quiz() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});

  useEffect(() => {
    api.get(\`/quiz/get/\${id}\`).then(res => setQuestions(res.data));
  }, [id]);

  const handleSubmit = async () => {
    const ids = Object.keys(answers);
    const userAnswers = Object.values(answers);
    const res = await api.post("/quiz/score", { ids, answers: userAnswers });

    const username = localStorage.getItem("username") || "guest";
    const history = JSON.parse(localStorage.getItem(\`history-\${username}\`) || "[]");
    const newEntry = {
      title: questions[0]?.category || "Quiz",
      score: res.data,
      total: questions.length,
      date: new Date().toLocaleString()
    };
    localStorage.setItem(\`history-\${username}\`, JSON.stringify([...history, newEntry]));
    navigate("/score", { state: { score: res.data, total: questions.length } });
  };

  return (
    <div className="container mt-4">
      <h2>Quiz</h2>
      {questions.map((q, idx) => (
        <div key={q.id} className="mb-4">
          <p><strong>{idx + 1}.</strong> {q.questionTitle}</p>
          {[q.option1, q.option2, q.option3, q.option4].map(opt => (
            <div className="form-check" key={opt}>
              <input className="form-check-input" type="radio" name={\`q\${q.id}\`} onChange={() => setAnswers({ ...answers, [q.id]: opt })} />
              <label className="form-check-label">{opt}</label>
            </div>
          ))}
        </div>
      ))}
      <button className="btn btn-warning" onClick={handleSubmit}>Submit Quiz</button>
    </div>
  );
}
EOT

# === Score Page ===
cat <<EOT > src/pages/Score.jsx
import { useLocation } from "react-router-dom";

export default function Score() {
  const { state } = useLocation();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">🎉 You scored {state.score} / {state.total}</h2>
    </div>
  );
}
EOT

# === Score History Page ===
cat <<EOT > src/pages/History.jsx
export default function History() {
  const user = localStorage.getItem("username");
  const history = JSON.parse(localStorage.getItem(\`history-\${user}\`) || "[]");

  return (
    <div className="container mt-5">
      <h2>Score History</h2>
      {history.length === 0 ? (
        <p>No history found.</p>
      ) : (
        <ul className="list-group">
          {history.map((h, idx) => (
            <li key={idx} className="list-group-item d-flex justify-content-between">
              <span>{h.date} - {h.title}</span>
              <span className="badge bg-success">{h.score}/{h.total}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
EOT

# === Admin Page ===
cat <<EOT > src/pages/Admin.jsx
import { useState } from "react";
import api from "../services/api";

export default function Admin() {
  const [quiz, setQuiz] = useState({ category: "", noOfQ: 5, title: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post(\`/quiz/create?category=\${quiz.category}&noOfQ=\${quiz.noOfQ}&title=\${quiz.title}\`);
    alert("Quiz Created!");
  };

  return (
    <div className="container mt-5">
      <h2>Create Quiz</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" placeholder="Category" onChange={e => setQuiz({ ...quiz, category: e.target.value })} />
        <input className="form-control mb-3" placeholder="No. of Questions" type="number" onChange={e => setQuiz({ ...quiz, noOfQ: e.target.value })} />
        <input className="form-control mb-3" placeholder="Title" onChange={e => setQuiz({ ...quiz, title: e.target.value })} />
        <button className="btn btn-warning w-100">Create Quiz</button>
      </form>
    </div>
  );
}
EOT

# ✅ Done
echo ""
echo "✅ Full React Bootstrap Quiz App with Admin Panel & Score History is ready!"
echo "➡️ cd quiz-frontend"
echo "➡️ npm start"
