import {FaUserCircle} from "react-icons/fa";

const ProfileButton = ({ handleProfileClick }) => (
    <button
        onClick={handleProfileClick}
        className="login-btn auth-btn"
        style={{color: "#FF7D05", border: "1px solid #FF7D05", marginRight: "1rem", backgroundColor: "white", display: "flex", alignItems: "center", padding: "0.5rem 1rem" }}
    >
        <FaUserCircle style={{ marginRight: "0.5rem" }} /> Profile
    </button>
);

export default ProfileButton