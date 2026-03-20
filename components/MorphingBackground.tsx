import React from "react";
import { motion } from "framer-motion";
import { ViewState } from "../types";

interface MorphingBackgroundProps {
  view: ViewState;
}

const variants = {
  hero: {
    scale: 1,
    rotate: 0,
    x: 0,
    y: 0,
    opacity: 0.6,
  },
  projects: {
    scale: 1.2,
    rotate: 45,
    x: "30vw",
    y: "-15vh",
    opacity: 0.8,
  },
  skills: {
    scale: 1.5,
    rotate: 180,
    x: "-25vw",
    y: "15vh",
    opacity: 0.7,
  },
  contact: {
    scale: 0.9,
    rotate: -15,
    x: 0,
    y: "20vh",
    opacity: 0.5,
  },
};

const MorphingBackground: React.FC<MorphingBackgroundProps> = ({ view }) => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none flex items-center justify-center bg-[#05010a]">
      {/* Static Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Primary Blob - optimized for compositing (only transforms & opacity) */}
      <motion.div
        initial="hero"
        animate={view}
        variants={variants}
        transition={{
          duration: 2,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="absolute w-[60vw] h-[60vw] bg-purple-900 rounded-[40%] blur-[90px] mix-blend-screen"
        style={{
          willChange: "transform, opacity",
          WebkitTransform: "translateZ(0)",
        }}
      />

      {/* Secondary blob - optimized */}
      <motion.div
        animate={{
          x:
            view === "hero"
              ? -100
              : view === "projects"
                ? -250
                : view === "skills"
                  ? 250
                  : 0,
          y:
            view === "hero"
              ? 100
              : view === "contact"
                ? -150
                : view === "skills"
                  ? -50
                  : 50,
          scale: view === "skills" ? 1.4 : view === "projects" ? 1.2 : 0.9,
          opacity: view === "hero" ? 0.3 : 0.5,
        }}
        transition={{ duration: 2.5, ease: "easeInOut" }}
        className="absolute w-[40vw] h-[40vw] bg-fuchsia-900/30 rounded-full blur-[120px] mix-blend-screen"
        style={{
          willChange: "transform, opacity",
          WebkitTransform: "translateZ(0)",
        }}
      />

      {/* Tertiary blob - optimized */}
      <motion.div
        animate={{
          x:
            view === "skills"
              ? 150
              : view === "projects"
                ? -150
                : view === "contact"
                  ? 100
                  : 0,
          y:
            view === "skills"
              ? 150
              : view === "projects"
                ? -100
                : view === "contact"
                  ? 50
                  : -100,
          scale: view === "projects" ? 1.3 : view === "contact" ? 1.1 : 0.8,
          opacity: view === "hero" ? 0.2 : 0.4,
        }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="absolute w-[35vw] h-[35vw] bg-violet-800/25 rounded-full blur-[110px] mix-blend-screen"
        style={{
          willChange: "transform, opacity",
          WebkitTransform: "translateZ(0)",
        }}
      />
    </div>
  );
};

export default MorphingBackground;
