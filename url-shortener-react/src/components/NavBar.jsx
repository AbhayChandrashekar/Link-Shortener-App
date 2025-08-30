import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";
import './Navbar.css'; // Import the new CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <Link to="/">
          <h1 className="logo">
            Linklytics
          </h1>
        </Link>
        <ul className={`nav-links ${navbarOpen ? 'active' : ''}`}>
          <li className="nav-item">
            <Link className={`nav-link ${path === "/" ? "active" : ""}`} to="/">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className={`nav-link ${path === "/about" ? "active" : ""}`} to="/about">
              About
            </Link>
          </li>
          {token && (
            <li className="nav-item">
              <Link className={`nav-link ${path === "/dashboard" ? "active" : ""}`} to="/dashboard">
                Dashboard
              </Link>
            </li
            >
          )}
          {!token && (
            <Link to="/register">
              <li className="nav-button signup">
                SignUp
              </li>
            </Link>
          )}
          {token && (
            <button onClick={onLogOutHandler} className="nav-button logout">
              LogOut
            </button>
          )}
        </ul>
        <button onClick={() => setNavbarOpen(!navbarOpen)} className="mobile-menu-toggle">
          {navbarOpen ? (
            <RxCross2 className="text-white text-3xl" />
          ) : (
            <IoIosMenu className="text-white text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;