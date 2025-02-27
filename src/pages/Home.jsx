import React, { useState, useEffect } from "react";
import "./Home.css"; // Ensure this file exists
import NotificationBox from "../components/NotificationBox"; // Check if this file exists

// Import images properly
import image1 from "../assets/images/image1.png";
import image2 from "../assets/images/teeth.jpg";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [image1, image2];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-container">
      <div className="main-content">
        <div className="image-container">
          <img
            src={images[currentImageIndex]}
            alt={`Slide ${currentImageIndex + 1}`}
            className="image"
          />
        </div>

        <div className="content-section">
          <h2>About the Department</h2>
          <div className="scrolling-box">
            <ul>
              <li>Welcome to the Orthodontics Department, where we create aligned smiles.</li>
              <li>Our team provides expert care using advanced techniques.</li>
              <li>We offer resources for students, faculty, and patients alike.</li>
              <li>Transform your smile with us today!</li>
            </ul>
          </div>
        </div>

        <NotificationBox />
      </div>
    </div>
  );
};

export default Home;