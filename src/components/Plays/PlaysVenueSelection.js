// src/Plays/VenueSelection.js
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

export default function VenueSelection() {
  const { id } = useParams();
  const navigate = useNavigate();

  const venues = [
    { name: 'Yashwantrao Chavan Natyagruha', city: 'Pune', timing: '6:00 PM', price: 300 },
    { name: 'Ravindra Natya Mandir', city: 'Mumbai', timing: '4:30 PM', price: 350 }
  ];

  const handleBook = (venue) => {
    // Store selection in localStorage or navigate with state
    localStorage.setItem('selectedPlayVenue', JSON.stringify({ playId: id, ...venue }));
    navigate(`/plays/${id}/seats`);
  };

  return (
    <div className="container mt-4">
      <h3>Select a Venue</h3>
      {venues.map((venue, i) => (
        <div key={i} className="card my-3 p-3">
          <h5>{venue.name}</h5>
          <p>{venue.city}</p>
          <p>Time: {venue.timing} | ₹{venue.price}</p>
          <button className="btn btn-danger" onClick={() => handleBook(venue)}>Book Seats</button>
        </div>
      ))}
    </div>
  );
}
