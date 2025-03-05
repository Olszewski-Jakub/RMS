import React, { useEffect,useState } from "react";
import LocationPin from '../../components/Location/icons/LocationPin';
import PhoneIcon from '../../components/Location/icons/PhoneIcon';
import ClockIcon from '../../components/Location/icons/ClockIcon';
import EmailIcon from '../../components/Location/icons/EmailIcon';
import openingHoursService from "../../services/openingHours.service";
import {LocationStyles} from "../../components/Location/LocationStyle";
import DayHours from "../../components/Location/DayHours";
import Map from "../../components/Location/Map"

const LocationSection = () => {  
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
                {openingHours.map((hours, index) => (
                    <DayHours key={index} day={hours.day} hours={`${hours.startTime}-${hours.endTime}`} />
                  ))}
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