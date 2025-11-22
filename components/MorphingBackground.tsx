import React from 'react';
import { motion } from 'framer-motion';
import { ViewState } from '../types';

interface MorphingBackgroundProps {
  view: ViewState;
}

const variants = {
  hero: {
    scale: 1,
    rotate: 0,
    borderRadius: ["60% 40% 30% 70% / 60% 30% 70% 40%", "30% 60% 70% 40% / 50% 60% 30% 60%"],
    backgroundColor: "#581c87", // Purple 900
    x: 0,
    y: 0,
    width: '45vw',
    height: '45vw',
    filter: "blur(90px)",
  },
  projects: {
    scale: 1.2,
    rotate: 45,
    borderRadius: "20%",
    backgroundColor: "#701a75", // Fuchsia 900
    x: '30vw',
    y: '-15vh',
    width: '35vw',
    height: '65vh',
    filter: "blur(80px)",
  },
  skills: {
    scale: 1.1,
    rotate: 180,
    borderRadius: "50%",
    backgroundColor: "#4c1d95", // Violet 900
    x: '-25vw',
    y: '15vh',
    width: '55vw',
    height: '55vw',
    filter: "blur(100px)",
  },
  contact: {
    scale: 0.9,
    rotate: -15,
    borderRadius: ["40% 60% 60% 40% / 40% 40% 60% 60%"],
    backgroundColor: "#6b21a8", // Purple 800
    x: 0,
    y: '20vh',
    width: '85vw',
    height: '35vh',
    filter: "blur(80px)",
  }
};

const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ view }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center bg-[#05010a]">
        {/* Static Noise Texture */}
        <div className="absolute inset-0 opacity-[0.05]" 
             style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}>
        </div>

        {/* Primary Morphing Blob */}
        <motion.div
            initial="hero"
            animate={view}
            variants={variants as any}
            transition={{
                duration: 2,
                ease: [0.4, 0, 0.2, 1],
                borderRadius: {
                    repeat: Infinity,
                    repeatType: "mirror",
                    duration: 8,
                    ease: "easeInOut"
                }
            }}
            className="absolute opacity-50 mix-blend-screen"
        />

        {/* Secondary complementary blob */}
        <motion.div
             animate={{
                 x: view === 'hero' ? -100 : view === 'projects' ? -250 : 250,
                 y: view === 'hero' ? 100 : view === 'contact' ? -150 : 50,
                 scale: view === 'skills' ? 1.4 : 0.9,
                 opacity: view === 'contact' ? 0.6 : 0.3,
             }}
             transition={{ duration: 2.5, ease: "easeInOut" }}
             className="absolute w-[40vw] h-[40vw] bg-fuchsia-900/20 rounded-full blur-[120px] mix-blend-screen"
        />
    </div>
  );
};

export default MorphingBackground;