import React from 'react';
import { FaHome } from 'react-icons/fa';

/**
 * Auth header component with title, subtitle and home button
 *
 * @param {boolean} isLoginForm - Whether it's a login form or register form
 * @param {Function} returnHome - Function to navigate to home page
 * @returns {JSX.Element} Auth header component
 */
const AuthHeader = ({ isLoginForm, returnHome }) => {
    return (
        <>
            <div className="return-home-button" onClick={returnHome}>
                <FaHome />
                <span>Home</span>
            </div>
        </>
    );
};

export default AuthHeader;