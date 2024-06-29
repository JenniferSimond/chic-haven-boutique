// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { getAdminToken } from '../shared/adminAuth';



const ProtectedRoute = ({ children }) => {
 const token = getAdminToken()

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
