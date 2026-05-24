import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredTag, setHoveredTag] = useState<string>('');

  const isTouchDevice = useRef(
    typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches
  );

  useEffect(() => {
    if (isTouchDevice.current) return;

    let animationFrameId: number | null = null;

    const moveMouse = (e: MouseEvent) => {
      if (e.clientX === 0 && e.clientY === 0) return;

      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }

      // Schedule write inside requestAnimationFrame to align with monitor refresh rate
      animationFrameId = requestAnimationFrame(() => {
        // Update coordinates directly in DOM to bypass React render cycle latency
        if (cursorRef.current) {
          cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(-50%, -50%, 0)`;
        }
        if (labelRef.current) {
          labelRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate3d(20px, 20px, 0)`;
        }
        setIsVisible(true);
      });
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target || !target.tagName) return;

      const tagName = target.tagName.toLowerCase();

      const isClickable =
        tagName === 'a' ||
        tagName === 'button' ||
        target.closest('a') !== null ||
        target.closest('button') !== null ||
        target.getAttribute('role') === 'button';

      setIsHovering(isClickable);

      // Set tag label (infrequent state changes - only on boundary crosses)
      if (tagName === 'a' || target.closest('a')) setHoveredTag('<Link />');
      else if (tagName === 'button' || target.closest('button')) setHoveredTag('<Button />');
      else if (tagName === 'input' || tagName === 'textarea') setHoveredTag('<Input />');
      else if (tagName === 'img') setHoveredTag('<Img />');
      else if (tagName === 'p' || tagName === 'span' || tagName.startsWith('h')) setHoveredTag(`<${tagName} />`);
      else setHoveredTag('');
    };

    document.addEventListener('mousemove', moveMouse, { passive: true });
    document.addEventListener('mouseover', mouseOver, { passive: true });

    return () => {
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
      document.removeEventListener('mousemove', moveMouse);
      document.removeEventListener('mouseover', mouseOver);
    };
  }, []);

  if (isTouchDevice.current) {
    return null;
  }

  return (
    <>
      {/* Outer Cursor Wrapper - Positioned Directly via JS transforms */}
      <div
        ref={cursorRef}
        className={`fixed top-0 left-0 w-6 h-6 pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {/* Inner scaling node - Animated on hover using Framer Motion */}
        <motion.div
          className="w-full h-full bg-white rounded-full"
          animate={{
            scale: isHovering ? 2.5 : 1,
          }}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 25,
          }}
        />
      </div>

      {/* Label Wrapper - Positioned Directly */}
      <div
        ref={labelRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          willChange: 'transform',
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      >
        {/* Inner Label content - Animated on appearance */}
        <motion.div
          className="px-2 py-1 bg-white/10 backdrop-blur-md rounded text-[10px] font-mono text-white whitespace-nowrap border border-white/20"
          animate={{
            opacity: hoveredTag ? 1 : 0,
            scale: hoveredTag ? 1 : 0.8,
          }}
          transition={{ duration: 0.15 }}
        >
          {hoveredTag}
        </motion.div>
      </div>
    </>
  );
};

export default CustomCursor;