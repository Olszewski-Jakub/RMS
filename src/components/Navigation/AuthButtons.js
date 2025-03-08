import React from "react";
import { motion } from "framer-motion";

const AuthButtons = ({ handleLoginClick, handleSignUpClick, isMobile }) => (
    <div className={isMobile ? "mobile-header-right" : "header-right"}>
        <motion.button
            onClick={handleLoginClick}
            className={`login-btn auth-btn ${isMobile ? "mobile-auth-btn" : ""}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
        >
            Log In
        </motion.button>

        <motion.button
            onClick={handleSignUpClick}
            className={`signup-btn auth-btn ${isMobile ? "mobile-auth-btn" : ""}`}
            whileHover={{ scale: 1.05, boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
        >
            Sign Up
        </motion.button>
    </div>
);

export default AuthButtons;