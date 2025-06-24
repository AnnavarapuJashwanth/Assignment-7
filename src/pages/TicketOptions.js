import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './TicketOptions.css';

const TicketOptions = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [ticketType, setTicketType] = useState('M-Ticket');
  const [state, setState] = useState('Telangana');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');

  const gstRate = 0.18;
  const basePrice = 799;
  const bookingFee = 30;
  const gst = (basePrice + bookingFee) * gstRate;
  const total = basePrice + bookingFee + gst;

 const handlePayment = () => {
  const loggedUser = JSON.parse(localStorage.getItem('loggedInUser'));

  const rawDate = localStorage.getItem('selectedEventDate') || '';
  const prettyDate = rawDate; // ✅ Add this line here

  let formattedDate = '';
  try {
    const parsed = new Date(rawDate);
    if (!isNaN(parsed)) {
      formattedDate = parsed.toISOString().split('T')[0]; // yyyy-mm-dd
    } else {
      const parts = rawDate.split(' ');
      if (parts.length === 4) {
        const day = parts[1];
        const month = {
          Jan: '01', Feb: '02', Mar: '03', Apr: '04', May: '05', Jun: '06',
          Jul: '07', Aug: '08', Sep: '09', Oct: '10', Nov: '11', Dec: '12'
        }[parts[2]];
        const year = parts[3];
        formattedDate = `${year}-${month}-${day}`;
      }
    }
  } catch (err) {
    formattedDate = new Date().toISOString().split('T')[0];
  }

  const ticket = {
    eventId: id,
    eventName: localStorage.getItem('selectedEventTitle') || 'Event Booking',
    ticketType,
    state,
    userName: name || loggedUser?.firstName || 'Guest',
    mobile,
    price: basePrice,
    bookingFee,
    gst: gst.toFixed(2),
    grandTotal: total.toFixed(2),
    timestamp: new Date().getTime(),
    venue: localStorage.getItem('selectedVenue'),
    time: '6:00 PM',
    date: formattedDate,       // used for filtering
    prettyDate: prettyDate,    // ✅ this is the display-friendly version
  };

  const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
  bookings.push(ticket);
  localStorage.setItem('bookings', JSON.stringify(bookings));

  navigate(`/tickets/${id}/event/confirm`);
};

  return (
    <div className="container py-5 ticket-options">
      <h3 className="mb-4 fw-bold">Select Ticket Options</h3>

      <div className="mb-3">
        <label>Ticket Type:</label>
        <select className="form-select" value={ticketType} onChange={e => setTicketType(e.target.value)}>
          <option value="M-Ticket">M-Ticket</option>
          <option value="Box Office Pickup">Box Office Pickup</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Select State:</label>
        <select className="form-select" value={state} onChange={e => setState(e.target.value)}>
          <option>Telangana</option>
          <option>Andhra Pradesh</option>
          <option>Tamil Nadu</option>
          <option>Karnataka</option>
          <option>Maharashtra</option>
        </select>
      </div>

      <div className="mb-3">
        <label>Full Name:</label>
        <input className="form-control" value={name} onChange={e => setName(e.target.value)} />
      </div>

      <div className="mb-3">
        <label>Mobile Number:</label>
        <input className="form-control" value={mobile} onChange={e => setMobile(e.target.value)} />
      </div>

      <h5 className="mt-4">Price Breakdown</h5>
      <ul className="list-group mb-4">
        <li className="list-group-item">Base Price: ₹{basePrice}</li>
        <li className="list-group-item">Booking Fee: ₹{bookingFee}</li>
        <li className="list-group-item">GST: ₹{gst.toFixed(2)}</li>
        <li className="list-group-item fw-bold">Total: ₹{total.toFixed(2)}</li>
      </ul>

      <button className="btn btn-success w-100 fw-semibold" onClick={handlePayment}>
        Proceed to Pay
      </button>
    </div>
  );
};

export default TicketOptions;
