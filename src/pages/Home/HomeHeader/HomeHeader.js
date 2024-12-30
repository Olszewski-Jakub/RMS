import React, {useState} from "react";
import "./HomeHeader.css";

const HomeHeader = () => {
    const [currentPage, setCurrentPage] = useState("Home");

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
                    onClick={() => handleCurrentPage("Home")}
                    style={{color: currentPage === "Home" ? "#FF7D05" : "black", borderBottom: currentPage === "Home" ? "3px solid #FF7D05" : "none"}}
                >Home</h3>
                <h3
                    onClick={() => handleCurrentPage("Dashboard")}
                    style={{color: currentPage === "Dashboard" ? "#FF7D05" : "black", borderBottom: currentPage === "Dashboard" ? "3px solid #FF7D05" : "none"}}
                >Dashboard</h3>
                <h3
                    onClick={() => handleCurrentPage("Menu")}
                    style={{color: currentPage === "Menu" ? "#FF7D05" : "black", borderBottom: currentPage === "Menu" ? "3px solid #FF7D05" : "none"}}
                >Menu</h3>
                <h3
                    onClick={() => handleCurrentPage("Location")}
                    style={{color: currentPage === "Location" ? "#FF7D05" : "black", borderBottom: currentPage === "Location" ? "3px solid #FF7D05" : "none"}}
                >Location</h3>
            </div>
            <div className="header-right">
                <button className="login-btn auth-btn" style={{
                    color: "#FF7D05",
                    border: "1px solid #FF7D05"
                }}>Log In</button>

                <button className="signup-btn auth-btn" style={{
                    color: "white",
                    border: "none",
                    backgroundColor: "#FF7D05"
                }}>Sign Up</button>
            </div>
        </div>
    )
}

export default HomeHeader;