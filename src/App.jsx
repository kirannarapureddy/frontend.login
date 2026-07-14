
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Registration from './registration/registration';
import Login from './login/login';
import Dashboard from './dashboard/dashboard'; // 👈 Make sure this matches the newly renamed file!

function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to login or register */}
        <Route path="/" element={<Navigate to="/register" />} />
        
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
