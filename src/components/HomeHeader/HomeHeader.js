import React, {useState} from "react";
import "./HomeHeader.css";
import { useNavigate } from "react-router-dom";

const HomeHeader = () => {
    const [currentPage, setCurrentPage] = useState("Home");

    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/auth");
    };

    const handleSignUpClick = () => {
        navigate("/auth");
    };

    const handleCurrentPage = (page) => {
        setCurrentPage(page);
    }

    return(
        <div className="header-container">
            <div className="header-left">
                <h1 className="logo">R<span style={{color: "#FF7D05", fontFamily: "Lavishly Yours"}}>M</span>S</h1>
            </div>
            <div className="header-center">
                <h3
                    className="header-btn"
                    onClick={() => handleCurrentPage("Home")}
                    style={{color: currentPage === "Home" ? "#FF7D05" : "black", borderBottom: currentPage === "Home" ? "3px solid #FF7D05" : "none"}}
                >Home</h3>
                <h3
                    className="header-btn"
                    onClick={() => handleCurrentPage("Dashboard")}
                    style={{color: currentPage === "Dashboard" ? "#FF7D05" : "black", borderBottom: currentPage === "Dashboard" ? "3px solid #FF7D05" : "none"}}
                >Dashboard</h3>
                <h3
                    className="header-btn"
                    onClick={() => handleCurrentPage("Menu")}
                    style={{color: currentPage === "Menu" ? "#FF7D05" : "black", borderBottom: currentPage === "Menu" ? "3px solid #FF7D05" : "none"}}
                >Menu</h3>
                <h3
                    className="header-btn"
                    onClick={() => handleCurrentPage("Location")}
                    style={{color: currentPage === "Location" ? "#FF7D05" : "black", borderBottom: currentPage === "Location" ? "3px solid #FF7D05" : "none"}}
                >Location</h3>
            </div>
            <div className="header-right">
                <button 
                onClick={handleLoginClick}
                className="login-btn auth-btn" style={{
                    color: "#FF7D05",
                    border: "1px solid #FF7D05",
                    marginRight: "1rem"
                }}>Log In</button>

                <button 
                onClick={handleSignUpClick}
                className="signup-btn auth-btn" style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#FF7D05"
                }}
                >Sign Up</button>
            </div>
        </div>
    )
}

export default HomeHeader;