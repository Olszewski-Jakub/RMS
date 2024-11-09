import React, { useContext } from "react";
import {
  Nav,
  NavLink,
  NavbarContainer,
  Span,
  NavLogo,
  NavItems,
  MobileIcon,
  MobileMenu,
  MobileLink,
  ButtonContainer,
  LoginButton,
  MobileMenuButton
} from "./NavbarStyledComponent";
import { DiCssdeck } from "react-icons/di";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes.js";
import { AuthContext } from "../../contexts/AuthContext"; // Adjust the path as necessary
const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);

  const navigateToLogin = () => {
    navigate(ROUTES.AUTH);
  };
  const navigateToProfile = () => {
    console.log("Profile clicked");
    // Add navigation to profile page if needed
  };
  return (
    <Nav>
      <NavbarContainer>
        <NavLogo to="/">
          <a
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              marginBottom: "20;",
              cursor: "pointer",
            }}
          >
            <DiCssdeck size="3rem" /> <Span>RMS</Span>
          </a>
        </NavLogo>
        <MobileIcon>
          <FaBars
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          />
        </MobileIcon>
        <NavItems>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#reserve">Reserve</NavLink>
          <NavLink href="#menu">Menu</NavLink>
          <NavLink href="#location">Location</NavLink>
          <ButtonContainer>
            {isLoggedIn ? (
              <LoginButton onClick={navigateToProfile}>Profile</LoginButton>
            ) : (
              <LoginButton onClick={navigateToLogin}>Login</LoginButton>
            )}
          </ButtonContainer>
        </NavItems>
        {isOpen && (
          <MobileMenu isOpen={isOpen}>
            <MobileLink
              href="#about"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              About
            </MobileLink>
            <MobileLink
              href="#reserve"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Reserve
            </MobileLink>
            <MobileLink
              href="#menu"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Menu
            </MobileLink>
            <MobileLink
              href="#location"
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              Location
            </MobileLink>
            {isLoggedIn ? (
              <MobileMenuButton onClick={navigateToProfile}>Profile</MobileMenuButton>
            ) : (
              <MobileMenuButton onClick={navigateToLogin}>Login</MobileMenuButton>
            )}
          </MobileMenu>
        )}
      </NavbarContainer>
    </Nav>
  );
};

export default Navbar;
