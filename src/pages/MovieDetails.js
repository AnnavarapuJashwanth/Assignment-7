import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import allMovies from '../components/Data';
import { motion } from 'framer-motion';
import './MovieDetails.css';

const hashtagMap = {
  1: ['#DirectionWorks', '#Entertaining', '#Interesting'],
  2: ['#NiceStory', '#Timepass', '#CoolMusic'],
  3: ['#OneTimeWatch', '#Fun', '#QuiteNice'],
  4: ['#NiceStory', '#Timepass', '#Entertaining'],
  5: ['#OkDirection', '#GoodActing', '#GoodMusic', '#NiceStory'],
  6: ['#HitMovie', '#OneTimeWatch', '#Enjoyable'],
  7: ['#LovelyMusic', '#FunWatch'],
  8: ['#Superb', '#WorthIt', '#LovedIt'],
  9: ['#Blockbuster', '#Amazing', '#GreatDirection'],
 10: ['#Masterpiece', '#OscarWorthy', '#MustWatch'],
};

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [hashtags, setHashtags] = useState([]);
  const [showContentWarning, setShowContentWarning] = useState(false);

  useEffect(() => {
    const selectedMovie = allMovies.find((m) => m.id === id);
    setMovie(selectedMovie || null);
  }, [id]);

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyHeader(window.scrollY > 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const storedRating = localStorage.getItem(`rating-${id}`);
    if (storedRating) {
      setRating(parseInt(storedRating));
      setHashtags(getHashtags(parseInt(storedRating)));
    }
  }, [id]);

  const getHashtags = (rate) => hashtagMap[rate] || [];

  const handleRateNow = () => {
    setShowModal(true);
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    setRating(value);
    setHashtags(getHashtags(value));
  };

  const handleSubmitRating = () => {
    localStorage.setItem(`rating-${id}`, rating);
    setShowModal(false);
    alert('✅ Rating submitted successfully!');
  };

  const removeDuplicatesByName = (arr) => {
    const seen = new Set();
    return arr.filter((item) => {
      if (seen.has(item.name)) return false;
      seen.add(item.name);
      return true;
    });
  };

  if (!movie) {
    return <div className="text-center mt-5"><h4>🎬 Movie not found.</h4></div>;
  }

  return (
    <div className="movie-details-page">
      {showStickyHeader && (
        <div className="sticky-header bg-dark text-white w-100">
          <div className="container d-flex justify-content-between align-items-center py-2">
            <h5 className="mb-0">{movie.title}</h5>
            
<button className="btn btn-danger btn-lg fw-semibold" onClick={() => setShowContentWarning(true)}>
  Book tickets
</button>
          </div>
        </div>
      )}
      {showContentWarning && (
  <div className="modal-overlay">
    <div className="modal-content rounded shadow-lg bg-white p-4">
      <h5>Content Warning</h5>
      <p>
        This movie is rated “A” and is only for viewers above 18. Please carry a valid ID/age proof.
        If denied entry due to age or ID issues, you will not get a refund.
      </p>
      <button className="btn btn-danger" onClick={() => {
        setShowContentWarning(false);
        navigate(`/tickets/${id}`);
      }}>
        Continue
      </button>
    </div>
  </div>
)}


      {/* Hero section */}
      <div
        className="movie-hero-section"
        style={{
          backgroundImage: `url(${movie.backdrop || movie.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          color: 'white',
          padding: '6rem 2rem',  // Increase padding-top and bottom
    minHeight: '700px',
        }}
      >
        <div className="movie-hero-overlay" />
        <div className="container d-flex flex-column flex-md-row align-items-center">
          <motion.img
            src={movie.image}
            alt={movie.title}
            className="img-fluid poster-img rounded shadow-lg mb-3 mb-md-0"
            style={{ width: '260px', zIndex: 2 }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          />

          <motion.div
            className="text-white ms-md-4 movie-meta"
            style={{ zIndex: 2, maxWidth: '700px' }}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="fw-bold display-5 mb-3">{movie.title}</h1>
            <div className="d-flex align-items-center gap-3 flex-wrap">
              <span className="text-warning fw-semibold fs-5">⭐ {movie.rating}</span>
              <span className="text-light small">({movie.votes} votes)</span>
              <button className="btn btn-light btn-sm fw-semibold" onClick={handleRateNow}>Rate now</button>
            </div>

            <div className="my-3">
              <span className="badge bg-danger me-2">{movie.format || '2D, IMAX 2D'}</span>
              <span className="text-light">{movie.languages.join(', ')}</span>
            </div>

            <p className="mb-1"><strong>Runtime:</strong> {movie.runtime}</p>
            <p className="mb-1"><strong>Genre:</strong> {movie.genre}</p>
            <p className="mb-1"><strong>Release Date:</strong> {movie.releaseDate}</p>
            <p className="mb-3"><strong>Age Rating:</strong> UA 16+</p>

      <button className="btn btn-danger btn-lg fw-semibold" onClick={() => setShowContentWarning(true)}>
  Book tickets
</button>
          </motion.div>
        </div>
      </div>

      {/* Rating Modal */}
      {showModal && (
        <div className="rating-modal-overlay">
          <div className="rating-modal">
            <h5>How was the movie?</h5>
            <p><strong>How would you rate the movie?</strong></p>
            <input
              type="range"
              min="0"
              max="10"
              value={rating}
              className="form-range"
              onChange={handleSliderChange}
            />
            <div className="text-end">{rating}/10</div>

            {rating > 0 && (
              <>
                <p className="mt-3"><strong>{rating >= 5 ? 'What did you like?' : 'What do you think about the movie?'}</strong></p>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {hashtags.map((tag, idx) => (
                    <span key={idx} className="badge bg-light text-dark border border-secondary">{tag}</span>
                  ))}
                </div>
              </>
            )}

            <button className="btn btn-danger w-100" onClick={handleSubmitRating}>Submit Rating</button>
          </div>
        </div>
      )}

      {/* Cast Section */}
      <div className="container mt-5">
        <hr />
        <h4 className="mt-4">Cast</h4>
        <div className="row">
          {removeDuplicatesByName(movie.cast || []).map((actor, index) => (
            <div className="col-4 col-md-2 text-center mb-3" key={index}>
              <img src={actor.image} alt={actor.name} className="img-fluid rounded-circle mb-2 cast-image" />
              <p>{actor.name}</p>
            </div>
          ))}
        </div>

        {/* Crew Section */}
        <h4 className="mt-4">Crew</h4>
        <div className="row">
          {removeDuplicatesByName(movie.crew || []).map((person, index) => (
            <div className="col-6 col-md-3 text-center mb-3" key={index}>
              <img src={person.image} alt={person.name} className="img-fluid rounded-circle mb-2 crew-image" />
              <p><strong>{person.name}</strong><br /><small>{person.role}</small></p>
            </div>
          ))}
        </div>

        {/* Reviews Section */}
        <h4 className="mt-4">Reviews</h4>
        <ul className="list-group">
          {movie.reviews?.map((review, index) => (
            <li className="list-group-item" key={index}>{review}</li>
          ))}
        </ul>

        {/* Recommendations Section */}
        <h4 className="mt-4">You may also like</h4>
        <div className="row">
          {movie.recommendations?.map((rec, index) => (
            <div
              className="col-6 col-md-3 text-center mb-4 recommendation-card"
              key={index}
              onClick={() => navigate(`/movie/${rec.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={rec.image}
                alt={rec.title}
                className="img-fluid rounded shadow-sm recommendation-img"
              />
              <p className="mt-2 mb-0 recommendation-title">{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
