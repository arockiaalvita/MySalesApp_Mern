import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [role, setRole] = useState('salesrep');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/signup', { name, email, age, contactNumber, role, password });
      navigate('/');
    } catch (error) {
      setError('Signup failed. Please try again.');
      console.error('Signup failed:', error);
    }
  };

  const formStyles = {
    background: 'rgba(255, 255, 255, 0.9)',
    borderRadius: '8px',
    padding: '20px 30px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
    width: '100%',
    maxWidth: '400px',
    textAlign: 'center',
  };

  const buttonStyles = {
    width: '100%',
    padding: '12px',
    marginTop: '15px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#0056b3',
    color: 'white',
    fontSize: '16px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: 'url("https://static.vecteezy.com/system/resources/previews/002/563/549/original/white-3d-pedestal-background-with-realistic-palm-leaves-for-cosmetic-product-presentation-or-fashion-magazine-free-vector.jpg") center / cover' }}>
      <form onSubmit={handleSignup} style={formStyles}>
        <h2 style={{ color: '#0056b3', marginBottom: '20px' }}>Sign Up</h2>
        {error && <p style={{ color: 'red', fontSize: '14px', marginBottom: '10px' }}>{error}</p>}
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
        <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
        <input type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}>
          <option value="salesrep">Sales Rep</option>
          <option value="admin">Admin</option>
        </select>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%', padding: '10px', margin: '10px 0', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
        <button type="submit" style={buttonStyles} onMouseOver={(e) => e.target.style.backgroundColor = '#004494'} onMouseOut={(e) => e.target.style.backgroundColor = '#0056b3'}>Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
