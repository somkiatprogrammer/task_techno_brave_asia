import React, { useState } from 'react';
import LoginForm from './LoginForm';

function LoginPage() {
  return (
    <div class="container">
      <div className="login-box">
        <h2>Login</h2>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;