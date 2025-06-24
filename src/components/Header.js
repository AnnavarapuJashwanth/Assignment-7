import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation as useReactRouterLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'animate.css';

function Header() {
  const navigate = useNavigate();
  const routerLocation = useReactRouterLocation();
  const user = JSON.parse(localStorage.getItem('loggedInUser'));
  const [showDropdown, setShowDropdown] = useState(false);
  const [location, setLocation] = useState('Select City');
  const [showLocationPopup, setShowLocationPopup] = useState(false);
  const [detecting, setDetecting] = useState(false);
  const dropdownRef = useRef(null);
  const popupRef = useRef(null);

  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      setLocation(storedCity);
    }
  }, []);

  useEffect(() => {
    const storedCity = localStorage.getItem('selectedCity');
    if (storedCity) {
      setLocation(storedCity);
    }
  }, [routerLocation]);

  const handleDetectLocation = () => {
    if (navigator.geolocation) {
      setDetecting(true);
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
            .then(res => res.json())
            .then(data => {
              const rawCity = data.address.city || data.address.town || data.address.village || data.address.state_district || data.address.state || 'Unknown';
              const matchedCity = Object.keys(cityIcons).find(c => rawCity.toLowerCase().includes(c.toLowerCase()));
              if (matchedCity) {
                setLocation(matchedCity);
                localStorage.setItem('selectedCity', matchedCity);
              } else {
                alert(`Detected city "${rawCity}" is not available.`);
                setLocation('Unknown');
              }
              setDetecting(false);
              setShowLocationPopup(false);
            })
            .catch(err => {
              console.error("Error in reverse geocoding:", err);
              alert("Could not detect your city.");
              setLocation('Unknown');
              setDetecting(false);
            });
        },
        error => {
          console.log("Geolocation not allowed", error);
          alert("Please allow location permission.");
          setLocation('Detect City');
          setDetecting(false);
        }
      );
    } else {
      alert("Geolocation not supported on this browser.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('loggedInUser');
    navigate('/');
  };

  const toggleDropdown = () => {
    setShowDropdown(prev => !prev);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleLocationChange = (city) => {
    setLocation(city);
    localStorage.setItem('selectedCity', city);
    setShowLocationPopup(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowLocationPopup(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const cityIcons = {
    'Mumbai': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-city-india-flatart-icons-outline-flatarticons.png',
    'Delhi-NCR': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-india-landmark-flatart-icons-outline-flatarticons.png',
    'Bengaluru': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-industry-manufacturing-flatart-icons-outline-flatarticons.png',
    'Hyderabad': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-palace-tourism-flatart-icons-outline-flatarticons.png',
    'Ahmedabad': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-temple-indian-culture-flatart-icons-outline-flatarticons.png',
    'Chandigarh': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-buildings-construction-flatart-icons-outline-flatarticons.png',
    'Pune': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-skyscrapers-urban-flatart-icons-outline-flatarticons.png',
    'Chennai': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-south-india-indian-culture-flatart-icons-outline-flatarticons.png',
    'Kolkata': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-monument-tourism-flatart-icons-outline-flatarticons.png',
    'Kochi': 'https://img.icons8.com/external-flatart-icons-outline-flatarticons/64/external-sea-tourism-flatart-icons-outline-flatarticons.png'
  };

  const popularCities = Object.keys(cityIcons);

  return (
    <header className="bg-white border-bottom position-relative" style={{ zIndex: 1050 }}>
      <div className="container-fluid d-flex justify-content-between align-items-center py-2 px-3">
        <div className="d-flex align-items-center">
          <img
            src="https://getlogo.net/wp-content/uploads/2020/04/bookmyshow-logo-vector.png"
            alt="BookMyShow"
            height="80"
            className="me-3"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
          <input
            type="text"
            className="form-control"
            placeholder="Search for Movies, Events, Plays, Sports and Activities"
            style={{ width: '400px' }}
          />
        </div>

        <div className="d-flex align-items-center position-relative">
          <button className="btn btn-outline-primary me-3 animate__animated animate__pulse animate__infinite" onClick={() => setShowLocationPopup(true)}>
            {location} <i className="fas fa-chevron-down ms-2"></i>
          </button>

          {!user ? (
            <>
              <button className="btn btn-danger btn-sm me-2" onClick={() => navigate('/signin')}>Sign in</button>
              <button className="btn btn-outline-danger btn-sm" onClick={() => navigate('/signup')}>Sign up</button>
            </>
          ) : (
            <div className="dropdown" ref={dropdownRef}>
              <div
                className="d-flex align-items-center"
                style={{ cursor: 'pointer' }}
                onClick={toggleDropdown}
              >
                <i className="fas fa-user-circle fa-lg me-2 text-primary"></i>
                <span className="fw-bold text-primary">{user.firstName}</span>
              </div>

              {showDropdown && (
                <div className="dropdown-menu show mt-2" style={{ right: 0, left: 'auto', position: 'absolute' }}>
                  <button className="dropdown-item" onClick={() => { closeDropdown(); navigate('/profile'); }}>My Profile</button>
                  <button className="dropdown-item" onClick={() => { closeDropdown(); navigate('/tickets'); }}>My Tickets</button>
                  <button className="dropdown-item" onClick={() => { closeDropdown(); navigate('/settings'); }}>Settings</button>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item text-danger" onClick={handleLogout}>Logout</button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {showLocationPopup && (
        <div ref={popupRef} className="position-fixed top-50 start-50 translate-middle bg-white border rounded shadow p-4 animate__animated animate__fadeIn" style={{ width: '90%', maxWidth: '800px', zIndex: 1060 }}>
          <div className="mb-3 d-flex align-items-center" style={{ cursor: 'pointer' }} onClick={!detecting ? handleDetectLocation : undefined}>
            <i className="fas fa-map-marker-alt text-danger me-2"></i>
            <strong>{detecting ? 'Detecting location...' : 'Detect my location'}</strong>
          </div>
          <h6>Popular Cities</h6>
          <div className="d-flex flex-wrap gap-4 justify-content-start">
            {popularCities.map((city, index) => (
              <div
                key={index}
                className={`city-tile text-center p-3 rounded border animate__animated animate__zoomIn ${location === city ? 'city-selected bg-primary text-white' : 'bg-light text-dark'}`}
                style={{ cursor: 'pointer', width: '100px', transition: 'all 0.3s ease' }}
                onClick={() => handleLocationChange(city)}
              >
                <img
                  src={cityIcons[city]}
                  alt={city}
                  style={{ width: '60px', height: '60px', objectFit: 'contain' }}
                  className="mb-2"
                  onError={(e) => (e.target.src = 'https://img.icons8.com/ios-filled/50/city.png')}
                />
                <div>{city}</div>
              </div>
            ))}
          </div>
          <div className="text-end mt-3">
            <button className="btn btn-outline-secondary btn-sm" onClick={() => setShowLocationPopup(false)}>Close</button>
          </div>
        </div>
      )}

      <div className="bg-light border-top">
        <div className="container-fluid d-flex justify-content-between py-2 px-3 small text-dark">
          <div className="d-flex gap-3">
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/movies')}>Movies</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/events')}>Events</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/plays')}>Plays</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/sports')}>Sports</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/activities')}>Activities</span>
          </div>
          <div className="d-flex gap-3">
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/listyourshow')} >ListYourShow</span>
            <span>Corporates</span>
            <span>Offers</span>
            <span>Gift Cards</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
