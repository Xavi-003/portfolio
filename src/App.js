// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import Header from './components/headers';
import Main from './components/main';
import SkillsSection from './components/SkillsSection';
import Footer from './components/footer';
import ThemeToggleButton from './components/theme'; // Theme toggle button

function App() {
  return (
    <ThemeProvider> {/* Wrapping the app with the ThemeProvider */}
      <div className="App d-flex flex-column min-vh-100">
        <Header />
        <Main />
        <SkillsSection/>
        <Footer />
        <ThemeToggleButton /> {/* Button to toggle theme */}
      </div>
    </ThemeProvider>
  );
}

export default App;
