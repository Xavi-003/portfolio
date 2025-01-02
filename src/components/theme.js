// src/components/ThemeToggleButton.js
import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import the useTheme hook

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme(); // Access theme and toggle function

  return (
    <button 
      className="btn btn-secondary position-fixed bottom-0 end-0 mb-3 me-3" 
      onClick={toggleTheme}
    >
      {theme === 'dark' ? 'Switch to Light' : 'Switch to Dark'}
    </button>
  );
}

export default ThemeToggleButton;
