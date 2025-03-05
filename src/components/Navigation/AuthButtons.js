const AuthButtons = ({ handleLoginClick, handleSignUpClick, isMobile }) => (
    <div className={isMobile ? "mobile-header-right" : "header-right"}>
        <button
            onClick={handleLoginClick}
            className={`login-btn auth-btn ${isMobile ? "mobile-auth-btn" : ""}`}
            style={{ 
                color: "#FF7D05", 
                border: "1px solid #FF7D05", 
                marginRight: isMobile ? "0" : "1rem", 
                marginBottom: isMobile ? "0.5rem" : "0",
                backgroundColor: "white", 
                width: isMobile ? "100%" : "auto" 
            }}
        >
            Log In
        </button>

        <button
            onClick={handleSignUpClick}
            className={`signup-btn auth-btn ${isMobile ? "mobile-auth-btn" : ""}`}
            style={{ 
                color: "white", 
                border: "none", 
                backgroundColor: "#FF7D05",
                width: isMobile ? "100%" : "auto"
            }}
        >
            Sign Up
        </button>
    </div>
);

export default AuthButtons;