import React from 'react';
import './SupportPages.css';

function Faq() {
  return (
    <div className="support-page container mt-5 animate__animated animate__fadeIn">
      <h2 className="support-title">Frequently Asked Questions</h2>
      <div className="faq-item">
        <h5>How do I cancel my ticket?</h5>
        <p>To cancel your ticket, navigate to the 'My Bookings' section and cancel before the showtime. Refund policy may apply based on ticket type.</p>
      </div>
      <div className="faq-item">
        <h5>How do I get a refund?</h5>
        <p>Refunds are processed based on cancellation timing and event rules. If applicable, the refund will be credited to your original payment method.</p>
      </div>
      <div className="faq-item">
        <h5>What happens if a show is cancelled?</h5>
        <p>In case of a show cancellation, we automatically process full refunds to all customers. You will receive a notification via email or SMS.</p>
      </div>
    </div>
  );
}

export default Faq;