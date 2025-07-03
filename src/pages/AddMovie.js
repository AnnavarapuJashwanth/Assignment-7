// ✅ AddMovie.js (Admin Only Movie Addition Page)
import React, { useState } from 'react';
import axios from 'axios';

const AddMovie = () => {
  const [movieData, setMovieData] = useState({
    title: '',
    year: '',
    rating: '',
    directors: '',
    producers: '',
    actors: '',
    cast: '',
    crew: '',
    reviews: '',
    image: '',
    language: '',
    genre: '',
    format: '',
  });

  const loggedIn = JSON.parse(localStorage.getItem('loggedInUser'));

  const handleChange = (e) => {
    setMovieData({ ...movieData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/api/movies/', movieData, {
        headers: {
          Authorization: `Bearer ${loggedIn?.tokens?.access}`,
        },
      });
      alert('✅ Movie added successfully!');
      setMovieData({
        title: '', year: '', rating: '', directors: '', producers: '', actors: '',
        cast: '', crew: '', reviews: '', image: '', language: '', genre: '', format: ''
      });
    } catch (error) {
      console.error(error);
      alert('❌ Error adding movie. Only admin users can add.');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Add New Movie (Admin Only)</h3>
      <form onSubmit={handleSubmit}>
        {Object.entries(movieData).map(([key, value]) => (
          <div className="mb-3" key={key}>
            <label className="form-label">{key.toUpperCase()}</label>
            <input
              type="text"
              className="form-control"
              name={key}
              value={value}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit" className="btn btn-primary w-100">Add Movie</button>
      </form>
    </div>
  );
};

export default AddMovie;