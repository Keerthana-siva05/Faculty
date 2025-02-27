import React from "react";
import { useNavigate } from "react-router-dom";
import "./Facultysidebar.css";

const FacultySidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="sidebar">
      <nav>
        <ul>
          {/* Home Link */}
          <li>
            <a href="/" onClick={(e) => { e.preventDefault(); navigate("/"); }}>
              <span className="home-icon">🏠</span> <span className="menu-text">Home</span>
            </a>
          </li>
          <li>
            <a href="/dashboard">
              <span className="dashboard-icon">📋</span> <span className="menu-text">Dashboard</span>
            </a>
          </li>
          <li>
            <a href="/profile">
              <span className="profile-icon">👤</span> <span className="menu-text">Profile</span>
            </a>
          </li>
          <li>
            <a href="/attendance">
              <span className="attendance-icon">📅</span> <span className="menu-text">Attendance</span>
            </a>
          </li>
          <li>
            <a href="#Internal Assessment">
              <span className="assessment-icon">📊</span> <span className="menu-text">Internal Assessment</span>
            </a>
          </li>
          <li>
            <a href="#patient Cases">
              <span className="patient-icon">🏥</span> <span className="menu-text">Patient Cases</span>
            </a>
          </li>
          <li>
            <a href="/faculty">
              <span className="faculty-icon">🎓</span> <span className="menu-text">Faculty Activities</span>
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default FacultySidebar;
