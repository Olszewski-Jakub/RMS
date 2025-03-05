import React, {useContext, useState, useEffect} from "react";
import "./Navigation.css";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes.js";
import Logo from "./Logo";
import NavigationTabs from "./NavigationTabs";
import AuthButtons from "./AuthButtons";
import {AuthContext} from "../../contexts/AuthContext";
import ProfileButton from "./ProfileButton";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);

    const handleLoginClick = () => {
        navigate(ROUTES.AUTH);
        setMenuOpen(false);
    };

    const handleSignUpClick = () => {
        navigate(ROUTES.AUTH);
        setMenuOpen(false);
    };

    const handleProfileClick = () => {
        navigate(ROUTES.PROFILE);
        setMenuOpen(false);
    };

    const hadndleDashboardClick = () => navigate(ROUTES.ADMIN)

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
        setMenuOpen(false);

        switch (page) {
            case "Home":
                navigate(ROUTES.HOME);
                break;
            case "Menu":
                navigate(ROUTES.MENU);
                break;
            case "Location":
                navigate(ROUTES.LOCATION);
                break;
            case "Reservation":
                navigate(ROUTES.RESERVETABLE);
                break;
            default:
                navigate(ROUTES.HOME);
        }
    };

    // Check if screen size is mobile
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        // Initial check
        handleResize();

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // Close menu when screen size changes to desktop
    useEffect(() => {
        if (!isMobile) {
            setMenuOpen(false);
        }
    }, [isMobile]);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="header-container">
            <Logo />

            {isMobile ? (
                <>
                    <button
                        className="hamburger-menu"
                        onClick={toggleMenu}
                        aria-label={menuOpen ? "Close menu" : "Open menu"}
                    >
                        {menuOpen ? <FaTimes /> : <FaBars />}
                    </button>

                    {menuOpen && (
                        <div className="mobile-menu">
                            <NavigationTabs
                                currentPage={currentPage}
                                handleCurrentPage={handleCurrentPage}
                                isMobile={true}
                            />

                            {isLoggedIn ?
                                <ProfileButton handleProfileClick={handleProfileClick} isMobile={true} /> :
                                <AuthButtons
                                    handleLoginClick={handleLoginClick}
                                    handleSignUpClick={handleSignUpClick}
                                    isMobile={true}
                                />
                            }
                        </div>
                    )}
                </>
            ) : (
                <>
                    <NavigationTabs
                        currentPage={currentPage}
                        handleCurrentPage={handleCurrentPage}
                        isMobile={false}
                    />

                    {isLoggedIn ?
                        <ProfileButton handleProfileClick={handleProfileClick} isMobile={false} /> :
                        <AuthButtons
                            handleLoginClick={handleLoginClick}
                            handleSignUpClick={handleSignUpClick}
                            isMobile={false}
                        />
                    }
                </>
            )}
        </div>
    );
};

export default Navigation;