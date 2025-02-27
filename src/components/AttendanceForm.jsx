import React, { useState, useEffect } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import "./AttendanceForm.css";

const AttendanceForm = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // Fetch existing attendance records for the selected month and year
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/attendance?month=${month}&year=${year}`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching attendance:", error);
      }
    };
    fetchAttendance();
  }, [month, year]);

  const handleTableChange = (id, field, value) => {
    setAttendanceData((prevData) =>
      prevData.map((row) => (row.id === id ? { ...row, [field]: value } : row))
    );
  };

  const addRow = () => {
    const newRow = {
      id: Date.now(),
      regNumber: "",
      name: "",
      totalClasses: "",
      attended: "",
    };
    setAttendanceData([...attendanceData, newRow]);
  };

  const calculatePercentage = (attended, totalClasses) => {
    return totalClasses ? ((attended / totalClasses) * 100).toFixed(2) : "0.00";
  };

  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      attendanceData.map((row) => ({
        Month: month,
        Year: year,
        "Register Number": row.regNumber,
        Name: row.name,
        "Total Classes": row.totalClasses,
        "Total Attended": row.attended,
        "Attendance (%)": calculatePercentage(row.attended, row.totalClasses),
      }))
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Attendance");
    XLSX.writeFile(workbook, `Attendance_${month}_${year}.xlsx`);
  };

  const saveToDatabase = async () => {
    try {
      await axios.post("http://localhost:5000/api/attendance", { month, year, attendanceData });
      alert("Attendance saved successfully!");
    } catch (error) {
      console.error("Error saving attendance:", error);
    }
  };

  const deleteStudent = async (regNumber) => {
    if (!regNumber) {
      console.error("Error: Missing regNumber, cannot delete!");
      alert("Cannot delete. Register Number is missing!");
      return;
    }
  
    try {
      const response = await axios.delete(`http://localhost:5000/api/attendance/${regNumber}`);
      console.log("Delete response:", response.data);
      
      // Remove the student from the UI after successful deletion
      setAttendanceData(prevData => prevData.filter(student => student.regNumber !== regNumber));
      
    } catch (error) {
      console.error("Error deleting student:", error.response?.data || error.message);
      alert("Failed to delete student. Check the console for details.");
    }
  };
  
  

  return (
    <div className="attendance-container">
      <h2>Students Attendance Entry</h2>

      {/* Month and Year Selection */}
      <div className="month-year-selection">
        <label>Month:</label>
        <select value={month} onChange={(e) => setMonth(parseInt(e.target.value))}>
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {new Date(0, i).toLocaleString("en", { month: "long" })}
            </option>
          ))}
        </select>

        <label>Year:</label>
        <select value={year} onChange={(e) => setYear(parseInt(e.target.value))}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={year - 5 + i} value={year - 5 + i}>
              {year - 5 + i}
            </option>
          ))}
        </select>
      </div>

      <button className="download-btn" onClick={downloadExcel}>
        Download Excel
      </button>
      <button className="save-btn" onClick={saveToDatabase}>
        Save to Database
      </button>

      <table>
        <thead>
          <tr>
            <th>Sl. No</th>
            <th>Register Number</th>
            <th>Name of the Student</th>
            <th>Total Classes</th>
            <th>Total Attended</th>
            <th>Attendance (%)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((row, index) => (
            <tr key={row._id || row.id}>
              <td>{index + 1}</td>
              <td>
                <input
                  type="text"
                  value={row.regNumber}
                  onChange={(e) =>
                    handleTableChange(row._id || row.id, "regNumber", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  value={row.name}
                  onChange={(e) =>
                    handleTableChange(row._id || row.id, "name", e.target.value)
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.totalClasses}
                  onChange={(e) =>
                    handleTableChange(row._id || row.id, "totalClasses", parseInt(e.target.value))
                  }
                />
              </td>
              <td>
                <input
                  type="number"
                  value={row.attended}
                  onChange={(e) =>
                    handleTableChange(row._id || row.id, "attended", parseInt(e.target.value))
                  }
                />
              </td>
              <td className="highlight">
                {calculatePercentage(row.attended, row.totalClasses)}%
              </td>
              <td>
                <button onClick={() => deleteStudent(row.regNumber)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="add-btn" onClick={addRow}>
        ➕ Add Student
      </button>
    </div>
  );
};

export default AttendanceForm;
