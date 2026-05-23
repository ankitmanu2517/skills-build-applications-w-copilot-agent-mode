import { Routes, Route, NavLink } from "react-router-dom";
import Activities from "./components/Activities";
import Leaderboard from "./components/Leaderboard";
import Teams from "./components/Teams";
import Users from "./components/Users";
import Workouts from "./components/Workouts";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="my-4 text-center">OctoFit Tracker</h1>

      <nav className="nav nav-pills justify-content-center mb-4">
        <NavLink className="nav-link" to="/">Users</NavLink>
        <NavLink className="nav-link" to="/activities">Activities</NavLink>
        <NavLink className="nav-link" to="/teams">Teams</NavLink>
        <NavLink className="nav-link" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="nav-link" to="/workouts">Workouts</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}

export default App;
