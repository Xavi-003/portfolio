import React from 'react';
import { useTheme } from '../context/ThemeContext'; // Import useTheme hook

function Footer() {
  const { theme } = useTheme(); // Access the current theme
  const currentYear = new Date().getFullYear(); // Get the current year

  // Dynamically set the background and text color based on the theme
  return (
    <footer
      className={`text-center ${theme === 'dark' ? 'bg-dark text-white' : 'bg-light text-dark'}`}
    >

      <p>
        <a
          href="https://github.com/Xavi-003"
          className={`text-${theme === 'dark' ? 'white' : 'dark'}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fab fa-github"></i> GitHub
        </a>
      </p>
      <p>
        <i className="fas fa-copyright"></i> ©  {currentYear}
        <span className={`text-${theme === 'dark' ? 'white' : 'dark'}`}> Antony Xavier</span>
      </p>
    </footer>
  );
}

export default Footer;
