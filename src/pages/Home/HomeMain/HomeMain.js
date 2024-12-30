import React from "react";
import "./HomeMain.css";
import homeImage from "./homeImage.png";
import { FaCalendarAlt } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";

const HomeMain = () => {
    return (
        <div className="main" style={{
            display: "flex", flexDirection: "column"
            }}
        >
            <div className="main-content-container" style={{
                marginBottom: "2rem"
                }}
            >
                <div className="img-container1">
                    <img src={homeImage} alt="Delicious food" />
                </div>
                <div className="content">
                    <h1 style={{
                        marginBottom: "2rem"
                        }}
                    >Eat <span style={{
                        color: "#FF7D05"
                        }}
                        >Well</span>, Live <span style={{
                            color: "#FF7D05"
                            }}
                        >Better</span></h1>
                    <p>
                        Experience the taste of excellence with every dish we serve. 
                        Where good food meets great company.
                    </p>
                    <button className="reserve-btn">Reserve Now<FaCalendarAlt style={{
                        marginLeft: "0.5rem"
                    }}/></button>
                </div>
            </div>

            <div className="openhours-container" style={{
                marginBottom: "2rem",
                width: "100%",
                height: "auto",
                padding: "2rem",
                }}
            >
                <div className="openhours-text">
                    <div className="openhours-text-top" style={{
                        display: "flex"
                        }}
                    >
                        <h1>Opening Hours </h1>
                        <LuClock3 className="clock-icon"/>
                    </div>

                    <div className="openhours-text-btm">
                        <p>Monday <span style={{color: "#FF7D05"}}> - </span> Friday: 9:00 <span style={{color: "#FF7D05"}}> AM </span> - 9:00 <span style={{color: "#FF7D05"}}> PM </span></p>
                        <p>Saturday <span style={{color: "#FF7D05"}}> : </span> 10:00 <span style={{color: "#FF7D05"}}> AM </span> - 11:00 <span style={{color: "#FF7D05"}}> PM </span></p>
                        <p>Sunday <span style={{color: "#FF7D05"}}> : </span> 10:00 <span style={{color: "#FF7D05"}}> AM </span> - 8:00 <span style={{color: "#FF7D05"}}> PM </span></p>
                        <p className="phoneNumber-txt"><BiSolidPhoneCall className="phone-icon"/> <span className="phoneNumber">+123456789</span></p>
                    </div>

                </div>

                <div className="img-container2">
                    <h1>test</h1>
                </div>
            </div>

            
            
            
        </div>
    );
}

export default HomeMain;
