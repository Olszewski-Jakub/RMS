import React from "react";
import { FaHome } from "react-icons/fa";

/**
 * Home button component for navigation
 *
 * @param {Function} onClick - Function to navigate home
 * @returns {JSX.Element} Home button component
 */
const HomeButton = ({ onClick }) => {
    return (
        <div className="return-home-button" onClick={onClick}>
            <FaHome />
            <span>Home</span>
        </div>
    );
};

export default HomeButton;