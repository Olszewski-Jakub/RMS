import React, { useContext } from "react";
import {AuthContext} from "../../contexts/AuthContext";
import {useNavigate} from "react-router-dom";
import ROUTES from "../../constants/routes";
import './Profile.css';

export default function Profile(){
    const navigate = useNavigate();
    const {logout} = useContext(AuthContext);
 
    const reservation = {
    id: "12345",
    date: "2025-02-20",
    startTime: "18:00",
    endTime: "20:00",
    people: 4,
    summary: "A dinner with friends.",
  };

  const reservationHistory = [
    { id: "12344", date: "2025-02-10", startTime: "19:00", endTime: "21:00", people: 2, summary: "Dinner date." },
    { id: "12343", date: "2025-01-25", startTime: "20:00", endTime: "22:00", people: 6, summary: "Family gathering." }
  ];

  const handleManage = () => {
    alert("Manage reservation clicked");
  };

  const handleCancel = () => {
    alert("Cancel reservation clicked");
  };

    const handleLogoutClick = () => {
        logout()
        navigate(ROUTES.HOME);
    };

    return (
        <div className="profile-container">
      <h2>Reservation Profile</h2>
      <div className="reservation-details">
        <h3 style={{ margin: "5px 0" }}>Your next reservation:</h3>
        <p><strong>Reservation ID:</strong> {reservation.id}</p>
        <p><strong>Date:</strong> {reservation.date}</p>
        <p><strong>Time:</strong> {reservation.startTime} - {reservation.endTime}</p>
        <p><strong>People:</strong> {reservation.people}</p>
        <p><strong>Summary:</strong> {reservation.summary}</p>
      </div>
      <div className="buttons">
        <button className="manage-btn" onClick={handleManage}>Manage</button>
        <button className="cancel-btn" onClick={handleCancel}>Cancel</button>
      </div>
      <h3 style={{ margin: "5px 0" }}>Reservation History</h3>
      <table className="history-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>People</th>
            <th>Summary</th>
          </tr>
        </thead>
        <tbody>
          {reservationHistory.map((res) => (
            <tr key={res.id}>
              <td>{res.id}</td>
              <td>{res.date}</td>
              <td>{res.startTime} - {res.endTime}</td>
              <td>{res.people}</td>
              <td>{res.summary}</td>
            </tr>
          ))}
        </tbody>
      </table>
          <button onClick={handleLogoutClick} className="logout-btn">Logout</button>
        </div>
      );
    };