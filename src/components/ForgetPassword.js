import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');
    setLoading(true); // Start loading state

    try {
      const response = await axios.post('http://localhost:5000/api/auth/forget-password', { email });
      setMessage(response.data.message);

      // Optionally redirect after success
      setTimeout(() => {
        navigate('/'); // Redirect to login or desired page
      }, 3000); // Adjust the timeout duration as necessary
    } catch (err) {
      console.error('Error occurred:', err); // Log error for debugging
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false); // End loading state
    }
  };

  return (
    <div>
      <h2>Forget Password</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default ForgetPassword;
