// src/pages/EventsPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EventsPage.css';

const sampleEvents = [
  {
    id: '1',
    title: 'Who Are You by Rahul Subramanian',
    date: 'Sat, 5 Jul',
    location: 'MB Vignana Kendram',
    price: '799',
    genre: 'Stand Up Comedy',
    language: 'English',
    image: 'https://assets-in.bmscdn.com/nmcms/desktop/media-desktop-who-are-you-by-rahul-subramanian-2025-5-12-t-8-39-21.jpg',
    promoted: true
  },
  {
    id: '2',
    title: 'Kids Chess Championship (Online)',
    date: 'Sat, 21 Jun onwards',
    location: 'Online',
    price: '249',
    genre: 'Competition',
    language: 'English',
    image: 'https://in.bmscdn.com/events/moviecard/ET00440469.jpg',
        promoted: false
  },
  {
    id: '3',
    title: 'Kisi Ko Batana Mat Ft. Anubhav Singh Bassi',
    date: 'Fri, 20 Jun onwards',
    location: 'Sanjeev Kumar Auditorium',
    price: '799',
    genre: 'Stand Up Comedy',
    language: 'Hindi',
    image: 'https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg?cs=srgb&dl=pexels-wendywei-1190297.jpg&fm=jpg',
    promoted: false
  }
];

const EventsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="events-page container-fluid">
      <div className="row">
        {/* Filters Section */}
        <div className="col-md-3 bg-white p-3 rounded shadow-sm">
          <h5 className="fw-bold mb-3">Filters</h5>
          <div className="filter-group mb-3">
            <label className="fw-semibold">Date</label>
            <div className="d-flex flex-column gap-2 mt-2">
              <button className="btn btn-outline-secondary btn-sm">Today</button>
              <button className="btn btn-outline-secondary btn-sm">Tomorrow</button>
              <button className="btn btn-outline-secondary btn-sm">This Weekend</button>
            </div>
          </div>
          <hr />
          <div className="filter-group mb-3">
            <label className="fw-semibold">Languages</label>
            <select className="form-select">
              <option>All</option>
              <option>English</option>
              <option>Hindi</option>
            </select>
          </div>
          <hr />
          <div className="filter-group mb-3">
            <label className="fw-semibold">Categories</label>
            <select className="form-select">
              <option>All</option>
              <option>Comedy</option>
              <option>Kids</option>
            </select>
          </div>
        </div>

        {/* Events Section */}
        <div className="col-md-9">
          <h3 className="fw-bold mt-3 mb-4">Events In Vijayawada</h3>
          <div className="row">
            {sampleEvents.map((event, idx) => (
              <motion.div
                className="col-6 col-md-4 mb-4"
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div
                  className="card event-card h-100 shadow-sm"
                  onClick={() => navigate(`/events/${event.id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="position-relative">
                    <img src={event.image} className="card-img-top" alt={event.title} />
                    {event.promoted && <span className="promoted-tag">PROMOTED</span>}
                  </div>
                  <div className="card-body">
                    <p className="text-muted mb-1 small">{event.date}</p>
                    <h6 className="fw-semibold mb-1">{event.title}</h6>
                    <p className="small text-muted mb-1">{event.location}</p>
                    <p className="text-danger fw-bold">₹{event.price} onwards</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventsPage;
