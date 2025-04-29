import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaSignInAlt,
  FaUserEdit,
  FaBars,
  FaTimes,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import Switch from "../Sunlight/Switch";
import "./Navbar.css";

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);
  const navigate = useNavigate();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Movies", href: "/movies" },
    { label: "TV Shows", href: "/tv-shows" },
    { label: "Contact", href: "/contact" },
    { label: "About Us", href: "/about" },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogout = () => {
    onLogout();
    if (isMobileView) setIsMobileMenuOpen(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar__container">
        <Link to="/" className="navbar__logo">
          Movie App
        </Link>

        <div
          className={`navbar__links-container ${
            isMobileMenuOpen ? "active" : ""
          }`}
        >
          <ul className="navbar__links">
            {navItems.map((item, index) => (
              <li key={index} className="navbar__link">
                <Link
                  to={item.href}
                  onClick={() => isMobileView && setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="navbar__right">
            <div className="navbar__auth">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/profile"
                    className="auth-link"
                    onClick={() => isMobileView && setIsMobileMenuOpen(false)}
                  >
                    <FaUser /> <span>Profile</span>
                  </Link>
                  <button
                    className="auth-link logout-btn"
                    onClick={handleLogout}
                  >
                    <FaSignOutAlt /> <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="auth-link"
                    onClick={() => isMobileView && setIsMobileMenuOpen(false)}
                  >
                    <FaSignInAlt /> <span>Login</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="auth-link"
                    onClick={() => isMobileView && setIsMobileMenuOpen(false)}
                  >
                    <FaUserEdit /> <span>Sign Up</span>
                  </Link>
                </>
              )}
            </div>

            <div className="navbar__toggle">
              <Switch />
            </div>
          </div>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
