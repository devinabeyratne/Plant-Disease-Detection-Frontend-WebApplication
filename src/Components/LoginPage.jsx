import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles.css'; // Import the CSS file
import samplePhoto from './b.webp'; // Import your sample photo
import { FaEnvelope, FaLock } from 'react-icons/fa'; // Import icons

const LoginPage = () => {
  const navigate = useNavigate(); // Hook for navigation
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return; // Prevent login if validation fails
    }

    try {
      const response = await fetch('http://localhost:5001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // Include credentials for session management
      });
      const data = await response.json();
      if (response.ok) {
        if (data.userType === 'ADMIN') {
          navigate(`/adminPage?firstName=${data.firstName}&lastName=${data.lastName}`);
        } else {
          navigate(`/userPage?firstName=${data.firstName}&lastName=${data.lastName}`);
        }
        alert('Login successful'); 
      } else {
        
        alert('Login failed.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred');
      alert('An error occurred. Please try again later.');
    }
  };

  const handleRegister = () => {
    navigate('/registerPage'); // Navigate to the registration page
  };

  const validateForm = () => {
    if (!email || !password) {
      alert('Please fill in all fields.');
      return false;
    }
    return true;
  };

  return (
    <div className="login-container">
      <h1>Plant Disease Detector</h1>
      <div className="login-form-container">
        <div className="login-form">
          <h2>SIGN-IN</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="input-container">
              <label className={email ? "positioned-label" : ""}>
                <FaEnvelope /> {/* Icon for email */}
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <label className={password ? "positioned-label" : ""}>
                <FaLock /> {/* Icon for password */}
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="pp">Not registered yet? <span className="register-link" onClick={handleRegister}>Register here</span>.</p>
        </div>
      </div>
      <div className="photo-container">
        <img src={samplePhoto} alt="Sample" className="photo" />
      </div>
    </div>
  );
};

export default LoginPage;
