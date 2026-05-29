import React, { useState, useRef, MouseEvent, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Project } from '../types';
import { ExternalLink, Github, X, ArrowUpRight, Code2, Layers, ChevronLeft, ChevronRight, TrendingUp, Terminal, Cpu, Lock, Play, Activity } from 'lucide-react';

const projects: Project[] = [
  {
    id: 1,
    title: "Spot • Futures • Bot",
    category: "FinTech / Trading",
    image: "",
    description: "A comprehensive trading platform featuring spot and futures markets. Includes real-time charting, order book management, and high-frequency matching engine.",
    tech: ["React", "Node.js", "WebSockets", "PostgreSQL"]
  },
  {
    id: 2,
    title: "Selvi Construction",
    category: "Corporate Website",
    image: "",
    description: "Modern corporate website for Selvi Construction, showcasing their portfolio, services, and company history with a premium design aesthetic.",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"]
  },
  {
    id: 3,
    title: "AlgoBot Prime",
    category: "Automated Trading",
    image: "",
    description: "Advanced trading bot supporting Grid, DCA (Dollar Cost Averaging), and Arbitrage strategies. Features backtesting engine and real-time performance monitoring.",
    tech: ["Python", "FastAPI", "Docker", "Redis"]
  },
  {
    id: 4,
    title: "Vortex",
    category: "P2P Chat / WebRTC",
    image: "",
    description: "A premium, end-to-end encrypted P2P chat application. Built with WebRTC and a hybrid signaling approach for seamless auto-reconnection, featuring a modern, dark-themed UI inspired by WhatsApp Web.",
    tech: ["WebRTC", "Node.js", "Socket.io", "JavaScript"]
  },
  {
    id: 5,
    title: "Mini Games Arcade",
    category: "Web App / Gaming",
    image: "",
    description: "A collection of classic mini-games including Tic-Tac-Toe, Snake, and Memory Match. Built with React and PWA support for offline play.",
    tech: ["React", "Vite", "PWA", "Tailwind CSS"]
  }
];

// Theme configurations for border spotlights and card backdrops
const projectThemes: Record<number, { glow: string; text: string; bg: string; radial: string }> = {
  1: { glow: 'rgba(249, 115, 22, 0.45)', text: 'text-orange-400', bg: 'bg-orange-500', radial: 'rgba(249, 115, 22, 0.2)' },
  2: { glow: 'rgba(99, 102, 241, 0.45)', text: 'text-indigo-400', bg: 'bg-indigo-500', radial: 'rgba(99, 102, 241, 0.2)' },
  3: { glow: 'rgba(6, 182, 212, 0.45)', text: 'text-cyan-400', bg: 'bg-cyan-500', radial: 'rgba(6, 182, 212, 0.2)' },
  4: { glow: 'rgba(16, 185, 129, 0.45)', text: 'text-emerald-400', bg: 'bg-emerald-500', radial: 'rgba(16, 185, 129, 0.2)' },
  5: { glow: 'rgba(232, 121, 249, 0.45)', text: 'text-fuchsia-400', bg: 'bg-fuchsia-500', radial: 'rgba(232, 121, 249, 0.2)' }
};

const projectMetrics = {
  1: [
    { label: 'Execution Latency', value: '<5ms' },
    { label: 'Matching Engine Capacity', value: '10k tx/sec' },
    { label: 'Server Uptime', value: '99.99%' },
    { label: 'Daily Simulated Vol', value: '$2.5M+' }
  ],
  2: [
    { label: 'Initial Page Load', value: '0.4s' },
    { label: 'Lighthouse SEO Score', value: '100%' },
    { label: 'Animation Smoothness', value: '60 FPS' },
    { label: 'Layout Adaptability', value: 'Fluid' }
  ],
  3: [
    { label: 'Execution Speed', value: '<12ms' },
    { label: 'Simulated Strategy Profit', value: '+14.2%' },
    { label: 'Grid Levels Span', value: '10 - 200' },
    { label: 'Backtest Historical Depth', value: '15 Years' }
  ],
  4: [
    { label: 'Connection Protocol', value: 'WebRTC P2P' },
    { label: 'Crypto Algorithm', value: 'AES-GCM-256' },
    { label: 'Signaling Handshake Delay', value: '<40ms' },
    { label: 'Tunnel Auto-reconnect', value: '<1s' }
  ],
  5: [
    { label: 'Lighthouse PWA Score', value: '100%' },
    { label: 'Offline Asset Latency', value: '0ms (Cached)' },
    { label: 'Render Loop Stability', value: '60hz VSync' },
    { label: 'Bundle Size (Gzipped)', value: '<80KB' }
  ]
};

const projectArchitectureDetails = {
  1: [
    { tech: 'React', description: 'Powering the high-performance ticker board UI and dynamic layouts without lag.' },
    { tech: 'Node.js', description: 'Runs a high-frequency trading matching server with robust socket channels.' },
    { tech: 'WebSockets', description: 'Handles bidirectional client-server communications for price feeds.' },
    { tech: 'PostgreSQL', description: 'Ensures structured transaction preservation and user account ledger safety.' }
  ],
  2: [
    { tech: 'Next.js', description: 'Enables Server Side Rendering (SSR) for instant first paint and robust SEO indexing.' },
    { tech: 'Framer Motion', description: 'Drives hardware-accelerated transitions and interactive view scrolls.' },
    { tech: 'Tailwind CSS', description: 'Streamlines clean architectural styles using responsive design utilities.' }
  ],
  3: [
    { tech: 'Python', description: 'Processes deep mathematical algorithms and handles backtesting logic threads.' },
    { tech: 'FastAPI', description: 'Ultra-fast API execution mapping algorithm positions directly to the client.' },
    { tech: 'Redis', description: 'Low-latency caching for real-time order books and grid parameters.' },
    { tech: 'Docker', description: 'Containerizes isolated execution environments for separate client strategies.' }
  ],
  4: [
    { tech: 'WebRTC', description: 'Enables direct browser-to-browser data tunnels, skipping cloud servers completely.' },
    { tech: 'Node.js', description: 'Coordinates the initial signaling server setup and client configurations.' },
    { tech: 'Socket.io', description: 'Provides real-time event messaging fallback during handshake sessions.' },
    { tech: 'JavaScript', description: 'Core API coordination managing stream negotiation and packet handshakes.' }
  ],
  5: [
    { tech: 'React', description: 'Powers the interactive board layout, scoring metrics, and game loops.' },
    { tech: 'Vite', description: 'Drives lightning-fast hot reloading and compiles highly optimized, minified bundles.' },
    { tech: 'PWA', description: 'Implements service workers for offline routing, asset caching, and offline play.' },
    { tech: 'Tailwind CSS', description: 'Handles retro layout styling, pixel panels, and responsive grid bounds.' }
  ]
};

