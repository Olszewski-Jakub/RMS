import React from "react";
import "./Home.css";
import HomeMain from "../../components/HomeMain/HomeMain.jsx";
import HomeFooter from "../../components/HomeFooter/HomeFooter.jsx";

export default function Home(){
    return(
        <div className="home-container">
            {}
            <HomeMain />
            <HomeFooter />
        </div>
    );
}