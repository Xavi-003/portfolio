// src/App.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import Header from './components/headers';
import Main from './components/main';
import SkillsSection from './components/SkillsSection';
import KnowledgeSection from './components/KnowledgeSection';
import ProjectsSection from './components/ProjectsSection'
import Footer from './components/footer';
import ContactSection from './components/ContactSection'
import ThemeToggleButton from './components/theme'; // Theme toggle button

function App() {
  return (
    <ThemeProvider> {/* Wrapping the app with the ThemeProvider */}
      <div className="App d-flex flex-column">
        <Header />
        <Main />
        <SkillsSection />
        <KnowledgeSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <ThemeToggleButton /> {/* Button to toggle theme */}
      </div>
    </ThemeProvider>
  );
}

export default App;
