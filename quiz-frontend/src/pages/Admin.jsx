import { useState } from "react";
import api from "../services/api";

export default function AdminPage() {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [count, setCount] = useState(5);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post(`/quiz/create?category=${category}&noOfQ=${count}&title=${title}`);
      setMessage(res.data);
    } catch (err) {
      setMessage("Error creating quiz");
    }
  };

  return (
    <div className="container mt-5 text-light">
      <h2 className="mb-4">🛠️ Create a New Quiz</h2>
      <form onSubmit={handleSubmit} className="card bg-dark p-4">
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Category</label>
          <input className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Number of Questions</label>
          <input type="number" className="form-control" value={count} onChange={(e) => setCount(e.target.value)} required />
        </div>
        <button className="btn btn-warning w-100">Create Quiz</button>
        {message && <div className="alert alert-info mt-3">{message}</div>}
      </form>
    </div>
  );
}
