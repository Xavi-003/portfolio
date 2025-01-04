import React from 'react';
import { motion } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider } from './context/ThemeContext';
import Header from './components/Header';
import Main from './components/Main';
import SkillsSection from './components/SkillsSection';
import KnowledgeSection from './components/KnowledgeSection';
import ProjectsSection from './components/ProjectsSection';
import Footer from './components/Footer';
import ContactSection from './components/ContactSection';
import ThemeToggleButton from './components/ThemeToggleButton';

function App() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className='bg-dark'>
        <ThemeProvider>
          <div className="App d-flex flex-column">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1 }}
              variants={sectionVariants}
            >
              <Header />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
              transition={{ duration: 1 }}
              variants={sectionVariants}
            >
              <Main />
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ amount: 0.5 }}
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
              <KnowledgeSection />
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
            <ThemeToggleButton />
          </div>
        </ThemeProvider>
    </div>
  );
}

export default App;
