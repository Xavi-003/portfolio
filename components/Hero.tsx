import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal } from 'lucide-react';
import { ViewState } from '../types';
import NetworkBackground from './NetworkBackground';

interface HeroProps {
  onNavigate: (view: ViewState) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const [text, setText] = useState('');
  const fullText = "Architecting The Future";
  const [isTyping, setIsTyping] = useState(true);

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
      {/* Background System Animation */}
      <div className="absolute inset-0 z-0">
        <NetworkBackground />
      </div>

      {/* Readability Overlay: Radial gradient darkens the center for text while keeping edges bright */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(5,1,10,0.75)_0%,rgba(5,1,10,0.4)_45%,transparent_100%)]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-5xl relative z-20"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 border border-white/10 mb-8 backdrop-blur-md shadow-lg shadow-neon-purple/10"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-purple opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-fuchsia"></span>
          </span>
          <span className="text-xs font-mono text-neon-fuchsia tracking-widest uppercase font-bold">Senior Full Stack Developer</span>
        </motion.div>

        {/* Main Title with Typing Effect */}
        <div className="min-h-[80px] md:min-h-[128px] mb-6 flex items-center justify-center">
          <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-purple-200 flex items-center drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "linear"
              }}
              className="inline-block w-2 h-10 md:w-4 md:h-20 bg-neon-purple ml-2 shadow-[0_0_15px_rgba(176,38,255,0.8)] align-middle"
            />
          </h1>
        </div>

        <motion.p
          className="text-lg md:text-xl text-indigo-100 max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-md font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          Designing high-performance distributed systems and fluid user interfaces.
          <br />Specializing in <span className="text-neon-fuchsia font-bold">React</span>, <span className="text-neon-violet font-bold">Node.js</span>, and <span className="text-white font-bold">Cloud Native</span> Architecture.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4 }}
        >
          <button
            onClick={() => onNavigate('projects')}
            className="group relative px-8 py-4 bg-white text-black font-bold rounded-full overflow-hidden flex items-center gap-2 transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.5)] z-30"
          >
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="relative z-10 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={() => onNavigate('contact')}
            className="px-8 py-4 border border-white/20 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 hover:border-neon-purple/50 transition-all text-white hover:text-neon-purple shadow-lg flex items-center gap-2 z-30"
          >
            <Terminal size={18} />
            <span>Execute Protocol</span>
          </button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;