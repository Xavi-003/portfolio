import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Database, Server, Globe, Cpu, Zap } from 'lucide-react';

// The defined path for the data request
const pipelineSteps = [
    {
        id: 'client',
        label: 'React Client',
        subtext: 'Frontend State',
        icon: Globe,
        color: 'text-cyan-400',
        glow: 'shadow-cyan-400/50',
        code: `const fetchData = async () => {
  dispatch({ type: 'FETCH_START' });
  await api.get('/users');
};`,
        techs: ['React', 'Next.js', 'Tailwind', 'Zustand']
    },
    {
        id: 'gateway',
        label: 'API Gateway',
        subtext: 'Load Balancing',
        icon: Server,
        color: 'text-neon-fuchsia',
        glow: 'shadow-neon-fuchsia/50',
        code: `app.use(async (req, res, next) => {
  const token = req.headers.authorization;
  if (await verify(token)) next();
});`,
        techs: ['NGINX', 'Express', 'GraphQL', 'Auth0']
    },
    {
        id: 'service',
        label: 'Microservice',
        subtext: 'Business Logic',
        icon: Cpu,
        color: 'text-neon-violet',
        glow: 'shadow-neon-violet/50',
        code: `async function getUserStats(userId) {
  const data = await redis.get(userId);
  if (!data) return db.query(userId);
  return JSON.parse(data);
}`,
        techs: ['Node.js', 'Go', 'Docker', 'K8s']
    },
    {
        id: 'database',
        label: 'Persistence',
        subtext: 'Data Layer',
        icon: Database,
        color: 'text-emerald-400',
        glow: 'shadow-emerald-400/50',
        code: `SELECT * FROM user_metrics 
WHERE user_id = $1 
AND status = 'active'
LIMIT 1;`,
        techs: ['PostgreSQL', 'Redis', 'MongoDB', 'Prisma']
    }
];

