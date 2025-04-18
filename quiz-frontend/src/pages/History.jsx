export default function History() {
  const user = localStorage.getItem("username");
  const history = JSON.parse(localStorage.getItem(`history-${user}`) || "[]");

  return (
    <div className="container mt-5 text-light">
      <h2>📊 Your Score History</h2>
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
