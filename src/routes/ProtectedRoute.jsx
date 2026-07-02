import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  const location = useLocation();

  if (!user) {
    // Preserving route target layout structure to inject after authorization redirects finish
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};