import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  Image as ImageIcon, 
  X,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Database,
  Layers,
  Zap,
  Globe,
  Lock,
  History as HistoryIcon
} from 'lucide-react';
import { cn } from './lib/utils';
import { moderateContent, getStats, submitFeedback, getLogs } from './api';

// --- Types ---
interface ModerationResult {
  request_id: string;
  is_toxic: boolean;
  confidence: number;
  toxicity_type: string;
  explanation: string;
  should_block: boolean;
  latency_ms: number;
  retrieved_examples?: string[];
  metadata?: any;
}

interface Stats {
  total_examples: number;
  toxic_examples: number;
  safe_examples: number;
  dimensions: number;
  index_type: string;
  last_updated: string;
}

// --- Components ---

const LuxuryCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
    transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
    className={cn("glass-card p-8 rounded-[2rem] relative group", className)}
  >
    {/* Subtle spotlight effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(139,92,246,0.06),transparent_40%)]" />
    {children}
  </motion.div>
);

const LuxuryBadge = ({ children, variant = 'neutral' }: { children: React.ReactNode, variant?: 'toxic' | 'safe' | 'neutral' }) => {
  const styles = {
    toxic: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_-5px_rgba(239,68,68,0.4)]",
    safe: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.4)]",
    neutral: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
  };
  return (
    <span className={cn("px-4 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md", styles[variant])}>
      {children}
    </span>
  );
};

export default function App() {
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'console' | 'analytics' | 'history'>('console');
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStats();
    fetchLogs();

    // Mouse glow tracker
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const cards = document.querySelectorAll('.glass-card');
      cards.forEach((card: any) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const fetchStats = async () => {
    try {
      const data = await getStats();
      setStats(data);
    } catch (err) {
      console.error("Failed to fetch stats", err);
    }
  };

  const fetchLogs = async () => {
    try {
      const data = await getLogs();
      setLogs(data);
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  };

  const handleModerate = async () => {
    if (!text.trim() && !imageData) return;
    setLoading(true);
    try {
      const res = await moderateContent(text, imageData || undefined);
      setResult(res);
      fetchStats();
      fetchLogs();
    } catch (err) {
      console.error("Moderation failed", err);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImageData(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const handleFeedback = async (wasCorrect: boolean) => {
    if (!result) return;
    try {
      await submitFeedback(result.request_id, wasCorrect);
    } catch (err) {
      console.error("Feedback failed", err);
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-primary/40 selection:text-white font-sans overflow-hidden">
      <div className="bg-grain" />
      
      {/* --- Animated Luminous Orbs --- */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="orb w-[600px] h-[600px] bg-primary/20 top-[-200px] left-[-100px]" 
      />
      <motion.div 
        animate={{ x: [0, -80, 0], y: [0, 100, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        className="orb w-[500px] h-[500px] bg-accent-cyan/10 bottom-[-100px] right-[-100px]" 
      />

      {/* --- Navigation --- */}
      <header className="sticky top-0 z-[60] py-6 px-10">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto flex items-center justify-between glass px-8 py-4 rounded-[2rem] border-white/5"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary via-violet-500 to-accent-cyan flex items-center justify-center shadow-[0_0_30px_-5px_rgba(139,92,246,0.5)]">
              <Shield className="text-white w-7 h-7" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-gradient leading-none">URBEX</h1>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mt-1">Enterprise Guard</p>
            </div>
          </div>
          
          <nav className="hidden lg:flex items-center gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5 backdrop-blur-3xl">
            {['console', 'analytics', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest transition-all",
                  activeTab === tab 
                    ? "bg-white/10 text-white shadow-xl ring-1 ring-white/10" 
                    : "text-zinc-500 hover:text-zinc-300 hover:bg-white/5"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Systems Active
            </div>
            <LuxuryBadge variant="neutral">Pro v1.0</LuxuryBadge>
          </div>
        </motion.div>
      </header>

      <main className="max-w-7xl mx-auto px-10 py-16 relative z-10">
        <AnimatePresence mode="wait">
          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-10"
            >
              {/* --- Main Interaction Area --- */}
              <div className="lg:col-span-8 space-y-10">
                <LuxuryCard>
                  <div className="flex items-center justify-between mb-8">
                    <div className="space-y-1">
                      <h3 className="text-xl font-bold flex items-center gap-3">
                        <Layers className="w-6 h-6 text-primary" />
                        Neural Analysis
                      </h3>
                      <p className="text-xs text-zinc-500 font-medium tracking-wide">Enter content for real-time semantic evaluation</p>
                    </div>
                    <button 
                      onClick={() => fileInputRef.current?.click()}
                      className="p-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all hover:scale-110 active:scale-95"
                      title="Analyze Visuals"
                    >
                      <ImageIcon className="w-5 h-5 text-accent-cyan" />
                    </button>
                  </div>

                  <div className="relative">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Waiting for input..."
                      className="w-full h-64 bg-black/40 rounded-3xl p-8 text-lg font-medium text-zinc-100 placeholder:text-zinc-800 border border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none leading-relaxed"
                    />
                    
                    <AnimatePresence>
                      {imageData && (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          className="absolute bottom-6 left-6"
                        >
                          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20">
                            <img src={imageData} alt="Preview" className="w-full h-full object-cover" />
                            <button 
                              onClick={() => setImageData(null)}
                              className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 hover:bg-red-500/80 text-white transition-colors backdrop-blur-md"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

                  <div className="mt-10 flex items-center justify-between">
                    <div className="flex gap-4">
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Lock className="w-3 h-3" /> Encrypted
                      </div>
                      <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                        <Zap className="w-3 h-3" /> Low Latency
                      </div>
                    </div>

                    <button
                      onClick={handleModerate}
                      disabled={loading || (!text.trim() && !imageData)}
                      className={cn(
                        "shimmer-btn flex items-center gap-3 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-primary/20",
                        loading || (!text.trim() && !imageData)
                          ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-white/5"
                          : "bg-primary hover:bg-violet-500 text-white hover:scale-[1.05] active:scale-95"
                      )}
                    >
                      {loading ? <Activity className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                      {loading ? "Processing..." : "Initiate Audit"}
                    </button>
                  </div>
                </LuxuryCard>

                {/* --- Results --- */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "glass-card p-10 rounded-[2.5rem] border-t-2 overflow-hidden",
                        result.is_toxic ? "border-red-500/30" : "border-emerald-500/30"
                      )}
                    >
                      <div className="flex flex-col md:flex-row items-start justify-between gap-10">
                        <div className="space-y-6 flex-1">
                          <div className="flex items-center gap-5">
                            <div className={cn(
                              "w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-2xl",
                              result.is_toxic ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
                            )}>
                              {result.is_toxic ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle className="w-8 h-8" />}
                            </div>
                            <div>
                              <LuxuryBadge variant={result.is_toxic ? 'toxic' : 'safe'}>
                                {result.is_toxic ? "Violation Detected" : "Clearance Granted"}
                              </LuxuryBadge>
                              <h4 className="text-3xl font-black mt-1">
                                {result.is_toxic ? "Blocked" : "Approved"}
                              </h4>
                            </div>
                          </div>
                          
                          <div className="bg-black/20 p-6 rounded-2xl border border-white/5">
                            <p className="text-zinc-400 text-lg leading-relaxed italic font-medium">
                              "{result.explanation}"
                            </p>
                          </div>

                          <div className="flex flex-wrap gap-3">
                            <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                              Class: {result.toxicity_type}
                            </div>
                            <div className="px-5 py-2 rounded-xl bg-white/5 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-500">
                              Speed: {result.latency_ms}ms
                            </div>
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-white/[0.03] to-transparent p-8 rounded-[2rem] border border-white/10 flex flex-col items-center justify-center min-w-[240px] shadow-2xl">
                          <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.3em] mb-4">Neural Confidence</span>
                          <div className="relative flex items-center justify-center">
                             {/* Confidence Ring SVG would go here, using a simpler visual for now */}
                             <span className={cn(
                                "text-6xl font-black tracking-tighter",
                                result.is_toxic ? "text-red-500" : "text-emerald-500"
                              )}>
                                {(result.confidence * 100).toFixed(0)}
                                <span className="text-xl opacity-50">%</span>
                             </span>
                          </div>
                          
                          <div className="w-full mt-8 grid grid-cols-2 gap-3">
                            <button 
                              onClick={() => handleFeedback(true)}
                              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-emerald-500/10 transition-all border border-white/5 group"
                            >
                              <ThumbsUp className="w-5 h-5 text-zinc-600 group-hover:text-emerald-500 group-hover:scale-110 transition-all" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-emerald-500">Verify</span>
                            </button>
                            <button 
                              onClick={() => handleFeedback(false)}
                              className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-white/5 hover:bg-red-500/10 transition-all border border-white/5 group"
                            >
                              <ThumbsDown className="w-5 h-5 text-zinc-600 group-hover:text-red-500 group-hover:scale-110 transition-all" />
                              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-red-500">Correct</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {result.retrieved_examples && result.retrieved_examples.length > 0 && (
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                          className="mt-10 pt-10 border-t border-white/5"
                        >
                          <h5 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600 mb-6 flex items-center gap-3">
                            <Database className="w-4 h-4 text-primary" />
                            Retrieval Context Base
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {result.retrieved_examples.map((ex, i) => (
                              <div key={i} className="text-xs font-medium text-zinc-500 bg-white/5 p-5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors leading-relaxed">
                                <span className="text-primary font-bold mr-3 opacity-50">#{i + 1}</span>
                                {ex}
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* --- Sidebar Metrics --- */}
              <div className="lg:col-span-4 space-y-8">
                <LuxuryCard className="bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10 border-primary/20">
                  <h3 className="text-sm font-black uppercase tracking-[0.2em] mb-10 flex items-center gap-3">
                    <Activity className="w-5 h-5 text-primary" />
                    Live Pulse
                  </h3>
                  
                  <div className="space-y-8">
                    <div className="flex justify-between items-end border-b border-white/5 pb-4">
                      <div className="space-y-1">
                        <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Global Knowledge</p>
                        <p className="text-4xl font-black">{stats?.total_examples || '---'}</p>
                      </div>
                      <div className="text-right space-y-1">
                        <p className="text-zinc-500 text-[9px] font-black uppercase tracking-widest">Avg Latency</p>
                        <p className="text-4xl font-black text-emerald-500">147<span className="text-xs ml-1 opacity-50">ms</span></p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-zinc-500">
                        <span>Toxic Index</span>
                        <span>{stats ? Math.round((stats.toxic_examples / stats.total_examples) * 100) : 0}%</span>
                      </div>
                      <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: stats ? `${(stats.toxic_examples / stats.total_examples) * 100}%` : '0%' }}
                          className="h-full bg-gradient-to-r from-red-500 to-primary rounded-full shadow-[0_0_10px_rgba(239,68,68,0.5)]" 
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                        <p className="text-[8px] font-black uppercase text-zinc-600 mb-1">Dimensions</p>
                        <p className="text-xl font-black">{stats?.dimensions || '---'}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-black/40 border border-white/5">
                        <p className="text-[8px] font-black uppercase text-zinc-600 mb-1">Provider</p>
                        <p className="text-xl font-black">RAG</p>
                      </div>
                    </div>
                  </div>
                </LuxuryCard>

                <LuxuryCard>
                  <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-3">
                    <Zap className="w-4 h-4 text-accent-cyan" />
                    Stack Capabilities
                  </h3>
                  <div className="space-y-6">
                    {[
                      { title: "Tiered Filtering", desc: "Sub-10ms fast path matching", icon: Zap },
                      { title: "Active Learning", desc: "Real-time vector feedback", icon: Activity },
                      { title: "Vision Protocol", desc: "GPT-4o Multi-modal analysis", icon: Globe }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-5 group cursor-default">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-primary/50 transition-all duration-500">
                          <item.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <p className="text-xs font-black uppercase tracking-widest text-zinc-200">{item.title}</p>
                          <p className="text-[10px] font-medium text-zinc-600 leading-none">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </LuxuryCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10"
            >
              <LuxuryCard className="lg:col-span-8 h-[500px] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),transparent)]" />
                <div className="text-center relative">
                   <div className="w-24 h-24 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto mb-8" />
                   <h4 className="text-2xl font-black tracking-tight text-gradient">Compiling Aggregate Trends</h4>
                   <p className="text-zinc-600 text-xs font-bold uppercase tracking-widest mt-4">Visualizing Neural Decision Patterns...</p>
                </div>
              </LuxuryCard>
              <div className="lg:col-span-4 space-y-10">
                <LuxuryCard className="h-[235px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-4">Category Load</p>
                    <div className="flex gap-1 items-end h-20">
                      {[40, 70, 45, 90, 65, 80].map((h, i) => (
                        <motion.div 
                          key={i} 
                          initial={{ height: 0 }} 
                          animate={{ height: `${h}%` }} 
                          className="w-4 bg-primary/40 rounded-t-sm" 
                        />
                      ))}
                    </div>
                  </div>
                </LuxuryCard>
                <LuxuryCard className="h-[235px] flex items-center justify-center">
                   <div className="text-center space-y-2">
                     <p className="text-4xl font-black">99.2%</p>
                     <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest">Decision Accuracy</p>
                   </div>
                </LuxuryCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {logs.length > 0 ? logs.map((log, i) => (
                <LuxuryCard key={i} className="p-6">
                  <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6 flex-1">
                      <div className={cn(
                        "w-1.5 h-12 rounded-full",
                        log.is_toxic ? "bg-red-500" : "bg-emerald-500"
                      )} />
                      <div className="min-w-0">
                        <p className="text-lg font-bold truncate max-w-xl text-zinc-200">{log.text}</p>
                        <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mt-1">
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-10">
                      <div className="text-right">
                        <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest mb-1">Confidence</p>
                        <p className={cn(
                          "text-2xl font-black",
                          log.is_toxic ? "text-red-500" : "text-emerald-500"
                        )}>{(log.confidence * 100).toFixed(0)}%</p>
                      </div>
                      <LuxuryBadge variant={log.is_toxic ? 'toxic' : 'safe'}>{log.toxicity_type}</LuxuryBadge>
                      <button className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                        <ChevronRight className="w-5 h-5 text-zinc-600" />
                      </button>
                    </div>
                  </div>
                </LuxuryCard>
              )) : (
                <div className="h-96 flex flex-col items-center justify-center space-y-6">
                   <div className="w-20 h-20 rounded-[2rem] bg-white/5 border border-white/5 flex items-center justify-center">
                      <HistoryIcon className="w-10 h-10 text-zinc-800" />
                   </div>
                   <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">No Audit Logs Found</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-7xl mx-auto px-10 py-20 border-t border-white/5 mt-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
           <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
             <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/10">
               <Shield className="w-5 h-5 text-zinc-400" />
             </div>
             <span className="text-xl font-black tracking-tighter text-zinc-500">URBEX PRO</span>
           </div>
           <div className="flex gap-10 text-[9px] font-black text-zinc-600 uppercase tracking-[0.3em]">
             <a href="#" className="hover:text-primary transition-colors">Documentation</a>
             <a href="#" className="hover:text-primary transition-colors">API Keys</a>
             <a href="#" className="hover:text-primary transition-colors">Privacy</a>
             <a href="#" className="hover:text-primary transition-colors">Status</a>
           </div>
        </div>
        <p className="text-center md:text-left text-[10px] text-zinc-800 font-bold uppercase tracking-widest mt-10">
          Neural-Based Content Security Protocol © 2026 Urbex Corporation
        </p>
      </footer>
    </div>
  );
}
