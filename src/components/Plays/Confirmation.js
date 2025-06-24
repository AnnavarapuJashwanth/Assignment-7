import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Confirmation() {
  const navigate = useNavigate();

  return (
    <div className="container text-center mt-5">
      <h2 className="text-success">🎉 Booking Confirmed!</h2>
      <p className="lead">Your play ticket has been successfully booked.</p>
      <button className="btn btn-outline-primary mt-3" onClick={() => navigate('/my-tickets')}>
        Go to My Tickets
      </button>
    </div>
  );
}
