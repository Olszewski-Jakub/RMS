import React from "react";
import { motion } from "framer-motion";

const NavigationTabs = ({ currentPage, handleCurrentPage, isMobile }) => {
    const menuItems = ["Home", "Reservation", "Menu", "Location"];

    return (
        <div className={isMobile ? "mobile-header-center" : "header-center"}>
            {menuItems.map((item) => (
                <motion.div
                    key={item}
                    className={isMobile ? "mobile-nav-item-container" : "nav-item-container"}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <div
                        className={isMobile ? "mobile-header-btn" : "header-btn"}
                        onClick={() => handleCurrentPage(item)}
                    >
                        {item}
                        {}
                        {currentPage === item && window.location.pathname === '/' && (
                            <motion.div
                                className="nav-indicator"
                                layoutId="indicator"
                                initial={false}
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default NavigationTabs;