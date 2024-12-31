// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AppRoutes from './routes/routes'; // Import the routes file
import Login from './components/Login'; // Import the Login component
import AdminDashboard from './components/AdminDashboard';
import UserDashboard from './components/UserDashboard';
import Signup from './components/Signup';


function App() {
  const [userRole, setUserRole] = useState(null); // Tracks logged-in role

  const login = (role) => {
    setUserRole(role); // Set the logged-in role
  };

  const logout = () => {
    setUserRole(null); // Clear the role upon logout
  };

  return (
    <Router>
      <Routes>
        {/* Login and Signup Routes */}
        <Route path="/" element={<Login onLogin={login} />} />
        <Route path="/signup" element={<Signup />} />

        {/* Check if the user is logged in and redirect to the appropriate dashboard */}
        <Route 
          path="/admin-dashboard" 
          element={userRole === 'admin' ? <AdminDashboard onLogout={logout} /> : <Navigate to="/" />} 
        />
        <Route 
          path="/user-dashboard" 
          element={userRole === 'user' ? <UserDashboard onLogout={logout} /> : <Navigate to="/" />} 
        />

        {/* All routes handled within AppRoutes */}
        <Route path="/*" element={userRole ? <AppRoutes /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
