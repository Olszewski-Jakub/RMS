import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { ROUTES } from '../../constants/routes.js';

/**
 * Login form component
 *
 * @param {Object} formData - Form data object
 * @param {Function} handleChange - Function to handle input changes
 * @param {Function} handleSubmit - Function to handle form submission
 * @param {Function} showRegister - Function to switch to register form
 * @returns {JSX.Element} Login form component
 */
const LoginForm = ({ formData, handleChange, handleSubmit, showRegister }) => {
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
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
        </form>
    );
};

export default LoginForm;