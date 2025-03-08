import React from 'react';
import "./Auth.css";
import AuthBackground from "../../assets/auth-background.jpg";

// Components
import AuthHeader from '../../components/Authentication/AuthHeader';
import ErrorDisplay from '../../components/Authentication/ErrorDisplay';
import SocialAuthButtons from '../../components/Authentication/SocialAuthButtons';
import LoginForm from '../../components/Authentication/LoginForm';
import RegisterForm from '../../components/Authentication/RegisterForm';

// Custom hooks
import { useAuthForm } from './hooks/useAuthForm';

/**
 * Authentication component that handles both login and registration
 */
const Auth = () => {
    const {
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
    } = useAuthForm();

    return (
        <div className="auth-container">
            <AuthHeader
                isLoginForm={loginForm}
                returnHome={returnHome}
            />

            <img src={AuthBackground} className="auth-background" alt="Background" />

            <div className="auth-card">
                <div className="auth-header">
                    <h1>{loginForm ? "Welcome Back" : "Create Account"}</h1>
                    <p className="auth-subheader">{loginForm ? "Login to continue your journey" : "Join us today"}</p>
                </div>

                <ErrorDisplay error={formError} />

                <SocialAuthButtons
                    loading={loading}
                    handleGoogleAuth={handleGoogleAuth}
                    handleFacebookAuth={handleFacebookAuth}
                />

                <div className="divider">
                    <span>or</span>
                </div>

                {loginForm ? (
                    <LoginForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleLogin}
                        showRegister={showRegister}
                    />
                ) : (
                    <RegisterForm
                        formData={formData}
                        handleChange={handleChange}
                        handleSubmit={handleRegister}
                        showLogin={showLogin}
                        countryCodeRef={countryCodeRef}
                        showCountryCodeDropdown={showCountryCodeDropdown}
                        toggleCountryCodeDropdown={toggleCountryCodeDropdown}
                        handleCountryCodeSelect={handleCountryCodeSelect}
                    />
                )}
            </div>
        </div>
    );
};

export default Auth;