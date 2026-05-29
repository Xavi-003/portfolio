import React from 'react';
import { motion } from 'framer-motion';
import { Server, ShieldCheck, Database, Zap, Mail, Laptop } from 'lucide-react';

const SystemArchitecture: React.FC = () => {
  return (
    <div className="w-full max-w-4xl aspect-[2/1] mx-auto bg-black/20 rounded-3xl border border-white/10 relative overflow-hidden flex items-center justify-center">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20" 
             style={{ backgroundImage: 'radial-gradient(circle at center, #7c3aed 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
        </div>

        <svg className="w-full h-full absolute inset-0 z-10" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid meet">
            <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" stopOpacity="0" />
                    <stop offset="50%" stopColor="#d946ef" stopOpacity="1" />
                    <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
                </linearGradient>
            </defs>
            
            {/* Connection Lines - Perfectly coordinated within viewBox */}
            {/* Client to Security */}
            <motion.path d="M 100,200 L 250,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" strokeDasharray="5 5" />
            {/* Security to Server */}
            <motion.path d="M 250,200 L 400,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            {/* Server to Redis */}
            <motion.path d="M 400,200 L 580,100" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            {/* Server to DB */}
            <motion.path d="M 400,200 L 580,300" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            {/* Server to Resend */}
            <motion.path d="M 400,200 L 710,200" stroke="url(#lineGradient)" strokeWidth="2" fill="none" />
            
            {/* Animated Data Packets */}
            <ClientRequestPath />
            <RedisPath />
            <DBPath />
            <EmailPath />

            {/* Client Node */}
            <foreignObject x="60" y="140" width="80" height="120">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center backdrop-blur-sm">
                        <Laptop className="text-white" size={24} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">Client</span>
                </div>
            </foreignObject>

            {/* Security / WAF Node */}
            <foreignObject x="215" y="145" width="70" height="110">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <motion.div 
                        animate={{ boxShadow: ["0 0 0 0px rgba(217, 70, 239, 0)", "0 0 0 8px rgba(217, 70, 239, 0.1)", "0 0 0 16px rgba(217, 70, 239, 0)"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 rounded-full bg-neon-purple/20 border border-neon-purple flex items-center justify-center"
                    >
                        <ShieldCheck className="text-neon-fuchsia" size={20} />
                    </motion.div>
                    <span className="text-[10px] font-mono text-neon-fuchsia">WAF/Auth</span>
                </div>
            </foreignObject>

            {/* Server / API Gateway Node */}
            <foreignObject x="355" y="130" width="90" height="140">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <div className="w-18 h-18 rounded-2xl bg-indigo-600/20 border border-indigo-500 flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.3)]">
                        <Server size={28} className="text-indigo-400" />
                    </div>
                    <span className="text-[10px] font-mono text-indigo-300">API Gateway</span>
                </div>
            </foreignObject>

            {/* Redis Node */}
            <foreignObject x="545" y="45" width="70" height="110">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <div className="w-11 h-11 rounded-xl bg-red-900/20 border border-red-500/50 flex items-center justify-center">
                        <Zap size={18} className="text-red-400" />
                    </div>
                    <span className="text-[10px] font-mono text-red-400">Redis</span>
                </div>
            </foreignObject>

            {/* Postgres Node */}
            <foreignObject x="545" y="245" width="70" height="110">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <div className="w-11 h-11 rounded-xl bg-blue-900/20 border border-blue-500/50 flex items-center justify-center">
                        <Database size={18} className="text-blue-400" />
                    </div>
                    <span className="text-[10px] font-mono text-blue-400">Postgres</span>
                </div>
            </foreignObject>

            {/* Resend Node */}
            <foreignObject x="675" y="145" width="70" height="110">
                <div className="flex flex-col items-center gap-2 text-center select-none">
                    <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center">
                        <Mail className="text-white" size={20} />
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">Resend</span>
                </div>
            </foreignObject>
        </svg>
    </div>
  );
};

// Animated Paths Subcomponents
const ClientRequestPath = () => (
    <motion.circle r="4" fill="#fff">
        <motion.animateMotion 
            dur="4s" 
            repeatCount="indefinite"
            path="M 100,200 L 250,200 L 400,200"
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
            path="M 400,200 L 580,100 L 400,200"
        />
    </motion.circle>
);

const DBPath = () => (
    <motion.circle r="3" fill="#60a5fa">
        <motion.animateMotion 
            dur="3s" 
            begin="1.5s"
            repeatCount="indefinite"
            path="M 400,200 L 580,300 L 400,200"
        />
    </motion.circle>
);

const EmailPath = () => (
    <motion.circle r="3" fill="#fff">
        <motion.animateMotion 
            dur="4s" 
            begin="2s"
            repeatCount="indefinite"
            path="M 400,200 L 710,200"
        />
    </motion.circle>
);

export default SystemArchitecture;