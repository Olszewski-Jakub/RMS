import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import countryCodes from "../../constants/countryCodes";
import ROUTES from "../../constants/routes";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary
export default function Auth() {
  const navigate = useNavigate();
  const [loginForm, setLoginForm] = useState(true);
  const { isLoggedIn, login, register } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    countryCode: "+353",
    phoneNumber: "",
  });

  useEffect(() => {
    if (isLoggedIn) {
      navigate(ROUTES.HOME);
    }
  }, [isLoggedIn, navigate]);

  const showLogin = () => setLoginForm(true);
  const showRegister = () => setLoginForm(false);
  const checkPassword = () => formData.password === formData.confirmPassword;
  const returnHome = () => navigate(ROUTES.HOME);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!checkPassword()) {
      console.error("Passwords do not match");
      return;
    }
      await register(formData, () => showLogin());
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(formData.email, formData.password);
  };

  return (
    <div className="auth-container">
      <div
        onClick={returnHome}
        style={{
          cursor: "pointer",
          width: "5rem",
          height: "3rem",
          backgroundColor: "green",
          position: "absolute",
          top: "0",
          left: "0",
        }}
      >
        <h4>Return Home</h4>
      </div>
      <div className="content-container">
        <div className="btn-container">
          <button className="login-btn auth-btn" onClick={showLogin}>
            Login
          </button>
          <button className="register-btn auth-btn" onClick={showRegister}>
            Register
          </button>
        </div>
        <div className="form-container" style={{ width: "100%" }}>
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={loginForm ? handleLogin : handleRegister}
          >
            {loginForm ? (
              <>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Email"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Password"
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="submit-btn">
                  Login
                </button>
              </>
            ) : (
              <>
                <div
                  className="name-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    id="firstName"
                    placeholder="First Name"
                    onChange={handleChange}
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    id="lastName"
                    placeholder="Last Name"
                    onChange={handleChange}
                    required
                  />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  placeholder="Enter Email"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  placeholder="Enter Password"
                  onChange={handleChange}
                  required
                />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  placeholder="Confirm Password"
                  onChange={handleChange}
                  required
                />
                <div
                  className="phone-container"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <select
                    name="countryCode"
                    value={formData.countryCode}
                    onChange={handleChange}
                    style={{
                      minWidth: "25%",
                      padding: "10px",
                      height: "40px",
                    }}
                    required
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        ({country.code})
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    placeholder="Phone Number"
                    onChange={handleChange}
                    style={{
                      width: "70%",
                      padding: "10px",
                      height: "40px",
                    }}
                    required
                  />
                </div>
                <button type="submit" className="submit-btn">
                  Register
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}