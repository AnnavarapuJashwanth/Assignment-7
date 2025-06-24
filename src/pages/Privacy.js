import React from 'react';
import './SupportPages.css';

function Privacy() {
  return (
    <div className="support-page container mt-5 animate__animated animate__fadeIn">
      <h2 className="support-title">Privacy Policy</h2>
      <p>We are committed to protecting your personal information:</p>
      <ul>
        <li>Your data will never be sold or shared without consent.</li>
        <li>All transactions are secured using advanced encryption.</li>
        <li>We comply with applicable data protection laws.</li>
        <li>You can request data deletion at any time.</li>
      </ul>
    </div>
  );
}

export default Privacy;
