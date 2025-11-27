import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ViewState } from './types';
import MorphingBackground from './components/MorphingBackground';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Skills from './components/Skills';
import AIChat from './components/AIChat';
import CustomCursor from './components/CustomCursor';
import { Cpu } from 'lucide-react';
import ErrorBoundary from './components/ErrorBoundary';
import { InstallPWA } from './components/InstallPWA';

// Loading Component imitating backend startup
const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [lines, setLines] = useState<string[]>([]);
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    { text: "INITIALIZING_KERNEL...", delay: 400 },
    { text: "MOUNTING_VIRTUAL_DOM...", delay: 600 },
    { text: "CONNECTING_TO_REDIS_CACHE...", delay: 800 },
    { text: "ESTABLISHING_SECURE_HANDSHAKE...", delay: 500 },
    { text: "HYDRATING_UI_COMPONENTS...", delay: 700 },
    { text: "SYSTEM_READY.", delay: 300 }
  ];

  useEffect(() => {
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const processStep = () => {
      if (currentIndex >= steps.length) {
        timeoutId = setTimeout(onComplete, 800);
        return;
      }

      const step = steps[currentIndex];
      setLines(prev => {
        // Prevent duplicate lines if they already exist (extra safety for StrictMode)
        if (prev.includes(step.text)) return prev;
        return [...prev, step.text];
      });
      setActiveStep(currentIndex);

      currentIndex++;
      timeoutId = setTimeout(processStep, step.delay);
    };

    timeoutId = setTimeout(processStep, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#020005] text-neon-purple font-mono flex flex-col items-center justify-center p-10"
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-12">
          <div className="relative">
            <div className="absolute inset-0 animate-ping opacity-50 rounded-full bg-neon-violet h-16 w-16"></div>
            <Cpu size={64} className="relative z-10 text-white" />
          </div>
        </div>

        <div className="border border-white/10 bg-black/50 p-6 rounded-lg shadow-2xl shadow-neon-violet/20 min-h-[300px] flex flex-col">
          <div className="flex gap-2 mb-4 border-b border-white/10 pb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>

          <div className="space-y-2 flex-1">
            {lines.map((line, i) => (
              <div key={i} className="flex items-center gap-3 text-sm">
                <span className="text-gray-500">[{new Date().toLocaleTimeString()}]</span>
                <span className={i === steps.length - 1 ? "text-neon-fuchsia font-bold" : "text-indigo-300"}>
                  {line}
                </span>
                {i === activeStep && i !== steps.length - 1 && (
                  <span className="w-2 h-4 bg-neon-purple animate-pulse" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 h-1 w-full bg-white/10 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-violet to-neon-fuchsia"
              initial={{ width: "0%" }}
              animate={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

function App() {
  const [view, setView] = useState<ViewState>('hero');
  const [loading, setLoading] = useState(true);

  return (
    <>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <div className="relative w-full min-h-screen overflow-x-hidden overflow-y-auto font-sans text-white selection:bg-neon-violet selection:text-white">

          <CustomCursor />
          <InstallPWA />

          {/* The Background Visual */}
          <MorphingBackground view={view} />

          {/* Main Content Swapper */}
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              {view === 'hero' && (
                <motion.div
                  key="hero"
                  initial={{ opacity: 0, filter: 'blur(20px)', scale: 0.95 }}
                  animate={{ opacity: 1, filter: 'blur(0px)', scale: 1 }}
                  exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
                  transition={{ duration: 0.6 }}
                >
                  <Hero onNavigate={setView} />
                </motion.div>
              )}

              {view === 'projects' && (
                <motion.div
                  key="projects"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Projects />
                  </ErrorBoundary>
                </motion.div>
              )}

              {view === 'skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <Skills />
                  </ErrorBoundary>
                </motion.div>
              )}

              {view === 'contact' && (
                <motion.div
                  key="contact"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  transition={{ duration: 0.5 }}
                >
                  <ErrorBoundary>
                    <AIChat />
                  </ErrorBoundary>
                </motion.div>
              )}
            </AnimatePresence>
          </main>

          {/* Sticky Navigation */}
          <Navigation currentView={view} onChangeView={setView} />

          {/* Logo / Branding (Fixed) */}
          <div className="fixed top-6 left-6 z-50 mix-blend-exclusion">
            <span className="font-display font-bold text-xl tracking-tighter text-white">
              Antony Xavier<span className="text-neon-fuchsia">.DEV</span>
            </span>
          </div>

          {/* Social Links (Fixed) */}
          <div className="fixed top-6 right-6 z-50 flex gap-6 mix-blend-exclusion text-sm font-mono opacity-70">
            <a href="#" className="hover:text-neon-violet transition-colors">[LINKEDIN]</a>
            <a href="#" className="hover:text-neon-fuchsia transition-colors">[GITHUB]</a>
          </div>
        </div>
      )}
    </>
  );
}

export default App;