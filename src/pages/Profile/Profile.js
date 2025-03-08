import React, { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/routes";
import './Profile.css';
import MyReservations from "./components/MyReservations";
import MyAccount from "./components/MyAccount";

export default function Profile() {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("reservations");


  const handleManage = (id) => {
    alert(`Manage reservation ${id} clicked`);
  };

  const handleCancel = () => {
    alert("Cancel reservation clicked");
  };

  const handleLogoutClick = () => {
    logout();
    navigate(ROUTES.HOME);
  };

  return (
    <div className="profile-layout">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <div className="sidebar-header">
          <h2>My Profile</h2>
        </div>
        <ul className="sidebar-menu">
          <li
            className={activeTab === "account" ? "active" : ""}
            onClick={() => setActiveTab("account")}
          >
            My Account
          </li>
          <li
            className={activeTab === "reservations" ? "active" : ""}
            onClick={() => setActiveTab("reservations")}
          >
            Reservations
          </li>
        </ul>
        {/* Separate logout container */}
        <div className="logout-container">
          <button onClick={handleLogoutClick} className="logout-btn">
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}

      <>

      {activeTab === 'reservations' && (
        <MyReservations handleManage={handleManage} handleCancel={handleCancel}/>
      )}

      {activeTab === 'account' && (
          <MyAccount />
      )}

      </>
    </div>
  );
}