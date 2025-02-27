import React, { useState, useEffect } from "react";
import axios from "axios";
import "./addfaculty.css";

const AddFaculty = () => {
  const [facultyName, setFacultyName] = useState("");
  const [activities, setActivities] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("facultyName");
    if (storedName) {
      setFacultyName(storedName);
    }
  }, []);

  const handleChange = (e) => {
    setActivities(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!activities.trim()) {
      alert("Please enter at least one activity.");
      return;
    }
  
    try {
      const token = localStorage.getItem("token");

      const existingResponse = await axios.get(
        `http://localhost:5000/api/faculty-activities/activities?name=${facultyName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const existingActivities = existingResponse.data.activities || [];
      const newActivities = activities.split("\n").map((activity) => activity.trim()).filter(activity => activity);
      const updatedActivities = [...existingActivities, ...newActivities];

      const response = await axios.put(
        "http://localhost:5000/api/faculty-activities/update-activities",
        { name: facultyName, activities: updatedActivities },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200) {
        alert("Activities updated successfully!");
        setActivities("");
      }
    } catch (error) {
      console.error("Error updating activities:", error);
      alert("Failed to update activities.");
    }
  };

  return (
    <div className="add-faculty-container">
      <h1>Add Faculty Activities</h1>
      <div className="faculty-name-container">
        <label>Faculty Name: </label>
        <span className="faculty-name">{facultyName}</span>
      </div>
      <form onSubmit={handleSubmit} className="faculty-form">
        <textarea
          name="activities"
          placeholder="Enter activities (one per line)"
          value={activities}
          onChange={handleChange}
          required
        ></textarea>
        <button type="submit">Update Activities</button>
      </form>
    </div>
  );
};

export default AddFaculty;
