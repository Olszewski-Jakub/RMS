import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes.js";
import { AuthContext } from "../../../contexts/AuthContext";

/**
 * Custom hook for handling forgot password functionality
 *
 * @returns {Object} Forgot password state and handlers
 */
export const useForgotPassword = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [formError, setFormError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { resetPassword, error } = useContext(AuthContext);

    // Navigation handlers
    const returnHome = () => navigate(ROUTES.HOME);
    const returnToLogin = () => navigate(ROUTES.AUTH);

    // Input change handler
    const handleChange = (e) => {
        setEmail(e.target.value);
        if (formError) setFormError("");
    };

    // Form submission handler
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
            await resetPassword(email);

            // If successful, show success message
            setIsSubmitted(true);
        } catch (err) {
            setFormError(error || "Failed to send reset link. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return {
        email,
        formError,
        isSubmitting,
        isSubmitted,
        returnHome,
        returnToLogin,
        handleChange,
        handleSubmit
    };
};