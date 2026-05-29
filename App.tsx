import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ViewState } from "./types";
import MorphingBackground from "./components/MorphingBackground";
import ParticlesBackground from "./components/ParticlesBackground";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";

// ⚡ Bolt Optimization: Lazy load heavy components to reduce initial bundle size
// This splits the code into separate chunks, improving initial load time
const Projects = lazy(() => import("./components/Projects"));
const Skills = lazy(() => import("./components/Skills"));
const AIChat = lazy(() => import("./components/AIChat"));
const CustomCursor = lazy(() => import("./components/CustomCursor"));
const InstallPWA = lazy(() =>
  import("./components/InstallPWA").then((module) => ({
    default: module.InstallPWA,
  })),
);

import { MessageCircle, Gamepad2, Github, Linkedin, BookOpen } from "lucide-react";
import ErrorBoundary from "./components/ErrorBoundary";

import Loader from "./components/Loader";

function App() {
  const [view, setView] = useState<ViewState>("hero");
  const [loading, setLoading] = useState(true);
  const [loadExtras, setLoadExtras] = useState(false);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setLoadExtras(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  // Dynamic Favicon Color Cycling
  useEffect(() => {
    const colors = [
      '#ff0000', // Red
      '#ff7f00', // Orange
      '#ffff00', // Yellow
      '#00ff00', // Green
      '#0000ff', // Blue
      '#4b0082', // Indigo
      '#9400d3', // Violet
      '#7c3aed',
      '#e879f9',
      '#fbbf24',
      '#2dd4bf',
      '#38bdf8',
      '#22d3ee',
      '#34d399',
      '#fb7185'
    ];
    let colorIndex = 0;

    const interval = setInterval(() => {
      const favicon = document.getElementById('favicon') as HTMLLinkElement;
      if (favicon) {
        colorIndex = (colorIndex + 1) % colors.length;
        const color = colors[colorIndex];
        
        // Generate SVG string with new stroke color (transparent fill)
        const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <path d="M 40 25 L 15 50 L 40 75" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 60 25 L 85 50 L 60 75" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M 55 15 L 45 85" fill="none" stroke="${color}" stroke-width="14" stroke-linecap="round" />
</svg>`;
        
        // Convert to data URI and update href
        favicon.href = 'data:image/svg+xml;utf8,' + encodeURIComponent(svgString);
        
        // Update Theme Color for mobile browser UI
        const themeMeta = document.querySelector('meta[name="theme-color"]');
        if (themeMeta) {
          themeMeta.setAttribute('content', color);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full min-h-screen overflow-x-hidden lg:overflow-y-hidden overflow-y-auto font-sans text-white selection:bg-neon-violet selection:text-white">
          {loadExtras && (
            <Suspense fallback={null}>
              <CustomCursor />
              <InstallPWA />
            </Suspense>
          )}

          {/* The Background Visuals */}
          <ParticlesBackground />
          <MorphingBackground view={view} />

          {/* Main Content Swapper */}
          <main className="relative z-10 min-h-screen">
            <AnimatePresence mode="wait">
              {view === "hero" && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Hero onNavigate={setView} />
                </motion.div>
              )}

              {view === "projects" && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Suspense fallback={null}>
                      <Projects />
                    </Suspense>
                  </ErrorBoundary>
                </motion.div>
              )}

              {view === "skills" && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Suspense fallback={null}>
                      <Skills />
                    </Suspense>
                  </ErrorBoundary>
                </motion.div>
              )}

              {view === "contact" && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Suspense fallback={null}>
                      <AIChat />
                    </Suspense>
                  </ErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Sticky Navigation */}
          <Navigation currentView={view} onChangeView={setView} />

          {/* Logo / Branding (Fixed) */}
          <div
            className="fixed top-4 left-4 md:top-6 md:left-6 z-50 cursor-pointer group"
            onClick={() => setView("hero")}
          >
            <div className="relative flex items-center gap-2 px-3 py-1.5 rounded-full bg-neon-dark/50 backdrop-blur-md border animate-glow-cycle-logo transition-all duration-300">
              <span className="font-display font-extrabold text-sm md:text-base tracking-wide flex items-center">
                {"Antony Xavier".split("").map((char, index) => (
                  <span
                    key={index}
                    style={{ animationDelay: `${index * -0.15}s` }}
                    className="animate-char-glow inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </span>
              <span className="text-[10px] md:text-xs px-1.5 py-0.5 rounded bg-white/5 border border-current text-current font-mono font-bold transition-all duration-300">
                DEV
              </span>
            </div>
          </div>




          {/* Social Links (Fixed) */}
          <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-2 md:gap-3">
            <a
              href="https://xavi-003.github.io/blog/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View Blog"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-amber-500/10 backdrop-blur-md border border-amber-500/30 text-amber-400 hover:bg-amber-400 hover:text-black hover:border-amber-400 hover:shadow-[0_0_20px_rgba(251,191,36,0.5)] transition-all duration-300 cursor-pointer"
            >
              <BookOpen size={18} />
            </a>
            <a
              href="https://www.linkedin.com/in/antony-xavier-4b5019333/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View LinkedIn Profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-sky-500/10 backdrop-blur-md border border-sky-500/30 text-sky-400 hover:bg-sky-400 hover:text-white hover:border-sky-400 hover:shadow-[0_0_20px_rgba(56,189,248,0.5)] transition-all duration-300 cursor-pointer"
            >
              <Linkedin size={18} />
            </a>
            <a
              href="https://github.com/Xavi-003/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="View GitHub Profile"
              className="w-9 h-9 md:w-10 md:h-10 rounded-full flex items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white hover:text-black hover:border-white hover:shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 cursor-pointer"
            >
              <Github size={18} />
            </a>
          </div>




          {/* Game Project Trigger */}
          <motion.button
            onClick={() =>
              window.open("https://xavi-003.github.io/mini_game/", "_blank")
            }
            aria-label="Play Mini Games Arcade"
            className="fixed bottom-24 right-4 md:bottom-6 md:right-24 z-50 p-2.5 md:p-3.5 rounded-full backdrop-blur-md border transition-all duration-300 group cursor-pointer animate-glow-cycle-game hover:bg-neon-fuchsia hover:text-white hover:border-neon-fuchsia hover:shadow-[0_0_25px_rgba(232,121,249,0.5)]"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1 }}
          >
            <motion.div
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                repeatDelay: 1,
                ease: "easeInOut",
              }}
            >
              <Gamepad2 size={22} aria-hidden="true" />
            </motion.div>
          </motion.button>

          {/* Chat Trigger (Fixed Bottom Right) - Hide on Contact page */}
          <AnimatePresence>
            {view !== "contact" && (
              <motion.button
                key="chat-trigger"
                onClick={() => setView("contact")}
                aria-label="Open AI Assistant Chat"
                className="fixed bottom-36 right-4 md:bottom-6 md:right-6 z-50 p-2.5 md:p-3.5 rounded-full backdrop-blur-md border transition-all duration-300 group cursor-pointer animate-glow-cycle-chat hover:bg-neon-violet hover:text-white hover:border-neon-violet hover:shadow-[0_0_25px_rgba(124,58,237,0.5)]"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, x: 20, scale: 0 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                transition={{ delay: 1 }}
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <MessageCircle size={22} aria-hidden="true" />
                </motion.div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}
    </>
  );
}

export default App;
