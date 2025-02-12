import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/Seema Fish Logo.svg";
import callIcon from "../../assets/call.svg";
import messageIcon from "../../assets/mail.svg";
import locationIcon from "../../assets/location.svg";
import searchIcon from "../../assets/search.svg";
import adminIcon from "../../assets/account.svg";
import cartIcon from "../../assets/cart.svg";
import hamburgerIcon from "../../assets/hamburger.png";
import closeIcon from "../../assets/close.png";
import PincodePopup from "../PincodePopup/PincodePopup";
import Signup from "../Signup/Signup";
import CartPopup from "../CartPopup/CartPopup";
import "./Navbar.css";

const Navbar = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [pincode, setPincode] = useState("400001");
  const [sOpen, setSOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 680px)").matches);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handlePincodeClick = () => setIsPopupOpen(true);
  const handlePincodeSubmit = (newPincode) => setPincode(newPincode);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.matchMedia("(max-width: 580px)").matches);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (sOpen) {
      setMenuOpen(false);
    }
  }, [sOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && !event.target.closest(".mobile-menu") && !event.target.closest(".hamburger-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [menuOpen]);

  return (
    <div>
      {isPopupOpen && (
        <PincodePopup onClose={() => setIsPopupOpen(false)} onSubmit={handlePincodeSubmit} />
      )}

      {/* <div className={`sgIn ${sOpen ? "rollDown" : "rollUp"}`} onClick={() => setSOpen(false)}>
        <Signup onClick={(e) => e.stopPropagation()} />
      </div> */}

      {/* Top Bar (Hidden on Mobile) */}
      {!isMobile && (
        <div className="top-bar">
          <div className="left-info">
            <img src={callIcon} alt="Call" className="icon" />
            <span>+91 99999 67888</span>
            <span className="divider">|</span>
            <img src={messageIcon} alt="Email" className="icon" />
            <span>freshimeat@gmail.com</span>
          </div>
          <div className="right-info">
            <a href="#">Why Us</a>
            <span className="divider">|</span>
            <a href="#">Bulk Order</a>
          </div>
        </div>
      )}

      {/* Navbar */}
      <div className="navbar">
        <div className="left-section">
        <Link to="/">    <img src={logo} alt="Freshimeat Logo" className="logo" /></Link>
        </div>

        <div className="right-section">
          <div className="location" onClick={handlePincodeClick}>
            <img src={locationIcon} alt="Location" />
            <span className="pincode">{pincode}</span>
            <span className="dropdown">&#9662;</span>
          </div>

          <div className="search-box">
            <input type="text" placeholder="Search" />
            <img src={searchIcon} alt="Search" className="search-icon" />
          </div>

          {/* Mobile View: Hamburger Menu */}
          {isMobile ? (
            <div className="hamburger-menu" onClick={toggleMenu}>
              <img src={hamburgerIcon} alt="Menu" className="icon" />
            </div>
          ) : (
            <>
            <Link to="/myaccount">  <img src={adminIcon} alt="Admin" className="icon" onClick={() => setSOpen(!sOpen)} /></Link>
              <img src={cartIcon} alt="Cart" className="icon" onClick={() => setIsCartOpen(true)} />
            </>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && isMobile && (
        <div className="mobile-menu">
          <div className="close-menu" onClick={toggleMenu}>
            <img src={closeIcon} alt="Close" className="close-icon" />
            </div>
  <Link to="/myaccount" onClick={() => { setSOpen(!sOpen); setMenuOpen(false); }}>Account</Link>
  <Link onClick={() => { setIsCartOpen(true); setMenuOpen(false); }}>Shopping Cart</Link>
  <Link to="/bulk-order">Bulk Order</Link>
  <Link to="/why-us">Why Us</Link>
  <Link to="tel:+919988877766">Call Us</Link>
  <Link to="mailto:info@example.com">Mail Us</Link>
</div>

      )}

      {/* Cart Popup */}
      <CartPopup isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
};

export default Navbar;
