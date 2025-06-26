import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function BookingConfirmation() {
  const navigate = useNavigate();
  const location = useLocation();
  const { theatreId, date, qty, seatType } = location?.state || {};

  const loggedIn = JSON.parse(localStorage.getItem("loggedInUser")) || {};
  const user = loggedIn.user || {};

  const pricePerSeat = seatType?.price || 0;
  const total = pricePerSeat * qty;
  const gst = Math.round(total * 0.18);
  const grandTotal = total + gst;

 const handleBook = async () => {
  const booking = {
    theatreId,
    date,
    qty,
    seatType: seatType?.type || '',
    total,
    gst,
    grandTotal,
    timestamp: new Date().toISOString(),  // ✅ Send as ISO string
    mobileNumber: user.mobile || "N/A",
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
      const errorData = await response.json();
      console.error("Backend validation errors:", errorData);  // ✅ Log server response
      throw new Error("Failed to book ticket.");
    }

    alert(`🎉 Booking confirmed! Total paid: Rs.${grandTotal}`);
    navigate('/');
  } catch (err) {
    alert("Failed to store booking in backend.");
    console.error(err);
  }
};


  return (
    <div className="container py-4">
      <h4>Confirm Booking</h4>
      <ul className="list-group mb-3">
        <li className="list-group-item">🎮 Theatre: {theatreId}</li>
        <li className="list-group-item">🗕️ Date: {date}</li>
        <li className="list-group-item">💺 Seats: {qty} × Rs. {pricePerSeat}</li>
        <li className="list-group-item">🧾 GST (18%): Rs. {gst}</li>
        <li className="list-group-item fw-bold">💰 Total: Rs. {grandTotal}</li>
        <li className="list-group-item fw-bold">👤 User Name: {`${user.first_name || ''} ${user.last_name || ''}`.trim() || "Guest"}</li>
        <li className="list-group-item fw-bold">📞 Mobile Number: {user.mobile || "N/A"}</li>
      </ul>
      <button className="btn btn-danger w-100" onClick={handleBook}>
        Book & Pay
      </button>
    </div>
  );
}

export default BookingConfirmation;
