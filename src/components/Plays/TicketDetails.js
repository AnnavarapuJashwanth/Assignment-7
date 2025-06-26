import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TicketDetails() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  // Fake play ticket data
  const play = {
    id: 'play123',
    eventName: 'Jar Tar Chi Goshta',
    venue: 'Balgandharva Rang Mandir',
    date: '2025-06-22',
    time: '4:30 PM',
    price: 300,
    ticketType: 'General',
    qty: 1,
    seatType: 'Standard' // 👈 ADDING THIS
  };

  const gst = Math.round(play.price * 0.18);
  const grandTotal = play.price + gst;

  const handleConfirm = async () => {
    if (!name.trim() || !mobile.trim()) {
      toast.error('Please enter both name and mobile.');
      return;
    }

    if (!/^[0-9]{10}$/.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    const loggedUser = JSON.parse(localStorage.getItem('loggedInUser')) || {};
    const user = loggedUser.user || {};

    const booking = {
      eventId: play.id,
      eventName: play.eventName,
      venue: play.venue,
      date: play.date,
      time: play.time,
      qty: play.qty,
      ticketType: play.ticketType,
      seatType: play.seatType, // ✅ FIXED MISSING FIELD
      price: play.price,
      gst,
      total: play.price,
      grandTotal,
      timestamp: new Date().toISOString(),
      category: 'play',
      mobileNumber: mobile,
      user: user.userId || null
    };

    try {
      const response = await fetch("http://localhost:8000/api/bookings/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(booking)
      });

      if (!response.ok) {
        const err = await response.json();
        console.error("Backend Error:", err);
        throw new Error('Failed to book play ticket');
      }

      toast.success('🎭 Play ticket booked!');
      setTimeout(() => navigate('/'), 1000);
    } catch (err) {
      console.error(err);
      toast.error('Failed to store play ticket in backend.');
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={2000} />
      <h3 className="mb-4">🎟️ Book Play Ticket</h3>

      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          className="form-control"
          placeholder="Your full name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Mobile</label>
        <input
          className="form-control"
          placeholder="10-digit mobile number"
          value={mobile}
          onChange={e => setMobile(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <p><strong>Play:</strong> {play.eventName}</p>
        <p><strong>Venue:</strong> {play.venue}</p>
        <p><strong>Date & Time:</strong> {play.date} at {play.time}</p>
        <p><strong>Ticket Type:</strong> {play.ticketType}</p>
        <p><strong>Seat Type:</strong> {play.seatType}</p>
        <p><strong>Ticket Price:</strong> ₹{play.price}</p>
        <p><strong>GST (18%):</strong> ₹{gst}</p>
        <h5>Total: ₹{grandTotal}</h5>
      </div>

      <button className="btn btn-success w-100" onClick={handleConfirm}>
        Confirm Booking
      </button>
    </div>
  );
}
