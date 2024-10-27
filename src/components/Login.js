import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role, id } = response.data; // Assuming 'id' is returned from the backend
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'admin') {
        navigate('/admin-home');
      } else {
        navigate('/salesrep-home');
      }
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error('Login failed:', error);
    }
  };

  return (
    <div 
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundImage: 'url(https://static.vecteezy.com/system/resources/previews/002/563/549/original/white-3d-pedestal-background-with-realistic-palm-leaves-for-cosmetic-product-presentation-or-fashion-magazine-free-vector.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <form 
        onSubmit={handleLogin} 
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '300px',
          textAlign: 'center'
        }}
      >
        <h2 style={{ color: '#00796b' }}>Login</h2>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          style={{ width: '100%', padding: '10px', margin: '10px 0', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <button 
          type="submit" 
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#00796b',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
        
        <p style={{ marginTop: '10px' }}>New user? <a href="/signup" style={{ color: '#00796b' }}>Sign Up</a></p>
        <p><a href="/forget-password" style={{ color: '#00796b' }}>Forget Password?</a></p>
      </form>
    </div>
  );
};

export default Login;
