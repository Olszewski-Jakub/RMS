import React, {useContext, useState} from "react";
import "./Navigation.css";
import {useNavigate} from "react-router-dom";
import {ROUTES} from "../../constants/routes.js";
import Logo from "./Logo";
import NavigationTabs from "./NavigationTabs";
import AuthButtons from "./AuthButtons";
import {AuthContext} from "../../contexts/AuthContext";
import ProfileButton from "./ProfileButton";

const Navigation = () => {
    const [currentPage, setCurrentPage] = useState("Home");
    const navigate = useNavigate();
    const {isLoggedIn} = useContext(AuthContext);
    const handleLoginClick = () => navigate(ROUTES.AUTH);
    const handleSignUpClick = () => navigate(ROUTES.AUTH);

    const handleProfileClick = () => navigate(ROUTES.PROFILE)

    const hadndleDashboardClick = () => navigate(ROUTES.ADMIN)

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
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

    return (
        <div className="header-container">
            <Logo/>

            <NavigationTabs currentPage={currentPage} handleCurrentPage={handleCurrentPage}/>

                {isLoggedIn ? <ProfileButton handleProfileClick={handleProfileClick} handleDashboardOnClick={hadndleDashboardClick}/> :
                    <AuthButtons handleLoginClick={handleLoginClick} handleSignUpClick={handleSignUpClick}/>}
        </div>
    );
}

export default Navigation;