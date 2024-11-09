import React from "react";
import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect,useState } from "react";
import { GoHome } from "react-icons/go";
import { MdOutlineDashboard,MdEventNote } from "react-icons/md";
import { BiLogOut } from "react-icons/bi";

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
        <nav className="sidebar">
            <div className="nav-items">
                <ul className="sidebar-nav">
                    <li className="nav-item">
                        <GoHome className="icons"/>
                        <span className="link-txt">Home</span>
                    </li>
                    <li className="nav-item">
                        <MdOutlineDashboard className="icons"/>
                        <span className="link-txt">Dashboard</span>
                    </li>
                    <li className="nav-item">
                        <MdEventNote className="icons"/>
                        <span className="link-txt">Reservations</span>
                    </li>
                    
                </ul>
            </div>
            <div className="logout-container">
                <ul className="sidebar-nav">
                    <li className="nav-item">
                        <BiLogOut className="icons"/>
                        <span className="link-txt">Sign Out</span>
                    </li>
                </ul>
                
            </div>
        </nav>
    )
}

export default Sidebar;