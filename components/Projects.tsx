import React, { useState, useRef, MouseEvent } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github, X, Sparkles, ArrowUpRight, Code2, Layers } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Nebula Dashboard",
    category: "Data Visualization",
    image: "https://picsum.photos/800/600?random=10",
    description: "A high-performance real-time analytics dashboard visualizing millions of data points. Built with React, D3.js, and WebSockets for live streaming data.",
    tech: ["React", "TypeScript", "D3.js", "Node.js"]
  },
  {
    id: 2,
    title: "Aether Commerce",
    category: "E-Commerce Platform",
    image: "https://picsum.photos/800/600?random=22",
    description: "Next-gen headless commerce storefront focusing on micro-interactions and speed. Features AI-powered search, personalization, and edge caching.",
    tech: ["Next.js", "Tailwind", "Redis", "Postgres"]
  },
  {
    id: 3,
    title: "Quantum Chat",
    category: "Encrypted Messaging",
    image: "https://picsum.photos/800/600?random=33",
    description: "Secure, end-to-end encrypted messaging application with real-time translation capabilities powered by Gemini API and WebRTC video.",
    tech: ["React Native", "Firebase", "WebRTC", "Gemini"]
  }
];

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  index: number;
}

// 3D Tilt & Spotlight Card Component
const ProjectCard: React.FC<ProjectCardProps> = ({ project, onClick, index }) => {
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = (e.clientX - rect.left) / width - 0.5;
    const mouseY = (e.clientY - rect.top) / height - 0.5;
    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      layoutId={`card-container-${project.id}`}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative h-[420px] lg:h-[450px] w-full cursor-pointer perspective-1000"
    >
      {/* Card Content */}
      <div className="absolute inset-0 rounded-3xl bg-[#0f0518] border border-white/10 overflow-hidden shadow-2xl group-hover:border-neon-violet/50 transition-colors duration-500">

        {/* Spotlight Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20 mix-blend-overlay"
          style={{
            background: useTransform(
              [x, y],
              ([latestX, latestY]) => `radial-gradient(circle at ${latestX * 100 + 50}% ${latestY * 100 + 50}%, rgba(232, 121, 249, 0.3), transparent 60%)`
            )
          }}
        />

        {/* Image Area */}
        <motion.div
          layoutId={`card-image-wrapper-${project.id}`}
          className="h-[60%] w-full overflow-hidden relative z-10"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0518] z-20" />
          <motion.img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transform scale-105 group-hover:scale-115 transition-transform duration-700"
          />
          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-neon-violet/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-overlay" />
        </motion.div>

        {/* Info Area */}
        <div className="absolute bottom-0 left-0 w-full p-8 z-30 transform translate-z-10 flex flex-col justify-end h-[40%]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Layers size={12} className="text-neon-fuchsia" />
              <span className="text-xs font-mono text-neon-fuchsia uppercase tracking-wider">{project.category}</span>
            </div>
            <motion.div
              className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.5)]"
            >
              <ArrowUpRight size={20} />
            </motion.div>
          </div>

          <motion.h3
            layoutId={`card-title-${project.id}`}
            className="text-3xl font-display font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-neon-fuchsia transition-all"
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-400 line-clamp-2 text-sm leading-relaxed mb-4 group-hover:text-gray-300 transition-colors">
            {project.description}
          </p>

          {/* Tech Stack Reveal */}
          <div className="flex gap-2 overflow-hidden h-8">
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }} // Just in case
                className="text-xs font-mono text-neon-violet/80 group-hover:text-neon-fuchsia transition-colors"
                style={{
                  transform: "translateY(20px)", // Default CSS fallback
                }}
              >
                {/* We use a CSS class-based approach for simpler group hover staggering if Framer is tricky with layoutId */}
                <span className="inline-block transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" style={{ transitionDelay: `${i * 50}ms` }}>
                  #{t}
                </span>
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <section className="min-h-screen lg:h-screen w-full flex flex-col items-center justify-center px-4 py-12 lg:py-16 relative z-10">
      <div className="w-full max-w-7xl">
        <div className="mb-20 ml-4 relative">
          <div className="absolute -left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-neon-violet to-transparent opacity-50" />
          <motion.h2
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-4 text-white"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-fuchsia">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-200/60 font-mono text-lg max-w-md pl-2"
          >
              // Explorations in digital architecture
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => setSelectedId(project.id)}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedId && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#05010a]/95 backdrop-blur-xl"
            />

            {/* Modal Card */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              className="w-full max-w-6xl bg-[#0f0518] rounded-[2rem] overflow-hidden border border-neon-violet/30 relative shadow-[0_0_100px_-20px_rgba(124,58,237,0.6)] flex flex-col lg:flex-row max-h-[90vh] z-50 ring-1 ring-white/10 overflow-y-auto lg:overflow-y-hidden"
            >
              <button
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                className="absolute top-6 right-6 z-30 p-3 bg-black/40 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/10 group"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>

              {(() => {
                const project = projects.find(p => p.id === selectedId)!;
                return (
                  <>
                    <div className="lg:w-7/12 h-64 lg:h-auto relative overflow-hidden bg-black group">
                      <motion.div layoutId={`card-image-wrapper-${project.id}`} className="w-full h-full">
                        <img
                          src={project.image}
                          className="absolute inset-0 w-full h-full object-cover opacity-90"
                          alt="Project Cover"
                        />
                        {/* Animated Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent translate-y-[-100%] animate-[scan_4s_ease-in-out_infinite]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0518]" />
                      </motion.div>
                    </div>

                    <div className="lg:w-5/12 p-8 md:p-12 overflow-y-auto custom-scrollbar flex flex-col relative bg-[#0f0518]">
                      <div className="flex items-center gap-3 mb-8">
                        <div className="p-2.5 rounded-xl bg-neon-fuchsia/10 border border-neon-fuchsia/20">
                          <Code2 size={20} className="text-neon-fuchsia" />
                        </div>
                        <p className="text-neon-fuchsia font-mono text-sm tracking-widest uppercase font-bold">{project.category}</p>
                      </div>

                      <motion.h2 layoutId={`card-title-${project.id}`} className="text-4xl md:text-5xl font-display font-bold mb-6 text-white leading-tight">
                        {project.title}
                      </motion.h2>

                      <p className="text-indigo-100/80 leading-relaxed mb-8 text-lg font-light border-l-2 border-neon-purple/50 pl-4">
                        {project.description}
                      </p>

                      <div className="mb-12">
                        <h4 className="text-xs text-gray-500 uppercase tracking-wider mb-4 font-bold flex items-center gap-2">
                          Technical Architecture
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech.map(t => (
                            <span key={t} className="px-4 py-2 rounded-lg bg-white/5 text-sm text-indigo-200 border border-white/10 hover:border-neon-violet/50 hover:bg-neon-violet/10 transition-colors cursor-default flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-neon-violet" />
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-4 mt-auto">
                        <a href="#" className="flex-1 py-4 bg-white text-black rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-neon-purple hover:text-white transition-all shadow-lg hover:shadow-neon-purple/30 group relative overflow-hidden">
                          <span className="relative z-10 flex items-center gap-2"><ExternalLink size={20} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" /> Live Demo</span>
                        </a>
                        <a href="#" className="flex-1 py-4 border border-white/20 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors text-white hover:border-white/40">
                          <Github size={20} /> Codebase
                        </a>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;