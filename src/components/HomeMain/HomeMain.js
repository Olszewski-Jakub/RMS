import React, {useEffect, useState} from "react";
import "./HomeMain.css";
import {FaCalendarAlt} from "react-icons/fa";
import {LuClock3} from "react-icons/lu";
import {BiSolidPhoneCall} from "react-icons/bi";
import image2 from "../../assets/image2.jpg";
import image22 from "../../assets/image22.jpg";
import image3 from "../../assets/image3.jpg";
import image33 from "../../assets/image33.jpg";
import image333 from "../../assets/image333.jpg";
import ImageSlider from "./ImageSlider";
import food1 from "../../assets/food1.jpg";
import food2 from "../../assets/food2.jpg";
import food3 from "../../assets/food3.jpg";
import food4 from "../../assets/food4.jpg";
import food5 from "../../assets/food5.jpg";
import openingHoursService from "../../services/openingHoursService";

const HomeMain = () => {
    const images = [food1, food2, food3, food4, food5];
    const [openingHours, setOpeningHours] = useState([]);

    useEffect(() => {
        const fetchOpeningHours = async () => {
            try {
                const data = await openingHoursService.getAll();
                console.log(data);
                setOpeningHours(data);
            } catch (error) {
                console.error('Error fetching opening hours:', error);
            }
        };

        fetchOpeningHours();
    }, []);

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
                    {/*<img src={homeImage} alt="Delicious food" />*/}
                    <ImageSlider imageUrls={images}/>
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
                        {openingHours.map((hours, index) => (
                            <p key={index}>
                                {hours.day} <span style={{color: "#FF7D05"}}> - </span>
                                {hours.startTime} <span style={{color: "#FF7D05"}}> AM </span> -
                                {hours.endTime} <span style={{color: "#FF7D05"}}> PM </span>
                            </p>
                        ))}
                        <p className="phoneNumber-txt"><BiSolidPhoneCall className="phone-icon"/> <span
                            className="phoneNumber">+123456789</span></p>
                    </div>

                </div>

                <div className="img-container2">
                    <img src={image2}/>
                    <img src={image22}/>
                </div>
            </div>
            <div className="aboutus-container" style={{
                marginBottom: "2rem",
                width: "100%",
                height: "auto",
                padding: "2rem",
            }}
            >
                <div className="aboutus-content-container">
                    <h1 style={{color: "#FF7D05", marginBottom: "1rem"}}>About Us</h1>

                    <p>Welcome to RMS, where passion meets flavor. Nestled in the heart of RMS, our mission is to create
                        unforgettable dining experiences. We believe that great food is the foundation of great
                        memories, and our team is dedicated to serving dishes that delight your taste buds and warm your
                        heart.</p>

                    <p>At RMS, every ingredient tells a story. From locally sourced produce to globally inspired
                        recipes, we craft each dish with care, precision, and love. Whether you&apos;re here for a
                        casual meal, a special celebration, or just to unwind, we aim to provide a welcoming atmosphere
                        that feels like home.</p>

                    <p>Join us for a culinary journey filled with bold flavors, vibrant colors, and a dash of magic.
                        Because here, food is more than nourishment — it&apos;s an experience.</p>

                    <div className="img3-container" style={{paddingBottom: "6rem"}}>
                        <img
                            src={image3}
                            alt="Food 1"
                            style={{
                                position: "relative",
                                zIndex: 3,
                                left: "0",
                                marginLeft: "0",
                                width: "16.5rem",
                                height: "auto",
                            }}
                        />
                        <img
                            src={image33}
                            alt="Food 2"
                            style={{
                                position: "relative",
                                zIndex: 2,
                                left: "-1rem",
                                top: "6rem",
                                marginLeft: "-30px",
                                width: "12rem",
                                height: "12rem",
                            }}
                        />
                        <img
                            src={image333}
                            alt="Food 3"
                            style={{
                                position: "relative",
                                zIndex: 1,
                                left: "-1rem",
                                marginLeft: "-30px",
                                width: "20rem",
                                height: "auto",
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeMain;