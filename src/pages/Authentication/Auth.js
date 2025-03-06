import React, {useContext, useEffect, useState, useRef} from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import {ROUTES} from "../../constants/routes.js";
import AuthBackground from "../../assets/auth-background.jpg";
import { FaHome, FaGoogle, FaFacebook, FaApple, FaEnvelope, FaLock, FaUser, FaPhone, FaChevronDown, FaGlobe } from "react-icons/fa";
import {AuthContext} from "../../contexts/AuthContext";
import { countryCodes } from "../../utils/countryCodeData";

export default function Auth() {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState(true);
    const { isLoggedIn, login, register, loginWithGoogle, loginWithFacebook, error } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
    const countryCodeRef = useRef(null);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryCode: "+353",
        phoneNumber: "",
    });

    const [formError, setFormError] = useState("");

    useEffect(() => {
        if (isLoggedIn) {
            navigate(ROUTES.HOME);
        }

        // Set error from context if available
        if (error) {
            setFormError(error);
        }

        // Close dropdown when clicking outside
        const handleClickOutside = (event) => {
            if (countryCodeRef.current && !countryCodeRef.current.contains(event.target)) {
                setShowCountryCodeDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isLoggedIn, navigate, error]);

    const showLogin = () => {
        setLoginForm(true);
        setFormError("");
    };

    const showRegister = () => {
        setLoginForm(false);
        setFormError("");
    };

    const checkPassword = () => formData.password === formData.confirmPassword;
    const returnHome = () => navigate(ROUTES.HOME);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear errors when user types
        if (formError) setFormError("");
    };

    const handleCountryCodeSelect = (code) => {
        setFormData((prevData) => ({
            ...prevData,
            countryCode: code,
        }));
        setShowCountryCodeDropdown(false);
    };

    const toggleCountryCodeDropdown = () => {
        setShowCountryCodeDropdown(!showCountryCodeDropdown);
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setFormError("");

        if (!checkPassword()) {
            setFormError("Passwords do not match");
            return;
        }

        const result = await register(formData, () => showLogin());
        if (!result?.success && !error) {
            setFormError("Registration failed. Please try again.");
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setFormError("");

        const result = await login(formData.email, formData.password);
        if (!result?.success && !error) {
            setFormError("Login failed. Please check your credentials.");
        }
    };

    const handleGoogleAuth = async () => {
        if (loading) return; // Prevent multiple clicks
        setFormError("");
        setLoading(true);

        try {
            const result = await loginWithGoogle();
        } catch (error) {
            setFormError("Google authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleFacebookAuth = async () => {
        setFormError("");
        setLoading(true);
        try {
            const result = await loginWithFacebook();
        } catch (error) {
            setFormError("Facebook authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-container">
            <div className="return-home-button" onClick={returnHome}>
                <FaHome />
                <span>Home</span>
            </div>

            <img src={AuthBackground} className="auth-background" alt="Background" />

            <div className="auth-card">
                <div className="auth-header">
                    <h1>{loginForm ? "Welcome Back" : "Create Account"}</h1>
                    <p className="auth-subheader">{loginForm ? "Login to continue your journey" : "Join us today"}</p>
                </div>

                {formError && (
                    <div className="auth-error">
                        {formError}
                    </div>
                )}

                <div className="auth-providers">
                    <button
                        className="provider-button google"
                        onClick={handleGoogleAuth}
                        type="button"
                        disabled={loading}
                    >
                        <FaGoogle /> <span>{loading ? "Signing in..." : "Continue with Google"}</span>
                    </button>
                    <button className="provider-button facebook" type="button" onClick={handleFacebookAuth}>
                        <FaFacebook /> <span>{loading ? "Signing in..." : "Continue with Facebook"}</span>
                    </button>
                </div>

                <div className="divider">
                    <span>or</span>
                </div>

                <form
                    className="auth-form"
                    onSubmit={loginForm ? handleLogin : handleRegister}>
                    {loginForm ? (
                        <>
                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="forgot-password">
                                <a href={ROUTES.FORGOT_PASSWORD}>Forgot Password?</a>
                            </div>
                            <button type="submit" className="auth-button">Sign In</button>
                            <p className="auth-switch">
                                Don't have an account?
                                <span onClick={showRegister}>Sign up</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <div className="name-fields">
                                <div className="input-group">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        name="firstName"
                                        value={formData.firstName}
                                        placeholder="First Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="input-group">
                                    <FaUser className="input-icon" />
                                    <input
                                        type="text"
                                        name="lastName"
                                        value={formData.lastName}
                                        placeholder="Last Name"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    placeholder="Email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="input-group">
                                <FaLock className="input-icon" />
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="phone-input-container">
                                <div ref={countryCodeRef} className="country-code-selector">
                                    <div
                                        className="country-code-display"
                                        onClick={toggleCountryCodeDropdown}
                                    >
                                        <FaGlobe className="country-code-icon" />
                                        <span>{formData.countryCode}</span>
                                        <FaChevronDown className="dropdown-icon" />
                                    </div>

                                    {showCountryCodeDropdown && (
                                        <div className="country-code-dropdown">
                                            {countryCodes.map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="country-code-option"
                                                    onClick={() => handleCountryCodeSelect(item.code)}
                                                >
                                                    <span className="country-code">{item.code}</span>
                                                    <span className="country-name">{item.country}</span>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="phone-input-group">
                                    <FaPhone className="phone-input-icon" />
                                    <input
                                        type="tel"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        placeholder="Phone Number"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                            <button type="submit" className="auth-button">Register</button>
                            <p className="auth-switch">
                                Already have an account?
                                <span onClick={showLogin}>Sign in</span>
                            </p>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
}