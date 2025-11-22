import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Database, Zap, Mail, Laptop } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="w-full h-[400px] bg-black/20 rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at center, #7c3aed 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
            <svg className="w-full h-full absolute top-0 left-0 pointer-events-none z-0">
                <defs>
                    <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                        <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                    </linearGradient>
                </defs>
                
                {/* Connection Lines - Using approximate relative coordinates */}
                {/* Client to Security */}
                <motion.path d="M 150,200 L 280,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
                {/* Security to Server */}
                <motion.path d="M 320,200 L 450,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                {/* Server to Redis */}
                <motion.path d="M 500,200 L 600,120" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                {/* Server to DB */}
                <motion.path d="M 500,200 L 600,280" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                {/* Server to Resend */}
                <motion.path d="M 500,200 L 700,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
                
                {/* Animated Data Packets */}
                <ClientRequestPath />
                <RedisPath />
                <DBPath />
                <EmailPath />
            </svg>

            {/* Nodes */}
            <div className="relative z-10 w-full h-full max-w-4xl mx-auto">
                
                {/* Client */}
                <div className="absolute left-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Laptop className="text-white" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">Client</span>
                </div>

                {/* Security / WAF */}
                <div className="absolute left-[28%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <motion.div 
                        animate={{ boxShadow: ["0 0 0 0px rgba(217, 70, 239, 0)", "0 0 0 10px rgba(217, 70, 239, 0.1)", "0 0 0 20px rgba(217, 70, 239, 0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-14 h-14 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center"
                    >
                        <ShieldCheck className="text-neon-fuchsia" />
                    </motion.div>
                    <span className="text-xs font-mono text-neon-fuchsia">WAF/Auth</span>
                </div>

                {/* Server */}
                <div className="absolute left-[50%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                    <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        <Server size={32} className="text-indigo-400" />
                    </div>
                    <span className="text-xs font-mono text-indigo-300">API Gateway</span>
                </div>

                {/* Redis */}
                <div className="absolute right-[20%] top-[20%] flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-red-900/20 border border-red-500/50 flex items-center justify-center">
                        <Zap size={20} className="text-red-400" />
                    </div>
                    <span className="text-xs font-mono text-red-400">Redis</span>
                </div>

                {/* Database */}
                <div className="absolute right-[20%] bottom-[20%] flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-xl bg-blue-900/20 border border-blue-500/50 flex items-center justify-center">
                        <Database size={20} className="text-blue-400" />
                    </div>
                    <span className="text-xs font-mono text-blue-400">Postgres</span>
                </div>

                {/* Resend */}
                <div className="absolute right-[5%] top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                    <div className="w-14 h-14 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                        <Mail className="text-white" />
                    </div>
                    <span className="text-xs font-mono text-gray-400">Resend</span>
                </div>

            </div>
        </div>
    </div>
  );
};

// Animated Paths Subcomponents
const ClientRequestPath = () => (
    <motion.circle r="4" fill="#fff">
        <motion.animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            path="M 150,200 L 280,200 L 450,200"
            keyPoints="0;0.4;0.5;1"
            keyTimes="0;0.4;0.6;1"
        />
    </motion.circle>
);

const RedisPath = () => (
    <motion.circle r="3" fill="#f87171">
        <motion.animateMotion 
            dur="2s" 
            begin="1s"
            repeatCount="indefinite"
            path="M 500,200 L 600,120 L 500,200"
        />
    </motion.circle>
);

const DBPath = () => (
    <motion.circle r="3" fill="#60a5fa">
        <motion.animateMotion 
            dur="3s" 
            begin="1.5s"
            repeatCount="indefinite"
            path="M 500,200 L 600,280 L 500,200"
        />
    </motion.circle>
);

const EmailPath = () => (
    <motion.circle r="3" fill="#fff">
        <motion.animateMotion 
            dur="4s" 
            begin="2s"
            repeatCount="indefinite"
            path="M 500,200 L 700,200"
        />
    </motion.circle>
);

export default SystemArchitecture;