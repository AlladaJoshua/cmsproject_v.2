import React from "react";
import "../Css/header.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import logo from "../assets/TsukidenLogo.png";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <Navbar expand="lg" className="navbar">
      <Container fluid className="section">
        <Navbar.Brand href="#home">
          <img src={logo} alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="text-center w-100">
          <Nav className="me-auto links">
            <Nav.Link as={Link} to="/">Dashboard</Nav.Link>
            <NavDropdown title="Profile" id="basic-nav-dropdown">
              <NavDropdown.Item as={Link} to="certificate">Certificate</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#myCourse">My Course</Nav.Link>
            <Nav.Link href="#forum">Forum</Nav.Link>
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
