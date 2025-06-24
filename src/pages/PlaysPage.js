import React from 'react';
import PlaysList from '../components/Plays/PlaysList';
import './plays.css';

export default function PlaysPage() {
  return (
    <div className="container-fluid plays-page">
      <div className="row">
        <div className="col-md-3 filters animate__animated animate__fadeInLeft">
          {/* Filters (Date, Language, Genre, etc.) */}
          <div className="filter-section">
            <h5>Date</h5>
            <button className="btn btn-outline-danger">Today</button>
            <button className="btn btn-outline-danger">Tomorrow</button>
            <button className="btn btn-outline-danger">This Weekend</button>
          </div>
          {/* Add more filters below */}
        </div>
        <div className="col-md-9">
          <h3 className="mb-4">Plays in Vijayawada</h3>
          <PlaysList />
        </div>
      </div>
    </div>
  );
}
