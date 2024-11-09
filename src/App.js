import React from 'react';
import { useState } from "react";
import { ThemeProvider } from "styled-components";
import AppRoutes from './AppRoutes';
import { lightTheme } from "./utils/Themes.js";

function App() {
  const [darkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? lightTheme : lightTheme}>
      <AppRoutes />
    </ThemeProvider>
  );
}

export default App;