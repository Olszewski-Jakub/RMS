import { FaUserCircle } from "react-icons/fa";
import cookieManager from "../../utils/cookieManager";
import COOKIE_KEYS from "../../constants/cookieKeys";
const ProfileButton = ({ handleProfileClick, handleDashboardOnClick }) => {
    const user = cookieManager.get(COOKIE_KEYS.USER)
    console.log(user)
    return (

        <div>
            <button
                onClick={handleProfileClick}
                className="login-btn auth-btn"
                style={{
                    color: "#FF7D05",
                    border: "1px solid #FF7D05",
                    marginRight: "1rem",
                    backgroundColor: "white",
                    display: "flex",
                    alignItems: "center",
                    padding: "0.5rem 1rem",
                }}
            >
                <FaUserCircle style={{ marginRight: "0.5rem" }} /> Profile
            </button>

            {["owner", "employee"].includes(user) && (
                <button
                    onClick={handleDashboardOnClick}
                    className="login-btn auth-btn"
                    style={{
                        color: "#FF7D05",
                        border: "1px solid #FF7D05",
                        marginRight: "1rem",
                        backgroundColor: "white",
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                    }}
                >
                    <FaUserCircle style={{ marginRight: "0.5rem" }} /> Dashboard
                </button>
            )}
        </div>
    );
};

export default ProfileButton;
