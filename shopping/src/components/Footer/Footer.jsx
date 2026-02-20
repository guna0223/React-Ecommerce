import React from "react";
import { Link } from "react-router-dom";
import "../Css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* About Section */}
        <div className="footer-about">
          <div className="footer-logo">
            <span className="v">V</span><span className="exo">EXO</span>
          </div>
          <p>
            Your premier destination for premium products at unbeatable prices. 
            We deliver quality, style, and value to millions of customers worldwide.
          </p>
          <div className="footer-social">
            <a href="#" className="social-icon" aria-label="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Twitter">
              <i className="bi bi-twitter-x"></i>
            </a>
            <a href="#" className="social-icon" aria-label="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#" className="social-icon" aria-label="YouTube">
              <i className="bi bi-youtube"></i>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/">Shop</Link></li>
            <li><Link to="/wishlist">Wishlist</Link></li>
            <li><Link to="/cart">Cart</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="footer-column">
          <h4>Customer Support</h4>
          <ul className="footer-links">
            <li><a href="#">Contact Us</a></li>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Shipping Info</a></li>
            <li><a href="#">Returns</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="footer-column">
          <h4>Contact</h4>
          <ul className="footer-links">
            <li><a href="mailto:support@vexo.com">support@vexo.com</a></li>
            <li><a href="tel:+1234567890">+1 (234) 567-890</a></li>
            <li><a href="#">Live Chat</a></li>
            <li><a href="#">Track Order</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; {new Date().getFullYear()} VEXO. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
