import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

const Profile = () => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "",
    designation: "",
    contactNumber: "",
    profileImage: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProfile(response.data);
        setFormData({
          name: response.data.name || "",
          email: response.data.email || "",
          department: response.data.department || "",
          designation: response.data.designation || "",
          contactNumber: response.data.contactNumber || "",
          profileImage: response.data.profileImage || "",
        });
      } catch (error) {
        setError("Failed to fetch profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!formData.department.trim()) {
      validationErrors.department = "Department is required.";
    } else if (/\d/.test(formData.department)) {
      validationErrors.department = "Department cannot contain numbers.";
    }

    if (!formData.designation.trim()) {
      validationErrors.designation = "Designation is required.";
    } else if (/\d/.test(formData.designation)) {
      validationErrors.designation = "Designation cannot contain numbers.";
    }

    if (!/^\d{10}$/.test(formData.contactNumber)) {
      validationErrors.contactNumber = "Enter a valid 10-digit mobile number.";
    }

    if (!formData.profileImage) {
      validationErrors.profileImage = "Profile image is required.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const response = await axios.put("http://localhost:5000/api/auth/update-profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProfile(response.data);
      alert("Profile updated successfully!");
    } catch (error) {
      setError("Failed to update profile.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const imageData = new FormData();
    imageData.append("profileImage", file);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/upload-image", imageData, {
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" },
      });
      setFormData((prevState) => ({ ...prevState, profileImage: response.data.profileImage }));
      alert("Profile image updated successfully!");
    } catch (error) {
      setError("Failed to upload image.");
    }
  };

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="profile-container">
      <h2>Profile</h2>

      {/* Profile Image Upload Section */}
      <div className="profile-image-container">
        {formData.profileImage ? (
          <img src={`http://localhost:5000/${formData.profileImage}`} alt="Profile" className="profile-image" />
        ) : (
          <p>No profile image</p>
        )}
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {errors.profileImage && <p className="error-message">{errors.profileImage}</p>}
      </div>

      {/* Profile Form */}
      <form onSubmit={handleUpdate} className="profile-form">
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

        <label>Email:</label>
        <input type="email" name="email" value={formData.email} disabled />

        {/* Department Field */}
        <label>Department:</label>
        <input type="text" name="department" value={formData.department} onChange={handleChange} />
        {errors.department && <p className="error-message">{errors.department}</p>}

        {/* Designation Field */}
        <label>Designation:</label>
        <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
        {errors.designation && <p className="error-message">{errors.designation}</p>}

        {/* Contact Number Field */}
        <label>Contact Number:</label>
        <div className="contact-number-container">
          <span className="country-code">+91</span>
          <input
            type="text"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            maxLength="10"
            placeholder="Enter 10-digit mobile number"
          />
        </div>
        {errors.contactNumber && <p className="error-message">{errors.contactNumber}</p>}

        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
