import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import AdminHome from './components/AdminHome';
import SalesRepHome from './components/SalesRepHome';
import Dummies from './components/Dummies';

// Import the UpdateTask component
import './App.css';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/admin-home" element={<AdminHome />} />
        <Route path="/salesrep-home" element={<SalesRepHome />} />
        <Route path="/my-profile" element={<Dummies />} />
      </Routes>
    </Router>
  );
};

export default App;
