import React from 'react';
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
  return (
    <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
        className="flex items-center gap-2 p-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl"
      >
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id as ViewState)}
              className="relative group flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300"
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-neon-violet/40 rounded-full border border-neon-violet/50"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
              
              <Icon 
                size={20} 
                className={`relative z-10 transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} 
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