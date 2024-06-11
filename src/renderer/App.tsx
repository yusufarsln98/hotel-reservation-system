import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';

import './App.css';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home-page" element={<Home />} />
      </Routes>
    </Router>
  );
}
