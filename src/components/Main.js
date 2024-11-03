import React from "react";
import "../Styles/Main.css";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useEffect } from "react";
import { useState } from "react";


export default function Main(){
    const navigate = useNavigate(); 
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClick = () => {
        navigate("/auth"); 
    };
    
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



    return(
        /* Write your HTML Code here */
        <div>
            <h1>Main Page</h1>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome</h1>
                    <button onClick={handleLogout} style={{padding: "1rem"}}>Logout</button>
                </div>
             ) : "Not logged In"}
            <button onClick={handleClick} style={{padding: "1rem"}}>Sign In</button>
        </div>
    );
}
