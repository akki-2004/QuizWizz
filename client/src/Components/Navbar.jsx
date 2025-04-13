import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => (
  <nav className="navbar">
    <Link to="/" className="nav-link">Home</Link>
    <Link to="/admin" className="nav-link">Admin</Link>
    <Link to="/student" className="nav-link">Student</Link>
    <Link to="/login" className="nav-link">Login</Link>
  </nav>
);

export default Navbar;