import React, { useEffect, useState } from "react";
import "./HomeMain.css"; // Use our new modernized styles
import { FaCalendarAlt, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { BiSolidPhoneCall } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import image2 from "../../assets/image2.jpg";
import image22 from "../../assets/image22.jpg";
import image3 from "../../assets/image3.jpg";
import image33 from "../../assets/image33.jpg";
import image333 from "../../assets/image333.jpg";
import ModernImageSlider from "./ImageSlider"; // Use our updated slider component
import food1 from "../../assets/food1.jpg";
import food2 from "../../assets/food2.jpg";
import food3 from "../../assets/food3.jpg";
import food4 from "../../assets/food4.jpg";
import food5 from "../../assets/food5.jpg";
import openingHoursService from "../../services/openingHours.service";

const HomeMain = () => {
  const images = [food1, food2, food3, food4, food5];
  const [openingHours, setOpeningHours] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const data = await openingHoursService.getAll();
        setOpeningHours(data);
      } catch (error) {
        console.error("Error fetching opening hours:", error);
      }
    };

    fetchOpeningHours();
  }, []);

  const goToReservation = () => {
    navigate(ROUTES.RESERVETABLE);
  };

  const convertTo12HourFormat = time24 => {
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hour12 = hour % 12 || 12;
    const minuteFormatted = minute < 10 ? `0${minute}` : minute;
    return [`${hour12}:${minuteFormatted}`, `${ampm}`];
  };

  return (
    <div className='main'>
      <div className='main-content-container'>
        <div className='img-container1'>
          <ModernImageSlider imageUrls={images} />
        </div>
        <div className='content'>
          <h1>
            Eat <span style={{ color: "var(--primary)" }}>Well</span>, Live{" "}
            <span style={{ color: "var(--primary)" }}>Better</span>
          </h1>
          <p>Experience the taste of excellence with every dish we serve. Where good food meets great company.</p>
          <button className='reserve-btn' onClick={goToReservation}>
            Reserve Now <FaCalendarAlt />
          </button>
        </div>
      </div>

      <div className='openhours-container'>
        <div className='openhours-text'>
          <div className='openhours-text-top'>
            <h1>Opening Hours</h1>
            <LuClock3 className='clock-icon' />
          </div>

          <div className='openhours-text-btm'>
            {openingHours.map((hours, index) =>
              hours.startTime != null && hours.endTime != null ? (
                <p key={index}>
                  {hours.day.charAt(0).toUpperCase() + hours.day.slice(1)} <span className='time-dash'>-</span>
                  {convertTo12HourFormat(hours.startTime)[0]}{" "}
                  <span className='time-dash'>{convertTo12HourFormat(hours.startTime)[1]}</span> -&nbsp;
                  {convertTo12HourFormat(hours.endTime)[0]}{" "}
                  <span className='time-dash'>{convertTo12HourFormat(hours.endTime)[1]}</span>
                </p>
              ) : null
            )}

            <div className='phoneNumber-txt'>
              <BiSolidPhoneCall className='phone-icon' />
              <span className='phoneNumber'>+123456789</span>
            </div>
          </div>
        </div>

        <div className='img-container2'>
          <img src={image2} alt='Restaurant ambiance' />
          <img src={image22} alt='Restaurant dish' />
        </div>
      </div>

      <div className='aboutus-container'>
        <div className='aboutus-content-container'>
          <h1>About Us</h1>

          <p>
            Welcome to RMS, where passion meets flavor. Nestled in the heart of RMS, our mission is to create
            unforgettable dining experiences. We believe that great food is the foundation of great memories, and our
            team is dedicated to serving dishes that delight your taste buds and warm your heart.
          </p>

          <p>
            At RMS, every ingredient tells a story. From locally sourced produce to globally inspired recipes, we craft
            each dish with care, precision, and love. Whether you're here for a casual meal, a special celebration, or
            just to unwind, we aim to provide a welcoming atmosphere that feels like home.
          </p>

          <p>
            Join us for a culinary journey filled with bold flavors, vibrant colors, and a dash of magic. Because here,
            food is more than nourishment — it's an experience.
          </p>

          <div className='img3-container'>
            <img src={image3} alt='Food presentation' />
            <img src={image33} alt='Dining experience' />
            <img src={image333} alt='Chef at work' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMain;
