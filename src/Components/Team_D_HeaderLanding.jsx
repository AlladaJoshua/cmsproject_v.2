import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import "../Css/navbar.css";
import TsukidenLogo from "../assets/TsukidenLogo.png";
import Profile from "../assets/profilepic.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Content from "./Team_D_Content";

const   Team_D_HeaderLanding = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
    setMyCourseActive(false);
  };

  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };


  return (
    <>
      <nav>
        <NavLink to="/" onClick={closeMobileNavbar}>
          <img src={TsukidenLogo} alt="Logo" />
        </NavLink>

        <ul id="navbar" className={clicked ? "active" : ""}>
          <li>
              <NavLink
                to="/about"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                About
              </NavLink>
          </li>
          <li>
              <NavLink
                to="/verif_nonuser"
                activeClassName="active"
                onClick={closeMobileNavbar}
              >
                Verification
              </NavLink>
          </li>
        </ul>
        <div className="btns">
            <Link to="/certificate">
            <button className="login_btn">Log In</button>
            </Link>
            <Link to="/">
            <button className="reg_btn">Register</button>
            </Link>
        </div>
      </nav>
    </>
  );
};

export default Team_D_HeaderLanding;
