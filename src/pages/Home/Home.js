import React, { useContext } from "react";
import "./Home.css";
import HomeMain from "../../components/HomeMain/HomeMain.js";
import HomeFooter from "../../components/HomeFooter/HomeFooter.js";

export default function Home(){
    return(
        <div className="home-container">
            {/*<HomeHeader />*/}
            <HomeMain />
            <HomeFooter />
        </div>
    );
}