import React, { useState, useEffect, Suspense, lazy } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ViewState } from "./types";
import MorphingBackground from "./components/MorphingBackground";
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

import { MessageCircle, Gamepad2 } from "lucide-react";
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
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto font-sans text-white selection:bg-neon-violet selection:text-white">
          {loadExtras && (
            <Suspense fallback={null}>
              <CustomCursor />
              <InstallPWA />
            </Suspense>
          )}

          {/* The Background Visual */}
          <MorphingBackground view={view} />

          {/* Main Content Swapper */}
          <main className="relative z-10 min-h-screen">
            <AnimatePresence mode="wait">
              {view === "hero" && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, filter: "blur(20px)", scale: 0.95 }}
                  animate={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
                  exit={{ opacity: 0, filter: "blur(10px)", scale: 1.05 }}
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
                    <Suspense fallback={<Loader variant="spinner" />}>
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
                    <Suspense fallback={<Loader variant="spinner" />}>
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
                    <Suspense fallback={<Loader variant="spinner" />}>
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
            className="fixed top-4 left-4 md:top-6 md:left-6 z-50 mix-blend-exclusion cursor-pointer"
            onClick={() => setView("hero")}
          >
            <span className="font-display font-bold text-lg md:text-xl tracking-tighter text-white">
              Antony Xavier<span className="text-neon-fuchsia">.DEV</span>
            </span>
          </div>

          {/* Social Links (Fixed) */}
          <div className="fixed top-4 right-4 md:top-6 md:right-6 z-50 flex gap-3 md:gap-6 mix-blend-exclusion text-xs md:text-sm font-mono opacity-80 md:opacity-70">
            <a
              href="https://xavi-003.github.io/blog/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors"
            >
              [BLOG]
            </a>
            <a
              href="https://www.linkedin.com/in/antony-xavier-4b5019333/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-violet transition-colors"
            >
              [LI]
            </a>
            <a
              href="https://github.com/Xavi-003/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neon-fuchsia transition-colors"
            >
              [GH]
            </a>
          </div>

          {/* Game Project Trigger */}
          <motion.button
            onClick={() =>
              window.open("https://xavi-003.github.io/mini_game/", "_blank")
            }
            aria-label="Play Mini Games Arcade"
            className="fixed bottom-24 right-4 md:bottom-6 md:right-24 z-50 p-2 md:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-neon-fuchsia hover:border-neon-fuchsia transition-all duration-300 group shadow-lg shadow-neon-fuchsia/10"
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
              <Gamepad2 size={24} aria-hidden="true" />
            </motion.div>
          </motion.button>

          {/* Chat Trigger (Fixed Bottom Right) - Hide on Contact page */}
          <AnimatePresence>
            {view !== "contact" && (
              <motion.button
                key="chat-trigger"
                onClick={() => setView("contact")}
                aria-label="Open AI Assistant Chat"
                className="fixed bottom-36 right-4 md:bottom-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-white hover:bg-neon-violet hover:border-neon-violet transition-all duration-300 group shadow-lg shadow-neon-violet/10"
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
                  <MessageCircle size={24} aria-hidden="true" />
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
