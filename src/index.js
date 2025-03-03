import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthProvider } from './contexts/AuthContext'; // Adjust the path as necessary
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
      <App />
  </AuthProvider>
);