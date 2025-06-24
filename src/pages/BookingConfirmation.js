import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingConfirmation() {
  const navigate = useNavigate();
  const { theatreId, date, qty, seatType } = useLocation().state;

  const total = seatType.price * qty;
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

  // Safe user fetching
const user = JSON.parse(localStorage.getItem("loggedInUser")) || {};

  const handleBook = () => {    
    const booking = {
      theatreId,
      date,
      qty,
      seatType: seatType.type,
      total,
      gst,
      grandTotal,
      timestamp: Date.now(),
      userName: user.firstName || "Guest",
      mobileNumber: user.mobile || "N/A"
    };

    const all = JSON.parse(localStorage.getItem('bookings') || '[]');
    all.push(booking);
    localStorage.setItem('bookings', JSON.stringify(all));
    alert('🎉 Booking confirmed! Total paid: Rs.' + grandTotal);
    navigate('/');
  };

  return (
    <div className="container py-4">
      <h4>Confirm Booking</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">Theatre: {theatreId}</li>
        <li className="list-group-item">Date: {date}</li>
        <li className="list-group-item">Seats: {qty} × Rs. {seatType.price}</li>
        <li className="list-group-item">GST (18%): Rs. {gst}</li>
        <li className="list-group-item fw-bold">Total: Rs. {grandTotal}</li>
        <li className="list-group-item fw-bold">User Name: {user.firstName || "Guest"}</li>
        <li className="list-group-item fw-bold">Mobile Number: {user.mobile || "N/A"}</li>
      </ul>
      <button className="btn btn-danger w-100" onClick={handleBook}>
        Book & Pay
      </button>
    </div>
  );
}

export default BookingConfirmation;
