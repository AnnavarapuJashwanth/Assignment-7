// src/pages/Home.js
import React from 'react';
import MovieCard from '../components/MovieCard';
import SectionDisplayer from '../components/SectionDisplayer';
import { recommendedMovies, premieres } from '../components/Data';

function Home() {
  return (
    <div>
      {/* Movie Carousel */}
      <div className="container mt-3">
        <MovieCard />
      </div>

      {/* Sections */}
      <SectionDisplayer title="Recommended Movies" items={recommendedMovies} seeAllLink="/movies" />
      <SectionDisplayer title="Premieres" items={premieres} seeAllLink="/movies/premieres" />

      {/* You can add more sections here like Outdoor Events, Top Rated, etc. */}
    </div>
  );
}

export default Home;
