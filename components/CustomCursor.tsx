import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Smooth spring animation for the cursor
  // Adjusted for snappier feel (higher stiffness, adjusted damping)
  const springConfig = { damping: 35, stiffness: 1000 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string>('');

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      // Ignore 0,0 coordinates to prevent jumps
      if (e.clientX === 0 && e.clientY === 0) return;

      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const tagName = target.tagName.toLowerCase();

      // Check if hovering over clickable elements
      const isClickable =
        tagName === 'a' ||
        tagName === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.closest('[role="button"]');

      setIsHovering(!!isClickable);

      // Set tag label
      if (tagName === 'a' || target.closest('a')) setHoveredTag('<Link />');
      else if (tagName === 'button' || target.closest('button')) setHoveredTag('<Button />');
      else if (tagName === 'input' || tagName === 'textarea') setHoveredTag('<Input />');
      else if (tagName === 'img') setHoveredTag('<Img />');
      else if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tagName)) setHoveredTag(`<${tagName.toUpperCase()} />`);
      else if (tagName === 'p' || tagName === 'span') setHoveredTag('<Text />');
      else if (target.getAttribute('role') === 'button') setHoveredTag('<Button />');
      else setHoveredTag('');
    };

    // Use document listeners for better coverage
    document.addEventListener('mousemove', moveMouse);
    document.addEventListener('mouseover', mouseOver);

    return () => {
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseover', mouseOver);
    };
  }, [isVisible]);

  // Mobile check
  if (typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
    return null;
  }

  return (
    <>
      <motion.div
        className={`fixed top-0 left-0 w-6 h-6 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{
          scale: { type: "spring", stiffness: 300, damping: 20 },
          opacity: { duration: 0.2 }
        }}
      />

      {/* Tag Label */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono text-white whitespace-nowrap border border-white/20"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: 20,
          translateY: 20,
        }}
        animate={{
          opacity: hoveredTag ? 1 : 0,
          scale: hoveredTag ? 1 : 0.8,
        }}
      >
        {hoveredTag}
      </motion.div>
    </>
  );
};

export default CustomCursor;