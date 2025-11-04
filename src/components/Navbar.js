import React from "react";
import { Link } from "react-router-dom";
import Logo from "./medifyLogo.png";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="nav-item">
          <img src={Logo} className="medify-logo" alt="Medify Logo" />
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Find Doctors
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Hospitals
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Medicines
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Surgeries
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Software for Providers
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Facilities
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/bookings">
            My Bookings
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
