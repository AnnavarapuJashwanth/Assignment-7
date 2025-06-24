// Footer.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 animate__animated animate__fadeInUp">
      <div className="container text-md-left">
        <div className="row text-md-left">

          {/* About Us */}
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">About Us</h5>
            <p>BookMyShow is your ultimate destination for booking movies, events, and more across India.</p>
          </div>

          {/* Quick Links */}
          <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Quick Links</h5>
            <p><Link to="/movies" className="footer-link">Movies</Link></p>
            <p><Link to="/events" className="footer-link">Events</Link></p>
            <p><Link to="/plays" className="footer-link">Plays</Link></p>
            <p><Link to="/sports" className="footer-link">Sports</Link></p>
            <p><Link to="/offers" className="footer-link">Offers</Link></p>
          </div>

          {/* Support */}
          <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Support</h5>
            <p><Link to="/help" className="footer-link">Help Center</Link></p>
            <p><Link to="/contact" className="footer-link">Contact Us</Link></p>
            <p><Link to="/faq" className="footer-link">FAQs</Link></p>
            <p><Link to="/terms" className="footer-link">Terms & Conditions</Link></p>
            <p><Link to="/privacy" className="footer-link">Privacy Policy</Link></p>
          </div>

          {/* Contact Info */}
          <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="text-uppercase mb-4 font-weight-bold">Connect With Us</h5>
            <p><i className="fas fa-envelope me-3"></i> support@bookmyshow.com</p>
            <p><i className="fas fa-phone me-3"></i> +91 98976 43100</p>
            <div>
              <i className="fab fa-facebook-f mx-2" style={iconStyle}></i>
              <i className="fab fa-instagram mx-2" style={iconStyle}></i>
              <i className="fab fa-youtube mx-2" style={iconStyle}></i>
              <i className="fab fa-linkedin-in mx-2" style={iconStyle}></i>
            </div>
          </div>
        </div>
        <hr className="mb-4 border-light" />
        <div className="text-center">
          <p className="text-muted small">
            &copy; 2025 Bigtree Entertainment Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

const iconStyle = {
  fontSize: '1.2rem',
  color: '#aaa',
  cursor: 'pointer',
};

export default Footer;
