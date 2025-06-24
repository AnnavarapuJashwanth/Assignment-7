import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PlaysSeatSelection.css';

export default function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const cols = 10;
  const seatPrice = 300;
  const gst = 0.18;

  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleProceed = () => {
    localStorage.setItem('selectedPlaySeats', JSON.stringify(selectedSeats));
    navigate(`/plays/${id}/ticket-details`);
  };

  const total = selectedSeats.length * seatPrice;
  const totalGST = total * gst;
  const grandTotal = total + totalGST;

  return (
    <div className="container py-4 seat-selection">
      <h3 className="mb-3">🎭 Choose Your Seats</h3>
      <div className="screen">Stage</div>

      <div className="seats-grid">
        {rows.map(row => (
          <div key={row} className="seat-row">
            {Array.from({ length: cols }, (_, i) => {
              const seatId = `${row}${i + 1}`;
              return (
                <div
                  key={seatId}
                  className={`seat ${selectedSeats.includes(seatId) ? 'selected' : ''}`}
                  onClick={() => toggleSeat(seatId)}
                >
                  {seatId}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="mt-4 seat-summary">
          <p><strong>Selected Seats:</strong> {selectedSeats.join(', ')}</p>
          <p>Ticket: ₹{seatPrice} × {selectedSeats.length} = ₹{total}</p>
          <p>GST (18%): ₹{totalGST.toFixed(2)}</p>
          <h5>Total: ₹{grandTotal.toFixed(2)}</h5>
        </div>
      )}

      <button
        className="btn btn-danger mt-4"
        disabled={selectedSeats.length === 0}
        onClick={handleProceed}
      >
        Proceed with {selectedSeats.length} seat(s)
      </button>
    </div>
  );
}
