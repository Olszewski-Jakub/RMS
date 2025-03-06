import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import { ROUTES } from "../../constants/routes.js";
import AuthBackground from "../../assets/auth-background.jpg";
import { FaHome, FaEnvelope, FaArrowLeft } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import authService from "../../services/auth.service";
export default function ForgotPassword() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { resetPassword, error } = useContext(AuthContext);

    const returnHome = () => navigate(ROUTES.HOME);
    const returnToLogin = () => navigate(ROUTES.AUTH);

    const handleChange = (e) => {
        setEmail(e.target.value);

        // Clear errors when user types
        if (formError) setFormError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormError("");
        setIsSubmitting(true);

        try {
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                setFormError("Please enter a valid email address.");
                setIsSubmitting(false);
                return;
            }

            // Call reset password function from context
            // This is a placeholder - implement the actual resetPassword function in your AuthContext
            const result = await resetPassword(email);

            // If successful, show success message
            setIsSubmitted(true);
        } catch (err) {
            setFormError(error || "Failed to send reset link. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-container">
            <div className="return-home-button" onClick={returnHome}>
                <FaHome />
                <span>Home</span>
            </div>

            <img src={AuthBackground} className="auth-background" alt="Background" />

            <div className="auth-card">
                {!isSubmitted ? (
                    <>
                        <div className="auth-header">
                            <h1>Forgot Password</h1>
                            <p className="auth-subheader">Enter your email to receive a reset link</p>
                        </div>

                        {formError && (
                            <div className="auth-error">
                                {formError}
                            </div>
                        )}

                        <form className="auth-form" onSubmit={handleSubmit}>
                            <div className="input-group">
                                <FaEnvelope className="input-icon" />
                                <input
                                    type="email"
                                    name="email"
                                    value={email}
                                    placeholder="Your Email Address"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="auth-button"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Sending..." : "Send Reset Link"}
                            </button>

                            <div className="back-to-login" onClick={returnToLogin}>
                                <FaArrowLeft /> <span>Back to Login</span>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="reset-success">
                        <div className="auth-header">
                            <h1>Email Sent</h1>
                            <p className="auth-subheader">
                                A password reset link has been sent to <strong>{email}</strong>
                            </p>
                        </div>

                        <p className="reset-instructions">
                            Please check your email and follow the instructions to reset your password.
                            If you don't see the email in your inbox, please check your spam folder.
                        </p>

                        <button
                            className="auth-button"
                            onClick={returnToLogin}
                        >
                            Return to Login
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}