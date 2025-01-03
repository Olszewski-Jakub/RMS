import React from "react";
import HomeHeader from "../components/HomeHeader/HomeHeader";
import PropTypes from "prop-types";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <HomeHeader />
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired, 
  };

export default Layout;
