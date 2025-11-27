import React, { useState, useRef, MouseEvent, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github, X, ArrowUpRight, Code2, Layers, ChevronLeft, ChevronRight, TrendingUp } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Spot • Futures • Bot",
    category: "FinTech / Trading",
    image: "", // We will use a custom visual component
    description: "A comprehensive trading platform featuring spot and futures markets. Includes real-time charting, order book management, and high-frequency matching engine.",
    tech: ["React", "Node.js", "WebSockets", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Selvi Construction",
    category: "Corporate Website",
    image: "https://picsum.photos/800/600?random=102",
    description: "Modern corporate website for Selvi Construction, showcasing their portfolio, services, and company history with a premium design aesthetic.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"]
  },
  {
    id: 3,
    title: "AlgoBot Prime",
    category: "Automated Trading",
    image: "", // Custom visual
    description: "Advanced trading bot supporting Grid, DCA (Dollar Cost Averaging), and Arbitrage strategies. Features backtesting engine and real-time performance monitoring.",
    tech: ["Python", "FastAPI", "Docker", "Redis"]
  },
  {
    id: 4,
    title: "PayBridge Global",
    category: "FinTech / Payments",
    image: "https://picsum.photos/800/600?random=104",
    description: "Unified payment gateway solution integrating both traditional fiat processors and cryptocurrency payments. Secure, compliant, and developer-friendly API.",
    tech: ["Node.js", "Stripe API", "Blockchain", "Solidity"]
  }
];

// --- Optimized Animated Visual Components ---

// Generate candle data once on mount, not on every render
const useCandleData = () => {
  return React.useMemo(() =>
    [...Array(8)].map(() => ({
      height: Math.random() * 60 + 20,
      isGreen: Math.random() > 0.4
    })),
    []);
};

const TradingChartVisual = React.memo(() => {
  const candles = useCandleData();

  return (
    <div className="w-full h-full bg-[#0a0a12] relative overflow-hidden flex flex-col p-4" style={{ willChange: 'transform' }}>
      {/* Grid Lines - Static */}
      <div className="absolute inset-0 grid grid-cols-6 grid-rows-4 gap-0 opacity-10 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="border-r border-b border-white" />
        ))}
      </div>

      {/* Header Info */}
      <div className="flex justify-between items-center mb-4 z-10">
        <div className="flex gap-2 items-center">
          <div className="w-8 h-8 rounded bg-orange-500/20 flex items-center justify-center text-orange-500 font-bold text-xs">BTC</div>
          <div>
            <div className="text-white font-mono font-bold text-sm">$64,231.45</div>
            <div className="text-green-400 text-xs flex items-center gap-1">+2.4% <TrendingUp size={10} /></div>
          </div>
        </div>
        <div className="flex gap-1">
          {['1H', '4H', '1D', '1W'].map(t => (
            <div key={t} className={`px-2 py-1 rounded text-[10px] font-mono ${t === '1H' ? 'bg-white/10 text-white' : 'text-gray-600'}`}>{t}</div>
          ))}
        </div>
      </div>

      {/* Animated Candles - Reduced from 15 to 8 */}
      <div className="flex-1 flex items-end justify-between gap-1 relative z-10 px-2">
        {candles.map((candle, i) => {
          return (
            <motion.div
              key={i}
              initial={{ height: `${candle.height}%` }}
              animate={{
                height: [`${candle.height}%`, `${candle.height + 10}%`, `${candle.height - 5}%`, `${candle.height}%`],
              }}
              transition={{
                duration: 3 + Math.random(),
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.15
              }}
              className={`w-full rounded-sm relative opacity-80`}
              style={{ backgroundColor: candle.isGreen ? '#4ade80' : '#f87171', willChange: 'transform' }}
            >
              {/* Wick */}
              <div className={`absolute left-1/2 -translate-x-1/2 w-[1px] bg-current h-[120%] -top-[10%] opacity-50 ${candle.isGreen ? 'bg-green-400' : 'bg-red-400'}`} />
            </motion.div>
          )
        })}
      </div>

      {/* Simple gradient overlay instead of SVG path */}
      <div className="absolute inset-0 pointer-events-none z-20 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-transparent" />
      </div>
    </div>
  );
});

