import React from 'react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

/**
 * Social authentication buttons component
 *
 * @param {boolean} loading - Loading state
 * @param {Function} handleGoogleAuth - Function to handle Google authentication
 * @param {Function} handleFacebookAuth - Function to handle Facebook authentication
 * @returns {JSX.Element} Social auth buttons component
 */
const SocialAuthButtons = ({ loading, handleGoogleAuth, handleFacebookAuth }) => {
    return (
        <div className="auth-providers">
            <button
                className="provider-button google"
                onClick={handleGoogleAuth}
                type="button"
                disabled={loading}
            >
                <FaGoogle /> <span>{loading ? "Signing in..." : "Continue with Google"}</span>
            </button>
            <button
                className="provider-button facebook"
                type="button"
                onClick={handleFacebookAuth}
                disabled={loading}
            >
                <FaFacebook /> <span>{loading ? "Signing in..." : "Continue with Facebook"}</span>
            </button>
        </div>
    );
};

export default SocialAuthButtons;