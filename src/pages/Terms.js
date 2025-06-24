import React from 'react';
import './SupportPages.css';

function Terms() {
  return (
    <div className="support-page container mt-5 animate__animated animate__fadeIn">
      <h2 className="support-title">Terms and Conditions</h2>
      <p>By accessing and using our website, you agree to the following terms:</p>
      <ul>
        <li>Tickets are non-transferable unless stated otherwise.</li>
        <li>Users must follow guidelines during booking and event attendance.</li>
        <li>Unauthorized resale of tickets is strictly prohibited.</li>
        <li>Violation of terms may result in account suspension.</li>
      </ul>
    </div>
  );
}


export default Terms;