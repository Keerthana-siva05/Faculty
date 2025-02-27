import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "../components/HomeSidebar.css"; // Ensure your sidebar styles are included

const Sidebar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  const toggleDropdown = (section) => {
    setActiveDropdown(activeDropdown === section ? null : section);
  };

  return (
    <nav>
      <ul className="nav-links">
        <li>
          <button className="contact" onClick={() => navigate("/")}>Home</button>
        </li>
        <li className={activeDropdown === "faculty" ? "active" : ""}>
          <button
            className="dropbtn"
            onClick={() => toggleDropdown("faculty")}
            aria-label="Toggle faculty dropdown"
          >
            Faculty &#9662;
          </button>
          {activeDropdown === "faculty" && (
            <div className="dropdown">
              {/* Redirect to Faculty Login Page */}
              <button onClick={() => navigate("/login")}>Faculty Profile</button>
              <button onClick={() => navigate("/facultylist")}>Faculties</button>
              <button onClick={() => navigate("/facultyactivity")}>Faculty Activities</button>
            </div>
          )}
        </li>
        <li className={activeDropdown === "students" ? "active" : ""}>
          <button
            className="dropbtn"
            onClick={() => toggleDropdown("students")}
            aria-label="Toggle academics dropdown"
          >
            Students &#9662;
          </button>
          {activeDropdown === "students" && (
            <div className="dropdown">
              <button onClick={() => console.log("Courses")}>Courses</button>
              <button onClick={() => console.log("Academic Calendar")}>Academic Calendar</button>
              <button onClick={() => console.log("Exam Schedules")}>Exam Schedules</button>
            </div>
          )}
        </li>
        <li>
          <button className="contact" onClick={() => console.log("Contact Us")}>Contact Us</button>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
