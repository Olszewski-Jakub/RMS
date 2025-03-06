import React from "react";
import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

/**
 * Form component for requesting password reset
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element} Forgot password form component
 */
const ForgotPasswordForm = ({
                                email,
                                formError,
                                isSubmitting,
                                handleChange,
                                handleSubmit,
                                returnToLogin
                            }) => {
    return (
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
    );
};

export default ForgotPasswordForm;