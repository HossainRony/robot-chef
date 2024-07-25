import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import robotChefLogo from '../image/Robot-Chef.png';

const Login = ({ setUser }) => {

  // Add 2FA new states
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // Step 1 Login, Step 2 OTP

  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const apiUrl = '/api';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });
      if (!response.ok) {
        throw new Error('Login failed');
      }
      const data = await response.json();

      // Check if 2FA is enabled
      if(data.is2FAEnabled){
        // Proceed with OTP check
        setStep(2);
      } else{
        // complete the login process
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        setUser({ username: data.username, token: data.token });
        navigate('/');
      }
      
    } catch (error) {
      setError(error.message);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    console.log("Email and OTP", form.email, otp);
    console.log("API URL", `${apiUrl}/users/verify-otp`);

    try {
      const response = await fetch(`${apiUrl}/users/verify-otp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'},
        body: JSON.stringify({ email: form.email, token: otp })
      });

      if(!response.ok){
        throw new Error('OTP verification failed');
      }

      const data  = await response.json();
      localStorage.setItem('token', data.token);
      localStorage.setItem('username', data.username);
      setUser({ username: data.username, token: data.token });
      navigate('/');

    } catch (error) {
      setError(error.message);
    }
  }

  const handleOtpChange = async (e) => {
    setOtp(e.target.value);
  }

  return (
    <div className="login-container">
      <div className="login-form">
        <h1 className="text-center">Login</h1>
        {error && <p className="text-danger">{error}</p>}
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleOtpSubmit}>
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                id="otp"
                name="otp"
                value={otp}
                onChange={handleOtpChange}
                required
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">Submit OTP</button>
          </form>
        )}
      </div>
      <div className="login-logo">
        <img src={robotChefLogo} alt="Robot Chef Logo" />
      </div>
    </div>
  );
};

export default Login;