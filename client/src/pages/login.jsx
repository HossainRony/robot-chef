import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './login.css';
import robotChefLogo from '../image/Robot-Chef.png';
import { loginUser, verify2FASetupThunk, setUser } from '../store/userSlice';

const Login = () => {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginError = useSelector((state) => state.user.error);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resultAction = await dispatch(loginUser(form)).unwrap();

      if (resultAction.is2FAEnabled) {
        setStep(2);
      } else {
        localStorage.setItem('jwt_token', resultAction.token);
        localStorage.setItem('username', resultAction.user.username);
        dispatch(setUser({ user: resultAction.user, token: resultAction.token }));
        navigate('/');
      }
    } catch (error) {
      setError(loginError || 'Login failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(verify2FASetupThunk({ email: form.email, token: otp })).unwrap();
      localStorage.setItem('jwt_token', resultAction.token);
      localStorage.setItem('username', resultAction.user.username);
      dispatch(setUser({ user: resultAction.user, token: resultAction.token }));
      navigate('/');
    } catch (error) {
      setError(loginError || 'OTP verification failed');
    }
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

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
