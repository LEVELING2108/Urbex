import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  BarChart3,
  Brain,
  Bug,
  Check,
  ChevronDown,
  Database,
  EyeOff,
  FileText,
  Flag,
  Flame,
  Mail,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  ShieldHalf,
  SlidersHorizontal,
  Swords,
  TrendingDown,
  TrendingUp,
  Users,
  Webhook,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="relative font-['Plus_Jakarta_Sans',sans-serif] bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="pointer-events-none bg-[radial-gradient(circle,oklch(0.541_0.281_293/0.18),transparent_70%)] blur-3xl rounded-full absolute -left-40 -top-40 w-150 h-150" />
        <div className="pointer-events-none top-1/3 bg-[radial-gradient(circle,oklch(0.7_0.16_200/0.14),transparent_70%)] blur-3xl rounded-full absolute right-0 w-150 h-150" />
        <div className="relative min-h-[1080px] flex w-full">
          <aside className="sticky shrink-0 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex top-0 py-8 flex-col justify-between items-center w-24 h-270">
            <div className="flex flex-col items-center gap-8">
              <div className="size-14 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_8px_30px_rgba(127,34,254,0.5)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-7 text-white" />
              </div>
              <nav className="flex flex-col items-center gap-2">
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <Zap className="size-5" />
                  <span className="font-medium text-[10px]">Console</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <FileText className="size-5" />
                  <span className="font-medium text-[10px]">Audit Logs</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <BarChart3 className="size-5" />
                  <span className="font-medium text-[10px]">Analytics</span>
                </button>
                <button className="ring-1 ring-primary/60 shadow-[0_0_20px_rgba(127,34,254,0.3)] rounded-xl bg-[#7f22fe]/15 text-neutral-50 flex py-3 flex-col items-center gap-1 w-16">
                  <Settings className="size-5 text-[#7f22fe]" />
                  <span className="font-semibold text-[10px]">AI Core</span>
                </button>
              </nav>
            </div>
            <div className="size-11 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary font-semibold rounded-full text-white text-sm leading-5 flex justify-center items-center">
              AK
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="ring-1 ring-primary/40 font-mono font-semibold rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[11px] tracking-wider px-3 py-1">
                  NEURAL ENGINE v4.2
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                  Last Saved 2m ago
                </span>
                <Button className="text-[#9f9fa9] gap-2" variant="ghost">
                  <RotateCcw className="size-4" />
                  Reset Defaults
                </Button>
                <Button className="shadow-[0_0_25px_rgba(127,34,254,0.45)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Save className="size-4" />
                  Save Configuration
                </Button>
              </div>
            </header>
            <div className="grid grid-cols-12 mt-8 gap-8">
              <Card className="col-span-3 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-4 gap-2 h-fit">
                <p className="font-semibold text-[#9f9fa9] text-[11px] tracking-widest px-3 pb-2">
                  SETTINGS
                </p>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex p-3 items-center gap-3">
                  <Brain className="size-4" />
                  <span className="text-sm leading-5">Model Configuration</span>
                </button>
                <button className="rounded-xl bg-[#7f22fe]/15 text-neutral-50 border-[#7f22fe] border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 items-center gap-3">
                  <SlidersHorizontal className="size-4 text-[#7f22fe]" />
                  <span className="font-semibold text-sm leading-5">
                    Detection Thresholds
                  </span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex p-3 items-center gap-3">
                  <Database className="size-4" />
                  <span className="text-sm leading-5">RAG Vector Store</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex p-3 items-center gap-3">
                  <RefreshCw className="size-4" />
                  <span className="text-sm leading-5">Active Learning</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex p-3 items-center gap-3">
                  <Webhook className="size-4" />
                  <span className="text-sm leading-5">{`Webhooks & API`}</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex p-3 items-center gap-3">
                  <Shield className="size-4" />
                  <span className="text-sm leading-5">Safety Policies</span>
                </button>
              </Card>
              <div className="col-span-9 flex flex-col gap-8">
                <div className="flex items-center gap-3">
                  <div className="size-10 ring-1 ring-primary/30 rounded-xl bg-[#7f22fe]/15 flex justify-center items-center">
                    <SlidersHorizontal className="size-5 text-[#7f22fe]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl leading-7">
                      Detection Thresholds
                    </h2>
                    <p className="text-white/50 text-sm leading-5">
                      Fine-tune per-category confidence cutoffs and escalation
                      triggers.
                    </p>
                  </div>
                </div>
                <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <p className="font-semibold text-[#9f9fa9] text-xs leading-4 tracking-widest">
                      CATEGORY THRESHOLDS
                    </p>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-0">
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.704_0.191_22.216/0.15)] rounded-lg flex justify-center items-center">
                          <Flame className="size-4 text-[oklch(0.704_0.191_22.216)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Hate Speech
                          </p>
                          <p className="text-white/50 text-[11px]">{`Slurs & targeted abuse`}</p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[82%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[82%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.82
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Block
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-[#7f22fe] w-11 h-6">
                          <div className="size-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.769_0.188_70.08/0.15)] rounded-lg flex justify-center items-center">
                          <AlertTriangle className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Toxicity
                          </p>
                          <p className="text-white/50 text-[11px]">
                            General harmful tone
                          </p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[75%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[75%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.75
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Auto-Flag
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-[#7f22fe] w-11 h-6">
                          <div className="size-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                          <EyeOff className="size-4 text-[#7f22fe]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            NSFW
                          </p>
                          <p className="text-white/50 text-[11px]">
                            Explicit imagery
                          </p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[70%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[70%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.70
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Block
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-[#7f22fe] w-11 h-6">
                          <div className="size-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.7_0.16_200/0.15)] rounded-lg flex justify-center items-center">
                          <Mail className="size-4 text-[oklch(0.7_0.16_200)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Spam
                          </p>
                          <p className="text-white/50 text-[11px]">
                            Unsolicited content
                          </p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[65%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[65%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.65
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Review
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-[#7f22fe] w-11 h-6">
                          <div className="size-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.7_0.18_45/0.15)] rounded-lg flex justify-center items-center">
                          <Swords className="size-4 text-[oklch(0.7_0.18_45)]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Violence
                          </p>
                          <p className="text-white/50 text-[11px]">{`Graphic & threats`}</p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[78%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[78%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.78
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Escalate
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-[#7f22fe] w-11 h-6">
                          <div className="size-5 rounded-full bg-white absolute right-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-12 py-4 items-center gap-4">
                      <div className="col-span-3 flex items-center gap-3">
                        <div className="size-9 rounded-lg bg-white/5 flex justify-center items-center">
                          <Bug className="size-4 text-[#9f9fa9]" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Misinformation
                          </p>
                          <p className="text-white/50 text-[11px]">
                            False claims detection
                          </p>
                        </div>
                      </div>
                      <div className="col-span-4 flex items-center gap-3">
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[60%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full absolute left-0 top-0 h-full" />
                          <div className="left-[60%] top-1/2 size-4 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_10px_rgba(127,34,254,0.6)] rounded-full bg-white absolute" />
                        </div>
                        <span className="font-mono text-neutral-50 text-sm leading-5">
                          0.60
                        </span>
                      </div>
                      <div className="col-span-3 flex justify-center">
                        <div className="rounded-full bg-white/5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span className="text-neutral-50 text-xs leading-4">
                            Review
                          </span>
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="col-span-2 flex justify-end">
                        <div className="relative rounded-full bg-white/15 w-11 h-6">
                          <div className="size-5 rounded-full bg-white/60 absolute left-0.5 top-0.5" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <div className="grid grid-cols-2 gap-8">
                  <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-1">
                      <p className="font-semibold text-[#9f9fa9] text-xs leading-4 tracking-widest">
                        ESCALATION RULES
                      </p>
                      <p className="font-semibold text-neutral-50 text-sm leading-5">
                        Auto-Escalation Triggers
                      </p>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-3">
                      <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex px-4 py-3 justify-between items-center">
                        <div className="text-sm leading-5 flex items-center gap-2">
                          <span className="font-mono text-[#9f9fa9] text-xs leading-4">{`Confidence > 0.90`}</span>
                          <ArrowRight className="size-3.5 text-[#9f9fa9]" />
                        </div>
                        <span className="bg-[oklch(0.704_0.191_22.216/0.15)] text-[oklch(0.704_0.191_22.216)] font-semibold rounded-full text-[11px] px-2.5 py-1">
                          Immediate Escalate
                        </span>
                      </div>
                      <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex px-4 py-3 justify-between items-center">
                        <div className="text-sm leading-5 flex items-center gap-2">
                          <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                            Multi-category match
                          </span>
                          <ArrowRight className="size-3.5 text-[#9f9fa9]" />
                        </div>
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] font-semibold rounded-full text-[11px] px-2.5 py-1">
                          Human Review
                        </span>
                      </div>
                      <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex px-4 py-3 justify-between items-center">
                        <div className="text-sm leading-5 flex items-center gap-2">
                          <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                            Repeat offender
                          </span>
                          <ArrowRight className="size-3.5 text-[#9f9fa9]" />
                        </div>
                        <span className="font-semibold rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[11px] px-2.5 py-1">
                          Flag + Notify
                        </span>
                      </div>
                      <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex px-4 py-3 justify-between items-center">
                        <div className="text-sm leading-5 flex items-center gap-2">
                          <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                            Novel content type
                          </span>
                          <ArrowRight className="size-3.5 text-[#9f9fa9]" />
                        </div>
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] font-semibold rounded-full text-[11px] px-2.5 py-1">
                          Learning Queue
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-1">
                      <p className="font-semibold text-[#9f9fa9] text-xs leading-4 tracking-widest">
                        PRESETS
                      </p>
                      <p className="font-semibold text-neutral-50 text-sm leading-5">
                        Threshold Presets
                      </p>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-3">
                      <div className="rounded-xl bg-white border-white/10 border-1 border-solid flex px-4 py-3 items-start gap-3">
                        <div className="size-4 shrink-0 rounded-full border-white/30 border-2 border-solid mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Conservative
                          </p>
                          <p className="text-white/50 text-[11px]">
                            Higher cutoffs, fewer flags, minimal false
                            positives.
                          </p>
                        </div>
                      </div>
                      <div className="shadow-[0_0_20px_rgba(127,34,254,0.2)] rounded-xl bg-[#7f22fe]/10 border-[#7f22fe]/50 border-1 border-solid flex px-4 py-3 items-start gap-3">
                        <div className="size-4 shrink-0 rounded-full border-[#7f22fe] border-2 border-solid flex mt-0.5 justify-center items-center">
                          <div className="size-2 rounded-full bg-[#7f22fe]" />
                        </div>
                        <div>
                          <p className="font-semibold text-neutral-50 text-sm leading-5">
                            Balanced
                          </p>
                          <p className="text-white/60 text-[11px]">
                            Optimized accuracy-to-recall trade-off for most
                            workloads.
                          </p>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white border-white/10 border-1 border-solid flex px-4 py-3 items-start gap-3">
                        <div className="size-4 shrink-0 rounded-full border-white/30 border-2 border-solid mt-0.5" />
                        <div>
                          <p className="font-semibold text-sm leading-5">
                            Aggressive
                          </p>
                          <p className="text-white/50 text-[11px]">
                            Lower cutoffs, maximum coverage, more escalations.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0">
                      <Button
                        className="text-[#7f22fe] border-[#7f22fe]/40 border-1 border-solid gap-2 w-full"
                        variant="ghost"
                      >
                        <Check className="size-4" />
                        Apply Preset
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <p className="font-semibold text-[#9f9fa9] text-xs leading-4 tracking-widest">
                      LIVE THRESHOLD IMPACT
                    </p>
                  </CardHeader>
                  <CardContent className="grid grid-cols-4 p-0 gap-4">
                    <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex p-4 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.696_0.17_162.48/0.15)] rounded-lg flex justify-center items-center">
                          <TrendingDown className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                        </div>
                        <div>
                          <p className="text-white/50 text-[11px]">
                            Est. False Positive
                          </p>
                          <p className="text-[oklch(0.696_0.17_162.48)] font-mono font-bold text-lg leading-7">
                            2.3%
                          </p>
                        </div>
                      </div>
                      <ArrowDown className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                    </div>
                    <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex p-4 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.769_0.188_70.08/0.15)] rounded-lg flex justify-center items-center">
                          <TrendingUp className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                        </div>
                        <div>
                          <p className="text-white/50 text-[11px]">
                            Est. False Negative
                          </p>
                          <p className="text-[oklch(0.769_0.188_70.08)] font-mono font-bold text-lg leading-7">
                            1.1%
                          </p>
                        </div>
                      </div>
                      <ArrowUp className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                    </div>
                    <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex p-4 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="size-9 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                          <Flag className="size-4 text-[#7f22fe]" />
                        </div>
                        <div>
                          <p className="text-white/50 text-[11px]">
                            Daily Auto-Flags
                          </p>
                          <p className="font-mono font-bold text-[#7f22fe] text-lg leading-7">
                            ~18,400
                          </p>
                        </div>
                      </div>
                      <ArrowUp className="size-4 text-[#7f22fe]" />
                    </div>
                    <div className="rounded-xl bg-white border-white/5 border-1 border-solid flex p-4 justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="size-9 bg-[oklch(0.7_0.16_200/0.15)] rounded-lg flex justify-center items-center">
                          <Users className="size-4 text-[oklch(0.7_0.16_200)]" />
                        </div>
                        <div>
                          <p className="text-white/50 text-[11px]">
                            Human Escalations
                          </p>
                          <p className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-lg leading-7">
                            ~1,200
                          </p>
                        </div>
                      </div>
                      <ArrowDown className="size-4 text-[oklch(0.7_0.16_200)]" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
