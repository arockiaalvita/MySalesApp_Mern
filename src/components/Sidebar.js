import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ isAdmin }) => {
  return (
    <div className="sidebar">
      <ul>
        {isAdmin ? (
          <>
            <li><Link to="/logout">Logout</Link></li>
          </>
        ) : (
          <>
            <li><Link to="/my-profile">My Profile</Link></li>
            <li><Link to="/">Logout</Link></li>
          </>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
