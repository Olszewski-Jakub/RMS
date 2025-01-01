import React, { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthContext'; 
import { ROUTES } from "../../constants/routes";
import HomeHeader from "../../components/HomeHeader/HomeHeader.js";
import HomeMain from "../../components/HomeMain/HomeMain.js";
import HomeFooter from "../../components/HomeFooter/HomeFooter.js";

export default function Home(){
    const navigate = useNavigate(); 
    const { isLoggedIn, logout } = useContext(AuthContext);

    const handleClick = () => {
        navigate(ROUTES.AUTH); 
    };

    return(
        /* Write your HTML Code here */
        <div className="home-container">
            <HomeHeader />
            <HomeMain />
            <HomeFooter />
            {/*{isLoggedIn ? (
                <div>
                    <h1>Welcome</h1>
                    <button onClick={logout} style={{padding: "1rem"}}>Logout</button>
                </div>
             ) : 
             <div>
                <h1>Not Logged In</h1>
                <button onClick={handleClick} style={{padding: "1rem"}}>Sign In</button>
            </div>
            }*/}

        </div>
    );
}