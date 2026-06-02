import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, 
  Search, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  Send, 
  Image as ImageIcon, 
  X,
  ThumbsUp,
  ThumbsDown,
  Info,
  ChevronRight,
  Database,
  Cpu
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

const GlassCard = ({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className={cn("glass-card p-6 rounded-2xl overflow-hidden relative", className)}
  >
    {children}
  </motion.div>
);

const Badge = ({ children, variant = 'neutral' }: { children: React.ReactNode, variant?: 'toxic' | 'safe' | 'neutral' }) => {
  const styles = {
    toxic: "bg-red-500/20 text-red-400 border-red-500/30",
    safe: "bg-green-500/20 text-green-400 border-green-500/30",
    neutral: "bg-zinc-500/20 text-zinc-400 border-zinc-500/30"
  };
  return (
    <span className={cn("px-2.5 py-0.5 rounded-full text-xs font-medium border", styles[variant])}>
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

  useEffect(() => {
    fetchStats();
    fetchLogs();
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
      reader.onloadend = () => {
        setImageData(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFeedback = async (wasCorrect: boolean) => {
    if (!result) return;
    try {
      await submitFeedback(result.request_id, wasCorrect);
      // Show some success toast or something
    } catch (err) {
      console.error("Feedback failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-background text-zinc-100 selection:bg-primary/30">
      {/* --- Ambient Background --- */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-accent-cyan/10 rounded-full blur-[120px]" />
      </div>

      {/* --- Header --- */}
      <header className="sticky top-0 z-50 glass border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent-cyan flex items-center justify-center shadow-lg shadow-primary/20">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-2xl font-bold tracking-tighter text-gradient">URBEX</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
            {['console', 'analytics', 'history'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize",
                  activeTab === tab 
                    ? "bg-primary text-white shadow-lg shadow-primary/20" 
                    : "text-zinc-400 hover:text-white hover:bg-white/5"
                )}
              >
                {tab}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Badge variant="neutral">v1.0.0 Pro</Badge>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'console' && (
            <motion.div
              key="console"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* --- Input Section --- */}
              <div className="lg:col-span-2 space-y-6">
                <GlassCard>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                      <Cpu className="w-5 h-5 text-primary" />
                      Moderation Console
                    </h3>
                    <div className="flex gap-2">
                      <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
                        title="Upload Image"
                      >
                        <ImageIcon className="w-5 h-5 text-zinc-400" />
                      </button>
                    </div>
                  </div>

                  <div className="relative group">
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Enter content to moderate Semantically..."
                      className="w-full h-48 bg-black/20 rounded-xl p-4 text-zinc-100 placeholder:text-zinc-600 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/50 outline-none transition-all resize-none"
                    />
                    
                    {imageData && (
                      <div className="absolute bottom-4 left-4 group-hover:opacity-100 transition-opacity">
                        <div className="relative w-24 h-24 rounded-lg overflow-hidden border border-primary/50 shadow-xl">
                          <img src={imageData} alt="Preview" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => setImageData(null)}
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/50 hover:bg-red-500/50 text-white transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleImageUpload} 
                    className="hidden" 
                    accept="image/*" 
                  />

                  <div className="mt-6 flex justify-end">
                    <button
                      onClick={handleModerate}
                      disabled={loading || (!text.trim() && !imageData)}
                      className={cn(
                        "flex items-center gap-2 px-8 py-3 rounded-xl font-bold transition-all shadow-xl",
                        loading || (!text.trim() && !imageData)
                          ? "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                          : "bg-primary hover:bg-primary/80 text-white shadow-primary/20 hover:scale-[1.02] active:scale-[0.98]"
                      )}
                    >
                      {loading ? (
                        <Activity className="w-5 h-5 animate-spin" />
                      ) : (
                        <Send className="w-5 h-5" />
                      )}
                      Analyze Content
                    </button>
                  </div>
                </GlassCard>

                {/* --- Result Section --- */}
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={cn(
                        "glass-card p-8 rounded-2xl border-l-4",
                        result.is_toxic ? "border-l-red-500" : "border-l-green-500"
                      )}
                    >
                      <div className="flex flex-col md:flex-row justify-between gap-6">
                        <div className="space-y-4 flex-1">
                          <div className="flex items-center gap-3">
                            {result.is_toxic ? (
                              <AlertTriangle className="w-8 h-8 text-red-500" />
                            ) : (
                              <CheckCircle className="w-8 h-8 text-green-500" />
                            )}
                            <div>
                              <h4 className="text-xl font-bold">
                                {result.is_toxic ? "Content Blocked" : "Content Approved"}
                              </h4>
                              <p className="text-sm text-zinc-400">Request ID: {result.request_id}</p>
                            </div>
                          </div>
                          
                          <p className="text-zinc-300 leading-relaxed italic">
                            "{result.explanation}"
                          </p>

                          <div className="flex flex-wrap gap-2 pt-2">
                            <Badge variant={result.is_toxic ? 'toxic' : 'safe'}>
                              {result.toxicity_type.replace('_', ' ')}
                            </Badge>
                            <Badge variant="neutral">{result.latency_ms}ms latency</Badge>
                          </div>
                        </div>

                        <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/5 border border-white/10 min-w-[200px]">
                          <span className="text-zinc-400 text-xs uppercase tracking-widest mb-1">Confidence</span>
                          <span className={cn(
                            "text-4xl font-black",
                            result.is_toxic ? "text-red-500" : "text-green-500"
                          )}>
                            {(result.confidence * 100).toFixed(0)}%
                          </span>
                          
                          <div className="w-full mt-4 flex gap-2">
                            <button 
                              onClick={() => handleFeedback(true)}
                              className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-green-500/10 transition-colors group"
                            >
                              <ThumbsUp className="w-5 h-5 text-zinc-500 group-hover:text-green-500" />
                              <span className="text-[10px]">Correct</span>
                            </button>
                            <button 
                              onClick={() => handleFeedback(false)}
                              className="flex-1 flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-red-500/10 transition-colors group"
                            >
                              <ThumbsDown className="w-5 h-5 text-zinc-500 group-hover:text-red-500" />
                              <span className="text-[10px]">Incorrect</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {result.retrieved_examples && result.retrieved_examples.length > 0 && (
                        <div className="mt-8 pt-6 border-t border-white/5">
                          <h5 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-4 flex items-center gap-2">
                            <Database className="w-3 h-3" />
                            Contextual RAG Matches
                          </h5>
                          <div className="space-y-2">
                            {result.retrieved_examples.map((ex, i) => (
                              <div key={i} className="text-sm text-zinc-400 bg-white/5 p-3 rounded-lg border border-white/5 flex gap-3">
                                <span className="text-primary font-mono">{i + 1}.</span>
                                {ex}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* --- Sidebar Stats --- */}
              <div className="space-y-6">
                <GlassCard className="bg-gradient-to-br from-primary/10 to-accent-cyan/10">
                  <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
                    <Activity className="w-5 h-5 text-primary" />
                    Live System Stats
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Total Knowledge</span>
                      <p className="text-2xl font-black">{stats?.total_examples || '---'}</p>
                    </div>
                    <div className="space-y-1">
                      <span className="text-zinc-500 text-[10px] uppercase font-bold">Latency Avg</span>
                      <p className="text-2xl font-black">147ms</p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-red-500" 
                        style={{ width: stats ? `${(stats.toxic_examples / stats.total_examples) * 100}%` : '0%' }} 
                      />
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                      <span>Toxic Examples: {stats?.toxic_examples}</span>
                      <span>Safe: {stats?.safe_examples}</span>
                    </div>
                  </div>
                </GlassCard>

                <GlassCard>
                  <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Core Technology</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold">Tiered Filtering</p>
                        <p className="text-zinc-500">Fast path similarity matching</p>
                      </div>
                    </li>
                    <li className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                        <CheckCircle className="w-4 h-4 text-primary" />
                      </div>
                      <div className="text-xs">
                        <p className="font-bold">Active Learning</p>
                        <p className="text-zinc-500">Automated feedback loop</p>
                      </div>
                    </li>
                  </ul>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === 'analytics' && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <GlassCard className="lg:col-span-2 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Activity className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">Aggregate Toxicity Trends Chart</p>
                </div>
              </GlassCard>
              <GlassCard className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Search className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">Category Distribution</p>
                </div>
              </GlassCard>
              <GlassCard className="h-96 flex items-center justify-center">
                <div className="text-center">
                  <Info className="w-12 h-12 text-zinc-700 mx-auto mb-4" />
                  <p className="text-zinc-500">Performance Metrics</p>
                </div>
              </GlassCard>
            </motion.div>
          )}

          {activeTab === 'history' && (
            <motion.div
              key="history"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-4"
            >
              {logs.map((log, i) => (
                <GlassCard key={i} className="flex items-center justify-between py-4">
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-2 h-10 rounded-full",
                      log.is_toxic ? "bg-red-500" : "bg-green-500"
                    )} />
                    <div>
                      <p className="font-medium truncate max-w-md">{log.text}</p>
                      <p className="text-xs text-zinc-500">{new Date(log.timestamp).toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-right">
                    <div>
                      <p className="text-xs text-zinc-500 uppercase font-bold">Confidence</p>
                      <p className="font-bold">{(log.confidence * 100).toFixed(0)}%</p>
                    </div>
                    <Badge variant={log.is_toxic ? 'toxic' : 'safe'}>{log.toxicity_type}</Badge>
                    <ChevronRight className="w-5 h-5 text-zinc-700" />
                  </div>
                </GlassCard>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-white/5 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Shield className="w-4 h-4 text-primary" />
          <span className="font-bold tracking-tight text-zinc-500">URBEX PRO</span>
        </div>
        <p className="text-xs text-zinc-600">Built for Advanced Content Security and Digital Safety.</p>
      </footer>
    </div>
  );
}
