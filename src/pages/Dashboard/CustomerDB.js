import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar.js";
import "./Customer.css";
import { useState } from "react";

const CustomerDB = () => {
    return(
        <div className="dashboard-container">
            <Sidebar isOwner={false}/>
            <main className="main-container">  
                <h1>Customer Dashboard</h1>
                <div className="reservation-container">
                    
                </div>
            </main>
            
        </div>
    );
}

export default CustomerDB;