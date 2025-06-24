import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function TicketDetails() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const navigate = useNavigate();

  const play = {
    id: 1,
    eventName: 'Jar Tar Chi Goshta',
    venue: 'Balgandharva Rang Mandir',
    date: '2025-06-22',
    time: '4:30 PM',
    price: 300,
    ticketType: 'General',
    qty: 1,
  };

  const gst = play.price * 0.18;
  const total = play.price + gst;

  const handleConfirm = () => {
    if (!name.trim() || !mobile.trim()) {
      toast.error('Please enter both name and mobile.');
      return;
    }
    if (!/^\d{10}$/.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

   const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));

const ticket = {
  ...play,
  userName: loggedIn?.firstName || name,
  userMobile: mobile,
  gst: gst.toFixed(2),
  grandTotal: total.toFixed(2),
  timestamp: Date.now(),
  category: 'play',
  eventId: play.id,
  userId: loggedIn?.userId || '',
};


    const stored = JSON.parse(localStorage.getItem('bookings') || '[]');
    localStorage.setItem('bookings', JSON.stringify([...stored, ticket]));

    toast.success('Ticket booked!');
    setTimeout(() => {
      navigate('/confirmation');
    }, 1200);
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={2000} />
      <h3 className="mb-4">🎟️ Ticket Details</h3>

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
        <p><strong>Ticket Price:</strong> ₹{play.price}</p>
        <p><strong>GST (18%):</strong> ₹{gst.toFixed(2)}</p>
        <h5>Total: ₹{total.toFixed(2)}</h5>
      </div>

      <button className="btn btn-success w-100" onClick={handleConfirm}>
        Confirm Booking
      </button>
    </div>
  );
}
