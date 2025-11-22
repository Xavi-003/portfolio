import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Configuration for the satellite nodes
  // We use decreasing stiffness to create a "tail" effect where outer nodes lag more
  const springConfig1 = { damping: 25, stiffness: 300, mass: 0.2 };
  const springConfig2 = { damping: 20, stiffness: 200, mass: 0.4 };
  const springConfig3 = { damping: 20, stiffness: 100, mass: 0.6 };
  const springConfig4 = { damping: 20, stiffness: 50, mass: 0.8 };

  // Satellite Nodes (The "Web" points)
  const sat1X = useSpring(cursorX, springConfig1);
  const sat1Y = useSpring(cursorY, springConfig1);

  const sat2X = useSpring(cursorX, springConfig2);
  const sat2Y = useSpring(cursorY, springConfig2);

  const sat3X = useSpring(cursorX, springConfig3);
  const sat3Y = useSpring(cursorY, springConfig3);
  
  const sat4X = useSpring(cursorX, springConfig4);
  const sat4Y = useSpring(cursorY, springConfig4);

  const [isClicking, setIsClicking] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string>('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseDown = () => setIsClicking(true);
    const mouseUp = () => setIsClicking(false);

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();
      
      if (tagName === 'a' || target.closest('a')) setHoveredTag('<Link />');
      else if (tagName === 'button' || target.closest('button')) setHoveredTag('<Button />');
      else if (tagName === 'input' || tagName === 'textarea') setHoveredTag('<Input />');
      else if (tagName === 'img') setHoveredTag('<Img />');
      else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) setHoveredTag(`<${tagName.toUpperCase()} />`);
      else if (tagName === 'p' || tagName === 'span') setHoveredTag('<Text />');
      else if (target.getAttribute('role') === 'button') setHoveredTag('<Button />');
      else setHoveredTag('');
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mousedown', mouseDown);
    window.addEventListener('mouseup', mouseUp);
    document.addEventListener('mouseover', mouseOver);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mouseup', mouseUp);
      document.removeEventListener('mouseover', mouseOver);
    };
  }, [isVisible]);

  // Mobile check
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
      return null;
  }

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {/* SVG Layer for Connection Lines */}
        <svg className="absolute inset-0 w-full h-full">
            <defs>
                <linearGradient id="webGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#e879f9" stopOpacity="0.6" />
                </linearGradient>
            </defs>

            {/* Hub to Satellites */}
            <motion.line x1={cursorX} y1={cursorY} x2={sat1X} y2={sat1Y} stroke="url(#webGradient)" strokeWidth="1.5" />
            <motion.line x1={cursorX} y1={cursorY} x2={sat2X} y2={sat2Y} stroke="url(#webGradient)" strokeWidth="1" />
            <motion.line x1={cursorX} y1={cursorY} x2={sat3X} y2={sat3Y} stroke="url(#webGradient)" strokeWidth="0.8" />
            <motion.line x1={cursorX} y1={cursorY} x2={sat4X} y2={sat4Y} stroke="url(#webGradient)" strokeWidth="0.5" />

            {/* Cross Connections (Creating the Mesh) */}
            <motion.line x1={sat1X} y1={sat1Y} x2={sat2X} y2={sat2Y} stroke="rgba(139, 92, 246, 0.3)" strokeWidth="1" />
            <motion.line x1={sat2X} y1={sat2Y} x2={sat3X} y2={sat3Y} stroke="rgba(232, 121, 249, 0.3)" strokeWidth="1" />
            <motion.line x1={sat3X} y1={sat3Y} x2={sat4X} y2={sat4Y} stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1" />
            {/* Loop back for closed shape effect */}
            <motion.line x1={sat4X} y1={sat4Y} x2={sat1X} y2={sat1Y} stroke="rgba(139, 92, 246, 0.2)" strokeWidth="1" />
        </svg>

        {/* Nodes (Visual Dots) */}
        {/* Hub */}
        <motion.div 
            className="absolute w-3 h-3 bg-white rounded-full shadow-[0_0_10px_#fff] mix-blend-difference"
            style={{ x: cursorX, y: cursorY, translateX: '-50%', translateY: '-50%' }}
        />
        
        {/* Satellites */}
        <motion.div className="absolute w-2 h-2 bg-neon-violet rounded-full" style={{ x: sat1X, y: sat1Y, translateX: '-50%', translateY: '-50%' }} />
        <motion.div className="absolute w-2 h-2 bg-neon-fuchsia rounded-full" style={{ x: sat2X, y: sat2Y, translateX: '-50%', translateY: '-50%' }} />
        <motion.div className="absolute w-1.5 h-1.5 bg-neon-purple rounded-full" style={{ x: sat3X, y: sat3Y, translateX: '-50%', translateY: '-50%' }} />
        <motion.div className="absolute w-1 h-1 bg-white rounded-full" style={{ x: sat4X, y: sat4Y, translateX: '-50%', translateY: '-50%' }} />

        {/* DOM Inspector Tag */}
        <motion.div
            className="absolute left-6 top-6 px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-[10px] font-mono text-neon-fuchsia whitespace-nowrap pointer-events-none"
            style={{ x: cursorX, y: cursorY }}
            animate={{ 
                opacity: hoveredTag ? 1 : 0,
                scale: hoveredTag ? 1 : 0.8,
                x: isClicking ? 10 : 20, // Slight shift on click
            }}
        >
            {hoveredTag}
        </motion.div>
    </div>
  );
};

export default CustomCursor;