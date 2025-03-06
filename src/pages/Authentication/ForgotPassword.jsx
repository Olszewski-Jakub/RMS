import React from "react";
import "./Auth.css";
import AuthBackground from "../../assets/auth-background.jpg";

// Components
import HomeButton from "../../components/Authentication/HomeButton";
import ForgotPasswordForm from "../../components/Authentication/ForgotPasswordForm";
import ResetSuccessMessage from "../../components/Authentication/ResetSuccessMessage";

// Custom hooks
import { useForgotPassword } from "./hooks/useForgotPassword";

/**
 * ForgotPassword component for resetting user passwords
 */
const ForgotPassword = () => {
    const {
        email,
        formError,
        isSubmitting,
        isSubmitted,
        returnHome,
        returnToLogin,
        handleChange,
        handleSubmit
    } = useForgotPassword();

    return (
        <div className="auth-container">
            <HomeButton onClick={returnHome} />

            <img src={AuthBackground} className="auth-background" alt="Background" />

            <div className="auth-card">
                {!isSubmitted ? (
                    <ForgotPasswordForm
                        email={email}
                        formError={formError}
                        isSubmitting={isSubmitting}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        returnToLogin={returnToLogin}
                    />
                ) : (
                    <ResetSuccessMessage
                        email={email}
                        returnToLogin={returnToLogin}
                    />
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;