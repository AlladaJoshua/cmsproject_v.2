import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"; // Import NavLink
import "../Css/navbar.css";
import TsukidenLogo from "../assets/TsukidenLogo.png";
import Profile from "../assets/profilepic.jpg";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const HeaderV2 = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const closeMobileNavbar = () => {
    setClicked(false);
  };

  useEffect(() => {
    const body = document.body;
    if (clicked) {
      body.style.overflow = "hidden"; // Disable scrolling
    } else {
      body.style.overflow = "auto"; // Enable scrolling
    }

    return () => {
      body.style.overflow = "auto"; // Make sure to enable scrolling when component unmounts
    };
  }, [clicked]);

  return (
    <>
      <nav>
        <NavLink to="/" onClick={closeMobileNavbar}>
          <img src={TsukidenLogo} alt="Logo" />
        </NavLink>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li>
              <NavLink to="/" activeClassName="active" onClick={closeMobileNavbar}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/my-course" activeClassName="active" onClick={closeMobileNavbar}>
                My Course
              </NavLink>
            </li>
            <li>
              <NavLink to="/forums" activeClassName="active" onClick={closeMobileNavbar}>
                Forums
              </NavLink>
            </li>
            <li>
              <NavLink to="/verification" activeClassName="active" onClick={closeMobileNavbar}>
                Verification
              </NavLink>
            </li>
          </ul>
        </div>
        <div id="mobile" onClick={handleClick}>
          {clicked ? (
            <i className="fas fa-times"></i>
          ) : (
            <img src={Profile} alt="Logo" className="mobile_profile" />
          )}
        </div>
        <div className="profile_side">
          <Dropdown>
            <Dropdown.Toggle
              variant="success"
              id="dropdown-basic"
              className="button_profile"
            >
              <img src={Profile} alt="" className="profile_img" />
              Hi, JALLADA!
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="">
                <FaRegUserCircle /> Profile
              </Dropdown.Item>
              <Dropdown.Item as={NavLink} to="/certificate" onClick={closeMobileNavbar}>
                <TbCertificate /> My Certificate
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3" onClick={closeMobileNavbar}>
                <FiLogOut /> Log Out
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </nav>
    </>
  );
};

export default HeaderV2;
