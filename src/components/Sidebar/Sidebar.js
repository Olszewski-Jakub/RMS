import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useState } from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard } from "react-icons/md";
import { MdEventNote } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";
import { LuSettings } from "react-icons/lu";
import { IoMdRestaurant } from "react-icons/io";
import { BiFoodMenu } from "react-icons/bi";
import PropTypes from "prop-types";

const Sidebar = ({isOwner}) => {
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const idToken = Cookies.get('idToken');
        if(idToken){
            setIsLoggedIn(true);
        }else{
            setIsLoggedIn(false);   
        }
    }, []);

    const handleLogout = () => {
        Cookies.remove('idToken');
        Cookies.remove('refreshToken');
        setIsLoggedIn(false);
        navigate('/auth');
    };

    const navigateToHome = () => {
        navigate('/');
    }

    const navigateToDashboard = () => {
        navigate('/dashboard');
    }

    const navigateToSettings = () => {
        navigate('/settings');
    }



    return(
        <nav className="sidebar">
            <div className="nav-items">
                <ul className="sidebar-nav">
                    {isOwner && (
                        <li className="nav-item" onClick={navigateToDashboard}>
                            <MdOutlineDashboard className="icons" />
                            <span className="link-txt">Dashboard</span>
                        </li>)
                    }
                    {!isOwner && (
                    <>    
                        <li className="nav-item" onClick={navigateToDashboard}>
                            <MdEventNote className="icons"/>
                            <span className="link-txt">Reservations</span>
                        </li>
                        <li className="nav-item" onClick={navigateToDashboard}>
                            <IoMdRestaurant className="icons"/>
                            <span className="link-txt">Menu</span>
                        </li>
                        <li className="nav-item" onClick={navigateToDashboard}>
                            <BiFoodMenu className="icons"/>
                            <span className="link-txt">Order</span>
                        </li>
                    </>)}
                    
                </ul>
            </div>
            <div className="logout-container">
                <ul className="sidebar-nav">
                <li className="nav-item" onClick={navigateToSettings}>
                        <LuSettings className="icons"/>
                        <span className="link-txt">Settings</span>
                    </li>
                    <li className="nav-item" onClick={handleLogout}>
                        <BiLogOut className="icons"/>
                        <span className="link-txt">Sign Out</span>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
Sidebar.propTypes = {
    isOwner: PropTypes.bool.isRequired,
};


export default Sidebar;