import { Link } from "react-router-dom";
import "./Landing.css"; // Custom styles

export default function Landing() {
  return (
    <div className="landing-bg text-light py-5">
      <div className="container">
        {/* Hero Section */}
        <div className="row align-items-center mb-5">
          <div className="col-md-6 text-center text-md-start">
            <h1 className="display-4 fw-bold mb-3">🧠 Welcome to QuizWizz</h1>
            <p className="lead">
              Test your knowledge, track your scores, and compete with friends in a beautifully crafted quiz experience.
            </p>
            <div className="mt-4">
              <Link to="/register" className="btn btn-success btn-lg me-3 px-4 rounded-pill">
                Get Started 🚀
              </Link>
              <Link to="/login" className="btn btn-outline-light btn-lg px-4 rounded-pill">
                Login
              </Link>
            </div>
          </div>
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6771/6771619.png"
              alt="Quiz Illustration"
              className="img-fluid hero-img"
            />
          </div>
        </div>

        {/* Features Grid */}
        <div className="row text-center g-4">
          <div className="col-md-4">
            <div className="card bg-dark text-light p-4 h-100 shadow">
              <h4 className="mb-3">📚 Multiple Categories</h4>
              <p>Choose from a wide variety of quiz topics including science, tech, history, and more.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-light p-4 h-100 shadow">
              <h4 className="mb-3">🏆 Score History</h4>
              <p>Track your past scores, view your progress, and aim for the top.</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card bg-dark text-light p-4 h-100 shadow">
              <h4 className="mb-3">🛠 Admin Panel</h4>
              <p>Create custom quizzes, manage questions, and build your challenge set.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
