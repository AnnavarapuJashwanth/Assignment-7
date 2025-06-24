import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const plays = [
  {
    id: 1,
    title: 'Jar Tar Chi Goshta',
    language: 'Marathi',
    price: 300,
    image: 'https://www.rangabhoomi.com/wp-content/uploads/2023/07/jar-tarchi-goshta-cover.jpg',
    date: '22 Jun – 6 Jul',
    time: '4:30 PM',
    ageLimit: '3+',
    genre: 'Drama',
    facilities: 'Air Conditioned | All Age Groups | Seated Layout',
    artists: ['/images/actor1.jpg']
  }
];

export default function PlaysDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const play = plays.find(p => p.id === parseInt(id));

  if (!play) {
    return <div className="container mt-5">Play not found</div>;
  }

  return (
    <motion.div className="container play-details" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="row mt-4">
        <div className="col-md-6">
          <img src={play.image} className="img-fluid rounded" alt={play.title} />
        </div>
        <div className="col-md-6">
          <h2>{play.title}</h2>
          <ul>
            <li><strong>Date:</strong> {play.date}</li>
            <li><strong>Time:</strong> {play.time} (2h 30m)</li>
            <li><strong>Language:</strong> {play.language}</li>
            <li><strong>Age Limit:</strong> {play.ageLimit}</li>
            <li><strong>Genre:</strong> {play.genre}</li>
          </ul>
          <p>₹{play.price} onwards</p>
          <button className="btn btn-danger" onClick={() => navigate(`/plays/${play.id}/venue`)}>Book Now</button>
        </div>
      </div>

      <hr />
      <h4>Facilities</h4>
      <div className="facilities mb-4">{play.facilities}</div>

      <h4>Artists</h4>
      <div className="d-flex gap-3">
        {play.artists.map((src, index) => (
          <img key={index} src={src} className="rounded-circle artist-img" alt={`artist-${index}`} />
        ))}
      </div>
    </motion.div>
  );
}
