import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import './config/FirebaseConfig';
function App() {
  return (
    <AppRoutes />
  );
}

export default App;