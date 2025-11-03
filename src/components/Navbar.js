import React from "react";
import Logo from "./medifyLogo.png";

function Navbar({ onMyBookingsClick }) {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="nav-item">
          <img src={Logo} className="medify-logo" alt="Medify Logo" />
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Find Doctors
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Hospitals
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Medicines
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Surgeries
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Software for Providers
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="/">
            Facilities
          </a>
        </li>
        <li className="nav-item">
          <button className="nav-link" onClick={onMyBookingsClick}>
            My Bookings
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
