import React from "react";
import Sidebar from "./Sidebar/Sidebar";
import "./Dashboard.css";

const Dashboard = () => {
    return(
        <>
            <Sidebar />
            <div className="dashboard-container" style={{display: "flex", flexDirection: "column"}}>
                <div className="header-container">
                    <p className="header-txt">Dashboard</p>
                </div>
                <div className="summary-container" style={{display: "flex"}}>
                    <div className="summaries">
                        <p>Total Orders</p>

                    </div>
                    <div className="summaries">
                        <p>Total Revenue</p>
                    </div>
                    <div className="summaries">
                        <p>Total Customers</p>
                    </div>
                    <div className="summaries">
                        <p>Booked Tables</p>
                    </div>
                </div>
                <div className="main-container">
                    
                </div>
            </div>
        </>
    );
}

export default Dashboard;