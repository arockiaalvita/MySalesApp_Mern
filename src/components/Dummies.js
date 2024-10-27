import React from 'react';
import './Dummies.css';

const Dummies = () => {
  const profileData = {
    name: 'Arockia Alvita',
    age: 25,
    gender: 'Female',
    email: 'arockiaalvita46@gmail.com',
    about: 'A passionate developer and lifelong learner. Loves coding and exploring new technologies.'
  };

  return (
    <div className="profile-card">
      <div className="profile-image">
        <img
          src="https://cdn3.iconfinder.com/data/icons/users-6/100/1-512.png"
          alt="Profile"
        />
        <h3>{profileData.name}</h3>
      </div>
      <div className="profile-details">
        <p><strong>Age:</strong> {profileData.age}</p>
        <p><strong>Gender:</strong> {profileData.gender}</p>
        <p><strong>Email:</strong> {profileData.email}</p>
        <p><strong>About:</strong> {profileData.about}</p>
      </div>
    </div>
  );
};

export default Dummies;
