import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Footer.css";
//import grppro from "../assets/images/grppro.png";


const Footer = () => {
  const user = localStorage.getItem('type');
  return (
    <div className='footer-con'>
      {user === "Customer" && (
        <footer className="footer">
          <div className="footer__links">
            <Link to="/profile">Profile</Link>
            <Link to="/about">About</Link>
            <Link to="/feeds">Feeds</Link>
          </div>
          <div className="footer__app-download">
            <div className="footer__app-download-text">
              Download our VGen Mobile App:
            </div>
            <div className="footer__app-download-link">
              <a href="https://example.com/app-download">
                {/* <img src={grppro} alt="VGen App" /> */}
              </a>
            </div>
          </div>
          <div className="footer__contact">
            <div className="footer__phone">
              <span>Phone:</span>
              <a href="tel:+1234567890">123-456-7890</a>
            </div>
            <div className="footer__email">
              <span>Email:</span>
              <a href="mailto:contact@example.com">contact@example.com</a>
            </div>
          </div>
        </footer>
      )}
    </div>
  );
};

export default Footer;
