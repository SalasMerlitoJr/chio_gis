import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import BarangayDashboard from './pages/BarangayDashboard';
import Users from './pages/Users';
import CityDashboard from './pages/CityDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: 20 }}>
        <h2 style={{ textAlign: 'center' }}>City Health Insurance Office - Geographical Information System</h2>
        <nav>
          <Link to='/'>Home</Link>{" | "}
          <Link to='/city-dashboard'>City Dashboard</Link>{" | "}
          <Link to='/barangay/1'>Barangay Dashboard</Link>{" | "}
          <Link to='/users'>Users</Link>{" | "}
          
        </nav>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/barangay/:id' element={<BarangayDashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/city-dashboard' element={<CityDashboard />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}