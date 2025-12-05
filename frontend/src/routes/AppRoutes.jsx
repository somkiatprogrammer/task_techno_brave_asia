import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import RequireAuth from '../hooks/RequireAuth';

import LoginPage from '../pages/Login/LoginPage';
import DashboardPage from '../pages/Dashboard/DashboardPage';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;