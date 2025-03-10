import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [students, setStudents] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [course, setCourse] = useState("");
  const [selectedYear, setSelectedYear] = useState("");

  useEffect(() => {
    if (course && selectedYear) {
      axios.get(`http://localhost:5000/api/attendance/students?course=${course}&year=${selectedYear}`)
        .then(res => {
          setStudents(res.data);
          setAttendanceData(res.data.map(student => ({
            ...student,
            totalClasses: "",
            attended: "",
          })));
        })
        .catch(err => console.error("Error fetching students:", err));
    }
  }, [course, selectedYear]);

  const handleTableChange = (id, field, value) => {
    setAttendanceData(prevData =>
      prevData.map(row => (row.regNumber === id ? { ...row, [field]: value } : row))
    );
  };

  const autoFillTotalClasses = (value) => {
    setAttendanceData(prevData => prevData.map(row => ({ ...row, totalClasses: Number(value) })));
  };
  
  const calculatePercentage = (attended, totalClasses) => {
    return totalClasses ? ((attended / totalClasses) * 100).toFixed(2) : "0.00";
  };
  const handleMonthChange = (e) => {
    const newMonth = parseInt(e.target.value);
    setMonth(newMonth);
  
    // Reset attendance data when month changes
    setAttendanceData(prevData => prevData.map(student => ({
      ...student,
      totalClasses: "",
      attended: "",
    })));
  };
  
  const saveToDatabase = async () => {
    try {
      console.log("Sending data to backend:", {
        course,
        year,
        month,
        students: attendanceData,
      });
  
      const response = await axios.post("http://localhost:5000/api/attendance/save", {
        course,
        year,
        month,
        students: attendanceData.map(student => ({
          regNumber: student.regNumber,
          name: student.name,
          totalClasses: Number(student.totalClasses) || 0,
          attended: Number(student.attended) || 0,
        })),
      });
  
      console.log("✅ Attendance saved:", response.data);
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("❌ Error saving attendance:", error.response?.data || error.message);
      alert("Error saving attendance. Check console for details.");
    }
  };
  
  
  
  return (
    <div className="attendance-container">
      <h2>Students Attendance Entry</h2>

      <div className="selection">
        <label>Course:</label>
        <select onChange={(e) => setCourse(e.target.value)}>
          <option value="">Select Course</option>
          <option value="BDS">BDS</option>
          <option value="MDS">MDS</option>
        </select>

        <label>Year:</label>
        <select onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Select Year</option>
          <option value="1st Year">1st Year</option>
          <option value="2nd Year">2nd Year</option>
        </select>

        <label>Month:</label>
<select onChange={handleMonthChange} value={month}>
  {Array.from({ length: 12 }, (_, i) => (
    <option key={i + 1} value={i + 1}>
      {new Date(0, i).toLocaleString("en", { month: "long" })}
    </option>
  ))}
</select>

      </div>

      <table>
        <thead>
          <tr>
            <th>Register Number</th>
            <th>Name</th>
            <th>Total Classes</th>
            <th>Total Attended</th>
            <th>Attendance (%)</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(row => (
            <tr key={row.regNumber}>
              <td>{row.regNumber}</td>
              <td>{row.name}</td>
              <td>
                <input type="number" value={row.totalClasses} onChange={(e) => autoFillTotalClasses(e.target.value)} />
              </td>
              <td>
                <input type="number" value={row.attended} onChange={(e) => handleTableChange(row.regNumber, "attended", e.target.value)} />
              </td>
              <td>{calculatePercentage(row.attended, row.totalClasses)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={saveToDatabase}>Save Attendance</button>
    </div>
  );
};

export default AttendanceForm;
