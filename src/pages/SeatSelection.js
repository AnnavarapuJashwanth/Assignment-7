import React, { useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import './SeatSelection.css'; // Create and style accordingly

function SeatSelection() {
  const { id, theatreId } = useParams();
  localStorage.setItem("movieId", id);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const date = query.get('date');

  const seatTypes = [
    { type: 'NORMAL', price: 120, rows: ['A', 'B'] },
    { type: 'EXECUTIVE', price: 180, rows: ['C', 'D', 'E', 'F'] },
    { type: 'PREMIUM', price: 240, rows: ['G', 'H', 'I', 'J', 'K'] }
  ];

  const [selectedSeats, setSelectedSeats] = useState([]);

  const toggleSeat = (row, number) => {
    const seatId = `${row}${number}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
    } else {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat.');
      return;
    }

    // Determine seat type by row prefix
    const firstSeatRow = selectedSeats[0][0];
    const seatTypeObj = seatTypes.find(t => t.rows.includes(firstSeatRow));

    navigate('confirm', {
      state: {
        theatreId,
        date,
        qty: selectedSeats.length,
        seatType: seatTypeObj,
        selectedSeats
      }
    });
  };

  return (
    <div className="container py-4">
      <h4 className="mb-4 text-center">Select Your Seats</h4>

      {seatTypes.map(({ type, price, rows }) => (
        <div key={type} className="mb-4">
          <h6>Rs. {price} {type}</h6>
          {rows.map(row => (
            <div key={row} className="mb-2 d-flex align-items-center">
              <span className="me-2">{row}</span>
              {[...Array(20).keys()].map(n => {
                const seatNum = n + 1;
                const seatId = `${row}${seatNum}`;
                const isSelected = selectedSeats.includes(seatId);
                return (
                  <button
                    key={seatId}
                    className={`seat ${isSelected ? 'selected' : ''}`}
                    onClick={() => toggleSeat(row, seatNum)}
                  >
                    {seatNum}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      ))}

      <div className="text-center my-4">
        <button className="btn btn-danger px-5" onClick={handleProceed}>
          Proceed to Confirm ({selectedSeats.length} selected)
        </button>
      </div>
    </div>
  );
}

export default SeatSelection;
