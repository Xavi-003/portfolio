import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Sparkles, Loader2, Zap } from 'lucide-react';
import { Message } from '../types';
import { sendMessageToGemini } from '../services/geminiService';

const AIChat: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'model', text: "System Online. I'm ready to answer questions about Antony's experience, stack, or availability.", timestamp: Date.now() }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg: Message = { role: 'user', text: input, timestamp: Date.now() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        const aiResponseText = await sendMessageToGemini(messages, userMsg.text);

        const aiMsg: Message = { role: 'model', text: aiResponseText, timestamp: Date.now() };
        setMessages(prev => [...prev, aiMsg]);
        setIsTyping(false);
    };

    return (
        <section className="min-h-screen w-full flex items-center justify-center px-4 py-20 relative z-10">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="w-full max-w-3xl glass-panel rounded-3xl overflow-hidden flex flex-col h-[70vh] shadow-[0_0_80px_-20px_rgba(124,58,237,0.4)]"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 bg-[#0a0015]/80 flex items-center justify-between backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-600 to-fuchsia-600 flex items-center justify-center shadow-lg shadow-violet-500/30 relative overflow-hidden">
                            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-30"></div>
                            <Bot size={24} className="text-white relative z-10" />
                        </div>
                        <div>
                            <h3 className="font-bold text-xl tracking-tight">AI Assistant</h3>
                            <div className="flex items-center gap-2 text-xs text-neon-fuchsia font-mono uppercase tracking-wider">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_#22c55e]" />
                                Gemini 2.5 Connected
                            </div>
                        </div>
                    </div>
                    <div className="p-2 rounded-full bg-white/5 border border-white/10">
                        <Zap className="text-yellow-400 w-4 h-4 fill-yellow-400" />
                    </div>
                </div>

                {/* Chat Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-black/20">
                    {messages.map((msg, idx) => (
                        <motion.div
                            key={msg.timestamp + idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                        >
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 border ${msg.role === 'user'
                                ? 'bg-white text-black border-white'
                                : 'bg-violet-900/50 text-neon-fuchsia border-neon-violet/30'
                                }`}>
                                {msg.role === 'user' ? <User size={18} /> : <Sparkles size={18} />}
                            </div>
                            <div className={`p-5 rounded-3xl max-w-[80%] text-sm leading-relaxed shadow-lg ${msg.role === 'user'
                                ? 'bg-white text-black rounded-tr-none'
                                : 'bg-[#1e1b2e] border border-white/10 rounded-tl-none text-gray-200'
                                }`}>
                                {msg.text}
                            </div>
                        </motion.div>
                    ))}

                    {isTyping && (
                        <div className="flex gap-4">
                            <div className="w-10 h-10 rounded-full bg-violet-900/50 text-neon-fuchsia border border-neon-violet/30 flex items-center justify-center shrink-0">
                                <Sparkles size={18} />
                            </div>
                            <div className="p-5 rounded-3xl bg-[#1e1b2e] border border-white/10 rounded-tl-none flex items-center min-w-[80px]">
                                <div className="flex gap-1.5">
                                    <span className="w-2 h-2 bg-neon-violet rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                    <span className="w-2 h-2 bg-neon-fuchsia rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                                    <span className="w-2 h-2 bg-neon-purple rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-6 bg-[#0a0015]/90 border-t border-white/10 backdrop-blur-lg">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            placeholder="Type your message here..."
                            className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-neon-violet focus:bg-white/10 transition-all placeholder-gray-500 text-white"
                        />
                        <button
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="bg-gradient-to-r from-neon-violet to-neon-fuchsia hover:from-violet-600 hover:to-fuchsia-600 disabled:opacity-50 disabled:cursor-not-allowed text-white p-4 rounded-2xl transition-all shadow-[0_0_20px_-5px_rgba(124,58,237,0.5)]"
                        >
                            {isTyping ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
                        </button>
                    </div>
                </div>
            </motion.div>
        </section>
    );
};

export default AIChat;