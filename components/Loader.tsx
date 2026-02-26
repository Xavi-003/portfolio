import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Zap } from 'lucide-react';

interface LoaderProps {
  onComplete?: () => void;
  variant?: 'full' | 'spinner';
}

const Loader: React.FC<LoaderProps> = ({ onComplete, variant = 'full' }) => {
  const [activeStep, setActiveStep] = useState(0);



  const steps = [
    { text: "CORE_SEC_INIT", delay: 400 },
    { text: "VIRTUAL_DOM_MOUNT", delay: 600 },
    { text: "NET_STACK_READY", delay: 500 },
    { text: "PORTFOLIO_LOADED", delay: 300 }
  ];

  useEffect(() => {
    if (variant === 'spinner') return;

    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const processStep = () => {
      if (currentIndex >= steps.length) {
        if (onComplete) timeoutId = setTimeout(onComplete, 600);
        return;
      }
      setActiveStep(currentIndex);
      currentIndex++;
      timeoutId = setTimeout(processStep, steps[currentIndex - 1].delay);
    };

    timeoutId = setTimeout(processStep, 100);
    return () => clearTimeout(timeoutId);
  }, [onComplete, variant]);

  if (variant === 'spinner') {
    return createPortal(
      <div className="fixed inset-0 z-[40] flex flex-col items-center justify-center p-8 bg-[#05010a]/80 backdrop-blur-sm pointer-events-none">
        <div className="relative flex items-center justify-center pointer-events-auto">
          {/* Outer Glow */}
          <motion.div
            className="absolute inset-0 rounded-full bg-neon-violet/30 blur-3xl"
            animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0.8, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Main Hexagon SVG */}
          <svg className="w-32 h-32 md:w-48 md:h-48 drop-shadow-[0_0_20px_rgba(232,121,249,0.6)] relative z-10" viewBox="0 0 100 100">
            <defs>
              <linearGradient id="hex-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7c3aed" /> {/* violet */}
                <stop offset="50%" stopColor="#d946ef" /> {/* glow */}
                <stop offset="100%" stopColor="#e879f9" /> {/* fuchsia */}
              </linearGradient>
            </defs>

            {/* Background Track Hexagon */}
            <polygon
              points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
              fill="rgba(124, 58, 237, 0.1)"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              strokeLinejoin="round"
            />

            {/* Animated Loading Hexagon */}
            <motion.polygon
              points="50 3, 93 25, 93 75, 50 97, 7 75, 7 25"
              fill="none"
              stroke="url(#hex-gradient)"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{
                pathLength: [0, 1, 0],
                pathOffset: [0, 1, 1]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            />

            {/* Inner Pulsing Core */}
            <motion.polygon
              points="50 25, 72 37, 72 63, 50 75, 28 63, 28 37"
              fill="url(#hex-gradient)"
              className="mix-blend-screen"
              animate={{
                scale: [0.8, 1.1, 0.8],
                opacity: [0.3, 0.9, 0.3],
                rotate: [0, 60, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{ transformOrigin: "50px 50px" }}
            />

            {/* Web-Dev Refinement: Center Symbols */}
            <text
              x="50"
              y="58"
              textAnchor="middle"
              className="fill-white font-mono font-bold text-[18px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]"
              style={{ userSelect: 'none' }}
            >
              &lt;/&gt;
            </text>
          </svg>
        </div>
      </div>,
      document.body
    );
  }

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-[#05010a] flex flex-col items-center justify-center p-6 sm:p-10"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(20px)' }}
      transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }}
    >
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-violet/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="w-full max-w-sm relative z-10">
        <div className="flex justify-center mb-16">
          <div className="relative group">
            <motion.div
              className="absolute -inset-8 rounded-full bg-gradient-to-tr from-neon-violet to-neon-fuchsia opacity-20 blur-3xl"
              animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative p-8 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl shadow-[0_0_50px_rgba(124,58,237,0.15)] overflow-hidden">
              {/* Internal Scanning Light */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent w-full skew-x-12 translate-x-[-200%]"
                animate={{ translateX: ['200%', '-200%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              <Cpu size={56} className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] relative z-10" />
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="flex flex-col items-center gap-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
                className="flex items-center gap-4 py-1 px-4 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-neon-fuchsia shadow-[0_0_8px_#e879f9] animate-pulse" />
                <span className="text-[10px] font-mono tracking-[0.2em] text-neon-fuchsia font-bold uppercase">
                  {steps[activeStep].text}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative h-1.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/10 p-[1px]">
            <motion.div
              className="h-full bg-gradient-to-r from-neon-violet via-neon-fuchsia to-neon-violet bg-[length:200%_100%] rounded-full shadow-[0_0_15px_rgba(124,58,237,0.5)]"
              animate={{
                width: `${((activeStep + 1) / steps.length) * 100}%`,
                backgroundPosition: ['0% 0%', '100% 0%']
              }}
              transition={{
                width: { type: 'spring', stiffness: 40, damping: 15 },
                backgroundPosition: { duration: 3, repeat: Infinity, ease: 'linear' }
              }}
            />
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex gap-2">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 h-3 bg-white/10 rounded-sm"
                  animate={{ opacity: i <= activeStep ? 1 : 0.2, backgroundColor: i <= activeStep ? '#7c3aed' : '#ffffff1a' }}
                />
              ))}
            </div>
            <span className="text-[12px] font-mono text-white tracking-widest font-bold tabular-nums">
              <span className="text-white/40">LOAD_STAT:</span> {Math.round(((activeStep + 1) / steps.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Loader;

