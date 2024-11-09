import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import COOKIE_KEYS from "../constants/cookieKeys"; // Adjust the path as necessary
import authService from "../services/authService"; // Adjust the path as necessary
import cookieManager from "../utils/cookieManager";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const idToken = cookieManager.get(COOKIE_KEYS.ID_TOKEN);
    setIsLoggedIn(!!idToken);
  }, []);

  const login = async (email, password) => {
    try {
      await authService.login(email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Login error:", error);
    }

    AuthProvider.propTypes = {
      children: PropTypes.node.isRequired,
    };
  };

  const register = async (formData, callback) => {
    try {
      await authService.register(formData);
      callback();
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const logout = async () => {
    await authService.logout();
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};