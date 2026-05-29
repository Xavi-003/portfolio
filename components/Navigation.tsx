import React, { useRef } from 'react';
import { Home, Briefcase, Cpu, Mail, MessageSquare } from 'lucide-react';
import { ViewState } from '../types';
import { motion } from 'framer-motion';

interface NavigationProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const navItems = [
  { id: 'hero', icon: Home, label: 'Home' },
  { id: 'projects', icon: Briefcase, label: 'Work' },
  { id: 'skills', icon: Cpu, label: 'Skills' },
  { id: 'contact', icon: MessageSquare, label: 'Connect' },
];

const Navigation: React.FC<NavigationProps> = ({ currentView, onChangeView }) => {
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    let newIndex = index;
    switch (e.key) {
      case 'ArrowRight':
        newIndex = (index + 1) % navItems.length;
        break;
      case 'ArrowLeft':
        newIndex = (index - 1 + navItems.length) % navItems.length;
        break;
      case 'Home':
        newIndex = 0;
        break;
      case 'End':
        newIndex = navItems.length - 1;
        break;
      default:
        return;
    }

    e.preventDefault();
    buttonRefs.current[newIndex]?.focus();
    onChangeView(navItems[newIndex].id as ViewState);
  };

  return (
    <nav aria-label="Main Navigation" className="fixed bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-[100]">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex items-center gap-2 p-1.5 rounded-full bg-neon-dark/50 backdrop-blur-md border border-white/10 shadow-[0_0_15px_rgba(124,58,237,0.15)] hover:border-neon-violet/40 hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
        role="tablist"
      >
        {navItems.map((item, index) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;

          return (
            <button
              key={item.id}
              ref={(el) => { buttonRefs.current[index] = el; }}
              onClick={() => onChangeView(item.id as ViewState)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              tabIndex={isActive ? 0 : -1}
              aria-label={`Navigate to ${item.label} section`}
              aria-selected={isActive}
              role="tab"
              className="relative group flex items-center justify-center w-11 h-11 md:w-12 md:h-12 rounded-full transition-all duration-300 cursor-pointer"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 rounded-full border animate-glow-cycle-nav"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}

              <Icon
                size={20}
                aria-hidden="true"
                className={`relative z-10 transition-all duration-300 ${isActive ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.6)] scale-110' : 'text-gray-400 group-hover:text-white group-hover:scale-110'}`}
              />

              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border border-white/10">
                {item.label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </nav>
  );
};

export default Navigation;