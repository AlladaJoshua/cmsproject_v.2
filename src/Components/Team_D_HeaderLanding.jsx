import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import TsukidenLogo from "../assets/TsukidenLogo.png";
import "../Css/hdrlndng.css";

const Team_D_HeaderLanding = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  return (
    <Navbar expand="lg">
      <Navbar.Brand as={Link} to="/" onClick={closeNavbar}>
        <img src={TsukidenLogo} alt="Logo" />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" onClick={handleToggle} />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={NavLink} to="/about" activeClassName="active" onClick={closeNavbar}>
            About
          </Nav.Link>
          <Nav.Link as={NavLink} to="/verif_nonuser" activeClassName="active" onClick={closeNavbar}>
            Verification
          </Nav.Link>
        </Nav>
        <Nav className="btns">
          <Nav.Link as={Link} to="/certificate" onClick={closeNavbar}>
            <button className="login_btn">Log In</button>
          </Nav.Link>
          <Nav.Link as={Link} to="/" onClick={closeNavbar}>
            <button className="reg_btn">Register</button>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Team_D_HeaderLanding;
