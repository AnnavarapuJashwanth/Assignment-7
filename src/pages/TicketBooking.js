import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './TicketBooking.css'; // NEW

const theatresByMovie = {
  '1': [
    { id: 'cine1', name: 'Cinepolis: Power One Mall, Vijayawada', mTicket: true, food: true, language: 'Telugu' },
    { id: 'ino1', name: 'INOX: Urvasi Complex, Gandhi Nagar', mTicket: true, food: true, language: 'Telugu' }
  ],
  '2': [
    { id: 'cine1', name: 'Cinepolis: Power One Mall, Vijayawada', mTicket: true, food: false, language: 'Hindi' },
    { id: 'ino1', name: 'INOX: Urvasi Complex, Gandhi Nagar', mTicket: false, food: true, language: 'Telugu' }
  ],
  '3': [
    { id: 'cine1', name: 'Cinepolis: Power One Mall, Vijayawada', mTicket: false, food: false, language: 'English' }
  ],
};

function TicketBooking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().slice(0, 10));
  const [theatres, setTheatres] = useState([]);
  const [dateTabs, setDateTabs] = useState([]);

  useEffect(() => {
    setTheatres(theatresByMovie[id] || []);
    const today = new Date();
    const dates = Array.from({ length: 6 }, (_, i) => {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      return {
        label: d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }),
        value: d.toISOString().slice(0, 10)
      };
    });
    setDateTabs(dates);
  }, [id]);

  return (
    <div className="container my-4">
      <h4 className="mb-3">Select Date & Theatre</h4>

      {/* Date Tabs */}
      <div className="date-tabs d-flex overflow-auto mb-4">
        {dateTabs.map(date => (
          <div
            key={date.value}
            className={`date-tab px-3 py-2 me-2 text-center rounded ${selectedDate === date.value ? 'active' : ''}`}
            onClick={() => setSelectedDate(date.value)}
          >
            <div className="fw-bold">{date.label.split(' ')[0]}</div>
            <div>{date.label.split(' ')[1]} {date.label.split(' ')[2]}</div>
          </div>
        ))}
      </div>

      {/* Theatre Options */}
      {theatres.map(theatre => (
        <div key={theatre.id} className="theatre-card mb-3 p-3 rounded shadow-sm">
          <div className="d-flex justify-content-between align-items-center mb-2">
            <div className="fw-semibold">{theatre.name}</div>
            <button
              className="btn btn-outline-success"
              onClick={() => navigate(`seat/${theatre.id}?date=${selectedDate}`)}
            >
              10:00 PM
            </button>
          </div>
          <div className="d-flex align-items-center small text-muted">
            {theatre.mTicket && <span className="me-3"><i className="bi bi-phone-fill text-success"></i> M-Ticket</span>}
            {theatre.food && <span className="me-3"><i className="bi bi-cup-straw text-warning"></i> Food & Beverage</span>}
            {theatre.language && <span className="me-3"><i className="bi bi-translate text-info"></i> {theatre.language}</span>}
            <span className="ms-auto text-success">Cancellation Available</span>
          </div>
        </div>
      ))}

      {theatres.length === 0 && (
        <div className="alert alert-info mt-4">No theatres available for this movie.</div>
      )}
    </div>
  );
}

export default TicketBooking;
