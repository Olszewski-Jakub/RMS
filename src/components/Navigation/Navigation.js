import React, { useContext, useState, useEffect } from "react";
import "./Navigation.css";
import { useNavigate, useLocation } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import Logo from "./Logo";
import NavigationTabs from "./NavigationTabs";
import AuthButtons from "./AuthButtons";
import { AuthContext } from "../../contexts/AuthContext";
import ProfileButton from "./ProfileButton";
import { FaBars, FaTimes } from "react-icons/fa";

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const [isMobile, setIsMobile] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { isLoggedIn } = useContext(AuthContext);

    // Set initial page based on hash only when on the root path
    useEffect(() => {
        const pathname = location.pathname;
        const hash = location.hash.replace('#', '');

        // Only set active tab from hash when on main routes
        if (pathname === '/' || pathname === ROUTES.HOME) {
            if (hash === 'Home' || hash === 'Menu' || hash === 'Location' || hash === 'Reservation') {
                setCurrentPage(hash);
            } else if (!hash) {
                // Set default hash if on homepage with no hash
                window.location.hash = 'Home';
                setCurrentPage('Home');
            }
        }
    }, [location]);

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

    const handleDashboardClick = () => {
        navigate(ROUTES.ADMIN);
        setMenuOpen(false);
    };

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
        setMenuOpen(false);
        navigate('/');
        window.location.hash = page;
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

    // Check if we're on a main navigation page (home page)
    const isMainRoute = location.pathname === '/' || location.pathname === ROUTES.HOME;

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
                                isMainRoute={isMainRoute}
                                isMobile={true}
                            />

                            {isLoggedIn ? (
                                <ProfileButton
                                    handleProfileClick={handleProfileClick}
                                    handleDashboardOnClick={handleDashboardClick}
                                    isMobile={true}
                                />
                            ) : (
                                <AuthButtons
                                    handleLoginClick={handleLoginClick}
                                    handleSignUpClick={handleSignUpClick}
                                    isMobile={true}
                                />
                            )}
                        </div>
                    )}
                </>
            ) : (
                <>
                    <NavigationTabs
                        currentPage={currentPage}
                        handleCurrentPage={handleCurrentPage}
                        isMainRoute={isMainRoute}
                        isMobile={false}
                    />

                    <div className="header-right-container">
                        {isLoggedIn ? (
                            <ProfileButton
                                handleProfileClick={handleProfileClick}
                                handleDashboardOnClick={handleDashboardClick}
                                isMobile={false}
                            />
                        ) : (
                            <AuthButtons
                                handleLoginClick={handleLoginClick}
                                handleSignUpClick={handleSignUpClick}
                                isMobile={false}
                            />
                        )}
                    </div>
                </>
            )}
        </div>
    );
};

export default Navigation;