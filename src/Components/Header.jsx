import React, { useState } from "react";
import "../Css/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/TsukidenLogo.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  const [expanded, setExpanded] = useState(false);

  const handleNavbarToggle = () => {
    setExpanded(!expanded);
  };

  const handleLinkClick = () => {
    setExpanded(false);
  };
  return (
    <Navbar expand="lg" className="navbar" expanded={expanded} onToggle={handleNavbarToggle}>
      <Container fluid className="section">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center w-100">
          <Nav className="me-auto links">
            <Nav.Link as={Link} to="/" onClick={handleLinkClick}>Dashboard</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="certificate" onClick={handleLinkClick}>Certificate</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#myCourse" onClick={handleLinkClick}>My Course</Nav.Link>
            <Nav.Link href="#forum" onClick={handleLinkClick}>Forum</Nav.Link>
          </Nav>
          <Button variant="primary" className="primary">
            Logout
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
