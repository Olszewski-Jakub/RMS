import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext';
import { ROUTES } from '../../../constants/routes.js';

/**
 * Custom hook for managing auth form state and actions
 *
 * @returns {Object} Auth form state and handlers
 */
export const useAuthForm = () => {
    const navigate = useNavigate();
    const [loginForm, setLoginForm] = useState(true);
    const { isLoggedIn, login, register, loginWithGoogle, loginWithFacebook, error } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [showCountryCodeDropdown, setShowCountryCodeDropdown] = useState(false);
    const countryCodeRef = useRef(null);
    const [formError, setFormError] = useState("");

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        countryCode: "+353",
        phoneNumber: "",
    });

    // Redirect if logged in and set error from context
    useEffect(() => {
        if (isLoggedIn) {
            navigate(ROUTES.HOME);
        }

        // Set error from context if available
        if (error) {
            setFormError(error);
        }
    }, [isLoggedIn, navigate, error]);

    // Handle clicks outside the country code dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (countryCodeRef.current && !countryCodeRef.current.contains(event.target)) {
                setShowCountryCodeDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Toggle between login and register forms
    const showLogin = () => {
        setLoginForm(true);
        setFormError("");
    };

    const showRegister = () => {
        setLoginForm(false);
        setFormError("");
    };

    // Form validation and navigation helpers
    const checkPassword = () => formData.password === formData.confirmPassword;
    const returnHome = () => navigate(ROUTES.HOME);

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        // Clear errors when user types
        if (formError) setFormError("");
    };

    // Country code dropdown handlers
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

    // Form submission handlers
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

    // Social auth handlers
    const handleGoogleAuth = async () => {
        if (loading) return; // Prevent multiple clicks
        setFormError("");
        setLoading(true);

        try {
            await loginWithGoogle();
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
            await loginWithFacebook();
        } catch (error) {
            setFormError("Facebook authentication failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return {
        loginForm,
        formData,
        formError,
        loading,
        showCountryCodeDropdown,
        countryCodeRef,
        showLogin,
        showRegister,
        returnHome,
        handleChange,
        handleCountryCodeSelect,
        toggleCountryCodeDropdown,
        handleRegister,
        handleLogin,
        handleGoogleAuth,
        handleFacebookAuth
    };
};