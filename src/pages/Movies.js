import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const languages = ["Telugu", "English", "Hindi", "Malayalam", "Tamil"];
const genres = ["Action", "Comedy", "Drama", "Thriller", "Romance"];
const formats = ["2D", "3D", "IMAX"];

const theatres = [
  { name: "PVR Cinemas", location: "Vijayawada" },
  { name: "INOX", location: "Vijayawada" },
  { name: "Cinepolis", location: "Vijayawada" },
];

function Movies() {
  const navigate = useNavigate();

  const [selectedLanguage, setSelectedLanguage] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedFormats, setSelectedFormats] = useState([]);
  const [showTheatres, setShowTheatres] = useState(false);

  const movieList = [
  {
    id: "1",
    title: "Ballerina",
    year: 2023,
    image:
      "https://screenanarchy.com/assets/2025/06/sa_ballerina_ver26_430.jpg",
    rating: "8.7",
    language: "English",
    genre: "Action",
    format: "2D",
  },
  {
    id: "2",
    title: "Thug Life",
    year: 2024,
    image:
      "https://m.media-amazon.com/images/M/MV5BMTRlMjkwZjQtMGIwOC00OWFmLTk5OWMtMmY1NWYxOGVkYjFkXkEyXkFqcGc@._V1_.jpg",
    rating: "4.9",
    language: "Hindi",
    genre: "Drama",
    format: "2D",
  },
  {
    id: "10",
    title: "Hadhu Ledhuraa",
    year: 2025,
    image:
      "https://m.media-amazon.com/images/M/MV5BYTcxNGVhOTEtYjY1MS00NGY2LWJiNjktYjY2NzJiYjc3MDFmXkEyXkFqcGc@._V1_.jpg",
    rating: "9.1",
    language: "Telugu",
    genre: "Romance",
    format: "2D",
  },
];

  const filteredMovies = movieList.filter(
    (movie) =>
      (!selectedLanguage || movie.language === selectedLanguage) &&
      (selectedGenres.length === 0 || selectedGenres.includes(movie.genre)) &&
      (selectedFormats.length === 0 || selectedFormats.includes(movie.format))
  );

  const toggleGenre = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const toggleFormat = (format) => {
    setSelectedFormats((prev) =>
      prev.includes(format)
        ? prev.filter((f) => f !== format)
        : [...prev, format]
    );
  };

  return (
    <div className="container-fluid my-4">
      <div className="row">
        {/* Left Sidebar Filters */}
        <div className="col-md-3">
          <h5 className="mb-3">Filters</h5>

          {/* Languages */}
          <div className="mb-4">
            <strong>Languages</strong>
            <div className="d-flex flex-wrap gap-2 mt-2">
              {languages.map((lang) => (
                <button
                  key={lang}
                  className={`btn btn-sm ${
                    selectedLanguage === lang ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setSelectedLanguage(lang)}
                >
                  {lang}
                </button>
              ))}
              {selectedLanguage && (
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setSelectedLanguage("")}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Genres */}
          <div className="mb-4">
            <strong>Genres</strong>
            <div className="form-check mt-2">
              {genres.map((genre) => (
                <div key={genre}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedGenres.includes(genre)}
                    onChange={() => toggleGenre(genre)}
                    id={`genre-${genre}`}
                  />
                  <label className="form-check-label ms-2" htmlFor={`genre-${genre}`}>
                    {genre}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Format */}
          <div className="mb-4">
            <strong>Format</strong>
            <div className="form-check mt-2">
              {formats.map((format) => (
                <div key={format}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={selectedFormats.includes(format)}
                    onChange={() => toggleFormat(format)}
                    id={`format-${format}`}
                  />
                  <label className="form-check-label ms-2" htmlFor={`format-${format}`}>
                    {format}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Browse by Cinemas */}
          <button
            className="btn btn-primary w-100"
            onClick={() => setShowTheatres(!showTheatres)}
          >
            Browse by Cinemas
          </button>

          {showTheatres && (
            <ul className="list-group mt-3">
              {theatres.map((theatre, index) => (
                <li key={index} className="list-group-item">
                  {theatre.name} - {theatre.location}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Right Side Movie Grid */}
        <div className="col-md-9">
          <h4 className="mb-4">🎬 Movies In Vijayawada</h4>

          <div className="row">
            {filteredMovies.map((movie) => (
              <div
                key={movie.id}
                className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{ cursor: "pointer" }}
              >
                <div className="card h-100 shadow-sm">
                  <img
                    src={movie.image}
                    className="card-img-top"
                    alt={movie.title}
                    style={{ height: "250px", objectFit: "cover" }}
                  />
                  <div className="card-body p-2">
                    <h6 className="card-title text-truncate mb-1">
                      {movie.title}
                    </h6>
                    <p className="card-text small text-muted mb-0">
                      ⭐ {movie.rating}/10
                    </p>
                    <p className="card-text small text-muted mb-0">
                      📅 {movie.year}
                    </p>
                    <p className="card-text small text-muted mb-0">
                      🎞 {movie.genre}, {movie.format}
                    </p>
                    <p className="card-text small text-muted mb-0">
                      🌐 {movie.language}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {filteredMovies.length === 0 && (
              <div className="text-center text-muted">No movies found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Movies;
