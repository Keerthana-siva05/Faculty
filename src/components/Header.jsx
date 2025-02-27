import React from "react";
import "./header.css";
import logo from "../assets/images/logo.jpg";

const Header = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="dashboard-header">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="site-name">
        <h1>MAHATMA GANDHI</h1>
        <h1>POSTGRADUATE OF MEDICAL SCIENCES (MGPGIDS)</h1>
        <h3>DEPARTMENT OF ORTHODONTICS</h3>
        <p>GOVERNMENT OF PUDUCHERRY INSTITUTION</p>
      </div>
      {/* Logout Button (only shown when authenticated) */}
      {isAuthenticated && (
        <button className="logout-button" onClick={onLogout}>
          Logout
        </button>
      )}
    </header>
  );
};

export default Header;