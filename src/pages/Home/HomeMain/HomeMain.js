import React from "react";
import "./HomeMain.css";
import homeImage from "./homeImage.png";

const HomeMain = () => {
    return (
        <div className="main">
            <div className="main-content-container">
                <div className="mainImg-container">
                    <img src={homeImage} alt="Delicious food" />
                </div>
                <div className="content">
                    <h1>Eat <span style={{color: "#FF7D05"}}>Well</span>, Live <span style={{color: "#FF7D05"}}>Better</span></h1>
                    <p>
                        Experience the taste of excellence with every dish we serve. 
                        Where good food meets great company.
                    </p>
                    <button className="reserve-btn">Reserve a Table</button>
                </div>
            </div>
        </div>
    );
}

export default HomeMain;
