import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldHalf, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  ImagePlus, 
  X,
  ThumbsUp,
  ThumbsDown,
  ChevronRight,
  Layers,
  Zap,
  Globe,
  History as HistoryIcon,
  FileText,
  BarChart3,
  Settings,
  BrainCircuit,
  Gauge,
  Network,
  ScanLine,
  Download,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Trophy,
  Brain,
  BadgeCheck,
  Ban,
  Webhook,
  Save
} from 'lucide-react';
import { 
  Area, 
  AreaChart, 
  Bar, 
  BarChart, 
  CartesianGrid, 
  ResponsiveContainer, 
  Tooltip, 
  XAxis, 
  YAxis 
} from 'recharts';
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
    className={cn("glass-card p-6 rounded-[2rem] relative group h-full", className)}
  >
    {/* Subtle spotlight effect */}
    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-[radial-gradient(600px_circle_at_var(--x)_var(--y),rgba(139,92,246,0.06),transparent_40%)]" />
    {children}
  </motion.div>
);

const Badge = ({ children, variant = 'neutral' }: { children: React.ReactNode, variant?: 'toxic' | 'safe' | 'neutral' | 'accent' }) => {
  const styles = {
    toxic: "bg-red-500/10 text-red-400 border-red-500/20 shadow-[0_0_15px_-5px_rgba(239,68,68,0.4)]",
    safe: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_-5px_rgba(16,185,129,0.4)]",
    neutral: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
    accent: "bg-primary/10 text-primary border-primary/20"
  };
  return (
    <span className={cn("px-3 py-0.5 rounded-full text-[10px] font-bold tracking-widest uppercase border backdrop-blur-md", styles[variant])}>
      {children}
    </span>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState<'console' | 'history' | 'analytics' | 'core'>('console');
  const [text, setText] = useState('');
  const [imageData, setImageData] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ModerationResult | null>(null);
  const [stats, setStats] = useState<Stats | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchStats();
    fetchLogs();

    const handleMouseMove = (e: MouseEvent) => {
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
    <div ref={containerRef} className="min-h-screen bg-[#030303] text-zinc-100 selection:bg-primary/40 selection:text-white font-sans overflow-hidden flex">
      <div className="bg-grain" />
      
      {/* --- Sidebar --- */}
      <aside className="shrink-0 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-3xl border-white/10 border-r border-solid flex py-10 flex-col justify-start items-center gap-12 w-24 relative z-50">
        <div className="size-12 bg-gradient-to-br from-primary to-accent-cyan shadow-[0_0_30px_rgba(139,92,246,0.6)] rounded-2xl flex justify-center items-center">
          <ShieldHalf className="size-7 text-white" />
        </div>
        <nav className="flex flex-col items-center gap-4 w-full">
          {[
            { id: 'console', icon: Zap, label: 'Console' },
            { id: 'history', icon: FileText, label: 'Audit Logs' },
            { id: 'analytics', icon: BarChart3, label: 'Analytics' },
            { id: 'core', icon: Settings, label: 'AI Core' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as any)}
              className={cn(
                "group transition-all rounded-2xl flex p-3 flex-col items-center gap-1 w-16 relative",
                activeTab === item.id 
                  ? "bg-primary/10 border border-primary/20 text-primary shadow-[0_0_20px_-5px_rgba(139,92,246,0.4)]" 
                  : "text-[#9f9fa9] hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon className={cn("size-6", activeTab === item.id ? "text-primary" : "")} />
              <span className="font-bold text-[9px] uppercase tracking-tighter">{item.label}</span>
              {activeTab === item.id && (
                <motion.div layoutId="active-indicator" className="absolute left-[-4px] top-1/2 -translate-y-1/2 w-1 h-8 bg-primary rounded-full shadow-[0_0_10px_rgba(139,92,246,1)]" />
              )}
            </button>
          ))}
        </nav>
        <div className="mt-auto">
          <div className="size-11 bg-gradient-to-br from-accent-cyan to-primary p-0.5 rounded-full ring-2 ring-white/10">
            <div className="size-full bg-zinc-900 rounded-full flex items-center justify-center font-black text-[10px]">
              PRO
            </div>
          </div>
        </div>
      </aside>

      {/* --- Main Content --- */}
      <main className="flex-1 overflow-y-auto h-screen relative z-10 p-12">
        {/* Luminous Orbs */}
        <div className="pointer-events-none fixed inset-0">
          <motion.div 
            animate={{ x: [0, 50, 0], y: [0, -30, 0] }}
            transition={{ duration: 20, repeat: Infinity }}
            className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/15 rounded-full blur-[120px]" 
          />
          <motion.div 
            animate={{ x: [0, -50, 0], y: [0, 40, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent-cyan/10 rounded-full blur-[120px]" 
          />
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 max-w-7xl mx-auto"
            >
              <header className="flex justify-between items-center mb-10">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter text-gradient">URBEX CONSOLE</h1>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Neural Guard Protocol Active</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-black/40 backdrop-blur-xl rounded-full border border-white/10 flex px-5 py-2.5 items-center gap-3">
                    <span className="relative size-2.5 flex">
                      <span className="inline-flex size-full animate-ping bg-emerald-500 opacity-75 rounded-full absolute" />
                      <span className="relative inline-flex size-2.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,1)]" />
                    </span>
                    <span className="font-black text-white text-[10px] tracking-widest uppercase">System Core Online</span>
                  </div>
                </div>
              </header>

              <div className="grid grid-cols-12 gap-8">
                {/* Console Card */}
                <div className="col-span-8">
                  <LuxuryCard className="border-t-2 border-primary/20">
                    <div className="flex items-center justify-between mb-8">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-2xl bg-primary/10 border border-primary/20">
                          <BrainCircuit className="size-6 text-primary" />
                        </div>
                        <div className="space-y-0.5">
                          <h3 className="text-xl font-black tracking-tight">Neural Moderation</h3>
                          <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Multi-modal semantic analysis</p>
                        </div>
                      </div>
                      <Badge variant="accent">v1.0 Pro</Badge>
                    </div>

                    <div className="relative group">
                      <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="// Enter content for high-fidelity neural inspection..."
                        className="w-full h-72 bg-black/40 rounded-[2rem] p-8 text-lg font-medium text-zinc-100 placeholder:text-zinc-800 border border-white/5 focus:border-primary/40 focus:ring-4 focus:ring-primary/5 outline-none transition-all resize-none leading-relaxed"
                      />
                      
                      <AnimatePresence>
                        {imageData && (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            className="absolute bottom-6 left-6"
                          >
                            <div className="relative w-36 h-36 rounded-2xl overflow-hidden border-2 border-primary/50 shadow-2xl shadow-primary/20">
                              <img src={imageData} alt="Preview" className="w-full h-full object-cover" />
                              <button 
                                onClick={() => setImageData(null)}
                                className="absolute top-2 right-2 p-1.5 rounded-xl bg-black/60 hover:bg-red-500/80 text-white transition-colors backdrop-blur-md"
                              >
                                <X className="w-5 h-5" />
                              </button>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="mt-8 flex items-center justify-between">
                      <div className="flex gap-4">
                        <button 
                          onClick={() => fileInputRef.current?.click()}
                          className="flex items-center gap-3 px-6 py-3 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all font-bold text-xs uppercase tracking-widest group"
                        >
                          <ImagePlus className="size-4 text-accent-cyan group-hover:scale-110 transition-transform" />
                          Attach Vision
                        </button>
                        <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
                      </div>

                      <button
                        onClick={handleModerate}
                        disabled={loading || (!text.trim() && !imageData)}
                        className={cn(
                          "shimmer-btn flex items-center gap-4 px-12 py-4 rounded-[1.5rem] font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-primary/20",
                          loading || (!text.trim() && !imageData)
                            ? "bg-zinc-900 text-zinc-600 cursor-not-allowed border border-white/5"
                            : "bg-primary hover:bg-violet-500 text-white hover:scale-[1.05] active:scale-95"
                        )}
                      >
                        {loading ? <Activity className="w-5 h-5 animate-spin" /> : <ScanLine className="w-5 h-5" />}
                        {loading ? "Decrypting..." : "Execute Scan"}
                      </button>
                    </div>
                  </LuxuryCard>
                </div>

                {/* Status Column */}
                <div className="col-span-4 space-y-8">
                  <LuxuryCard className="bg-gradient-to-br from-primary/10 via-transparent to-accent-cyan/10 border-primary/20">
                    <h3 className="text-[10px] font-black uppercase tracking-[0.2em] mb-8 flex items-center gap-3 text-zinc-400">
                      <Gauge className="size-4 text-primary" />
                      Confidence Meter
                    </h3>
                    <div className="flex flex-col items-center py-4">
                      <div className="relative size-48 flex items-center justify-center">
                        {/* Fake Progress SVG */}
                        <svg className="size-full transform -rotate-90">
                          <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/5" />
                          <motion.circle 
                            cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="8" fill="transparent" 
                            strokeDasharray={552.92}
                            initial={{ strokeDashoffset: 552.92 }}
                            animate={{ strokeDashoffset: 552.92 - (552.92 * (result?.confidence || 0.1)) }}
                            className={cn(result?.is_toxic ? "text-red-500" : "text-emerald-500")}
                            style={{ filter: `drop-shadow(0 0 10px ${result?.is_toxic ? '#ef4444' : '#10b981'})` }}
                          />
                        </svg>
                        <div className="absolute flex flex-col items-center">
                          <span className="text-5xl font-black tracking-tighter">{(result?.confidence || 0 * 100).toFixed(0)}%</span>
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">Neural Sync</span>
                        </div>
                      </div>
                    </div>
                  </LuxuryCard>

                  <LuxuryCard>
                    <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 mb-8 flex items-center gap-3">
                      <Network className="size-4 text-accent-cyan" />
                      Retrieval Chain
                    </h3>
                    <div className="space-y-4">
                      {result?.retrieved_examples?.slice(0, 3).map((ex, i) => (
                        <div key={i} className="p-4 rounded-2xl bg-black/40 border border-white/5 text-[10px] font-medium text-zinc-400 leading-relaxed border-l-2 border-l-primary/40">
                          {ex.length > 80 ? ex.substring(0, 80) + "..." : ex}
                        </div>
                      )) || (
                        <div className="py-10 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                          Waiting for query...
                        </div>
                      )}
                    </div>
                  </LuxuryCard>
                </div>
              </div>

              {/* Expanded Result Section */}
              <AnimatePresence>
                {result && (
                  <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={cn(
                      "glass-card p-10 rounded-[3rem] border-l-[6px] shadow-2xl relative overflow-hidden",
                      result.is_toxic ? "border-l-red-500" : "border-l-emerald-500"
                    )}
                  >
                    <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
                      <div className="space-y-8 flex-1">
                        <div className="flex items-center gap-6">
                          <div className={cn(
                            "size-20 rounded-[2rem] flex items-center justify-center shadow-2xl",
                            result.is_toxic ? "bg-red-500/20 text-red-500" : "bg-emerald-500/20 text-emerald-500"
                          )}>
                            {result.is_toxic ? <AlertTriangle className="size-10" /> : <CheckCircle2 className="size-10" />}
                          </div>
                          <div>
                            <Badge variant={result.is_toxic ? 'toxic' : 'safe'}>
                              {result.is_toxic ? "Violation Detected" : "Content Cleared"}
                            </Badge>
                            <h4 className="text-4xl font-black mt-2 tracking-tighter">
                              {result.is_toxic ? "BLOCKED" : "APPROVED"}
                            </h4>
                          </div>
                        </div>

                        <div className="bg-black/30 p-8 rounded-[2rem] border border-white/10 backdrop-blur-2xl">
                          <p className="text-zinc-300 text-xl leading-relaxed italic font-medium">
                            "{result.explanation}"
                          </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                          <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            Identifier: <span className="text-white ml-2">{result.request_id.split('-')[0]}</span>
                          </div>
                          <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            Category: <span className="text-white ml-2">{result.toxicity_type}</span>
                          </div>
                          <div className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 text-[11px] font-black uppercase tracking-[0.2em] text-zinc-400">
                            Latency: <span className="text-emerald-500 ml-2">{result.latency_ms}ms</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-4 min-w-[280px]">
                        <LuxuryCard className="p-8 text-center bg-white/[0.02]">
                          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 mb-6">Human Validation</p>
                          <div className="grid grid-cols-2 gap-4 w-full">
                            <button 
                              onClick={() => handleFeedback(true)}
                              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-emerald-500/10 transition-all border border-white/5 group shadow-xl"
                            >
                              <ThumbsUp className="size-6 text-zinc-600 group-hover:text-emerald-500 group-hover:scale-125 transition-all" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-emerald-500">Correct</span>
                            </button>
                            <button 
                              onClick={() => handleFeedback(false)}
                              className="flex flex-col items-center gap-3 p-5 rounded-2xl bg-white/5 hover:bg-red-500/10 transition-all border border-white/5 group shadow-xl"
                            >
                              <ThumbsDown className="size-6 text-zinc-600 group-hover:text-red-500 group-hover:scale-125 transition-all" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600 group-hover:text-red-500">Mistake</span>
                            </button>
                          </div>
                        </LuxuryCard>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6 max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter text-gradient uppercase">Audit Ledger</h1>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Immutable chronological scan record</p>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-black text-[10px] uppercase tracking-widest">
                    <Download className="size-4" /> Export CSV
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-primary border border-primary/20 font-black text-[10px] uppercase tracking-widest text-white shadow-xl shadow-primary/20">
                    <SlidersHorizontal className="size-4" /> Filter Logs
                  </button>
                </div>
              </div>

              {logs.length > 0 ? (
                <div className="glass rounded-[2.5rem] border-white/10 overflow-hidden shadow-2xl">
                  <table className="w-full text-left">
                    <thead className="bg-white/5 border-b border-white/10">
                      <tr className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
                        <th className="px-10 py-6">Timestamp</th>
                        <th className="px-6 py-6">Content Preview</th>
                        <th className="px-6 py-6 text-center">Result</th>
                        <th className="px-6 py-6 text-center">Confidence</th>
                        <th className="px-10 py-6 text-right">Details</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-medium">
                      {logs.map((log, i) => (
                        <tr key={i} className="hover:bg-white/[0.02] transition-colors group">
                          <td className="px-10 py-5 text-[11px] text-zinc-500 font-bold">{new Date(log.timestamp).toLocaleString()}</td>
                          <td className="px-6 py-5">
                            <p className="text-sm text-zinc-300 truncate max-w-md">{log.text}</p>
                            <p className="text-[9px] text-zinc-600 font-bold mt-1 uppercase tracking-tighter">ID: {log.request_id?.split('-')[0]}</p>
                          </td>
                          <td className="px-6 py-5 text-center">
                            <Badge variant={log.is_toxic ? 'toxic' : 'safe'}>{log.toxicity_type}</Badge>
                          </td>
                          <td className="px-6 py-5">
                            <div className="flex flex-col items-center gap-1">
                              <div className="w-20 h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <div className={cn("h-full rounded-full", log.is_toxic ? "bg-red-500" : "bg-emerald-500")} style={{ width: `${log.confidence * 100}%` }} />
                              </div>
                              <span className="text-[10px] font-black">{(log.confidence * 100).toFixed(0)}%</span>
                            </div>
                          </td>
                          <td className="px-10 py-5 text-right">
                            <button className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
                              <ChevronRight className="size-4 text-zinc-500" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="h-96 flex flex-col items-center justify-center space-y-6">
                   <div className="size-24 rounded-[2.5rem] bg-white/5 border border-white/10 flex items-center justify-center">
                      <HistoryIcon className="size-10 text-zinc-700" />
                   </div>
                   <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-xs">Awaiting Entry Signals</p>
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-10 max-w-7xl mx-auto"
            >
              <div className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter text-gradient uppercase">Neural Analytics</h1>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Real-time performance metrics & trends</p>
                </div>
                <div className="flex gap-2 bg-black/40 p-1.5 rounded-2xl border border-white/5">
                   {['1H', '24H', '7D', '30D'].map(t => (
                     <button key={t} className={cn("px-5 py-2 rounded-xl text-[10px] font-black transition-all", t === '24H' ? "bg-primary text-white" : "text-zinc-500 hover:text-white")}>{t}</button>
                   ))}
                </div>
              </div>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-3">
                  <LuxuryCard>
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Total Insights</p>
                     <p className="text-5xl font-black">{stats?.total_examples || '---'}</p>
                     <div className="flex items-center gap-2 mt-6 text-emerald-500 font-black text-[10px]">
                        <TrendingUp className="size-3" /> +12.4% THIS MONTH
                     </div>
                  </LuxuryCard>
                </div>
                <div className="col-span-3">
                  <LuxuryCard>
                     <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Global Accuracy</p>
                     <p className="text-5xl font-black text-gradient">99.1%</p>
                     <div className="flex items-center gap-2 mt-6 text-zinc-600 font-black text-[10px]">
                        <Target className="size-3" /> VERIFIED PROTOCOL
                     </div>
                  </LuxuryCard>
                </div>
                <div className="col-span-6">
                  <LuxuryCard className="bg-primary/5 border-primary/10">
                     <div className="flex justify-between mb-8">
                        <div>
                          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-2">Knowledge Distribution</p>
                          <p className="text-2xl font-black">{stats ? Math.round((stats.toxic_examples / stats.total_examples) * 100) : 0}% TOXIC RATIO</p>
                        </div>
                        <div className="p-3 rounded-2xl bg-white/5">
                           <Trophy className="size-6 text-amber-500" />
                        </div>
                     </div>
                     <div className="h-4 w-full bg-white/5 rounded-full overflow-hidden p-1 border border-white/5">
                        <div 
                          className="h-full bg-gradient-to-r from-red-500 to-primary rounded-full shadow-[0_0_15px_rgba(239,68,68,0.4)]" 
                          style={{ width: stats ? `${(stats.toxic_examples / stats.total_examples) * 100}%` : '0%' }}
                        />
                     </div>
                  </LuxuryCard>
                </div>

                <div className="col-span-8">
                  <LuxuryCard>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                      <Activity className="size-5 text-primary" /> Moderation Throughput
                    </h3>
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={[
                          { t: "00:00", v: 1200 }, { t: "04:00", v: 1800 }, { t: "08:00", v: 3400 },
                          { t: "12:00", v: 2900 }, { t: "16:00", v: 4800 }, { t: "20:00", v: 3900 }, { t: "24:00", v: 3100 }
                        ]}>
                          <defs>
                            <linearGradient id="area-grad" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="0%" stopColor="oklch(0.541 0.281 293.009)" stopOpacity={0.4}/>
                              <stop offset="100%" stopColor="oklch(0.541 0.281 293.009)" stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                          <XAxis dataKey="t" axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10}} />
                          <YAxis axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10}} />
                          <Tooltip contentStyle={{background: '#111', border: '1px solid #333', borderRadius: '1rem'}} />
                          <Area type="monotone" dataKey="v" stroke="oklch(0.541 0.281 293.009)" fill="url(#area-grad)" strokeWidth={3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </LuxuryCard>
                </div>

                <div className="col-span-4">
                  <LuxuryCard>
                    <h3 className="text-sm font-black uppercase tracking-widest mb-10 flex items-center gap-3">
                      <Layers className="size-5 text-accent-cyan" /> Category Load
                    </h3>
                    <div className="h-[300px] w-full">
                       <ResponsiveContainer width="100%" height="100%">
                         <BarChart data={[
                           { n: 'Hate', v: 85 }, { n: 'Spam', v: 40 }, { n: 'Threat', v: 65 }, { n: 'NSFW', v: 30 }
                         ]}>
                            <XAxis dataKey="n" axisLine={false} tickLine={false} tick={{fill: '#444', fontSize: 10}} />
                            <Tooltip cursor={{fill: 'rgba(255,255,255,0.05)'}} contentStyle={{background: '#111', border: '1px solid #333', borderRadius: '1rem'}} />
                            <Bar dataKey="v" fill="oklch(0.541 0.281 293.009)" radius={[8, 8, 0, 0]} />
                         </BarChart>
                       </ResponsiveContainer>
                    </div>
                  </LuxuryCard>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'core' && (
            <motion.div
              key="core"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8 max-w-7xl mx-auto"
            >
              <header className="flex justify-between items-center mb-12">
                <div className="space-y-1">
                  <h1 className="text-4xl font-black tracking-tighter text-gradient uppercase">Neural Engine</h1>
                  <p className="text-sm text-zinc-500 font-bold uppercase tracking-widest">Advanced configuration & safety protocols</p>
                </div>
                <div className="flex gap-4">
                   <button className="flex items-center gap-3 px-8 py-3 rounded-2xl bg-primary font-black text-xs uppercase tracking-widest text-white shadow-2xl shadow-primary/30">
                      <Save className="size-4" /> Deploy Changes
                   </button>
                </div>
              </header>

              <div className="grid grid-cols-12 gap-8">
                <div className="col-span-4 space-y-8">
                  <LuxuryCard>
                     <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-8">Model Core Settings</h4>
                     <div className="space-y-6">
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-4">
                              <Brain className="size-5 text-primary" />
                              <span className="text-xs font-bold uppercase">Hybrid RAG</span>
                           </div>
                           <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                              <div className="size-4 bg-white rounded-full ml-auto" />
                           </div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-4">
                              <Globe className="size-5 text-accent-cyan" />
                              <span className="text-xs font-bold uppercase">Vision Protocol</span>
                           </div>
                           <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                              <div className="size-4 bg-white rounded-full ml-auto" />
                           </div>
                        </div>
                        <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5">
                           <div className="flex items-center gap-4">
                              <Webhook className="size-5 text-zinc-500" />
                              <span className="text-xs font-bold uppercase text-zinc-500">Auto-Webhook</span>
                           </div>
                           <div className="w-10 h-6 bg-zinc-800 rounded-full flex items-center px-1">
                              <div className="size-4 bg-zinc-600 rounded-full" />
                           </div>
                        </div>
                     </div>
                  </LuxuryCard>

                  <LuxuryCard className="bg-emerald-500/5 border-emerald-500/20">
                     <div className="flex items-center gap-4 mb-6">
                        <BadgeCheck className="size-8 text-emerald-500" />
                        <div>
                           <p className="text-xs font-black uppercase text-emerald-500 tracking-widest">Compliance Status</p>
                           <p className="text-lg font-black uppercase">GDPR Ready</p>
                        </div>
                     </div>
                     <p className="text-[10px] text-zinc-500 font-bold uppercase leading-relaxed">System is operating within global data privacy standards. All logs are anonymized.</p>
                  </LuxuryCard>
                </div>

                <div className="col-span-8">
                  <LuxuryCard>
                     <div className="flex justify-between items-center mb-10">
                        <h4 className="text-sm font-black uppercase tracking-widest flex items-center gap-3">
                           <Ban className="size-5 text-red-500" /> Enforcement Policies
                        </h4>
                        <button className="flex items-center gap-2 text-[10px] font-black uppercase text-primary tracking-widest px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                           <Plus className="size-3" /> Add Policy
                        </button>
                     </div>
                     <div className="space-y-4">
                        {[
                          { title: "Zero-Tolerance: CSAM", type: "CRITICAL", action: "Block", tags: ["Image", "Video"] },
                          { title: "Hate Speech - Tier 1", type: "HIGH", action: "Block", tags: ["Text", "Fuzzy"] },
                          { title: "Coordinated Harassment", type: "MEDIUM", action: "Flag", tags: ["Context"] },
                          { title: "Commercial Spam", type: "LOW", action: "Label", tags: ["Links"] }
                        ].map((p, i) => (
                          <div key={i} className="flex items-center justify-between p-6 rounded-3xl bg-black/30 border border-white/5 hover:border-white/10 transition-colors group">
                             <div className="flex items-center gap-6">
                                <span className={cn("text-[9px] font-black px-2 py-1 rounded-sm", 
                                  p.type === 'CRITICAL' ? "bg-red-500/20 text-red-500" :
                                  p.type === 'HIGH' ? "bg-amber-500/20 text-amber-500" : "bg-primary/20 text-primary"
                                )}>{p.type}</span>
                                <div>
                                   <p className="text-sm font-bold text-zinc-200">{p.title}</p>
                                   <div className="flex gap-2 mt-1">
                                      {p.tags.map(t => <span key={t} className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">{t}</span>)}
                                   </div>
                                </div>
                             </div>
                             <div className="flex items-center gap-8">
                                <span className="text-[10px] font-black uppercase text-zinc-500">{p.action}</span>
                                <div className="w-10 h-6 bg-primary rounded-full flex items-center px-1">
                                   <div className="size-4 bg-white rounded-full ml-auto" />
                                </div>
                                <button className="p-2 rounded-xl bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <ChevronRight className="size-4 text-zinc-600" />
                                </button>
                             </div>
                          </div>
                        ))}
                     </div>
                  </LuxuryCard>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="fixed bottom-10 right-10 z-[100]">
         <motion.div 
           initial={{ opacity: 0 }}
           animate={{ opacity: 0.5 }}
           className="flex items-center gap-4 bg-black/40 backdrop-blur-2xl border border-white/10 px-6 py-3 rounded-full"
         >
            <ShieldHalf className="size-4 text-primary" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-zinc-500">Neural Security Active</span>
         </motion.div>
      </footer>
    </div>
  );
}

const Plus = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
  </svg>
);
