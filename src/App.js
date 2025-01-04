import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext'; // Import ThemeProvider
import Header from './components/headers';
import Main from './components/main';
import SkillsSection from './components/SkillsSection';
import KnowledgeSection from './components/KnowledgeSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/footer';
import ContactSection from './components/ContactSection';
import ThemeToggleButton from './components/theme'; // Theme toggle button
function App() {

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <ThemeProvider> {/* Wrapping the app with the ThemeProvider */}
      <div className={`App d-flex flex-column bg-${'dark'}`}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }} // Triggers animation when 50% of the section is in view
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <Header />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }} // Triggers every time this section is in view
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <Main />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }} // Adjust the amount to change trigger sensitivity
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <SkillsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <motion.ul animate={{ rotate: 360 }} >
          <KnowledgeSection  whileHover={{ scale: 1.1 }}/>
          </motion.ul>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <ProjectsSection />
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.5 }}
          transition={{ duration: 1 }}
          variants={sectionVariants}
        >
          <ContactSection />
        </motion.div>

        <Footer />
        <ThemeToggleButton /> {/* Button to toggle theme */}
      </div>
    </ThemeProvider>
  );
}

export default App;
