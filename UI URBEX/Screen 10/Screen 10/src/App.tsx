import { useEffect } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  Check,
  ChevronDown,
  Clock,
  Cpu,
  Database,
  FileText,
  Flag,
  History,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  ShieldHalf,
  SlidersHorizontal,
  Target,
  User,
  Users,
  Webhook,
  X,
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
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="pointer-events-none size-[600px] bg-[radial-gradient(circle,oklch(0.541_0.281_293.009/.18),transparent_70%)] blur-3xl rounded-full absolute -left-40 -top-40" />
        <div className="pointer-events-none top-1/3 size-[700px] bg-[radial-gradient(circle,oklch(0.7_0.16_200/.12),transparent_70%)] blur-3xl rounded-full absolute right-0" />
        <div className="relative min-h-[1080px] flex w-full">
          <aside className="shrink-0 backdrop-blur-2xl bg-zinc-900/40 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-8">
              <div className="size-12 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] shadow-[0_8px_30px_rgba(127,34,254,0.4)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-6 text-white" />
              </div>
              <nav className="flex flex-col items-center gap-4">
                <button className="transition rounded-xl text-white/50 flex py-3 flex-col items-center gap-1 w-16">
                  <Zap className="size-5" />
                  <span className="font-medium text-[10px]">Console</span>
                </button>
                <button className="transition rounded-xl text-white/50 flex py-3 flex-col items-center gap-1 w-16">
                  <FileText className="size-5" />
                  <span className="font-medium text-[10px]">Audit Logs</span>
                </button>
                <button className="transition rounded-xl text-white/50 flex py-3 flex-col items-center gap-1 w-16">
                  <BarChart3 className="size-5" />
                  <span className="font-medium text-[10px]">Analytics</span>
                </button>
                <button className="border-[oklch(0.541_0.281_293.009)]/40 bg-[oklch(0.541_0.281_293.009)]/15 shadow-[0_0_20px_rgba(127,34,254,0.3)] rounded-xl text-white border-black/1 border-1 border-solid flex py-3 flex-col items-center gap-1 w-16">
                  <Settings className="size-5 text-[oklch(0.7_0.4_293.009)]" />
                  <span className="font-semibold text-[10px]">AI Core</span>
                </button>
              </nav>
            </div>
            <div className="size-11 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full flex justify-center items-center">
              <User className="size-5 text-white" />
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <header className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-white text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="border-[oklch(0.541_0.281_293.009)]/40 bg-[oklch(0.541_0.281_293.009)]/15 text-[oklch(0.75_0.18_293.009)] font-mono rounded-full text-[11px] tracking-wider border-black/1 border-1 border-solid px-3 py-1">
                  NEURAL ENGINE v4.2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-white/50 text-xs leading-4">
                  Last Saved 2m ago
                </span>
                <Button className="text-white/70 gap-2" variant="ghost">
                  <RotateCcw className="size-4" />
                  Reset Defaults
                </Button>
                <Button className="bg-[oklch(0.541_0.281_293.009)] shadow-[0_8px_30px_rgba(127,34,254,0.4)] text-white gap-2">
                  <Save className="size-4" />
                  Save Configuration
                </Button>
              </div>
            </header>
            <div className="grid grid-cols-12 mt-8 gap-6">
              <Card className="col-span-3 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-4 gap-2">
                <CardHeader className="p-0 gap-0">
                  <p className="font-mono uppercase text-white/40 text-[11px] tracking-widest px-2 pb-2">
                    Settings
                  </p>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-1">
                  <button className="transition rounded-xl text-white/60 text-sm leading-5 flex p-3 items-center gap-3">
                    <Brain className="size-4" />
                    Model Configuration
                  </button>
                  <button className="transition rounded-xl text-white/60 text-sm leading-5 flex p-3 items-center gap-3">
                    <SlidersHorizontal className="size-4" />
                    Detection Thresholds
                  </button>
                  <button className="transition rounded-xl text-white/60 text-sm leading-5 flex p-3 items-center gap-3">
                    <Database className="size-4" />
                    RAG Vector Store
                  </button>
                  <button className="border-[oklch(0.541_0.281_293.009)] bg-[oklch(0.541_0.281_293.009)]/15 font-semibold rounded-xl text-white text-sm leading-5 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 items-center gap-3">
                    <RefreshCw className="size-4 text-[oklch(0.75_0.18_293.009)]" />
                    Active Learning
                  </button>
                  <button className="transition rounded-xl text-white/60 text-sm leading-5 flex p-3 items-center gap-3">
                    <Webhook className="size-4" />
                    {`Webhooks & API`}
                  </button>
                  <button className="transition rounded-xl text-white/60 text-sm leading-5 flex p-3 items-center gap-3">
                    <Shield className="size-4" />
                    Safety Policies
                  </button>
                </CardContent>
              </Card>
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="size-10 bg-[oklch(0.541_0.281_293.009)]/15 rounded-xl flex justify-center items-center">
                    <RefreshCw className="size-5 text-[oklch(0.75_0.18_293.009)]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-white text-xl leading-7">
                      Active Learning
                    </h2>
                    <p className="text-white/50 text-sm leading-5">
                      Configure adaptive feedback loops, retraining schedules,
                      and human-in-the-loop review queues.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-6">
                  <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm leading-5">
                          Feedback Signals Today
                        </span>
                        <Activity className="size-4 text-[oklch(0.7_0.16_200)]" />
                      </div>
                      <span className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-2xl leading-8">
                        12,847
                      </span>
                      <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[11px] px-2 py-0.5 w-fit">
                        +8.3%
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm leading-5">
                          Pending Review Queue
                        </span>
                        <Clock className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                      </div>
                      <span className="text-[oklch(0.769_0.188_70.08)] font-mono font-bold text-2xl leading-8">
                        342
                      </span>
                      <span className="text-white/40 text-[11px]">
                        awaiting human review
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm leading-5">
                          Model Accuracy
                        </span>
                        <Target className="size-4 text-[oklch(0.75_0.18_293.009)]" />
                      </div>
                      <span className="text-[oklch(0.75_0.18_293.009)] font-mono font-bold text-2xl leading-8">
                        99.1%
                      </span>
                      <span className="text-white/40 text-[11px]">
                        validation set
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-white/60 text-sm leading-5">
                          Last Retrain
                        </span>
                        <History className="size-4 text-white/70" />
                      </div>
                      <span className="font-mono font-bold text-white/70 text-2xl leading-8">
                        6h ago
                      </span>
                      <span className="text-white/40 text-[11px]">
                        v4.2.118 deployed
                      </span>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-9 gap-6">
                  <Card className="col-span-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-0">
                      <h3 className="font-mono uppercase text-white/40 text-[11px] tracking-widest">
                        Learning Engine Status
                      </h3>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-4">
                      <div className="border-[oklch(0.696_0.17_162.48)]/20 bg-[oklch(0.696_0.17_162.48)]/10 rounded-xl border-black/1 border-1 border-solid flex p-4 items-center gap-3">
                        <span className="relative size-3 flex">
                          <span className="inline-flex animate-ping bg-[oklch(0.696_0.17_162.48)] opacity-75 rounded-full absolute w-full h-full" />
                          <span className="relative inline-flex size-3 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                        </span>
                        <div>
                          <p className="font-semibold text-white">
                            LEARNING ACTIVE
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Ingesting 142 feedback signals
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70 text-sm leading-5">
                            Model Retraining Progress
                          </span>
                          <span className="text-[oklch(0.75_0.18_293.009)] font-mono text-sm leading-5">
                            68%
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-2 overflow-hidden">
                          <div className="w-[68%] bg-gradient-to-r from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl bg-white border-white/10 border-1 border-solid p-4">
                          <p className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-lg leading-7">
                            12.4k
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Reviews Today
                          </p>
                        </div>
                        <div className="rounded-xl bg-white border-white/10 border-1 border-solid p-4">
                          <p className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-lg leading-7">
                            +0.3%
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Accuracy Delta
                          </p>
                        </div>
                        <div className="rounded-xl bg-white border-white/10 border-1 border-solid p-4">
                          <p className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-lg leading-7">
                            847
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Signals Queued
                          </p>
                        </div>
                        <div className="rounded-xl bg-white border-white/10 border-1 border-solid p-4">
                          <p className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-lg leading-7">
                            94.2%
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Auto-Approved
                          </p>
                        </div>
                      </div>
                      <Button
                        className="border-[oklch(0.769_0.188_70.08)]/30 text-[oklch(0.769_0.188_70.08)] border-black/1 border-1 border-solid gap-2"
                        variant="ghost"
                      >
                        <RefreshCw className="size-4" />
                        Trigger Manual Retrain
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="col-span-4 shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-0">
                      <h3 className="font-mono uppercase text-white/40 text-[11px] tracking-widest">
                        Retraining Schedule
                      </h3>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-3">
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex pb-3 justify-between items-center">
                        <span className="text-white/70 text-sm leading-5">
                          Schedule
                        </span>
                        <span className="font-mono rounded-lg bg-white text-white text-xs leading-4 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          Every 6 Hours
                          <ChevronDown className="size-3 text-white/40" />
                        </span>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex pb-3 justify-between items-center">
                        <span className="text-white/70 text-sm leading-5">
                          Min Feedback Threshold
                        </span>
                        <span className="font-mono rounded-lg bg-white text-white text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5">
                          500 signals
                        </span>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex pb-3 justify-between items-center">
                        <span className="text-white/70 text-sm leading-5">
                          Auto-Deploy
                        </span>
                        <span className="bg-[oklch(0.541_0.281_293.009)] rounded-full flex p-0.5 items-center w-11 h-6">
                          <span className="size-5 translate-x-5 rounded-full bg-white" />
                        </span>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex pb-3 justify-between items-center">
                        <span className="text-white/70 text-sm leading-5">
                          Rollback on Regression
                        </span>
                        <span className="bg-[oklch(0.541_0.281_293.009)] rounded-full flex p-0.5 items-center w-11 h-6">
                          <span className="size-5 translate-x-5 rounded-full bg-white" />
                        </span>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex pb-3 flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-white/70 text-sm leading-5">
                            Validation Split
                          </span>
                          <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                            20%
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-1.5 overflow-hidden">
                          <div className="w-[20%] bg-[oklch(0.7_0.16_200)] rounded-full h-full" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/70 text-sm leading-5">
                          Notification on Complete
                        </span>
                        <span className="bg-[oklch(0.541_0.281_293.009)] rounded-full flex p-0.5 items-center w-11 h-6">
                          <span className="size-5 translate-x-5 rounded-full bg-white" />
                        </span>
                      </div>
                      <div className="rounded-xl bg-white border-white/10 border-1 border-solid mt-1 p-4">
                        <p className="font-mono uppercase text-white/40 text-[10px] tracking-widest">
                          Next Scheduled Retrain
                        </p>
                        <div className="flex mt-2 items-center gap-2">
                          <Clock className="size-5 text-[oklch(0.7_0.16_200)]" />
                          <span className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-2xl leading-8">
                            02:14:33
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl rounded-2xl bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 flex-row items-center gap-2">
                    <Users className="size-4 text-[oklch(0.75_0.18_293.009)]" />
                    <h3 className="font-mono uppercase text-white/40 text-[11px] tracking-widest">
                      Human Review Queue
                    </h3>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-0">
                    <div className="grid grid-cols-12 uppercase text-white/40 text-[11px] tracking-widest border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-2 py-3 gap-4">
                      <span className="col-span-4">Content Preview</span>
                      <span className="col-span-2">Category</span>
                      <span className="col-span-1">Confidence</span>
                      <span className="col-span-2">Flagged By</span>
                      <span className="col-span-1">Time</span>
                      <span className="col-span-2 text-right">Actions</span>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-2 py-3.5 items-center gap-4">
                      <span className="col-span-4 truncate blur-[2px] font-mono text-white/60 text-xs leading-4">
                        u_aggressive_slur_pattern_detected...
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.704_0.191_22.216)]/15 text-[oklch(0.704_0.191_22.216)] rounded-full text-[11px] px-2.5 py-1">
                          Hate
                        </span>
                      </span>
                      <span className="col-span-1 text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                        0.96
                      </span>
                      <span className="col-span-2 text-white/60 text-xs leading-4 flex items-center gap-1.5">
                        <Cpu className="size-3.5" />
                        System
                      </span>
                      <span className="col-span-1 font-mono text-white/50 text-xs leading-4">
                        2m
                      </span>
                      <span className="col-span-2 flex justify-end gap-2">
                        <Button
                          className="border-[oklch(0.696_0.17_162.48)]/30 text-[oklch(0.696_0.17_162.48)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <Check className="size-3" />
                          Approve
                        </Button>
                        <Button
                          className="border-[oklch(0.704_0.191_22.216)]/30 text-[oklch(0.704_0.191_22.216)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <X className="size-3" />
                          Reject
                        </Button>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-2 py-3.5 items-center gap-4">
                      <span className="col-span-4 truncate blur-[2px] font-mono text-white/60 text-xs leading-4">
                        img_explicit_content_region_04...
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.627_0.265_303.9)]/15 text-[oklch(0.75_0.2_303.9)] rounded-full text-[11px] px-2.5 py-1">
                          NSFW
                        </span>
                      </span>
                      <span className="col-span-1 text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                        0.88
                      </span>
                      <span className="col-span-2 text-white/60 text-xs leading-4 flex items-center gap-1.5">
                        <Flag className="size-3.5" />
                        User Report
                      </span>
                      <span className="col-span-1 font-mono text-white/50 text-xs leading-4">
                        7m
                      </span>
                      <span className="col-span-2 flex justify-end gap-2">
                        <Button
                          className="border-[oklch(0.696_0.17_162.48)]/30 text-[oklch(0.696_0.17_162.48)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <Check className="size-3" />
                          Approve
                        </Button>
                        <Button
                          className="border-[oklch(0.704_0.191_22.216)]/30 text-[oklch(0.704_0.191_22.216)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <X className="size-3" />
                          Reject
                        </Button>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-2 py-3.5 items-center gap-4">
                      <span className="col-span-4 truncate blur-[2px] font-mono text-white/60 text-xs leading-4">
                        bulk_promotional_link_spray_x42...
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.769_0.188_70.08)]/15 text-[oklch(0.769_0.188_70.08)] rounded-full text-[11px] px-2.5 py-1">
                          Spam
                        </span>
                      </span>
                      <span className="col-span-1 text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                        0.79
                      </span>
                      <span className="col-span-2 text-white/60 text-xs leading-4 flex items-center gap-1.5">
                        <Cpu className="size-3.5" />
                        System
                      </span>
                      <span className="col-span-1 font-mono text-white/50 text-xs leading-4">
                        12m
                      </span>
                      <span className="col-span-2 flex justify-end gap-2">
                        <Button
                          className="border-[oklch(0.696_0.17_162.48)]/30 text-[oklch(0.696_0.17_162.48)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <Check className="size-3" />
                          Approve
                        </Button>
                        <Button
                          className="border-[oklch(0.704_0.191_22.216)]/30 text-[oklch(0.704_0.191_22.216)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <X className="size-3" />
                          Reject
                        </Button>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-2 py-3.5 items-center gap-4">
                      <span className="col-span-4 truncate blur-[2px] font-mono text-white/60 text-xs leading-4">
                        threat_language_graphic_seq_09...
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.645_0.246_16.439)]/15 text-[oklch(0.7_0.22_16.439)] rounded-full text-[11px] px-2.5 py-1">
                          Violence
                        </span>
                      </span>
                      <span className="col-span-1 text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                        0.91
                      </span>
                      <span className="col-span-2 text-white/60 text-xs leading-4 flex items-center gap-1.5">
                        <Flag className="size-3.5" />
                        User Report
                      </span>
                      <span className="col-span-1 font-mono text-white/50 text-xs leading-4">
                        18m
                      </span>
                      <span className="col-span-2 flex justify-end gap-2">
                        <Button
                          className="border-[oklch(0.696_0.17_162.48)]/30 text-[oklch(0.696_0.17_162.48)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <Check className="size-3" />
                          Approve
                        </Button>
                        <Button
                          className="border-[oklch(0.704_0.191_22.216)]/30 text-[oklch(0.704_0.191_22.216)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <X className="size-3" />
                          Reject
                        </Button>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 px-2 py-3.5 items-center gap-4">
                      <span className="col-span-4 truncate blur-[2px] font-mono text-white/60 text-xs leading-4">
                        ambiguous_sarcasm_context_117...
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.7_0.16_200)]/15 text-[oklch(0.7_0.16_200)] rounded-full text-[11px] px-2.5 py-1">
                          Edge Case
                        </span>
                      </span>
                      <span className="col-span-1 text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                        0.54
                      </span>
                      <span className="col-span-2 text-white/60 text-xs leading-4 flex items-center gap-1.5">
                        <Cpu className="size-3.5" />
                        System
                      </span>
                      <span className="col-span-1 font-mono text-white/50 text-xs leading-4">
                        24m
                      </span>
                      <span className="col-span-2 flex justify-end gap-2">
                        <Button
                          className="border-[oklch(0.696_0.17_162.48)]/30 text-[oklch(0.696_0.17_162.48)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <Check className="size-3" />
                          Approve
                        </Button>
                        <Button
                          className="border-[oklch(0.704_0.191_22.216)]/30 text-[oklch(0.704_0.191_22.216)] text-xs leading-4 border-black/1 border-1 border-solid px-2.5 gap-1 h-7"
                          variant="ghost"
                        >
                          <X className="size-3" />
                          Reject
                        </Button>
                      </span>
                    </div>
                  </CardContent>
                  <CardFooter className="p-0">
                    <span className="text-white/50 text-xs leading-4">
                      Showing 5 of 342 items
                    </span>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
