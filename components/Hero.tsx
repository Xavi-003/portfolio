import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Terminal, FileText } from "lucide-react";
import { ViewState } from "../types";

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const fullText = "Architecting The Future";
  const [isTyping, setIsTyping] = useState(true);

  const getCharGradient = (index: number) => {
    const gradients = [
      'from-cyan-400 to-blue-500',
      'from-fuchsia-400 to-pink-500',
      'from-violet-400 to-purple-600',
      'from-emerald-400 to-teal-500',
      'from-amber-400 to-orange-500',
      'from-rose-400 to-red-500',
      'from-teal-400 to-cyan-500',
      'from-sky-400 to-indigo-500'
    ];
    return gradients[index % gradients.length];
  };

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i + 1));
      i++;
      if (i === fullText.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, 70);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center text-center px-4 relative z-10 overflow-hidden">
      {/* High-Performance Ambient Glowing Orbs (No CSS Blur, purely radial gradients) */}
      <motion.div 
        className="absolute top-[-10%] left-[-5%] w-[40rem] h-[40rem] md:w-[60rem] md:h-[60rem] rounded-full pointer-events-none z-[5]"
        style={{ 
          background: "radial-gradient(circle, rgba(124,58,237,0.15) 0%, transparent 60%)",
          willChange: "transform"
        }}
        animate={{ 
          x: [0, 40, 0], 
          y: [0, -30, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-[-10%] right-[-5%] w-[35rem] h-[35rem] md:w-[55rem] md:h-[55rem] rounded-full pointer-events-none z-[5]"
        style={{ 
          background: "radial-gradient(circle, rgba(217,70,239,0.12) 0%, transparent 60%)",
          willChange: "transform"
        }}
        animate={{ 
          x: [0, -30, 0], 
          y: [0, 40, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Readability Overlay: Radial gradient darkens the center for text while keeping edges bright */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(5,1,10,0.75)_0%,rgba(5,1,10,0.4)_45%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl relative z-20 w-full"
      >
        <motion.div
          animate={{ y: [-4, 4, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{ willChange: "transform" }}
          className="flex flex-col items-center w-full"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 mb-4 sm:mb-8 backdrop-blur-md shadow-lg shadow-neon-purple/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-fuchsia"></span>
            </span>
            <span className="text-xs font-mono text-neon-fuchsia tracking-widest uppercase font-bold">
              Senior Full Stack Developer
            </span>
          </motion.div>

          {/* Main Title with Typing Effect */}
          <div className="min-h-[120px] sm:min-h-[160px] md:min-h-[256px] mb-4 sm:mb-6 flex flex-col justify-center items-center px-2">
            <h1 className="text-4xl sm:text-5xl md:text-8xl font-display font-bold leading-tight tracking-tighter flex flex-col justify-center items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] text-center">
              {/* Line 1: Architecting */}
              <div className="flex items-center justify-center flex-wrap">
                {text.slice(0, 12).split('').map((char, index) => (
                  <span key={index} className={`bg-clip-text text-transparent bg-gradient-to-r ${getCharGradient(index)}`}>
                    {char}
                  </span>
                ))}
                {text.length <= 12 && (
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                    className="inline-block w-1.5 h-8 md:w-3.5 md:h-16 bg-neon-purple ml-1 shadow-[0_0_12px_rgba(176,38,255,0.8)] align-middle shrink-0"
                  />
                )}
              </div>

              {/* Line 2: The Future */}
              {text.length > 12 && (
                <div className="flex items-center justify-center flex-wrap mt-1 md:mt-3">
                  {text.slice(12).split('').map((char, index) => (
                    <span key={index} className={`bg-clip-text text-transparent bg-gradient-to-r ${getCharGradient(index + 12)}`}>
                      {char === ' ' ? '\u00A0' : char}
                    </span>
                  ))}
                  <motion.span
                    aria-hidden="true"
                    animate={{ opacity: [1, 0] }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "linear",
                    }}
                    className="inline-block w-1.5 h-8 md:w-3.5 md:h-16 bg-neon-purple ml-1 shadow-[0_0_12px_rgba(176,38,255,0.8)] align-middle shrink-0"
                  />
                </div>
              )}
            </h1>
          </div>

          <motion.p
            className="text-sm sm:text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed drop-shadow-md font-medium px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Designing high-performance distributed systems and fluid user
            interfaces.
            <br className="hidden sm:block" />
            Specializing in{" "}
            <span className="text-neon-fuchsia font-bold">React</span>,{" "}
            <span className="text-neon-violet font-bold">Node.js</span>, and{" "}
            <span className="text-white font-bold">Cloud Native</span>{" "}
            Architecture.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 w-full"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
          >
            <button
              onClick={() => onNavigate("projects")}
              className="group w-full sm:w-auto justify-center relative px-8 py-2.5 sm:py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] z-30"
            >
              <span className="relative z-10 text-black font-bold">
                View Projects
              </span>
              <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="w-full sm:w-auto justify-center px-8 py-2.5 sm:py-4 border border-white/20 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 hover:border-neon-purple/50 transition-all text-white hover:text-neon-purple shadow-lg flex items-center gap-2 z-30"
            >
              <Terminal size={18} />
              <span>Execute Protocol</span>
            </button>

            <a
              href="/portfolio/resume.pdf"
              download="Antony_Xavier_Resume.pdf"
              className="w-full sm:w-auto justify-center px-8 py-2.5 sm:py-4 border border-white/20 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 hover:border-amber-400/50 transition-all text-white hover:text-amber-400 shadow-lg flex items-center gap-2 z-30"
            >
              <FileText size={18} />
              <span>Download Resume</span>
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
