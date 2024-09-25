import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles/Navbar.css';
import logo from '../assets/logo.png'; 

function Navbar() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate('/')}>
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <button className="menu-toggle" onClick={toggleMenu}>
        ☰
      </button>
      <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
        <li><Link to="/" onClick={toggleMenu}>Home</Link></li>
        <li><Link to="/people" onClick={toggleMenu}>People</Link></li>
        <li><Link to="/planets" onClick={toggleMenu}>Planets</Link></li>
        <li><Link to="/starships" onClick={toggleMenu}>Starships</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
