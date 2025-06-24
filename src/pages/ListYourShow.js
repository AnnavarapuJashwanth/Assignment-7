import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';
import './ListYourShow.css';

const ListYourShow = () => {
  const hostItems = [
    'Performances',
    'Experiences',
    'Expositions',
    'Parties',
    'Sports',
    'Conferences'
  ];

  const serviceItems = [
    'Online Sales & Marketing',
    'Pricing',
    'Food & Beverages',
    'On ground support',
    'Reports & Insights',
    'POS & More'
  ];

  const iconClassMap = {
    'Performances': 'bi-music-note-beamed',
    'Experiences': 'bi-stars',
    'Expositions': 'bi-book',
    'Parties': 'bi-balloon',
    'Sports': 'bi-trophy',
    'Conferences': 'bi-mic',

    'Online Sales & Marketing': 'bi-graph-up-arrow',
    'Pricing': 'bi-currency-rupee',
    'Food & Beverages': 'bi-cup-straw',
    'On ground support': 'bi-people',
    'Reports & Insights': 'bi-bar-chart-line',
    'POS & More': 'bi-phone'
  };

  return (
    <div className="list-your-show">
      {/* Carousel Section */}
      <Carousel fade>
        <Carousel.Item>
          <img
            className="d-block w-80 carousel-img"
            src="https://www.linkedhelper.com/blog/wp-content/uploads/2024/05/linkedhelper_carousel_amusment_park_realistic_with_pony_funny_7f5dd56e-e21b-4ee3-879d-cdef0b65e009_1.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">Ticket scanning made easy</h3>
            <p className="animate__animated animate__fadeInUp">Experience the ease of managing entry at an event.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://static2.tripoto.com/media/filter/tst/img/1032035/TripDocument/1542265222_buddha_statue1.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">M-ticket Feature</h3>
            <p className="animate__animated animate__fadeInUp">Skip the queue and go directly to the gate.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 carousel-img"
            src="https://images.unsplash.com/photo-1561424412-6c2125ecb1cc?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGNhcm91c2VsfGVufDB8fDB8fHww"
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3 className="animate__animated animate__fadeInDown">Manage Shows Effortlessly</h3>
            <p className="animate__animated animate__fadeInUp">We help with end-to-end event hosting solutions.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      {/* Host Options */}
      <section className="text-center mt-6 container">
        <h2 className="fw-bold">What can you host?</h2>
        <p className="mb-4">
          As the purveyor of entertainment, BookMyShow enables your event with end to end solutions
          from the time you register to the completion of the event.
        </p>
        <div className="row g-6 justify-content-center">
          {hostItems.map((item, index) => (
            <div className="col-md-4 col-5" key={index}>
              <div className="host-box p-5 shadow-sm rounded text-center hover-zoom">
                <i className={`bi ${iconClassMap[item]} display-5 mb-2`}></i>
                <h6>{item}</h6>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services Offered */}
      <section className="text-center mt-5 container">
        <h2 className="fw-bold">What are the services we offer?</h2>
        <p className="mb-4">
          After successful collaborations with the best event organisers, we’re ready to bring your
          vision to life.
        </p>
        <div className="row g-3 justify-content-center">
          {serviceItems.map((item, index) => (
            <div className="col-md-4 col-5" key={index}>
              <div className="service-box p-5 shadow-sm rounded text-center hover-zoom bg-light-pink">
                <i className={`bi ${iconClassMap[item]} display-5 mb-2`}></i>
                <h6>{item}</h6>
              </div>
            </div>
          ))}
        </div>
        <button className="btn btn-danger mt-4 animate__animated animate__pulse animate__infinite">List your show</button>
      </section>
    </div>
  );
};

export default ListYourShow;
