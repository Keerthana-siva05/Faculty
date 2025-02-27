import React, { useEffect, useState } from "react";
import { fetchProfile } from "../api/api.js";
import { 
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from "recharts";
import { FaUserGraduate, FaTasks, FaCalendarAlt, FaUserMd } from "react-icons/fa";
import Header from "../components/Header";
import Sidebar from "./FacultySidebar";
import "./dashboard.css";

const Dashboard = () => {
  const [profile, setProfile] = useState({ name: "Faculty Member" });

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const res = await fetchProfile(token);
        setProfile({ name: res.data.name });
      } catch (error) {
        console.error("Error fetching profile", error);
      }
    };
    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const statsData = [
    { name: "Students", value: 250 },
    { name: "Cases", value: 35 },
    { name: "Tasks", value: 5 },
    { name: "Appointments", value: 8 },
  ];

  const pieData = [
    { name: "Completed", value: 70 },
    { name: "Pending", value: 30 },
  ];
  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        <Header onLogout={handleLogout} />
        <main className="main-section">
          <section className="welcome">
            <h2>Welcome, {profile.name}</h2>
            <p>Manage students, exams, and patient cases efficiently.</p>
          </section>

          {/* Stats Section */}
          <section className="stats">
            <div className="stat-card">
              <FaUserGraduate className="icon" />
              <h3>Total Students</h3>
              <p>250</p>
            </div>
            <div className="stat-card">
              <FaUserMd className="icon" />
              <h3>Patient Cases</h3>
              <p>35</p>
            </div>
            <div className="stat-card">
              <FaTasks className="icon" />
              <h3>Pending Tasks</h3>
              <p>5</p>
            </div>
            <div className="stat-card">
              <FaCalendarAlt className="icon" />
              <h3>Upcoming Appointments</h3>
              <p>8</p>
            </div>
          </section>

          {/* Charts Section */}
          <section className="charts">
            <div className="bar-chart">
              <h3>Student & Case Overview</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={statsData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#2C3E50" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="pie-chart">
              <h3>Task Completion</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie 
                    data={pieData} 
                    cx="50%" 
                    cy="50%" 
                    outerRadius={70} 
                    fill="#8884d8" 
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
