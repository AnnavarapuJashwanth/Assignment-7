import React from 'react';
import './SupportPages.css';

function Help() {
  return (
    <div className="support-page container mt-5 animate__animated animate__fadeIn">
      <h2 className="support-title">Help Center</h2>
      <p>Welcome to the Help Center! Here you can find solutions to common issues:</p>
      <ul>
        <li>Ticket Booking & Cancellations</li>
        <li>Refund and Reschedule Policies</li>
        <li>Technical Issues & Mobile App Help</li>
        <li>Account and Payment Management</li>
      </ul>
    </div>
  );
}

export default Help;