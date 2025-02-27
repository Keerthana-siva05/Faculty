import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Header from "./components/Header";
import FacultySidebar from "./components/FacultySidebar";
import HomeSidebar from "./components/HomeSidebar";
import Facultyactivity from "./components/facultyactivity";
import AddFaculty from "./components/AddFaculty";
import Profile from "./components/profile"; // Import Profile Page
import FacultyList from "./components/FacultyList"; 

import AttendanceForm from "./components/AttendanceForm";

import "./app.css"; // Global styles if needed

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = () => setIsAuthenticated(true);

  return (
    <>
      {/* Header is always shown */}
      <Header isAuthenticated={isAuthenticated} onLogout={isAuthenticated ? handleLogout : null} />

      <div style={{ display: "flex", flex: 1 }}>
        {/* Sidebar */}
        <div style={{ width: "250px", flexShrink: 0 }}>
          {isAuthenticated ? <FacultySidebar /> : <HomeSidebar />}
        </div>

        {/* Main Content */}
        <main style={{ flex: 1, background: "#f4f4f4" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/login"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />}
            />
            <Route
              path="/register"
              element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register />}
            />
            <Route path="/facultyactivity" element={<Facultyactivity />} />
            <Route path="/facultylist" element={<FacultyList />} />
            <Route path="/faculty" element={<AddFaculty />} />
            
            {/* ✅ Profile Page Route */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/attendance" element={<AttendanceForm />} />
            <Route
              path="/dashboard"
              element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </main>
      </div>
    </>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
