import React from "react";
import { motion } from "framer-motion";

const Logo = () => (
    <motion.div
        className="header-left"
        whileHover={{ scale: 1.05 }}
    >
        <h1 className="logo">
            R<span className="logo-highlight">M</span>S
        </h1>
    </motion.div>
);

export default Logo;