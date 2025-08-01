import React, { useEffect, useState, useRef } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { QRCodeCanvas } from 'qrcode.react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './MyTickets.css';

function MyTickets() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState({ theatre: '', type: 'all' });
  const ticketRefs = useRef([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('loggedInUser'))?.user;
    if (!user?.userId) return;

    fetch(`http://localhost:8000/api/bookings/?user=${user.userId}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setBookings(data);
        } else {
          toast.error("Invalid bookings data received");
        }
      })
      .catch(err => {
        toast.error("Failed to load bookings");
        console.error(err);
      });
  }, []);

  const downloadPDF = (ticket) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("🎟️ Ticket Confirmation", 20, 20);

    if (ticket.eventId && ticket.category === 'play') {
      doc.setFontSize(12);
      doc.text(`Play: ${ticket.eventName}`, 20, 30);
      doc.text(`Venue: ${ticket.venue}`, 20, 40);
      doc.text(`Date: ${ticket.date}`, 20, 50);
      doc.text(`Time: ${ticket.time}`, 20, 60);
      doc.text(`Seat Type: ${ticket.ticketType}`, 20, 70);
    } else if (ticket.eventId) {
      doc.text(`Event: ${ticket.eventName}`, 20, 30);
      doc.text(`Venue: ${ticket.venue}`, 20, 40);
      doc.text(`Date: ${ticket.date}`, 20, 50);
      doc.text(`Time: ${ticket.time}`, 20, 60);
      doc.text(`Ticket Type: ${ticket.ticketType}`, 20, 70);
    } else {
      doc.text(`Theatre: ${ticket.theatreId}`, 20, 30);
      doc.text(`Date: ${ticket.date}`, 20, 40);
      doc.text(`Seats: ${ticket.qty} × ${ticket.seatType}`, 20, 50);
    }

    doc.text(`GST: Rs. ${ticket.gst}`, 20, 80);
    doc.text(`Total Paid: Rs. ${ticket.total || ticket.grandTotal}`, 20, 90);
    doc.text(`Booked by: ${ticket.userName}`, 20, 100);
    doc.save(`ticket_${ticket.timestamp}.pdf`);
    toast.success("PDF downloaded!");
  };

  const downloadImage = async (index) => {
    const card = ticketRefs.current[index];
    if (!card) return;

    const canvas = await html2canvas(card);
    const link = document.createElement('a');
    link.download = `ticket_${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
    toast.success("Image downloaded!");
  };

  const filteredBookings = bookings.filter(ticket => {
    const isMovie = !ticket.eventId;
    const isEvent = !!ticket.eventId && ticket.category !== 'play';
    const isPlay = ticket.category === 'play';

    const matchesType =
      filter.type === 'all' ||
      (filter.type === 'movie' && isMovie) ||
      (filter.type === 'event' && isEvent) ||
      (filter.type === 'play' && isPlay);

    const matchesTheatre =
      !filter.theatre ||
      (ticket.theatreId || ticket.venue || '')
        .toLowerCase()
        .includes(filter.theatre.toLowerCase());

    return matchesType && matchesTheatre;
  });

  return (
    <div className="container py-4 my-tickets">
      <ToastContainer position="top-right" autoClose={2500} />
      <h3 className="mb-4">🎟️ My Tickets</h3>

      <div className="row mb-3 g-2 filter-row">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Filter by theatre or venue"
            className="form-control"
            value={filter.theatre}
            onChange={e => setFilter({ ...filter, theatre: e.target.value })}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={filter.type}
            onChange={e => setFilter({ ...filter, type: e.target.value })}
          >
            <option value="all">All</option>
            <option value="movie">Movies</option>
            <option value="event">Events</option>
            <option value="play">Plays</option>
          </select>
        </div>
      </div>

      {filteredBookings.length === 0 ? (
        <p className="text-muted">No bookings found.</p>
      ) : (
        <div className="row">
          {filteredBookings.map((ticket, index) => {
            const cardClass = `card ticket-card shadow-sm h-100 ${
              ticket.category === 'play'
                ? 'play-style'
                : ticket.eventId
                ? 'event-style'
                : 'movie-style'
            }`;

            return (
              <div className="col-md-6 col-lg-4 mb-4" key={index}>
                <div
                  className={cardClass}
                  ref={el => (ticketRefs.current[index] = el)}
                >
                  <div className="card-body">
                    {ticket.eventId && ticket.category === 'play' ? (
                      <>
                        <h5 className="card-title">🎭 {ticket.eventName}</h5>
                        <p>📍 Venue: {ticket.venue}</p>
                        <p>📅 Date: {ticket.date}</p>
                        <p>🕒 Time: {ticket.time}</p>
                        <p>🎟️ Type: {ticket.ticketType}</p>
                        <div className="my-2 text-center">
                          <QRCodeCanvas
                            value={`Play: ${ticket.eventName} - ${ticket.date}`}
                            size={96}
                          />
                        </div>
                      </>
                    ) : ticket.eventId ? (
                      <>
                        <h5 className="card-title">🎫 {ticket.eventName}</h5>
                        <p>📍 Venue: {ticket.venue}</p>
                        <p>📅 Date: {ticket.date}</p>
                        <p>🕒 Time: {ticket.time}</p>
                        <p>🎟️ Type: {ticket.ticketType}</p>
                      </>
                    ) : (
                      <>
                        <h5 className="card-title">🎬 {ticket.theatreId}</h5>
                        <p>📅 Date: {ticket.date}</p>
                        <p>💺 Seats: {ticket.qty} × {ticket.seatType}</p>
                      </>
                    )}

                    <p>🧾 GST: ₹{ticket.gst}</p>
                    <h6 className="fw-bold">Total: ₹{ticket.total || ticket.grandTotal}</h6>
                    <p className="small text-muted">Booked by: {ticket.userName}</p>

                    <div className="d-flex justify-content-between mt-3">
                      <button className="btn btn-sm btn-outline-primary" onClick={() => downloadPDF(ticket)}>
                        Download PDF
                      </button>
                      <button className="btn btn-sm btn-outline-secondary" onClick={() => downloadImage(index)}>
                        Download Image
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MyTickets;
