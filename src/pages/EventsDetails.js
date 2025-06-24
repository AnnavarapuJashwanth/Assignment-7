import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './EventsDetails.css';

const sampleEvents = [
  {
    id: '1',
    title: 'Who Are You by Rahul Subramanian',
    image: 'https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-who-are-you-by-rahul-subramanian-2025-5-12-t-8-39-21.jpg',
    date: 'Sat, 5 Jul',
    location: 'MB Vignana Kendram, Vijayawada',
    genre: 'Stand Up Comedy',
    languages: ['Hindi', 'English'],
    description:
      'Fresh off being nominated as the “Most Outstanding Show 2025” at one of the world’s largest arts festivals – the Melbourne International Comedy Festival, Rahul is back in India to continue touring with his show “Who Are You”.',
    price: '799',
    duration: '1 hour 15 minutes',
    ageLimit: '16yrs +',
    startDate: 'Sun 22 Jun 2025',
    endDate: 'Sun 27 Jul 2025',
    time: '7:00 PM',
  },
];

const EventsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = sampleEvents.find((e) => e.id === id);
    setEvent(foundEvent);
  }, [id]);

  if (!event) {
    return <div className="container text-center mt-5">Event not found</div>;
  }

const handleBookNow = () => {
  localStorage.setItem('selectedEventTitle', event.title);
  localStorage.setItem('selectedEventDate', event.startDate); // or another field
navigate(`/events/${event.id}/venue`);
};



  return (
    <div className="container event-details py-5">
      <div className="row">
        <div className="col-md-8">
          <img src={event.image} alt={event.title} className="img-fluid rounded mb-3 event-img" />
          <h2 className="fw-bold mb-2 animate__animated animate__fadeInDown">{event.title}</h2>
          <p className="mb-2"><strong>Genre:</strong> {event.genre}</p>
          <p className="mb-2"><strong>Languages:</strong> {event.languages.join(', ')}</p>
          <p className="mb-2"><strong>Description:</strong> {event.description}</p>
        </div>

        <div className="col-md-4">
          <div className="p-3 bg-light rounded sticky-top shadow booking-panel animate__animated animate__fadeInRight">
            <p><strong>{event.startDate} - {event.endDate}</strong></p>
            <p>🕒 {event.time}</p>
            <p>⏳ {event.duration}</p>
            <p>🔞 Age Limit: {event.ageLimit}</p>
            <p>📍 {event.location}</p>
            <p className="fw-bold text-danger">₹{event.price} onwards</p>
            <button
              className="btn btn-danger w-100 fw-semibold book-now-btn"
              onClick={handleBookNow}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsDetails;
