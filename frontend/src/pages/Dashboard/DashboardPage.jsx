import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import appConfig from "../../config/appConfig";

import Header from '../../components/layouts/Header';
import Footer from '../../components/layouts/Footer';

function DashboardPage() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleClick = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(appConfig.apiBaseUrl + '/logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error');
      }

      const data = await response.json();
      console.log('Logout successful:', data);
      localStorage.removeItem('authToken');

      navigate('/login');

    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div class="container">
      <div class="default-box">
        <div>
          <span class="bold">Welcome back, user!</span>
          <span class="f-right"><a onClick={handleClick} class="btn">Logout</a></span>
        </div>
        
      </div>
    </div>
  );
}

export default DashboardPage;