import React from "react";
import { FaUserCircle, FaRegChartBar } from "react-icons/fa";
import { motion } from "framer-motion";
import cookieManager from "../../utils/cookieManager";
import COOKIE_KEYS from "../../constants/cookieKeys";

const ProfileButton = ({ handleProfileClick, handleDashboardOnClick, isMobile }) => {
    const user = cookieManager.get(COOKIE_KEYS.USER);
    const isAdmin = ["owner", "employee"].includes(user);

    if (isMobile) {
        return (
            <div className="mobile-profile-buttons">
                <motion.button
                    onClick={handleProfileClick}
                    className="mobile-profile-btn"
                    whileTap={{ scale: 0.95 }}
                >
                    <FaUserCircle /> Profile
                </motion.button>

                {isAdmin && (
                    <motion.button
                        onClick={handleDashboardOnClick}
                        className="mobile-dashboard-btn"
                        whileTap={{ scale: 0.95 }}
                    >
                        <FaRegChartBar /> Dashboard
                    </motion.button>
                )}
            </div>
        );
    }

    return (
        <div className="profile-buttons-container">
            <motion.button
                onClick={handleProfileClick}
                className="profile-btn"
                whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
                whileTap={{ scale: 0.95 }}
            >
                <FaUserCircle /> Profile
            </motion.button>

            {isAdmin && (
                <motion.button
                    onClick={handleDashboardOnClick}
                    className="dashboard-btn"
                    whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
                    whileTap={{ scale: 0.95 }}
                >
                    <FaRegChartBar /> Dashboard
                </motion.button>
            )}
        </div>
    );
};

export default ProfileButton;