const Skills: React.FC = () => {
    const [activeStepIndex, setActiveStepIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveStepIndex((prev) => (prev + 1) % pipelineSteps.length);
        }, 3000); // 3 seconds per step to read the code
        return () => clearInterval(interval);
    }, []);

    const activeStep = pipelineSteps[activeStepIndex];

    return (
        <section className="min-h-screen lg:h-screen w-full flex flex-col items-center justify-center px-4 py-12 lg:py-16 relative z-10 overflow-x-hidden">
            {/* Background Tech Grid */}
            <div className="absolute inset-0 z-0 opacity-10"
                style={{ backgroundImage: 'linear-gradient(#7c3aed 1px, transparent 1px), linear-gradient(90deg, #7c3aed 1px, transparent 1px)', backgroundSize: '50px 50px' }}>
            </div>

            <div className="w-full max-w-7xl relative z-10">

                {/* Header */}
                <div className="text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-md"
                    >
                        <Zap size={14} className="text-yellow-400 fill-yellow-400" />
                        <span className="text-xs font-mono text-gray-300 uppercase tracking-wider">Real-time Stack Visualization</span>
                    </motion.div>
                    <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-4">
                        The <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-fuchsia">Request Pipeline</span>
                    </h2>
                </div>

                {/* Pipeline Container */}
                <div className="flex flex-col lg:flex-row items-stretch gap-6 lg:gap-4 relative">

                    {/* Connecting Line (Desktop Background) */}
                    <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-white/5 -z-10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-transparent via-neon-fuchsia to-transparent w-1/3 blur-sm"
                            animate={{ x: ['-100%', '400%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                    </div>

                    {pipelineSteps.map((step, index) => {
                        const isActive = index === activeStepIndex;
                        const Icon = step.icon;

                        return (
                            <div key={step.id} className="flex-1 relative group self-stretch h-full">
                                {/* Mobile Connector Line */}
                                {index !== pipelineSteps.length - 1 && (
                                    <div className="lg:hidden absolute left-8 top-20 bottom-[-2rem] w-0.5 bg-white/10 z-0" />
                                )}

                                {/* Node Card */}
                                <motion.div
                                    layout
                                    className={`relative z-10 p-1 rounded-3xl transition-all duration-500 h-full ${isActive ? 'bg-gradient-to-br from-white/20 to-white/5 scale-105' : 'bg-transparent'}`}
                                >
                                    <div className={`relative p-4 lg:p-5 rounded-[1.3rem] bg-[#0a0015] border transition-all duration-500 flex flex-col h-full ${isActive ? `border-${step.color.split('-')[1]}-500 shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]` : 'border-white/10 hover:border-white/20'}`}>

                                        {/* Node Header */}
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className={`relative w-12 h-12 lg:w-14 lg:h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isActive ? `${step.color} bg-white/10 ${step.glow} shadow-lg` : 'text-gray-500 bg-white/5'}`}>
                                                <Icon size={28} />
                                                {isActive && (
                                                    <span className="absolute inset-0 rounded-2xl border border-current animate-ping opacity-30" />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className={`font-display font-bold text-lg lg:text-xl transition-colors duration-300 ${isActive ? 'text-white' : 'text-gray-400'}`}>
                                                    {step.label}
                                                </h3>
                                                <p className="text-xs font-mono text-gray-500 uppercase tracking-wider">{step.subtext}</p>
                                            </div>
                                        </div>

                                        {/* Tech Stack Tags */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {step.techs.map(tech => (
                                                <span
                                                    key={tech}
                                                    className={`px-2 py-1 rounded text-[10px] font-mono border transition-colors duration-300 ${isActive ? `border-${step.color.split('-')[1]}-500/30 text-white bg-white/5` : 'border-white/5 text-gray-600 bg-transparent'}`}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        {/* Active State Indicator */}
                                        <div className={`mt-auto h-1 w-full rounded-full overflow-hidden bg-white/5 ${isActive ? 'opacity-100' : 'opacity-0'}`}>
                                            <motion.div
                                                className={`h-full ${step.color.replace('text-', 'bg-')}`}
                                                initial={{ width: 0 }}
                                                animate={{ width: '100%' }}
                                                transition={{ duration: 3, ease: "linear" }}
                                            />
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Processing Pulse (Desktop between nodes) */}
                                {isActive && index !== pipelineSteps.length - 1 && (
                                    <motion.div
                                        layoutId="pulse-orb"
                                        className={`hidden lg:block absolute top-[3.5rem] -right-6 w-4 h-4 rounded-full ${step.color.replace('text-', 'bg-')} z-20 shadow-[0_0_20px_currentColor]`}
                                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                    />
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* Live Code Terminal */}
                <motion.div
                    className="mt-8 lg:mt-10 w-full max-w-3xl mx-auto glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <div className="flex items-center justify-between px-4 py-3 bg-black/40 border-b border-white/5">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50" />
                            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50" />
                            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50" />
                        </div>
                        <div className="text-xs font-mono text-gray-500 flex items-center gap-2">
                            <Terminal size={12} />
                            process_monitor.exe
                        </div>
                        <div className="w-12" /> {/* Spacer */}
                    </div>

                    <div className="p-4 lg:p-6 bg-[#05010a] font-mono text-xs lg:text-sm relative h-36 lg:h-40 flex items-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeStep.id}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="w-full"
                            >
                                <div className="flex items-center gap-2 mb-2 opacity-50">
                                    <span className={`${activeStep.color}`}>➜</span>
                                    <span className="text-gray-400">~/{activeStep.id}/execute</span>
                                </div>
                                <pre className={`${activeStep.color} drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]`}>
                                    <code>{activeStep.code}</code>
                                </pre>

                                {/* Blinking Cursor */}
                                <motion.div
                                    animate={{ opacity: [0, 1] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className={`w-2.5 h-5 ${activeStep.color.replace('text-', 'bg-')} mt-2 inline-block`}
                                />
                            </motion.div>
                        </AnimatePresence>

                        {/* Scanlines */}
                        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,19,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Skills;