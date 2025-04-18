import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, username, role, logout } = useAuth(); // ⬅️ get role

  return (
    <nav className="navbar navbar-expand-lg px-4 py-3 shadow-sm" style={{ backgroundColor: "#1c1c1c" }}>
      <div className="container-fluid">
        <Link className="navbar-brand text-info fw-bold fs-4" to="/">
          🧠 QuizWizz
        </Link>

        <div className="d-flex align-items-center ms-auto">
          {isLoggedIn ? (
            <>
              <span className="text-light me-3">Hi, <strong>{username}</strong></span>

              <Link to="/home" className="btn btn-outline-info btn-sm me-2">
                🧪 Quiz
              </Link>
              <Link to="/history" className="btn btn-outline-light btn-sm me-2">
                📊 History
              </Link>


                <Link to="/admin" className="btn btn-outline-warning btn-sm me-2">
                  🛠️ Admin
                </Link>
              

              <button onClick={logout} className="btn btn-outline-danger btn-sm">
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm me-2">
                🔐 Login
              </Link>
              <Link to="/register" className="btn btn-outline-success btn-sm">
                📝 Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