const projectCodeSnippets = {
  1: `// Spot • Futures • Bot Order Match Engine
const matchOrders = (buyOrders, sellOrders) => {
  const matches = [];
  while (buyOrders.length && sellOrders.length) {
    const buy = buyOrders[0];
    const sell = sellOrders[0];
    if (buy.price >= sell.price) {
      const matchQty = Math.min(buy.qty, sell.qty);
      matches.push({
        price: sell.price,
        qty: matchQty,
        time: Date.now()
      });
      buy.qty -= matchQty;
      sell.qty -= matchQty;
      if (buy.qty === 0) buyOrders.shift();
      if (sell.qty === 0) sellOrders.shift();
    } else {
      break;
    }
  }
  return matches;
};`,
  2: `// Next.js Architectural Hero Page Transition
export const HeaderTransition = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="backdrop-blur-md bg-black/30 border-b border-white/5"
    >
      <div className="container mx-auto px-6 py-4 flex justify-between">
        <Logo />
        <Navigation />
      </div>
    </motion.header>
  );
};`,
  3: `// AlgoBot Prime DCA Strategy Executor
class DCAStrategy:
    def __init__(self, base_order, safety_orders, deviation):
        self.base_order = base_order
        self.safety_orders = safety_orders
        self.deviation = deviation
        
    def execute_next_tier(self, current_price, avg_buy_price):
        trigger_price = avg_buy_price * (1 - self.deviation)
        if current_price <= trigger_price:
            new_qty = self.base_order * (2 ** len(self.safety_orders))
            return {
                "action": "BUY",
                "price": current_price,
                "qty": new_qty,
                "type": "SAFETY_ORDER"
            }
        return {"action": "HOLD"}`,
  4: `// Vortex Chat WebRTC E2EE Handshake
const initiatePeerConnection = async (peerId, stream) => {
  const peer = new RTCPeerConnection({
    iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
  });
  stream.getTracks().forEach(track => peer.addTrack(track, stream));
  
  const offer = await peer.createOffer();
  await peer.setLocalDescription(offer);
  
  socket.emit('webrtc-offer', {
    target: peerId,
    sdp: peer.localDescription
  });
  
  return peer;
};`,
  5: `// Mini Games Arcade Service Worker Cache
const CACHE_NAME = 'arcade-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/assets/index.js',
  '/assets/index.css',
  '/manifest.json'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});`
};

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
  const [price, setPrice] = useState(64231.45);
  const [percentChange, setPercentChange] = useState(2.45);
  const [trades, setTrades] = useState([
    { id: 1, type: 'BUY', qty: '0.450', price: '64,230.00', time: '13:54:12' },
    { id: 2, type: 'SELL', qty: '1.120', price: '64,232.50', time: '13:54:15' },
    { id: 3, type: 'BUY', qty: '0.085', price: '64,231.10', time: '13:54:18' }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = (Math.random() - 0.48) * 15;
      setPrice(prev => {
        const next = Number((prev + diff).toFixed(2));
        setPercentChange(p => Number((p + (diff > 0 ? 0.01 : -0.01)).toFixed(2)));
        
        // Add new trade
        setTrades(t => {
          const newTrade = {
            id: Date.now(),
            type: diff > 0 ? 'BUY' : 'SELL',
            qty: (Math.random() * 2 + 0.01).toFixed(3),
            price: next.toLocaleString('en-US', { minimumFractionDigits: 2 }),
            time: new Date().toLocaleTimeString('en-US', { hour12: false })
          };
          return [newTrade, ...t.slice(0, 2)];
        });
        return next;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#07020d] relative overflow-hidden flex flex-col p-3 font-mono text-[9px] text-gray-400 select-none">
      {/* Top Ticker */}
      <div className="flex justify-between items-center border-b border-white/5 pb-2 mb-2">
        <div className="flex items-center gap-1.5">
          <span className="px-1.5 py-0.5 rounded bg-orange-500/10 text-orange-500 font-bold text-[8px]">BTC/USDT</span>
          <span className="text-white font-bold text-xs font-mono">${price.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
        </div>
        <span className={`flex items-center gap-0.5 text-[8px] font-bold ${percentChange >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
          {percentChange >= 0 ? '+' : ''}{percentChange}%
          <TrendingUp size={10} />
        </span>
      </div>

      {/* Grid Chart */}
      <div className="flex-1 relative min-h-0 flex gap-2">
        {/* Sparkline */}
        <div className="flex-1 relative border border-white/5 rounded bg-black/40 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Grid Lines */}
            <line x1="0" y1="25" x2="100" y2="25" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            <line x1="0" y1="75" x2="100" y2="75" stroke="rgba(255,255,255,0.03)" strokeWidth="0.5" />
            
            {/* Sparkline Area */}
            <path d="M 0 80 Q 20 40 40 60 T 80 30 T 100 45 L 100 100 L 0 100 Z" fill="url(#chartGlow)" />
            {/* Sparkline Stroke */}
            <path d="M 0 80 Q 20 40 40 60 T 80 30 T 100 45" fill="none" stroke="#f97316" strokeWidth="1.2" />
            
            {/* Live pulsing dot */}
            <circle cx="100" cy="45" r="2" fill="#f97316" className="animate-pulse" />
          </svg>
          <div className="absolute top-1 left-2 text-[7px] text-gray-500 uppercase tracking-widest font-bold">SPOT MARKET</div>
        </div>

        {/* Mini Order Book */}
        <div className="w-[80px] flex flex-col gap-1 border border-white/5 rounded p-1 bg-black/40 shrink-0">
          <div className="text-[7px] font-bold text-gray-500 uppercase tracking-wider">Order Book</div>
          
          {/* Asks (Reds) */}
          <div className="flex flex-col gap-0.5">
            {[64245, 64238, 64234].map((p, idx) => (
              <div key={idx} className="flex justify-between text-[7px] text-rose-400 relative overflow-hidden">
                <span className="z-10">{p}</span>
                <span className="z-10 text-gray-500">{(Math.random() * 0.4 + 0.05).toFixed(3)}</span>
                <div className="absolute right-0 top-0 bottom-0 bg-rose-500/10 z-0" style={{ width: `${Math.random() * 60 + 10}%` }} />
              </div>
            ))}
          </div>

          <div className="h-[1px] bg-white/5 my-0.5" />

          {/* Bids (Greens) */}
          <div className="flex flex-col gap-0.5">
            {[64228, 64222, 64215].map((p, idx) => (
              <div key={idx} className="flex justify-between text-[7px] text-emerald-400 relative overflow-hidden">
                <span className="z-10">{p}</span>
                <span className="z-10 text-gray-500">{(Math.random() * 0.4 + 0.05).toFixed(3)}</span>
                <div className="absolute right-0 top-0 bottom-0 bg-emerald-500/10 z-0" style={{ width: `${Math.random() * 60 + 10}%` }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Trade History Ticker (Bottom) */}
      <div className="mt-2 border-t border-white/5 pt-1 flex flex-col gap-0.5 h-[34px] overflow-hidden justify-end">
        {trades.map(trade => (
          <div key={trade.id} className="flex justify-between text-[7px] tracking-tight">
            <span className={trade.type === 'BUY' ? 'text-emerald-400' : 'text-rose-400'}>[{trade.type}]</span>
            <span className="text-white">{trade.qty} BTC</span>
            <span>@{trade.price}</span>
            <span className="text-gray-600">{trade.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
});

TradingChartVisual.displayName = 'TradingChartVisual';

const CorporateMockupVisual = React.memo(() => {
  return (
    <div className="w-full h-full bg-[#0d0d12] p-2 flex flex-col" style={{ willChange: 'transform' }}>
      {/* Browser Header */}
      <div className="flex items-center gap-1.5 px-3 py-1.5 bg-[#171721] rounded-t-lg border-b border-white/5 shrink-0 select-none">
        <div className="w-1.5 h-1.5 rounded-full bg-rose-500/80" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-500/80" />
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80" />
        <div className="w-44 h-3.5 rounded bg-black/40 border border-white/5 ml-4 flex items-center justify-center text-[7px] text-gray-500 font-mono">
          selvi-construction.com
        </div>
      </div>

      {/* Browser Body & Scrolling Page */}
      <div className="flex-1 bg-black rounded-b-lg overflow-hidden relative">
        <div className="absolute inset-x-0 top-0 h-6 z-10 pointer-events-none bg-gradient-to-b from-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-8 z-10 pointer-events-none bg-gradient-to-t from-black to-transparent" />
        
        {/* Mock Scrolling Webpage */}
        <div className="w-full flex flex-col gap-6 p-4 animate-auto-scroll origin-top bg-gradient-to-b from-[#0b0b0f] via-[#12121c] to-[#07070a]">
          {/* Header */}
          <div className="flex justify-between items-center pb-2 border-b border-white/5 text-white">
            <span className="text-[9px] font-bold tracking-widest font-display text-indigo-400">SELVİ</span>
            <div className="flex gap-2 text-[5px] text-gray-400 font-mono">
              <span>ABOUT</span>
              <span>PORTFOLIO</span>
              <span>CAREERS</span>
            </div>
          </div>

          {/* Hero */}
          <div className="text-center py-2 flex flex-col items-center">
            <div className="text-[11px] font-bold text-white leading-tight font-display tracking-tight max-w-[200px]">
              Crafting Landmark Structures
            </div>
            <div className="text-[5px] text-indigo-200/50 font-mono mt-1 max-w-[150px] leading-relaxed">
              Combining state-of-the-art engineering with timeless architecture.
            </div>
            <div className="mt-2 px-2 py-0.5 rounded bg-indigo-500 text-white text-[5px] font-bold font-mono tracking-wider">
              PORTFOLIO
            </div>
          </div>

          {/* Buildings list */}
          <div className="grid grid-cols-2 gap-2">
            {[
              { title: 'The Vertex Tower', desc: 'Premium Office Space', color: 'bg-indigo-950/20 border-indigo-500/10' },
              { title: 'Selvi Residence', desc: 'Modern Luxury Condos', color: 'bg-violet-950/20 border-violet-500/10' },
              { title: 'Nexus Plaza', desc: 'Mixed-Use Urban Hub', color: 'bg-purple-950/20 border-purple-500/10' },
              { title: 'Aero Depot', desc: 'Logistics Facility', color: 'bg-blue-950/20 border-blue-500/10' }
            ].map((p, idx) => (
              <div key={idx} className={`p-1.5 border rounded-md ${p.color} flex flex-col gap-1 text-left`}>
                <div className="w-full h-10 rounded bg-black/60 relative overflow-hidden flex items-center justify-center border border-white/5">
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,_transparent_1px),_linear-gradient(90deg,_rgba(255,255,255,0.015)_1px,_transparent_1px)] bg-[size:6px_6px]" />
                  <div className="w-4 h-6 border border-white/10 rounded flex items-end justify-center relative bg-white/2">
                    <div className="w-2.5 h-4 border-t border-x border-white/20 bg-white/5" />
                  </div>
                </div>
                <div className="text-[7px] font-bold text-white tracking-wide truncate">{p.title}</div>
                <div className="text-[5px] text-gray-500 font-mono truncate">{p.desc}</div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-1 py-1.5 border-y border-white/5 text-center bg-white/2">
            <div>
              <div className="text-[7px] font-bold text-white">120+</div>
              <div className="text-[4px] text-gray-500">PROJECTS</div>
            </div>
            <div>
              <div className="text-[7px] font-bold text-white">45</div>
              <div className="text-[4px] text-gray-500">AWARDS</div>
            </div>
            <div>
              <div className="text-[7px] font-bold text-white">100%</div>
              <div className="text-[4px] text-gray-500">SAFETY</div>
            </div>
          </div>

          {/* Contact */}
          <div className="py-2 text-center text-[5px] text-gray-600 font-mono">
            © 2026 Selvi Construction. Built with Next.js.
          </div>
        </div>
      </div>
    </div>
  );
});

CorporateMockupVisual.displayName = 'CorporateMockupVisual';

const BotVisual = React.memo(() => {
  const [logs, setLogs] = useState<string[]>([
    'INIT: Core systems load OK.',
    'API: Binance WebSocket connected.',
    'SCAN: Arbitrage opportunities ok.'
  ]);

  useEffect(() => {
    const logPool = [
      'SCAN: Spreads checked: OK',
      'API: Coinbase WebSocket synced',
      'DCA: Level #3 order check... OK',
      'GRID: Buy level filled: $64,120',
      'ARBITRAGE: Spread Binance/Coinbase 0.38%',
      'ORDER: Sell target set: $64,280',
      'STATS: Hourly PnL: +0.0234 BTC',
      'TELEGRAM: Status check sent'
    ];

    const interval = setInterval(() => {
      setLogs(l => {
        const nextLog = `[${new Date().toLocaleTimeString('en-US', { hour12: false })}] ` + logPool[Math.floor(Math.random() * logPool.length)];
        return [...l.slice(1), nextLog];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#030712] relative overflow-hidden flex flex-col p-3 font-mono text-[8px] text-cyan-400 select-none">
      {/* Node Grid Animation Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Terminal Title */}
      <div className="flex justify-between items-center border-b border-cyan-950 pb-1 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <Terminal size={10} className="text-cyan-400" />
          <span className="text-white font-bold tracking-wide">algobot-prime@core:~</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-cyan-400/80 text-[7px]">RUNNING</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 gap-1.5 mb-2 shrink-0">
        <div className="p-1 border border-cyan-950/40 rounded bg-cyan-950/10 flex items-center justify-between">
          <span className="text-cyan-500/60">ACTIVE_GRIDS</span>
          <span className="text-white font-bold">14</span>
        </div>
        <div className="p-1 border border-cyan-950/40 rounded bg-cyan-950/10 flex items-center justify-between">
          <span className="text-cyan-500/60">DAILY_PNL</span>
          <span className="text-emerald-400 font-bold">+12.45%</span>
        </div>
      </div>

      {/* Console output log stream */}
      <div className="flex-1 bg-black/40 border border-cyan-950/30 rounded p-1.5 flex flex-col gap-1 overflow-hidden">
        <div className="text-cyan-600/80 text-[6px] uppercase tracking-wider mb-0.5 border-b border-cyan-950/10 pb-0.5">Terminal Output Logs</div>
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className={`truncate font-mono tracking-tight leading-normal ${
              log.includes('filled') || log.includes('PnL') ? 'text-emerald-400' : 'text-cyan-400/80'
            }`}
          >
            {log}
          </motion.div>
        ))}
        {/* Blinking Cursor */}
        <div className="flex items-center gap-0.5 mt-0.5">
          <span className="text-cyan-500/50">$</span>
          <div className="w-1.5 h-2.5 bg-cyan-400 animate-cursor" />
        </div>
      </div>

      {/* Running graph at the bottom */}
      <div className="mt-2 h-8 flex items-end gap-0.5 px-1 bg-cyan-950/5 border-t border-cyan-950/20 pt-1 shrink-0 justify-between">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="w-full bg-cyan-500/30 rounded-t-sm"
            animate={{
              height: [
                `${Math.random() * 70 + 30}%`,
                `${Math.random() * 70 + 30}%`,
                `${Math.random() * 70 + 30}%`
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.08
            }}
          />
        ))}
      </div>
    </div>
  );
});

BotVisual.displayName = 'BotVisual';

const ChatVisual = React.memo(() => {
  const [messages, setMessages] = useState([
    { from: 'peer', text: 'Hey! Connection established 🔒', time: '13:58' },
    { from: 'self', text: 'Awesome, running WebRTC P2P direct stream.', time: '13:58' },
    { from: 'peer', text: 'End-to-end encrypted with AES-256-GCM.', time: '13:59' }
  ]);

  useEffect(() => {
    const responsePool = [
      { from: 'peer', text: 'Latency: 28ms. Video packet loss: 0%', time: '13:59' },
      { from: 'self', text: 'Awesome, ICE candidate negotiations complete.', time: '14:00' },
      { from: 'peer', text: 'Audio encryption key exchanged successfully.', time: '14:00' }
    ];

    const interval = setInterval(() => {
      setMessages(m => {
        // Reset if we show everything
        if (m.length >= 6) {
          return [
            { from: 'peer', text: 'Hey! Connection established 🔒', time: '13:58' },
            { from: 'self', text: 'Awesome, running WebRTC P2P direct stream.', time: '13:58' },
            { from: 'peer', text: 'End-to-end encrypted with AES-256-GCM.', time: '13:59' }
          ];
        }
        const nextMessage = responsePool[m.length - 3];
        return [...m, nextMessage];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full bg-[#050f0c] relative overflow-hidden flex flex-col p-3 font-mono text-[8px] text-emerald-400 select-none">
      {/* E2EE Header Banner */}
      <div className="flex items-center justify-between border-b border-emerald-950 pb-2 mb-2 shrink-0">
        <div className="flex items-center gap-1.5">
          <div className="relative">
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white text-[9px] font-bold">VX</div>
            <div className="absolute -bottom-0.5 -right-0.5 w-1.5 h-1.5 rounded-full bg-emerald-400 border border-[#050f0c]" />
          </div>
          <div>
            <div className="text-white font-bold leading-none">vortex-channel_0x42</div>
            <div className="text-emerald-500/60 text-[6px] mt-0.5">● SECURE PEER TUNNEL</div>
          </div>
        </div>
        <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-[7px]">
          <Lock size={8} />
          <span>E2EE</span>
        </div>
      </div>

      {/* Network handshake nodes overlay */}
      <div className="flex justify-between items-center px-2 py-1 bg-emerald-950/15 border border-emerald-950/30 rounded mb-2 shrink-0 text-[7px]">
        <div className="flex items-center gap-1">
          <Cpu size={8} className="text-teal-400 animate-pulse" />
          <span>PEER_A</span>
        </div>
        <div className="flex-1 border-t border-dashed border-emerald-500/30 mx-3 relative flex items-center justify-center">
          <motion.div
            className="w-1 h-1 rounded-full bg-emerald-400 absolute"
            animate={{ x: [-25, 25] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
        <div className="flex items-center gap-1">
          <span>PEER_B</span>
          <Cpu size={8} className="text-teal-400" />
        </div>
      </div>

      {/* Message Area */}
      <div className="flex-1 bg-black/40 border border-emerald-950/20 rounded p-1.5 flex flex-col gap-1.5 overflow-hidden">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.from === 'self' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-2 py-1 rounded-lg border relative font-mono text-[7px] leading-snug ${
              msg.from === 'self'
                ? 'bg-emerald-950/30 border-emerald-500/30 text-white rounded-br-none'
                : 'bg-black/50 border-white/5 text-gray-300 rounded-bl-none'
            }`}>
              {msg.text}
              <span className="block text-[5px] text-right opacity-40 mt-0.5">{msg.time}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Audio Waveform visualization at bottom */}
      <div className="mt-2 flex items-center justify-center gap-2 border-t border-emerald-950/20 pt-1.5 shrink-0">
        <div className="text-[6px] text-emerald-500/50 uppercase tracking-widest font-bold flex items-center gap-1">
          <Activity size={8} /> Waveform
        </div>
        <div className="flex items-center gap-0.5 h-3">
          {[...Array(9)].map((_, i) => (
            <motion.div
              key={i}
              className="w-[1.2px] bg-emerald-400 rounded-full"
              style={{ height: '100%' }}
              animate={{
                scaleY: [0.2, 1, 0.2]
              }}
              transition={{
                duration: 0.8 + (i * 0.1),
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
});

ChatVisual.displayName = 'ChatVisual';

const GameVisual = React.memo(() => {
  const [playerPosition, setPlayerPosition] = useState({ x: 4, y: 8 });
  const [obstacles, setObstacles] = useState([
    { x: 2, y: 1 },
    { x: 5, y: -2 },
    { x: 7, y: -5 }
  ]);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setObstacles(prev => {
        return prev.map(obs => {
          let nextY = obs.y + 1;
          if (nextY > 9) {
            nextY = -2;
            setScore(s => s + 10);
            return { x: Math.floor(Math.random() * 9), y: nextY };
          }
          return { ...obs, y: nextY };
        });
      });

      setPlayerPosition(player => {
        const danger = obstacles.find(obs => obs.y >= player.y - 2 && obs.y < player.y && obs.x === player.x);
        if (danger) {
          const newX = player.x > 0 ? player.x - 1 : player.x + 1;
          return { ...player, x: newX };
        }
        return player;
      });
    }, 300);

    return () => clearInterval(gameLoop);
  }, [obstacles]);

  return (
    <div className="w-full h-full bg-[#0a0512] relative overflow-hidden flex flex-col p-2 items-center justify-between font-mono text-[8px] text-fuchsia-400 select-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-fuchsia-950/20 via-transparent to-transparent pointer-events-none" />
      
      {/* Game Header */}
      <div className="w-full flex justify-between items-center border-b border-fuchsia-950/30 pb-1 mb-1 shrink-0">
        <div className="flex items-center gap-1 text-white font-bold text-[7px] tracking-widest uppercase">
          <Play size={8} className="text-fuchsia-500 fill-fuchsia-500/20" />
          <span>ARCADE CORE</span>
        </div>
        <div className="text-fuchsia-400 font-bold font-mono text-[8px]">
          SCORE: <span className="text-white">{score}</span>
        </div>
      </div>

      {/* Screen Frame */}
      <div className="w-full flex-1 border border-fuchsia-900/30 rounded-lg bg-black relative flex items-center justify-center overflow-hidden p-0.5 shadow-[inset_0_0_10px_rgba(217,70,239,0.2)]">
        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,_rgba(0,0,0,0.25)_50%)] bg-[size:100%_2.5px] z-20" />
        
        {/* Grid cells */}
        <div className="w-28 h-28 relative bg-[#07010a] border border-fuchsia-950/40 rounded flex flex-col justify-between overflow-hidden">
          {obstacles.map((obs, idx) => (
            obs.y >= 0 && obs.y < 10 && (
              <motion.div
                key={idx}
                className="w-2 h-2 rounded bg-rose-500 absolute border border-rose-400 shadow-[0_0_6px_rgba(239,68,68,0.7)]"
                style={{
                  left: `${obs.x * 10}%`,
                  top: `${obs.y * 10}%`
                }}
              />
            )
          ))}

          <div
            className="w-2 h-2 rounded bg-fuchsia-400 absolute border border-fuchsia-300 shadow-[0_0_6px_rgba(217,70,239,0.7)] flex items-center justify-center transition-all duration-150"
            style={{
              left: `${playerPosition.x * 10}%`,
              top: `${playerPosition.y * 10}%`
            }}
          >
            <div className="w-0.5 h-0.5 bg-white rounded-full" />
          </div>
        </div>
      </div>

      {/* Controller Buttons */}
      <div className="w-full flex justify-between items-center px-1 mt-1 shrink-0 text-[5px] text-gray-600">
        <div className="flex items-center gap-0.5 font-bold">
          <div className="w-3.5 h-3.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center font-mono">◀</div>
          <div className="w-3.5 h-3.5 bg-white/5 border border-white/10 rounded-full flex items-center justify-center font-mono">▶</div>
          <span className="font-mono text-[6px] text-gray-500 uppercase tracking-widest ml-1">STEER</span>
        </div>
        <div className="flex gap-1">
          <div className="w-3.5 h-3.5 bg-rose-500/20 border border-rose-500/40 rounded-full flex items-center justify-center font-bold text-rose-400">B</div>
          <div className="w-3.5 h-3.5 bg-fuchsia-500/20 border border-fuchsia-500/40 rounded-full flex items-center justify-center font-bold text-fuchsia-400">A</div>
        </div>
      </div>
    </div>
  );
});

GameVisual.displayName = 'GameVisual';

// Static placeholder for inactive cards in the slider to save rendering performance
const StaticPlaceholder: React.FC<{ id: number }> = React.memo(({ id }) => {
  const placeholders = {
    1: (
      <div className="w-full h-full bg-gradient-to-br from-orange-950/20 to-purple-950/20 flex flex-col items-center justify-center p-4">
        <Code2 size={28} className="text-orange-500/30 mb-2" />
        <div className="text-white/30 font-mono text-[10px] tracking-wider uppercase font-bold">Spot • Futures • Bot</div>
        <div className="text-[8px] text-gray-600 font-mono mt-1">// Click to inspect</div>
      </div>
    ),
    2: (
      <div className="w-full h-full bg-gradient-to-br from-indigo-950/20 to-blue-950/20 flex flex-col items-center justify-center p-4">
        <Layers size={28} className="text-indigo-400/30 mb-2" />
        <div className="text-white/30 font-mono text-[10px] tracking-wider uppercase font-bold">Selvi Construction</div>
        <div className="text-[8px] text-gray-600 font-mono mt-1">// Click to inspect</div>
      </div>
    ),
    3: (
      <div className="w-full h-full bg-gradient-to-br from-cyan-950/20 to-blue-950/20 flex flex-col items-center justify-center p-4">
        <Cpu size={28} className="text-cyan-400/30 mb-2" />
        <div className="text-white/30 font-mono text-[10px] tracking-wider uppercase font-bold">AlgoBot Prime</div>
        <div className="text-[8px] text-gray-600 font-mono mt-1">// Click to inspect</div>
      </div>
    ),
    4: (
      <div className="w-full h-full bg-gradient-to-br from-emerald-950/20 to-teal-950/20 flex flex-col items-center justify-center p-4">
        <Lock size={28} className="text-emerald-400/30 mb-2" />
        <div className="text-white/30 font-mono text-[10px] tracking-wider uppercase font-bold">Vortex P2P Chat</div>
        <div className="text-[8px] text-gray-600 font-mono mt-1">// Click to inspect</div>
      </div>
    ),
    5: (
      <div className="w-full h-full bg-gradient-to-br from-fuchsia-950/20 to-violet-950/20 flex flex-col items-center justify-center p-4">
        <Play size={28} className="text-fuchsia-400/30 mb-2" />
        <div className="text-white/30 font-mono text-[10px] tracking-wider uppercase font-bold">Mini Games Arcade</div>
        <div className="text-[8px] text-gray-600 font-mono mt-1">// Click to inspect</div>
      </div>
    )
  };

  return placeholders[id as keyof typeof placeholders] || <div className="w-full h-full bg-black" />;
});

StaticPlaceholder.displayName = 'StaticPlaceholder';

// --- Card Component ---

interface ProjectCardProps {
  project: Project;
  onClick: () => void;
  onCenterClick: () => void;
  isActive: boolean;
  position: 'left' | 'center' | 'right' | 'hidden' | 'static';
}

const ProjectCard: React.FC<ProjectCardProps> = React.memo(({ project, onClick, onCenterClick, isActive, position }) => {
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<{ left: number; top: number; width: number; height: number } | null>(null);
  const moveFrameId = useRef<number | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 25 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 25 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const spotlightX = useTransform(x, [-0.5, 0.5], [-200, 200]);
  const spotlightY = useTransform(y, [-0.5, 0.5], [-225, 225]);

  const theme = useMemo(() => {
    return projectThemes[project.id as keyof typeof projectThemes] || {
      glow: 'rgba(124, 58, 237, 0.45)',
      text: 'text-neon-violet',
      bg: 'bg-neon-violet',
      radial: 'rgba(124, 58, 237, 0.2)'
    };
  }, [project.id]);

  const handleMouseEnter = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      rectRef.current = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height
      };
    }
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    if (!isActive) return;

    if (!rectRef.current) {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect();
        rectRef.current = {
          left: rect.left,
          top: rect.top,
          width: rect.width,
          height: rect.height
        };
      } else {
        return;
      }
    }

    if (moveFrameId.current !== null) {
      cancelAnimationFrame(moveFrameId.current);
    }

    const { left, top, width, height } = rectRef.current;
    const clientX = e.clientX;
    const clientY = e.clientY;

    moveFrameId.current = requestAnimationFrame(() => {
      const mouseX = (clientX - left) / width - 0.5;
      const mouseY = (clientY - top) / height - 0.5;
      x.set(mouseX);
      y.set(mouseY);

      // Directly update CSS properties on the ref to update the border spotlight
      if (ref.current) {
        const px = ((clientX - left) / width) * 100;
        const py = ((clientY - top) / height) * 100;
        ref.current.style.setProperty('--mouse-x', `${px}%`);
        ref.current.style.setProperty('--mouse-y', `${py}%`);
      }
    });
  }, [isActive, x, y]);

  const handleMouseLeave = useCallback(() => {
    if (moveFrameId.current !== null) {
      cancelAnimationFrame(moveFrameId.current);
      moveFrameId.current = null;
    }
    rectRef.current = null;
    x.set(0);
    y.set(0);
  }, [x, y]);

  useEffect(() => {
    return () => {
      if (moveFrameId.current !== null) {
        cancelAnimationFrame(moveFrameId.current);
      }
    };
  }, []);

  const variants = useMemo(() => ({
    center: { x: 0, scale: 1, opacity: 1, zIndex: 30, filter: 'blur(0px)' },
    left: { x: -380, scale: 0.85, opacity: 0.5, zIndex: 20, filter: 'blur(2px)' },
    right: { x: 380, scale: 0.85, opacity: 0.5, zIndex: 20, filter: 'blur(2px)' },
    hidden: { x: 0, scale: 0.5, opacity: 0, zIndex: 10, filter: 'blur(10px)' },
    static: { x: 0, scale: 1, opacity: 1, zIndex: 10, filter: 'blur(0px)' }
  }), []);

  return (
    <motion.div
      ref={ref}
      {...(position !== 'static' ? { layoutId: `card-container-${project.id}` } : {})}
      initial="hidden"
      animate={position}
      variants={variants}
      transition={{ duration: 0.5, type: "spring", bounce: 0.15, stiffness: 200, damping: 25 }}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={isActive ? onClick : onCenterClick}
      style={{
        rotateX: isActive ? rotateX : 0,
        rotateY: isActive ? rotateY : 0,
        transformStyle: "preserve-3d",
        willChange: 'transform',
        position: position === 'static' ? 'relative' : 'absolute',
        '--glow-color': theme.glow
      } as React.CSSProperties}
      className="w-full max-w-md cursor-pointer perspective-1000 mx-auto"
    >
      {/* Ambient backdrop glow */}
      {isActive && position !== 'static' && (
        <motion.div
          className="absolute -inset-8 rounded-[3rem] blur-3xl opacity-15 pointer-events-none -z-10"
          style={{
            background: `radial-gradient(circle, ${theme.glow} 0%, transparent 70%)`,
            willChange: 'transform, opacity',
          }}
          animate={{
            scale: [0.95, 1.08, 0.95],
            opacity: [0.12, 0.18, 0.12]
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      )}

      {/* Main Card Element */}
      <div className="project-card-border relative h-[450px] w-full rounded-3xl bg-[#0f0518] border border-white/10 overflow-hidden shadow-2xl transition-colors duration-500 group">

        {/* Hover Radial Spotlight on GPU layer */}
        {isActive && (
          <div className="absolute inset-0 pointer-events-none z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center overflow-hidden">
            <motion.div
              className="w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.08)_0%,transparent_60%)] shrink-0"
              style={{
                x: spotlightX,
                y: spotlightY,
                willChange: "transform",
              }}
            />
          </div>
        )}

        {/* Visual Content Block */}
        <motion.div
          {...(position !== 'static' ? { layoutId: `card-image-wrapper-${project.id}` } : {})}
          className="h-[60%] w-full overflow-hidden relative z-10 bg-black"
          style={{ transform: "translateZ(20px)", willChange: 'transform' }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0f0518] z-20" />

          {/* Render active simulation animations, and static representations for side cards */}
          {(isActive || position === 'static') ? (
            project.id === 1 ? (
              <TradingChartVisual />
            ) : project.id === 2 ? (
              <CorporateMockupVisual />
            ) : project.id === 3 ? (
              <BotVisual />
            ) : project.id === 4 ? (
              <ChatVisual />
            ) : project.id === 5 ? (
              <GameVisual />
            ) : (
              <div className="w-full h-full bg-black" />
            )
          ) : (
            <StaticPlaceholder id={project.id} />
          )}

          <div className="absolute inset-0 bg-neon-violet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </motion.div>

        {/* Card Info Section */}
        <div className="absolute bottom-0 left-0 w-full p-4 md:p-8 z-30 transform translate-z-10 flex flex-col justify-end h-[45%] md:h-[40%]">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
              <Layers size={12} className={theme.text} />
              <span className={`text-[10px] font-mono uppercase tracking-wider ${theme.text}`}>{project.category}</span>
            </div>
            {isActive && (
              <motion.div
                className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-2 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.4)]"
              >
                <ArrowUpRight size={16} />
              </motion.div>
            )}
          </div>

          <motion.h3
            {...(position !== 'static' ? { layoutId: `card-title-${project.id}` } : {})}
            className="text-xl font-display font-bold text-white mb-2 transition-all"
          >
            {project.title}
          </motion.h3>

          <p className="text-gray-400 line-clamp-2 text-xs leading-relaxed mb-3 transition-colors">
            {project.description}
          </p>

          <div className="flex gap-2 overflow-hidden h-6">
            {project.tech.map((t) => (
              <span key={t} className={`text-[10px] font-mono ${theme.text}/80`}>#{t}</span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

// --- Main Projects Section Component ---

const Projects: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<'overview' | 'architecture' | 'code'>('overview');
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
    }, 4500);

    return () => clearInterval(interval);
  }, [selectedId, isPaused, isHoveringCard]);

  // Reset tab to overview when modal shifts projects
  useEffect(() => {
    if (selectedId !== null) {
      setActiveModalTab('overview');
    }
  }, [selectedId]);

  const getProjectPosition = useCallback((index: number): 'left' | 'center' | 'right' | 'hidden' => {
    if (index === currentIndex) return 'center';
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    const nextIndex = (currentIndex + 1) % projects.length;
    if (index === prevIndex) return 'left';
    if (index === nextIndex) return 'right';
    return 'hidden';
  }, [currentIndex]);

  const activeTheme = useMemo(() => {
    if (selectedId === null) return null;
    return projectThemes[selectedId as keyof typeof projectThemes] || {
      glow: 'rgba(124, 58, 237, 0.45)',
      text: 'text-neon-violet',
      bg: 'bg-neon-violet',
      radial: 'rgba(124, 58, 237, 0.2)'
    };
  }, [selectedId]);

  return (
    <section className="w-full min-h-screen lg:h-screen flex flex-col items-center justify-center px-4 py-8 lg:py-0 relative z-10 overflow-hidden select-none">
      <div className="w-full max-w-7xl flex flex-col items-center">
        <div className="mb-6 md:mb-8 relative text-center">
          <motion.h2
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-3 text-white"
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-violet to-neon-fuchsia">Works</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-indigo-200/60 font-mono text-sm tracking-widest"
          >
            {"// Swipe or click center card to explore details"}
          </motion.p>
        </div>

        {/* Desktop Slider */}
        <div className="relative w-full max-w-6xl hidden md:flex items-center justify-center h-[460px]">
          <button
            onClick={prevSlide}
            aria-label="Previous project"
            className="absolute left-0 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-violet/50 transition-all text-white cursor-pointer"
          >
            <ChevronLeft size={24} aria-hidden="true" />
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
            aria-label="Next project"
            className="absolute right-0 z-40 p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-neon-violet/50 transition-all text-white cursor-pointer"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </button>
        </div>

        {/* Mobile Vertical List with Scroll entrance effects */}
        <div className="flex md:hidden flex-col gap-12 w-full">
          {projects.map((project) => (
            <div
              key={project.id}
              className="scroll-reveal-card"
            >
              <ProjectCard
                project={project}
                onClick={() => setSelectedId(project.id)}
                onCenterClick={() => { }}
                isActive={true}
                position="static"
              />
            </div>
          ))}
        </div>

        {/* Slide Indicators (Desktop Only) */}
        <div className="hidden md:flex gap-2 mt-4">
          {projects.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer ${idx === currentIndex ? 'w-8 bg-neon-fuchsia' : 'bg-white/20 hover:bg-white/40'}`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {selectedId && activeTheme && (
          <div key={`modal-${selectedId}`} className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 md:p-8">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setSelectedId(null)}
              className="absolute inset-0 bg-[#05010a]/95 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              layoutId={`card-container-${selectedId}`}
              initial={{ scale: 0.85, opacity: 0, rotateX: 8 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              transition={{
                type: 'spring',
                stiffness: 280,
                damping: 28,
                exit: { duration: 0.25 }
              }}
              className="w-full max-w-6xl bg-[#0f0518] rounded-[2rem] overflow-hidden border border-white/10 relative shadow-[0_0_80px_rgba(124,58,237,0.3)] flex flex-col lg:flex-row max-h-[85vh] z-50 ring-1 ring-white/10"
              style={{ willChange: 'transform, opacity' }}
            >
              {/* Close Button */}
              <motion.button
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 180 }}
                transition={{ delay: 0.15, type: 'spring', stiffness: 300, damping: 20 }}
                onClick={(e) => { e.stopPropagation(); setSelectedId(null); }}
                aria-label="Close project details"
                className="absolute top-5 right-5 z-40 p-2.5 bg-black/50 text-white rounded-full hover:bg-white hover:text-black transition-colors backdrop-blur-md border border-white/15 group cursor-pointer"
              >
                <X size={20} aria-hidden="true" className="group-hover:rotate-90 transition-transform duration-300" />
              </motion.button>

              {(() => {
                const project = projects.find(p => p.id === selectedId)!;

                const containerVariants = {
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.08, delayChildren: 0.1 }
                  }
                };

                const itemVariants = {
                  hidden: { y: 15, opacity: 0 },
                  visible: {
                    y: 0,
                    opacity: 1,
                    transition: { type: 'spring', stiffness: 280, damping: 25 }
                  }
                };

                return (
                  <>
                    {/* Left: Simulation/Visual Panel */}
                    <motion.div
                      className="w-full lg:w-7/12 h-56 lg:h-auto relative overflow-hidden bg-black shrink-0"
                      initial={{ x: -60, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.05, type: 'spring', stiffness: 200, damping: 25 }}
                    >
                      <motion.div
                        layoutId={`card-image-wrapper-${project.id}`}
                        className="w-full h-full"
                      >
                        {project.id === 1 ? (
                          <TradingChartVisual />
                        ) : project.id === 2 ? (
                          <CorporateMockupVisual />
                        ) : project.id === 3 ? (
                          <BotVisual />
                        ) : project.id === 4 ? (
                          <ChatVisual />
                        ) : project.id === 5 ? (
                          <GameVisual />
                        ) : (
                          <div className="w-full h-full bg-black" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0518] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#0f0518] z-20 pointer-events-none" />
                      </motion.div>
                    </motion.div>

                    {/* Right: Technical Specification Panel */}
                    <motion.div
                      className="w-full lg:w-5/12 p-6 sm:p-8 lg:p-10 flex flex-col relative bg-[#0f0518] overflow-y-auto custom-scrollbar"
                      variants={containerVariants}
                      initial="hidden"
                      animate="visible"
                    >
                      {/* Meta Category and Tags */}
                      <motion.div className="flex items-center gap-2 mb-4 shrink-0" variants={itemVariants}>
                        <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                          <Code2 size={16} className={activeTheme.text} />
                        </div>
                        <span className={`font-mono text-xs tracking-widest uppercase font-bold ${activeTheme.text}`}>{project.category}</span>
                      </motion.div>

                      {/* Modal Project Title */}
                      <motion.h2
                        layoutId={`card-title-${project.id}`}
                        className="text-3xl md:text-4xl font-display font-bold mb-4 text-white leading-tight shrink-0"
                        variants={itemVariants}
                      >
                        {project.title}
                      </motion.h2>

                      {/* Tab Selection Switcher */}
                      <motion.div className="flex border-b border-white/10 mb-5 font-mono text-[10px] shrink-0" variants={itemVariants}>
                        {['overview', 'architecture', 'code'].map((tab) => (
                          <button
                            key={tab}
                            onClick={() => setActiveModalTab(tab as any)}
                            className={`px-4 py-2 border-b-2 font-bold uppercase transition-colors -mb-[2px] cursor-pointer ${
                              activeModalTab === tab
                                ? `border-white text-white`
                                : 'border-transparent text-gray-500 hover:text-white'
                            }`}
                          >
                            {tab}
                          </button>
                        ))}
                      </motion.div>

                      {/* Dynamic Tab Content rendering */}
                      <motion.div className="flex-1 min-h-0 flex flex-col justify-start" variants={itemVariants}>
                        {activeModalTab === 'overview' && (
                          <div className="flex flex-col gap-5 text-left">
                            <p className="text-indigo-100/70 leading-relaxed text-sm font-light border-l border-white/20 pl-3">
                              {project.description}
                            </p>
                            
                            {/* Metrics spec grid */}
                            <div>
                              <h4 className="text-[9px] text-gray-500 uppercase tracking-widest mb-2.5 font-bold font-mono">Performance Specifications</h4>
                              <div className="grid grid-cols-2 gap-2.5">
                                {(projectMetrics[project.id as keyof typeof projectMetrics] || []).map((m, idx) => (
                                  <div key={idx} className="p-2 rounded-xl bg-white/2 border border-white/5 flex flex-col">
                                    <span className="text-[8px] text-gray-500 font-mono uppercase tracking-wide truncate">{m.label}</span>
                                    <span className="text-xs font-bold text-white font-mono mt-0.5">{m.value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {activeModalTab === 'architecture' && (
                          <div className="flex flex-col gap-4 text-left">
                            <h4 className="text-[9px] text-gray-500 uppercase tracking-widest font-bold font-mono">Technical Rationale</h4>
                            <div className="flex flex-col gap-2.5 max-h-[220px] overflow-y-auto custom-scrollbar pr-1">
                              {(projectArchitectureDetails[project.id as keyof typeof projectArchitectureDetails] || []).map((item, idx) => (
                                <div key={idx} className="p-2.5 border border-white/5 rounded-xl bg-white/2">
                                  <div className="flex items-center gap-1.5 mb-1 font-mono">
                                    <span className={`w-1.5 h-1.5 rounded-full ${activeTheme.bg}`} />
                                    <span className="font-bold text-white text-[10px]">{item.tech}</span>
                                  </div>
                                  <p className="text-[9px] text-gray-400 leading-normal">{item.description}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {activeModalTab === 'code' && (
                          <div className="flex-1 min-h-0 flex flex-col gap-2 text-left">
                            <div className="flex justify-between items-center bg-[#07020d] border border-white/10 px-3 py-1.5 rounded-t-lg text-[8px] text-gray-500 shrink-0 select-none">
                              <div className="flex gap-1.5 items-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-1.5 h-1.5 rounded-full bg-[#27c93f]" />
                                <span className="ml-2 font-mono text-gray-400">snippet.{project.id === 3 ? 'py' : 'ts'}</span>
                              </div>
                              <span className="uppercase tracking-widest font-bold font-mono">READ_ONLY</span>
                            </div>
                            <div className="flex-1 bg-[#05010a] border-x border-b border-white/10 p-3 rounded-b-lg overflow-auto max-h-[190px] text-[9px] leading-relaxed text-cyan-200/90 custom-scrollbar select-text">
                              <pre className="font-mono"><code>{projectCodeSnippets[project.id as keyof typeof projectCodeSnippets] || ''}</code></pre>
                            </div>
                          </div>
                        )}
                      </motion.div>

                      {/* Action buttons footer */}
                      <motion.div className="flex flex-col sm:flex-row gap-3 mt-6 pt-4 border-t border-white/5 shrink-0" variants={itemVariants}>
                        <a
                          href={project.id === 4 ? "https://xavi-003.github.io/web_chat/" : project.id === 5 ? "https://xavi-003.github.io/mini_game/" : "#"}
                          target={project.id === 4 || project.id === 5 ? "_blank" : "_self"}
                          rel={project.id === 4 || project.id === 5 ? "noopener noreferrer" : ""}
                          className={`flex-1 py-3 text-black rounded-xl font-bold flex items-center justify-center gap-1.5 transition-all text-xs cursor-pointer bg-white hover:text-white hover:bg-transparent hover:ring-1 hover:ring-white`}
                        >
                          <ExternalLink size={14} /> 
                          <span>Live Demo</span>
                        </a>
                        <a
                          href={project.id === 4 ? "https://github.com/Xavi-003/web_chat" : project.id === 5 ? "https://github.com/Xavi-003/mini_game" : "#"}
                          target={project.id === 4 || project.id === 5 ? "_blank" : "_self"}
                          rel={project.id === 4 || project.id === 5 ? "noopener noreferrer" : ""}
                          className="flex-1 py-3 border border-white/20 rounded-xl font-bold flex items-center justify-center gap-1.5 hover:bg-white/10 transition-colors text-white text-xs hover:border-white/40 cursor-pointer"
                        >
                          <Github size={14} /> 
                          <span>Codebase</span>
                        </a>
                      </motion.div>
                    </motion.div>
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