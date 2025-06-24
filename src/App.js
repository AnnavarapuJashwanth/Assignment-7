import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Movies from './pages/Movies';
import EventsPage from './pages/EventsPage';
import EventsDetails from './pages/EventsDetails';
import PlaysPage from './pages/PlaysPage';
import Sports from './pages/Sports';
import Activities from './pages/Activities';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Footer from './components/Footer';
import MovieDetails from './pages/MovieDetails';
import TicketBooking from './pages/TicketBooking';
import SeatSelection from './pages/SeatSelection';
import BookingConfirmation from './pages/BookingConfirmation';
import ListYourShow from './pages/ListYourShow';
import MyTickets from './pages/MyTickets';
import VenueSelection from './pages/VenueSelection';
import TicketOptions from './pages/TicketOptions';
import ConfirmationScreen from './pages/ConfirmationScreen';
import Faq from './pages/Faq';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Help from './pages/Help';
import PlaysDetails from './components/Plays/PlaysDetails';
import TicketDetails from './components/Plays/TicketDetails';
import Confirmation from './components/Plays/Confirmation';
import PlaysVenueSelection from './components/Plays/PlaysVenueSelection';
import PlaysSeatSelection from './components/Plays/PlaysSeatSelection';
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventsDetails />} />
        <Route path="/plays" element={<PlaysPage />} />
        <Route path="/plays/:id" element={<PlaysDetails />} />
        <Route path="/sports" element={<Sports />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tickets/:id" element={<TicketBooking />} />
        <Route path="/plays/:id/seats" element={<PlaysSeatSelection />} />
        <Route path="/plays/:id/venue" element={<PlaysVenueSelection />} />  
         <Route path="/plays/:id/ticket-details" element={<TicketDetails />} />
            <Route path="/confirmation" element={<Confirmation />} />
<Route path="/tickets/:id/seat/:theatreId" element={<SeatSelection />} />
<Route path="/tickets/:id/seat/:theatreId/confirm" element={<BookingConfirmation />} />
<Route path="/listyourshow" element={<ListYourShow/>} />
<Route path="/tickets" element={<MyTickets />} />
<Route path="/events/:id/venue" element={<VenueSelection />} />
<Route path="/events/:id/tickets" element={<TicketOptions />} />
<Route path="/tickets/:id/event/confirm" element={<ConfirmationScreen />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/help" element={<Help />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
