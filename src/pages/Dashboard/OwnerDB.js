import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import "./Dashboard.css";
import { useState } from "react";

const OwnerDB = () => {
    return(
        <div className="dashboard-container">
            <Sidebar isOwner={true}/>
            <main>  
                <h1>Owner Dashboard</h1>
                <h1>Owner Dashboard</h1>
                <h1>Owner Dashboard</h1>
                <h1>Owner Dashboard</h1>
                <h1>Owner Dashboard</h1>
                <h1>Owner Dashboard</h1>
            </main>
            
        </div>
    );
}

export default OwnerDB;