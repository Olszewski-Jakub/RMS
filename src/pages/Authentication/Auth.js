import React, {useContext, useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import {ROUTES} from "../../constants/routes.js";
import AuthBackground from "../../assets/auth-background.jpg";
import { FaHome } from "react-icons/fa";
import {AuthContext} from "../../contexts/AuthContext";


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
            <div className="return-home-container" onClick={returnHome}>
                <p><FaHome style={{marginRight: "0.5rem"}}/> Home</p>
            </div>

            <img src={AuthBackground} className="auth-background" alt="Background" />
            <div className="auth-form-container">
                <h1 style={{color: "#FF7D05", marginBottom: "2rem"}}>{loginForm ? "LOGIN" : "CREATE AN ACCOUNT"}</h1>
                <form 
                className="auth-form"
                style={{display: "flex", flexDirection: "column"}}
                onSubmit={loginForm ? handleLogin : handleRegister}>
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
                            <button type="submit" className="auth-login-btn">Sign In</button>
                            <h4 style={{display: "flex", justifyContent: "center"}}>Don&apos;t have an account?<span onClick={showRegister}> Sign Up </span></h4>
                        </>
                    ) : (
                        <>
                            <div className="reg-name-container" style={{display: "flex"}}>
                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    placeholder="First Name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "45%",
                                        marginRight: "10%"
                                    }}
                                />
                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    placeholder="Last Name"
                                    onChange={handleChange}
                                    required
                                    style={{
                                        width: "45%"
                                    }}
                                />
                            </div>
                            
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
                            <input
                                type="password"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                placeholder="Confirm Password"
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="text"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                placeholder="Phone Number"
                                onChange={handleChange}
                                required
                            />
                            <button type="submit" className="auth-reg-btn">Register</button>
                            <h4 style={{display: "flex", justifyContent: "center"}}>Already have an account?<span onClick={showLogin}> Login </span></h4>
                        </>
                    )}
                </form>
            </div>
            
        </div>
    );
}