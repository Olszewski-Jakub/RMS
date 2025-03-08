import React from "react";
import Navigation from "../Navigation/Navigation";
import PropTypes from "prop-types";
import "./Layout.css";

const Layout = ({ children }) => {
  return (
    <div className="layout-container">
      <Navigation />
      <main>{children}</main>
    </div>
  );
};

Layout.propTypes = {
    children: PropTypes.node.isRequired, 
  };

export default Layout;