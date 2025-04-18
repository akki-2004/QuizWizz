import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'; // Your custom dark theme CSS
import Landing from "./components/Landing";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
    

<Routes>
  {/* 👇 Redirect root to landing */}
  <Route path="/" element={<Navigate to="/welcome" />} />

  {/* Public landing page */}
  <Route path="/welcome" element={<Landing />} />

  {/* Protected pages */}
  <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
  <Route path="/quiz/:id" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
  <Route path="/score" element={<ProtectedRoute><Score /></ProtectedRoute>} />
  <Route path="/history" element={<ProtectedRoute><History /></ProtectedRoute>} />
  <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><Admin /></ProtectedRoute>} />

  {/* Auth pages */}
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
</Routes>

      </Router>
    </AuthProvider>
  );
}

export default App;
