// src/pages/VenueSelection.js
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Accordion} from 'react-bootstrap';
import { motion } from 'framer-motion';
import './VenueSelection.css';

const venueData = {
  Hyderabad: ['Shilpakala Vedika', 'Ravindra Bharathi', 'Lamakaan'],
  Vijayawada: ['MB Vignana Kendram', 'Tummalapalli Kalakshetram'],
  Bangalore: ['Chowdiah Memorial Hall', 'Good Shepherd Auditorium']
};

const VenueSelection = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedVenue, setSelectedVenue] = useState(null);

const handleContinue = () => {
  if (!selectedVenue) return alert('Please select a venue');
  localStorage.setItem('selectedVenue', selectedVenue);
  navigate(`/events/${id}/tickets`); // ✅ FIXED
};


  return (
    <div className="venue-selection container py-5">
      <h3 className="fw-bold mb-4 text-center">Select Your Venue</h3>
      <Accordion defaultActiveKey="0">
        {Object.entries(venueData).map(([city, venues], index) => (
          <Accordion.Item eventKey={index.toString()} key={city}>
            <Accordion.Header>{city}</Accordion.Header>
            <Accordion.Body>
              <div className="d-flex flex-wrap gap-3">
                {venues.map((venue, idx) => (
                  <motion.button
                    key={idx}
                    className={`btn btn-outline-primary ${selectedVenue === venue ? 'active' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedVenue(venue)}
                  >
                    {venue}
                  </motion.button>
                ))}
              </div>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>

      <div className="text-center mt-4">
        <button className="btn btn-danger px-4 py-2 fw-semibold" onClick={handleContinue}>
          Continue
        </button>
      </div>
    </div>
  );
};

export default VenueSelection;
