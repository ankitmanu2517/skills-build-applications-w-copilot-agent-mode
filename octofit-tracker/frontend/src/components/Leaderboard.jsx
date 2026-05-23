import { useState, useEffect } from "react";

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : "http://localhost:8000/api/leaderboard/";

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items = Array.isArray(data) ? data : data.results ?? [];
        setEntries(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading leaderboard…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2>Leaderboard</h2>
      {entries.length === 0 ? (
        <p>No leaderboard entries found.</p>
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Rank</th>
              <th>User</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {entries.map((e, i) => (
              <tr key={e._id}>
                <td>{i + 1}</td>
                <td>{e.user}</td>
                <td>{e.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Leaderboard;
