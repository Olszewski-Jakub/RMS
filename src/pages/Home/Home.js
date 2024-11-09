import React, { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext'; // Adjust the path as necessary
import { ROUTES } from "../../constants/routes";

export default function Home(){
    const navigate = useNavigate(); 
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleClick = () => {
        navigate(ROUTES.AUTH); 
    };

    return(
        /* Write your HTML Code here */
        <div>
            <h1>Main Page</h1>
            {isLoggedIn ? (
                <div>
                    <h1>Welcome</h1>
                    <button onClick={logout} style={{padding: "1rem"}}>Logout</button>
                </div>
             ) : 
             <div>
                <h1>Not Logged In</h1>
                <button onClick={handleClick} style={{padding: "1rem"}}>Sign In</button>
            </div>
            }
        </div>
    );
}