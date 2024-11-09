// LocationSection.js
import React from "react";
import { LocationStyles } from "./LocationStyle";
import DayHours from "./DayHours"; 
import Map from './Map';
import LocationPin from './icons/LocationPin'; 
import PhoneIcon from './icons/PhoneIcon';
import ClockIcon from './icons/ClockIcon';
import EmailIcon from './icons/EmailIcon';

const LocationSection = () => {  
  return (
    <div id="location">
    <section className="location-section">
      <LocationStyles />
      <div className="location-container">
        <div className="location-header">
          <h2>Find Us</h2>
        </div>
        <div className="location-content">
          <div className="contact-info">
            <div className="info-group">
              <h3>
                <LocationPin /> Address
              </h3>
              <p>123 Culinary Avenue</p>
              <p>Foodie District</p>
              <p>New York, NY 10001</p>
            </div>

            <div className="info-group">
              <h3>
                <PhoneIcon /> Contact
              </h3>
              <p>Phone: (555) 123-4567</p>
              <p>Reservations: (555) 123-4568</p>
            </div>

            <div className="info-group">
              <h3>
                <EmailIcon /> Email
              </h3>
              <p>info@restaurant.com</p>
              <p>reservations@restaurant.com</p>
            </div>

            <div className="info-group">
              <h3>
                <ClockIcon /> Hours
              </h3>
              <div className="operating-hours">
                <div className="hours-container">
                  <DayHours
                    day="Monday - Thursday"
                    hours="11:00 AM - 10:00 PM"
                  />
                  <DayHours
                    day="Friday - Saturday"
                    hours="11:00 AM - 11:00 PM"
                  />
                  <DayHours day="Sunday" hours="11:00 AM - 9:00 PM" />
                </div>
              </div>
            </div>
            <a href="tel:+15551234567" className="contact-button">
              <PhoneIcon /> Call for Reservation
            </a>
          </div>
          <Map />
        </div>
      </div>
    </section>
    </div>
  );
};

export default LocationSection;
