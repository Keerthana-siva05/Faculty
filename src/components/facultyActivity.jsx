import React, { useEffect, useState } from "react";
import axios from "axios";
import "./facultyactivity.css";

const FacultyActivity = () => {
  const [facultyData, setFacultyData] = useState([]);

  useEffect(() => {
    const fetchFacultyData = async () => {
      try {
        const facultyResponse = await axios.get("http://localhost:5000/api/faculty");
        const facultyList = facultyResponse.data;

        const activitiesResponse = await axios.get("http://localhost:5000/api/faculty-activities/activities");
        const activitiesList = activitiesResponse.data;

        const mergedData = facultyList.map((faculty) => {
          const facultyActivities = activitiesList.find((item) => item.name === faculty.name);
          return {
            ...faculty,
            activities: facultyActivities ? facultyActivities.activities : [],
          };
        });

        setFacultyData(mergedData);
      } catch (error) {
        console.error("Error fetching faculty data:", error);
      }
    };

    fetchFacultyData();
  }, []);

  return (
    <div className="faculty-activity-container">
      <h1 className="faculty-title">Faculty Details</h1>
      <div className="faculty-grid">
        {facultyData.length > 0 ? (
          facultyData.map((faculty, index) => (
            <div key={index} className="faculty-card">
              <h2 className="faculty-info">
              <span className="faculty2-name">{faculty.name}</span>,  
              <span className="faculty-designation"> {faculty.designation}</span>
              </h2>
              <ul className="faculty-activities">
                {faculty.activities.length > 0 ? (
                  faculty.activities.map((activity, i) => (
                    <li key={i} className="activity-item">{activity}</li>
                  ))
                ) : (
                  <li>No activities available</li>
                )}
              </ul>
            </div>
          ))
        ) : (
          <p className="no-data">No faculty details available.</p>
        )}
      </div>
    </div>
  );
};

export default FacultyActivity;
