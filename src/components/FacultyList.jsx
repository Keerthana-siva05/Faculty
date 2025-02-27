import { useEffect, useState } from "react";
import axios from "axios";
import "./FacultyList.css"; // ✅ Ensure this CSS file exists

const FacultyList = () => {
  const [faculty, setFaculty] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/faculty") // ✅ API Endpoint
      .then((response) => setFaculty(response.data))
      .catch((error) => console.error("Error fetching faculty data:", error));
  }, []);

  return (
    <div className="faculty-list">
      <h2>Faculties</h2>
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Contact No.</th>
          </tr>
        </thead>
        <tbody>
          {faculty.length > 0 ? (
            faculty.map((member, index) => (
              <>
                {/* Designation as a row heading */}
                {index === 0 || faculty[index - 1].designation !== member.designation ? (
                  <tr key={`header-${member._id}`} className="designation-row">
                    <td colSpan="3"><strong>{member.designation}</strong></td>
                  </tr>
                ) : null}
                
                {/* Faculty Member Row */}
                <tr key={member._id} className="faculty1-card">
                  <td>
                    <img
                      src={`http://localhost:5000/${member.profileImage}`}
                      alt={member.name}
                      className="faculty-image"
                      onError={(e) => (e.target.src = "/default-profile.jpg")}
                    />
                  </td>
                  <td>
                    <p className="faculty1-name">{member.name}</p>
                  </td>
                  <td>
                    <p className="faculty-contact">
                      {member.contactNumber.startsWith("+") ? member.contactNumber : `+91 ${member.contactNumber}`}
                    </p>
                  </td>
                </tr>
              </>
            ))
          ) : (
            <tr>
              <td colSpan="3">No faculty members found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyList;
