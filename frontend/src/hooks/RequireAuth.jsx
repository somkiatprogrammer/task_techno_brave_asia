import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const isAuthenticated = localStorage.getItem('authToken');

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? children : <Outlet />;
};

export default RequireAuth;