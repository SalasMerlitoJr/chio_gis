import React from 'react';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import BarangayDashboard from './pages/BarangayDashboard';
import Users from './pages/Users';
export default function App(){
  return (
    <BrowserRouter>
      <div style={{padding:20}}>
        <h2>Health GIS - City</h2>
        <nav><Link to='/'>Home</Link>{" | "}<Link to='/barangay/1'>Barangay Dashboard</Link>{" | "}<Link to='/users'>Users</Link></nav>
        <Routes>
          <Route path='/' element={<Dashboard/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/barangay/:id' element={<BarangayDashboard/>} />
          <Route path='/users' element={<Users/>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
