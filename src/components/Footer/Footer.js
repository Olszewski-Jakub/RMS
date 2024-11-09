import React from "react";
import {FooterContainer, FooterWrapper, Logo, Nav, NavLink, Copyright } from "./FooterStyle";

function Footer() {
  return (
    <FooterContainer>
      <FooterWrapper>
        <Logo>RMS</Logo>
        <Nav>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#reserve">Reserve</NavLink>
          <NavLink href="#menu">Menu</NavLink>
          <NavLink href="#location">Location</NavLink>
        </Nav>
        <Copyright>&copy; 2024 Unemployed CS Majors. All rights reserved.</Copyright>
      </FooterWrapper>
    </FooterContainer>
  );
}

export default Footer;