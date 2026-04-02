// Styles
import './index.css';
import './styles.css';

import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ServiceDetails from './pages/ServiceDetails';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/services/:id" element={<ServiceDetails />} />
    </Routes>
  );
}