TradingChartVisual.displayName = 'TradingChartVisual';

const BotVisual = React.memo(() => {
  return (
    <div className="w-full h-full bg-[#05050a] relative overflow-hidden flex items-center justify-center font-mono text-xs" style={{ willChange: 'transform' }}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />

      <div className="w-3/4 h-3/4 border border-blue-500/30 rounded-lg p-4 relative bg-black/40 backdrop-blur-sm overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent">
          <motion.div
            className="h-full w-1/3 bg-blue-400"
            animate={{ x: ['-100%', '300%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </div>

        <div className="space-y-2 text-blue-300/80">
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-between"
          >
            <span>STATUS:</span> <span className="text-green-400">ACTIVE</span>
          </motion.div>
          <div className="flex justify-between">
            <span>STRATEGY:</span> <span className="text-white">DCA_GRID</span>
          </div>
          <div className="h-px bg-white/10 my-2" />
          {[1, 2, 3].map((_, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.7, duration: 0.5, repeat: Infinity, repeatDelay: 3 }}
              className="flex justify-between text-[10px]"
            >
              <span>[ORDER_FILLED]</span>
              <span className="text-green-400">+0.45%</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
});

BotVisual.displayName = 'BotVisual';

// Static placeholder for side cards
const StaticPlaceholder: React.FC<{ id: number }> = React.memo(({ id }) => {
  const placeholders = {
    1: <div className="w-full h-full bg-gradient-to-br from-orange-900/30 to-purple-900/30 flex items-center justify-center">
      <div className="text-white/50 font-mono text-sm">TRADING</div>
    </div>,
    2: <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900" />,
    3: <div className="w-full h-full bg-gradient-to-br from-blue-900/30 to-cyan-900/30 flex items-center justify-center">
      <div className="text-white/50 font-mono text-sm">BOT</div>
    </div>,
    4: <div className="w-full h-full bg-gradient-to-br from-indigo-900/30 to-pink-900/30" />
  };

  return placeholders[id as keyof typeof placeholders] || <div className="w-full h-full bg-black" />;
});

StaticPlaceholder.displayName = 'StaticPlaceholder';

// --- Main Components ---

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onCenterClick: () => void;
  isActive: boolean;
  position: 'left' | 'center' | 'right' | 'hidden';
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onClick, onCenterClick, isActive, position }) => {
  const ref = useRef<HTMLDivElement>(null);
  const lastUpdateTime = useRef(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Optimized spring config
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  // Spotlight gradient - must be called at top level, not conditionally
  const spotlightBackground = useTransform(
    [x, y],
    ([latestX, latestY]: [number, number]) => `radial-gradient(circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%, rgba(232, 121, 249, 0.3), transparent 60%)`
  );

  // Throttled mouse move
  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isActive || !ref.current) return;

    const now = Date.now();
    if (now - lastUpdateTime.current < 16) return; // ~60fps throttle
    lastUpdateTime.current = now;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  }, [isActive, x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  // Memoize variants
  const variants = useMemo(() => ({
    center: { x: 0, scale: 1, opacity: 1, zIndex: 30, filter: 'blur(0px)' },
    left: { x: -380, scale: 0.85, opacity: 0.5, zIndex: 20, filter: 'blur(2px)' },
    right: { x: 380, scale: 0.85, opacity: 0.5, zIndex: 20, filter: 'blur(2px)' },
    hidden: { x: 0, scale: 0.5, opacity: 0, zIndex: 10, filter: 'blur(10px)' }
  }), []);

  return (
    <motion.div
      ref={ref}
      layoutId={`card-container-${project.id}`}
      initial="hidden"
      animate={position}
      variants={variants}
      transition={{ duration: 0.5, type: "spring", bounce: 0.15, stiffness: 200, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={isActive ? onClick : onCenterClick}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        willChange: 'transform',
      }}
      className="w-full max-w-md cursor-pointer perspective-1000"
    >
      <div className="relative h-[450px] w-full rounded-3xl bg-[#0f0518] border border-white/10 overflow-hidden shadow-2xl group-hover:border-neon-violet/50 transition-colors duration-500">

        {/* Spotlight - only for active */}
        {isActive && (
          <motion.div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay"
            style={{ background: spotlightBackground }}
          />
        )}

        {/* Visual Content */}
        <motion.div
          layoutId={`card-image-wrapper-${project.id}`}
          className="h-[60%] w-full overflow-hidden relative z-10 bg-black"
          style={{ transform: "translateZ(20px)", willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0518] z-20" />

          {/* Only render complex animations for center card */}
          {isActive ? (
            project.id === 1 ? (
              <TradingChartVisual />
            ) : project.id === 3 ? (
              <BotVisual />
            ) : (
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            )
          ) : (
            project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            ) : (
              <StaticPlaceholder id={project.id} />
            )
          )}

          <div className="absolute inset-0 bg-neon-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        </motion.div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-z-10 flex flex-col justify-end h-[40%]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Layers size={12} className="text-neon-fuchsia" />
              <span className="text-xs font-mono text-neon-fuchsia uppercase tracking-wider">{project.category}</span>
            </div>
            {isActive && (
              <motion.div
                className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
              >
                <ArrowUpRight size={20} />
              </motion.div>
            )}
          </div>

          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="text-2xl font-display font-bold text-white mb-2 transition-all"
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed mb-4 transition-colors">
            {project.description}
          </p>

          <div className="flex gap-2 overflow-hidden h-8">
            {project.tech.map((t) => (
              <span key={t} className="text-xs font-mono text-neon-violet/80">#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isHoveringCard, setIsHoveringCard] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % projects.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
  }, []);

  // Auto-slide logic
  useEffect(() => {
    if (selectedId !== null || isPaused || isHoveringCard) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projects.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [selectedId, isPaused, isHoveringCard]);

  const getProjectPosition = useCallback((index: number): 'left' | 'center' | 'right' | 'hidden' => {
    if (index === currentIndex) return 'center';
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    if (index === prevIndex) return 'left';
    if (index === nextIndex) return 'right';
    return 'hidden';
  }, [currentIndex]);

  return (
    <section className="min-h-screen lg:h-screen w-full flex flex-col items-center justify-center px-4 py-12 lg:py-16 relative z-10 overflow-hidden">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <div className="mb-12 relative text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4 text-white"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-fuchsia">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-200/60 font-mono text-lg"
          >
              // Swipe to explore
          </motion.p>
        </div>

        {/* Slider Container - removed hover handlers from here */}
        <div
          className="relative w-full max-w-6xl flex items-center justify-center h-[500px]"
        >

          <button
            onClick={prevSlide}
            className="absolute left-4 lg:left-0 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-violet/50 transition-all text-white hidden md:flex"
          >
            <ChevronLeft size={24} />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            {projects.map((project, index) => (
              <div
                key={project.id}
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => setIsHoveringCard(false)}
                className="absolute inset-0 flex items-center justify-center"
              >
                <ProjectCard
                  project={project}
                  onClick={() => setSelectedId(project.id)}
                  onCenterClick={() => setCurrentIndex(index)}
                  isActive={index === currentIndex}
                  position={getProjectPosition(index)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="absolute right-4 lg:right-0 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-violet/50 transition-all text-white hidden md:flex"
          >
            <ChevronRight size={24} />
          </button>
        </div>

        {/* Indicators */}
        <div className="flex gap-2 mt-8">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-8 bg-neon-fuchsia' : 'bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedId && (
          <div key={`modal-${selectedId}`} className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#05010a]/95 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              initial={{ scale: 0.8, opacity: 0, rotateX: 10 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
                exit: { duration: 0.3 }
              }}
              className="w-full max-w-6xl bg-[#0f0518] rounded-[2rem] overflow-hidden border border-neon-violet/30 relative shadow-[0_0_100px_-20px_rgba(124,58,237,0.6)] flex flex-col lg:flex-row max-h-[90vh] z-50 ring-1 ring-white/10 overflow-y-auto lg:overflow-y-hidden"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 300, damping: 20 }}
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-30 p-3 bg-black/40 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>

              {(() => {
                const project = projects.find(p => p.id === selectedId)!;

                // Stagger animation variants
                const containerVariants = {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.1,
                      delayChildren: 0.2
                    }
                  }
                };

                const itemVariants = {
                  hidden: { y: 20, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: 'spring', stiffness: 300, damping: 25 }
                  }
                };

                return (
                  <>
                    {/* Image Section */}
                    <motion.div
                      className="lg:w-7/12 h-64 lg:h-auto relative overflow-hidden bg-black group"
                      initial={{ x: -100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1, type: 'spring', stiffness: 200, damping: 25 }}
                    >
                      <motion.div
                        layoutId={`card-image-wrapper-${project.id}`}
                        className="w-full h-full"
                      >
                        {project.id === 1 ? (
                          <TradingChartVisual />
                        ) : project.id === 3 ? (
                          <BotVisual />
                        ) : (
                          <img
                            src={project.image}
                            className="absolute inset-0 w-full h-full object-cover opacity-90"
                            alt="Project Cover"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0518]" />
                      </motion.div>
                    </motion.div>

                    {/* Content Section */}
                    < motion.div
                      className="lg:w-5/12 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col relative bg-[#0f0518]"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Category Badge */}
                      < motion.div
                        className="flex items-center gap-3 mb-8"
                        variants={itemVariants}
                      >
                        <div className="p-2.5 rounded-xl bg-neon-fuchsia/10 border border-neon-fuchsia/20">
                          <Code2 size={20} className="text-neon-fuchsia" />
                        </div>
                        <p className="text-neon-fuchsia font-mono text-sm tracking-widest uppercase font-bold">{project.category}</p>
                      </motion.div>

                      {/* Title */}
                      <motion.h2
                        layoutId={`card-title-${project.id}`}
                        className="text-4xl md:text-5xl font-display font-bold mb-6 text-white leading-tight"
                        variants={itemVariants}
                      >
                        {project.title}
                      </motion.h2>

                      {/* Description */}
                      <motion.p
                        className="text-indigo-100/80 leading-relaxed mb-8 text-lg font-light border-l-2 border-neon-purple/50 pl-4"
                        variants={itemVariants}
                      >
                        {project.description}
                      </motion.p>

                      {/* Tech Stack */}
                      <motion.div
                        className="mb-12"
                        variants={itemVariants}
                      >
                        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                          Technical Architecture
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map((t, i) => (
                            <motion.span
                              key={t}
                              className="px-4 py-2 rounded-lg bg-white/5 text-sm text-indigo-200 border border-white/10 hover:border-neon-violet/50 hover:bg-neon-violet/10 transition-colors cursor-default flex items-center gap-2"
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ delay: 0.5 + (i * 0.05), type: 'spring', stiffness: 300, damping: 20 }}
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
                              {t}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>

                      {/* Action Buttons */}
                      <motion.div
                        className="flex flex-col sm:flex-row gap-4 mt-auto"
                        variants={itemVariants}
                      >
                        <a href="#" className="flex-1 py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neon-purple hover:text-white transition-all shadow-lg hover:shadow-neon-purple/30 group relative overflow-hidden">
                          <span className="relative z-10 flex items-center gap-2"><ExternalLink size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> Live Demo</span>
                        </a>
                        <a href="#" className="flex-1 py-4 border border-white/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-white hover:border-white/40">
                          <Github size={20} /> Codebase
                        </a>
                      </motion.div>
                    </motion.div>
                  </>
                );
              })()}
            </motion.div>
          </div >
        )}
      </AnimatePresence >
    </section >
  );
};

export default Projects;