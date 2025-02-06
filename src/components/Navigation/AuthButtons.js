const AuthButtons = ({ handleLoginClick, handleSignUpClick }) => (
    <div className="header-right">
        <button
            onClick={handleLoginClick}
            className="login-btn auth-btn"
            style={{ color: "#FF7D05", border: "1px solid #FF7D05", marginRight: "1rem", backgroundColor: "white" }}
        >
            Log In
        </button>

        <button
            onClick={handleSignUpClick}
            className="signup-btn auth-btn"
            style={{ color: "white", border: "none", backgroundColor: "#FF7D05" }}
        >
            Sign Up
        </button>
    </div>
);

export default AuthButtons