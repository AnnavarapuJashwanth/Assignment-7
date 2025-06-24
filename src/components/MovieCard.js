// components/MovieCard.js
import React from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MovieCard.css';

const recommendedMovies = [
  {
    image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1744877687450_revplaycard1240x300.jpg"
  },
  {
    image: "https://assets-in-gm.bmscdn.com/promotions/cms/creatives/1750068661524_halwabyamittandondesktop.jpg"
  },
  {
    image: "https://images4.alphacoders.com/101/thumb-1920-1012509.jpg"
  }
];

function MovieCard() {
  return (
    <div className="movie-carousel-wrapper">
      <Carousel
        controls={true}
        indicators={true}
        fade={true}
        interval={3000}
        pause="hover"
        keyboard={true}
      >
        {recommendedMovies.map((movie, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100"
              src={movie.image}
              alt={`Slide ${index}`}
              style={{ height: '400px', objectFit: 'fill' }}
            />
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
}

export default MovieCard;
