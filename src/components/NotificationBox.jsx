import React, { useState, useEffect } from "react";
import "./NotificationBox.css";

const NotificationBox = () => {
  const [currentNotificationIndex, setCurrentNotificationIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const notifications = [
    "New patient appointments available this week.",
    "Faculty meeting scheduled for Friday at 3 PM.",
    "Research paper submission deadline extended to next month.",
  ];

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentNotificationIndex(
          (prevIndex) => (prevIndex + 1) % notifications.length
        );
      }, 3000); // Change notification every 10 seconds
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isPlaying, notifications.length]);

  const handlePrevious = () => {
    setCurrentNotificationIndex(
      (prevIndex) =>
        (prevIndex - 1 + notifications.length) % notifications.length
    );
  };

  const handleNext = () => {
    setCurrentNotificationIndex(
      (prevIndex) => (prevIndex + 1) % notifications.length
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="notification-box">
        <div className="notificat-box">
      <div className="notification-header">📢 Notifications</div>
      <div className="notification-content">
        {notifications[currentNotificationIndex]}
      </div>
      <div className="controls">
        <button onClick={handlePrevious} title="Previous">Prev</button>
        <button onClick={togglePlay} title="Play/Pause">
          {isPlaying ? "Pause" : "Play"}
        </button>
        <button onClick={handleNext} title="Next">Next</button>
      </div>
      </div>
    </div>
  );
};

export default NotificationBox;
