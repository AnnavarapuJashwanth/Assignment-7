import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const plays = [
  {
    id: 1,
    title: 'Jar Tar Chi Goshta',
    language: 'Marathi',
    price: 300,
    image: 'https://marathimovieworld.com/images/jar-tar-chi-goshta-priya-bapat-umesh-kamat.jpg',
    date: 'Sun, 22 Jun onwards'
  }
];

export default function PlaysList() {
  const navigate = useNavigate();

  return (
    <div className="row">
      {plays.map(play => (
        <motion.div
          className="col-md-4 mb-4"
          key={play.id}
          whileHover={{ scale: 1.05 }}
        >
          <div
            className="card play-card"
            onClick={() => navigate(`/plays/${play.id}`)}
          >
            <img src={play.image} className="card-img-top" alt={play.title} />
            <div className="card-body">
              <p className="text-muted">{play.date}</p>
              <h5 className="card-title">{play.title}</h5>
              <p>{play.language} | ₹{play.price} onwards</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
