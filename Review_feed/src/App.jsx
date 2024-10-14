// src/App.jsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import UserFeedback from './pages/UserFeedback';
import ServiceProviderDashboard from "./pages/ServiceProvider";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <nav>
          <ul className="nav nav-pills mb-4">
            <li className="nav-item">
              <Link to="/" className="nav-link">User Feedback</Link>
            </li>
            <li className="nav-item">
              <Link to="/service-provider" className="nav-link">Service Provider Dashboard</Link>
            </li>
          </ul>
        </nav>
        
        <Routes>
          <Route path="/" element={<UserFeedback />} />
          <Route path="/service-provider" element={<ServiceProviderDashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
