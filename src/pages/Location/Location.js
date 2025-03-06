import React, { useEffect, useState } from "react";
import LocationPin from '../../components/Location/icons/LocationPin';
import PhoneIcon from '../../components/Location/icons/PhoneIcon';
import ClockIcon from '../../components/Location/icons/ClockIcon';
import EmailIcon from '../../components/Location/icons/EmailIcon';
import openingHoursService from "../../services/openingHours.service";
import Map from "../../components/Location/Map";
import "./Location.css"; // Import the new CSS file

const LocationSection = () => {
  const [openingHours, setOpeningHours] = useState([]);

  useEffect(() => {
    const fetchOpeningHours = async () => {
      try {
        const data = await openingHoursService.getAll();
        setOpeningHours(data);
      } catch (error) {
        console.error('Error fetching opening hours:', error);
      }
    };

    fetchOpeningHours();
  }, []);

  return (
      <div id="location">
        <section className="location-section">
          <div className="location-container">
            <div className="location-header">
              <h2>Visit Us</h2>
              <div className="header-divider"></div>
            </div>

            <div className="location-content">
              <div className="contact-info">
                <div className="info-group">
                  <div className="info-header">
                    <div className="icon-container">
                      <LocationPin />
                    </div>
                    <h3>Our Location</h3>
                  </div>
                  <div className="info-content">
                    <p>123 Culinary Avenue</p>
                    <p>Foodie District</p>
                    <p>New York, NY 10001</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-header">
                    <div className="icon-container">
                      <PhoneIcon />
                    </div>
                    <h3>Contact Us</h3>
                  </div>
                  <div className="info-content">
                    <p>Phone: (555) 123-4567</p>
                    <p>Reservations: (555) 123-4568</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-header">
                    <div className="icon-container">
                      <EmailIcon />
                    </div>
                    <h3>Email Us</h3>
                  </div>
                  <div className="info-content">
                    <p>info@restaurant.com</p>
                    <p>reservations@restaurant.com</p>
                  </div>
                </div>

                <div className="info-group">
                  <div className="info-header">
                    <div className="icon-container">
                      <ClockIcon />
                    </div>
                    <h3>Opening Hours</h3>
                  </div>
                  <div className="info-content">
                    <div className="operating-hours">
                      {openingHours.map((hours, index) => (
                          (hours.startTime && hours.endTime) && (
                              <div key={index} className="hours-item">
                                <span className="day">{hours.day}</span>
                                <span className="hours">{`${hours.startTime} - ${hours.endTime}`}</span>
                              </div>
                          )
                      ))}
                    </div>
                  </div>
                </div>

                <div className="buttons-container">
                  <a href="tel:+15551234567" className="contact-button">
                    <PhoneIcon /> Call for Reservation
                  </a>
                  <a href="mailto:reservations@restaurant.com" className="contact-button outline">
                    <EmailIcon /> Email Us
                  </a>
                </div>
              </div>

              <div className="map-container">
                <div className="map">
                  <Map />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
  );
};

export default LocationSection;