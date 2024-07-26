import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./register.css";
import robotChefLogo from "../image/Robot-Chef.png";
import { registerUser, setup2FAThunk, verify2FASetupThunk } from "../store/userSlice";

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // Step 1: Registration, Step 2: OTP Setup
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const qrCode = useSelector((state) => state.user.qrCode);
  const otpSetupStatus = useSelector((state) => state.user.otpSetupStatus);
  const registrationError = useSelector((state) => state.user.error);

  useEffect(() => {
    if (registrationError) {
      setError(registrationError);
    }
  }, [registrationError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(registerUser(form)).unwrap();
      await handleSetup2FA(form.email);
      setStep(2);
    } catch (error) {
      setError("Registration failed");
    }
  };

  const handleSetup2FA = async (email) => {
    try {
      await dispatch(setup2FAThunk(email)).unwrap();
    } catch {
      setError("Failed to generate QR code");
    }
  };

  const handleVerify2FASetup = async () => {
    try {
      await dispatch(
        verify2FASetupThunk({ email: form.email, token: otp })
      ).unwrap();
      setError("2FA setup is complete. You can now log in.");
      navigate("/login");
    } catch {
      setError("Invalid OTP");
    }
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1 className="text-center">
          <b>REGISTER</b>
        </h1>
        {error && <p className="text-danger">{error}</p>}
        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
              />
            </div>
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
            <button type="submit" className="btn btn-primary">
              Register
            </button>
          </form>
        )}
        {step === 2 && (
          <div>
            {qrCode && <img src={qrCode} alt="QR Code" />}
            <div className="form-group">
              <label htmlFor="otp">OTP</label>
              <input
                type="text"
                className="form-control"
                id="otp"
                name="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
            </div>
            <button onClick={handleVerify2FASetup} className="btn btn-primary">
              Verify OTP
            </button>
          </div>
        )}
      </div>
      <div className="register-logo">
        <img src={robotChefLogo} alt="Robot Chef Logo" />
      </div>
    </div>
  );
};

export default Register;
