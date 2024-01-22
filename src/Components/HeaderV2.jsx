import React, { useState, useEffect } from "react";
import "../Css/navbar.css";
import TsukidenLogo from "../assets/TsukidenLogo.png";
import Profile from "../assets/profilepic.jpg";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import { FaRegUserCircle } from "react-icons/fa";
import { TbCertificate } from "react-icons/tb";
import { FiLogOut } from "react-icons/fi";

const HeaderV2 = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
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
        <Link to="/">
          <img src={TsukidenLogo} alt="Logo" />
        </Link>
        <div>
          <ul id="navbar" className={clicked ? "active" : ""}>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <a href="">My Course</a>
            </li>
            <li>
              <a href="">Forums</a>
            </li>
            <li>
              <Link to="/verification">Verification</Link>
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
              NBADONG
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="">
                <FaRegUserCircle /> Profile
              </Dropdown.Item>
              <Dropdown.Item as={Link} to="/certificate">
                <TbCertificate /> My Certificate
              </Dropdown.Item>
              <Dropdown.Item href="#/action-3">
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
