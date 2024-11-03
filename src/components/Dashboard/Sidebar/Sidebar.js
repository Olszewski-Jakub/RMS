import React from "react";
import "./Sidebar.css";
import { CiLogout } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useState } from "react";

const Sidebar = () => {
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
        navigate('/');
    };
    return(
        <div className="sidebar">
            <div className="home-btn-container">
                <CiLogout className="logout-icon" onClick={handleLogout}/>
            </div>

        </div>
    )
}

export default Sidebar;