import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './pages/Login';

import './App.css';
import AppLayout from './layout/AppLayout';
import Reservations from './pages/Reservations';
import Guests from './pages/Guests';
import Rooms from './pages/Rooms';
import Staff from './pages/Staff';
import Services from './pages/Services';
import ReservationService from './pages/ReservationService';
import PriceChangeLog from './pages/PriceChangeLog';
import Payments from './pages/Payments';
import AvailableRooms from './pages/AvailableRooms';
import GuestReservations from './pages/GuestReservations';
import RoomsWithReservations from './pages/RoomsWithReservations';
import GuestsWithReservations from './pages/GuestsWithReservations';
import WalkInReservation from './pages/WalkInReservation';
import CurrentGuests from './pages/CurrentGuests';
import ServicesRevenue from './pages/ServicesRevenue';
import ReservationDetails from './pages/ReservationDetails';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<AppLayout />}>
          <Route path="reservations" element={<Reservations />} />
          <Route path="guests" element={<Guests />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="staff" element={<Staff />} />
          <Route path="services" element={<Services />} />
          <Route path="reservation-service" element={<ReservationService />} />
          <Route path="price-change-log" element={<PriceChangeLog />} />
          <Route path="payments" element={<Payments />} />
          <Route path="available-rooms" element={<AvailableRooms />} />
          <Route path="guest-reservations" element={<GuestReservations />} />
          <Route
            path="rooms-with-reservations"
            element={<RoomsWithReservations />}
          />
          <Route
            path="guests-with-reservations"
            element={<GuestsWithReservations />}
          />
          <Route path="current-guests" element={<CurrentGuests />} />
          <Route path="walk-in-reservation" element={<WalkInReservation />} />
          {/* services-revenue */}
          <Route path="services-revenue" element={<ServicesRevenue />} />
          <Route path="reservation-details" element={<ReservationDetails />} />
          <Route
            path="*"
            element={
              <div>
                <h1>404</h1>
                <Link to="/reservations">Go Reservations</Link>
              </div>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default function App() {
  return <AppRouter />;
}
