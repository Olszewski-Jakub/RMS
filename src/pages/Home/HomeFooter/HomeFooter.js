import React from "react";
import "./HomeFooter.css";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";

export default function HomeFooter(){
    return(
        <div className="footer-container">
            <div className="first-container">
                <h1 style={{fontFamily: "Lavishly Yours"}}>R<span style={{color: "white", fontFamily: "Lavishly Yours"}}>M</span>S</h1>
                <p style={{
                    color: "white",
                    marginTop: "1rem",
                    marginBottom: "1rem"
                }}>Stay connected with us on social media for updates, special offers, and more. We look forward to serving you again soon!</p>
                <div style={{
                    display: "flex"
                }}>
                    <div className="instagram-container socials">
                        <FaInstagram className="apps"/>
                    </div>
                    <div className="x-container socials">
                        <FaXTwitter className="apps"/>
                    </div>
                    <div className="facebook-container socials">
                        <FaFacebookSquare className="apps"/>
                    </div>
                    <div className="tiktok-container socials">
                        <FaTiktok className="apps"/>
                    </div>
                </div>
            </div>

            <div className="second-container">
                <h4 style={{marginBottom: "0.5rem"}}>About Us</h4>

                <h4>Privacy Policy</h4>
                <h4>Career</h4>
                <h4>Features</h4>
                <h4>News & Blogs</h4>
                <h4>Feedback</h4>
            </div>

            <div className="third-container">
                <h4 style={{marginBottom: "0.5rem"}}>Contact Us</h4>

                <h4>Our restaurant is located at : </h4>
                <h4 style={{marginBottom: "0.5rem"}}>X, Y City, Z Road.</h4>
                <h4 style={{marginBottom: "0.5rem"}}>+123456789</h4>
                <h4>rms@gmail.com</h4>
            </div>

        </div>
    );
}