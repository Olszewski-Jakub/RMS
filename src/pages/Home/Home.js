import React, { useContext } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary
import Navbar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import ReserveTable from "../../components/ReserveTable/ReserveTable";
import LocationSection from "../../components/Location/Location";
import MenuSection from "../../components/Menu/Menu";
import Footer from "../../components/Footer/Footer";
export default function Home() {
  const navigate = useNavigate();

  return (
    <>
    <Navbar />
    <div className="body">
        <Hero />
        <ReserveTable />
        <MenuSection />
        <LocationSection />
        <Footer />
    </div>
    </>
  );
}
