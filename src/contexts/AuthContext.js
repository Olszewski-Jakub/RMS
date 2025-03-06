import React, {createContext, useState, useEffect, useContext} from "react";
import PropTypes from "prop-types";
import COOKIE_KEYS from "../constants/cookieKeys"; // Adjust the path as necessary
import authService from "../services/auth.service"; // Adjust the path as necessary
import userService from "../services/user.service";
import cookieManager from "../utils/cookieManager";
import {signInWithPopup, GoogleAuthProvider} from "firebase/auth";
import {auth, facebookProvider, provider} from "./FirebaseConfig"; // Adjust the path as necessary
export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const idToken = cookieManager.get(COOKIE_KEYS.ID_TOKEN);
        setIsLoggedIn(!!idToken);
    }, []);

    const login = async (email, password) => {
        try {
            await authService.login(email, password);
            setIsLoggedIn(true);
            const userResponse = await userService.userDetails();
            cookieManager.set(COOKIE_KEYS.USER, userResponse.privileges, {expires: 1})

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

    const loginWithGoogle = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // Retrieve the signed-in user.
                const user = result.user;
                // Get the ID token for the user.
                user.getIdToken().then((idToken) => {
                    // Now you have the ID token to send to your backend.
                    sendGoogleToken(idToken);
                    console.log("ID Token:", idToken);
                }).catch((error) => {
                    console.error("Error getting ID token:", error);
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.error(
                    "Error code: " + errorCode + "\n" +
                    "Error message: " + errorMessage + "\n" +
                    "Email: " + email + "\n" +
                    "Credential: " + credential
                );
            });
    }

    const loginWithFacebook = async () => {
        signInWithPopup(auth, facebookProvider)
            .then((result) => {
                // Retrieve the signed-in user.
                const user = result.user;
                // Get the ID token for the user.
                user.getIdToken().then((idToken) => {
                    // Now you have the ID token to send to your backend.
                    sendGoogleToken(idToken);
                    console.log("ID Token:", idToken);
                }).catch((error) => {
                    console.error("Error getting ID token:", error);
                });
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                const email = error.customData.email;
                const credential = GoogleAuthProvider.credentialFromError(error);

                console.error(
                    "Error code: " + errorCode + "\n" +
                    "Error message: " + errorMessage + "\n" +
                    "Email: " + email + "\n" +
                    "Credential: " + credential
                );
            });
    }

    const sendGoogleToken = async (tokenId) => {
        try {
            const response = await authService.google(tokenId);
            console.log("Google login response:", response);
            setIsLoggedIn(true);
        } catch (error) {
            console.error("Google login error:", error);
        }
    };

    return (
        <AuthContext.Provider value={{isLoggedIn, login, register, logout, loginWithGoogle,loginWithFacebook, sendGoogleToken}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
