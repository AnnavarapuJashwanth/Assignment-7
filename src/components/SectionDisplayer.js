// src/components/SectionDisplayer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SectionDisplayer.css';

const getColorBySection = (title) => {
  switch (title.toLowerCase()) {
    case 'premieres': return 'bg-dark text-white';
    case 'recommended': return 'bg-warning';
    case 'new releases': return 'bg-success text-white';
    default: return 'bg-light';
  }
};

const SectionDisplayer = ({ title, items, seeAllLink }) => {
  const themeClass = getColorBySection(title);

  return (
    <div className={`container my-5 section-displayer ${themeClass} p-3 rounded`}>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold">{title}</h4>
        {seeAllLink && (
          <Link to={seeAllLink} className="btn btn-sm btn-outline-light">
            See All
          </Link>
        )}
      </div>
      <div className="row">
        {items.map((item, index) => (
          <div className="col-6 col-md-3 mb-4" key={item._id || item.id}>
            <motion.div
              className="card h-100 shadow-sm movie-card position-relative"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
            >
              <Link to={`/movie/${item._id || item.id}`} className="text-decoration-none text-dark">
                <div className="image-wrapper">
                  <img
                    src={item.image}
                    className="card-img-top"
                    alt={item.title}
                  />
                  <span className="ribbon-tag">{title.toLowerCase().includes('premiere') ? 'PREMIERE' : 'NEW'}</span>
                </div>
                <div className="card-body">
                  <h6 className="card-title fw-semibold">{item.title}</h6>
                  <p className="card-text small text-muted">{item.genre}</p>
                  <span className="badge bg-danger">
                    ⭐ {item.rating} ({item.votes})
                  </span>
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionDisplayer;
