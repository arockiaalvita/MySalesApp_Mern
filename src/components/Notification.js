import React, { useEffect } from 'react';
import './Notification.css'; // Import CSS for styling

const Notification = ({ message, duration = 3000, onClose }) => {
  useEffect(() => {
    // Automatically close the notification after the specified duration
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer); // Cleanup the timer on unmount
  }, [duration, onClose]);

  return (
    <div className="notification">
      {message}
    </div>
  );
};

export default Notification;
