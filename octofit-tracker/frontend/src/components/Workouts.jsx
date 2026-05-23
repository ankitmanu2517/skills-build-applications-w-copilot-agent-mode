import { useState, useEffect } from "react";

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const API_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : "http://localhost:8000/api/workouts/";

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
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
        setWorkouts(items);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading workouts…</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div>
      <h2>Workouts</h2>
      {workouts.length === 0 ? (
        <p>No workouts found.</p>
      ) : (
        <div className="row">
          {workouts.map((w) => (
            <div className="col-md-4 mb-3" key={w._id}>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{w.name}</h5>
                  <p className="card-text">{w.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
