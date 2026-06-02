import { useEffect } from "react";
import {
  Activity,
  BarChart3,
  Bell,
  BrainCircuit,
  Cpu,
  Database,
  FileSearch,
  FileText,
  Gauge,
  GitBranch,
  ImagePlus,
  Lock,
  Network,
  RotateCcw,
  ScanLine,
  Settings,
  ShieldHalf,
  Sparkles,
  Zap,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Textarea } from "@/components/ui/textarea";
import { Area, AreaChart as RechartsAreaChart } from "recharts";

export default function App() {
  return (
    <div>
      <div className="relative bg-[#030303] text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="pointer-events-none width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E&quot;)] opacity-4 absolute inset-0" />
        <div className="pointer-events-none size-[600px] bg-[radial-gradient(circle,oklch(0.541_0.281_293.009/0.18),transparent_70%)] blur-3xl rounded-full absolute -left-40 -top-40" />
        <div className="pointer-events-none top-1/3 size-[600px] bg-[radial-gradient(circle,oklch(0.7_0.16_200/0.14),transparent_70%)] blur-3xl rounded-full absolute -right-40" />
        <div className="relative min-h-[1080px] flex w-full">
          <aside className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-12">
              <div className="size-12 bg-[linear-gradient(135deg,oklch(0.541_0.281_293.009),oklch(0.7_0.16_200))] shadow-[0_0_30px_oklch(0.541_0.281_293.009/0.6)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-6 text-white" />
              </div>
              <nav className="flex flex-col items-center gap-2">
                <button className="group ring-1 ring-white/15 transition-all rounded-xl bg-white/10 flex p-2 flex-col items-center gap-1 w-16">
                  <Zap className="size-5 text-[#7f22fe]" />
                  <span className="font-medium text-neutral-50 text-[10px]">
                    Console
                  </span>
                </button>
                <button className="group transition-all rounded-xl flex p-2 flex-col items-center gap-1 w-16">
                  <FileText className="size-5 text-[#9f9fa9]" />
                  <span className="font-medium text-[#9f9fa9] text-[10px]">
                    Audit Logs
                  </span>
                </button>
                <button className="group transition-all rounded-xl flex p-2 flex-col items-center gap-1 w-16">
                  <BarChart3 className="size-5 text-[#9f9fa9]" />
                  <span className="font-medium text-[#9f9fa9] text-[10px]">
                    Analytics
                  </span>
                </button>
                <button className="group transition-all rounded-xl flex p-2 flex-col items-center gap-1 w-16">
                  <Settings className="size-5 text-[#9f9fa9]" />
                  <span className="font-medium text-[#9f9fa9] text-[10px]">
                    AI Core
                  </span>
                </button>
              </nav>
            </div>
            <Avatar className="size-10 ring-2 ring-white/15">
              <AvatarImage
                src="https://images.unsplash.com/photo-1654198340681-a2e0fc449f1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3ODc2NDd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGRhcmslMjBwdXJwbGUlMjBuZW9uJTIwZ3JhZGllbnQlMjB0ZXh0dXJlfGVufDF8MHx8fDE3ODA0MTMxNjB8MA&ixlib=rb-4.1.0&q=80&w=400"
                alt="User"
                data-photoid="ZkzobNDayXo"
                data-authorname="Pawel Czerwinski"
                data-authorurl="https://unsplash.com/@pawel_czerwinski"
                data-blurhash="L03kmJW7wR0v}wIjwP1Fv|5~I:NY"
              />
              <AvatarFallback>UX</AvatarFallback>
            </Avatar>
          </aside>
          <main className="px-12 py-10 flex-1">
            <header className="flex mb-8 justify-between items-center">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3">
                  <h1 className="font-bold text-3xl leading-9 tracking-tight">
                    URBEX
                  </h1>
                  <Badge className="font-mono font-normal bg-white/5 text-[#9f9fa9] text-[10px] border-white/15 border-1 border-solid">
                    Neural Guard Protocol
                  </Badge>
                </div>
                <p className="text-[#9f9fa9] text-sm leading-5">
                  Advanced AI Content Moderation System
                </p>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[oklch(0.21_0.006_285.885/0.5)] backdrop-blur-xl rounded-full border-white/10 border-1 border-solid flex px-4 py-2 items-center gap-2">
                  <span className="relative size-2 flex">
                    <span className="inline-flex size-full animate-ping bg-[oklch(0.696_0.17_162.48)] opacity-75 rounded-full absolute" />
                    <span className="relative inline-flex size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                  </span>
                  <span className="font-mono text-neutral-50 text-xs leading-4">
                    SYSTEM ONLINE
                  </span>
                </div>
                <Button
                  variant="outline"
                  className="backdrop-blur-xl bg-white/5 border-white/15 border-0 border-solid gap-2"
                >
                  <Bell className="size-4" />
                  Alerts
                </Button>
                <Button className="shadow-[0_0_25px_oklch(0.541_0.281_293.009/0.5)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Sparkles className="size-4" />
                  Run Scan
                </Button>
              </div>
            </header>
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-7 bg-[oklch(0.21_0.006_285.885/0.4)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 gap-6">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg leading-7 flex items-center gap-2">
                      <Cpu className="size-5 text-[#7f22fe]" />
                      Neural Moderation Console
                    </CardTitle>
                    <Badge className="border-[oklch(0.7_0.16_200/0.3)] bg-[oklch(0.7_0.16_200/0.1)] text-[oklch(0.8_0.16_200)] font-mono text-[10px] border-black/1 border-1 border-solid">
                      MULTI-MODAL
                    </Badge>
                  </div>
                  <CardDescription className="text-[#9f9fa9]">
                    Submit text and imagery for real-time toxicity analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 gap-4">
                  <div className="relative bg-[oklch(0.141_0.005_285.823/0.6)] rounded-xl border-white/10 border-1 border-solid p-1">
                    <Textarea
                      className="min-h-[140px] resize-none bg-transparent font-mono text-neutral-50 text-sm leading-5 border-black/1 border-0 border-solid"
                      placeholder="// Enter content for neural inspection..."
                    />
                  </div>
                  <div className="group cursor-pointer bg-[oklch(0.141_0.005_285.823/0.4)] transition-all rounded-xl border-white/15 border-1 border-dashed flex flex-col justify-center items-center gap-2 h-32">
                    <div className="size-11 ring-1 ring-white/10 transition-all rounded-full bg-white/5 flex justify-center items-center">
                      <ImagePlus className="size-5 transition-colors text-[#9f9fa9]" />
                    </div>
                    <p className="font-medium text-neutral-50 text-sm leading-5">
                      Drop image to analyze
                    </p>
                    <p className="text-[#9f9fa9] text-xs leading-4">
                      PNG, JPG, WEBP — up to 25MB
                    </p>
                  </div>
                </CardContent>
                <CardFooter className="p-0 justify-between items-center gap-2">
                  <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-2">
                    <Lock className="size-3.5" />
                    <span className="font-mono">End-to-end encrypted</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" className="text-[#9f9fa9] gap-2">
                      <RotateCcw className="size-4" />
                      Clear
                    </Button>
                    <Button className="shadow-[0_0_25px_oklch(0.541_0.281_293.009/0.5)] bg-[#7f22fe] text-violet-50 gap-2">
                      <ScanLine className="size-4" />
                      Analyze
                    </Button>
                  </div>
                </CardFooter>
              </Card>
              <Card className="col-span-5 bg-[oklch(0.21_0.006_285.885/0.4)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 items-center gap-6">
                <CardHeader className="p-0 gap-1 w-full">
                  <CardTitle className="text-lg leading-7 flex items-center gap-2">
                    <Gauge className="size-5 text-[oklch(0.8_0.16_200)]" />
                    Confidence Matrix
                  </CardTitle>
                  <CardDescription className="text-[#9f9fa9]">
                    Live toxicity confidence reading
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex p-0 flex-col items-center gap-4">
                  <div className="relative size-52 flex justify-center items-center">
                    <div className="bg-[conic-gradient(from_180deg,oklch(0.541_0.281_293.009),oklch(0.7_0.16_200)_72%,oklch(0.274_0.006_286.033)_72%)] shadow-[0_0_50px_oklch(0.541_0.281_293.009/0.4)] rounded-full absolute inset-0" />
                    <div className="bg-[oklch(0.141_0.005_285.823)] rounded-full absolute inset-3.5" />
                    <div className="relative flex flex-col items-center">
                      <span className="font-mono font-bold text-neutral-50 text-5xl leading-12">
                        94.2
                        <span className="text-[#9f9fa9] text-2xl leading-8">
                          %
                        </span>
                      </span>
                      <span className="text-[oklch(0.704_0.191_22.216)] font-mono uppercase text-xs leading-4 tracking-widest mt-1">
                        High Toxicity
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 w-full">
                    <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid flex p-2 flex-col items-center">
                      <span className="font-mono font-bold text-neutral-50 text-sm leading-5">
                        0.91
                      </span>
                      <span className="text-[#9f9fa9] text-[10px]">Hate</span>
                    </div>
                    <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid flex p-2 flex-col items-center">
                      <span className="font-mono font-bold text-neutral-50 text-sm leading-5">
                        0.43
                      </span>
                      <span className="text-[#9f9fa9] text-[10px]">Spam</span>
                    </div>
                    <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid flex p-2 flex-col items-center">
                      <span className="font-mono font-bold text-neutral-50 text-sm leading-5">
                        0.12
                      </span>
                      <span className="text-[#9f9fa9] text-[10px]">NSFW</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-5 bg-[oklch(0.21_0.006_285.885/0.4)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 gap-6">
                <CardHeader className="p-0 gap-1">
                  <CardTitle className="text-lg leading-7 flex items-center gap-2">
                    <Network className="size-5 text-[#7f22fe]" />
                    RAG Context Map
                  </CardTitle>
                  <CardDescription className="text-[#9f9fa9]">
                    Retrieved examples from Vector Store
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 gap-3">
                  <div className="transition-all rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 items-start gap-3">
                    <div className="size-8 shrink-0 bg-[oklch(0.541_0.281_293.009/0.15)] ring-1 ring-primary/30 rounded-lg flex mt-0.5 justify-center items-center">
                      <Database className="size-4 text-[#7f22fe]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-neutral-50 text-sm leading-5">
                          Hate Speech Cluster #A21
                        </p>
                        <span className="text-[oklch(0.696_0.17_162.48)] font-mono text-xs leading-4">
                          0.93
                        </span>
                      </div>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Matched semantic vector — 1,204 references
                      </p>
                    </div>
                  </div>
                  <div className="transition-all rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 items-start gap-3">
                    <div className="size-8 shrink-0 bg-[oklch(0.7_0.16_200/0.15)] ring-1 ring-[oklch(0.7_0.16_200/0.4)] rounded-lg flex mt-0.5 justify-center items-center">
                      <GitBranch className="size-4 text-[oklch(0.8_0.16_200)]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-neutral-50 text-sm leading-5">
                          Coordinated Harassment
                        </p>
                        <span className="text-[oklch(0.696_0.17_162.48)] font-mono text-xs leading-4">
                          0.81
                        </span>
                      </div>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Pattern from policy corpus v4.2
                      </p>
                    </div>
                  </div>
                  <div className="transition-all rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 items-start gap-3">
                    <div className="size-8 shrink-0 bg-[oklch(0.541_0.281_293.009/0.15)] ring-1 ring-primary/30 rounded-lg flex mt-0.5 justify-center items-center">
                      <FileSearch className="size-4 text-[#7f22fe]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <p className="font-medium text-neutral-50 text-sm leading-5">
                          Contextual Edge Case
                        </p>
                        <span className="text-[oklch(0.769_0.188_70.08)] font-mono text-xs leading-4">
                          0.62
                        </span>
                      </div>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Ambiguous — flagged for human review
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-4 bg-[oklch(0.21_0.006_285.885/0.4)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 gap-6">
                <CardHeader className="p-0 gap-1">
                  <CardTitle className="text-lg leading-7 flex items-center gap-2">
                    <BrainCircuit className="size-5 text-[oklch(0.8_0.16_200)]" />
                    Active Learning
                  </CardTitle>
                  <CardDescription className="text-[#9f9fa9]">
                    Adaptive feedback engine
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 gap-5">
                  <div className="border-[oklch(0.696_0.17_162.48/0.2)] bg-[oklch(0.696_0.17_162.48/0.06)] rounded-xl border-black/1 border-1 border-solid flex p-3 items-center gap-3">
                    <span className="relative size-3 flex">
                      <span className="inline-flex size-full animate-ping bg-[oklch(0.696_0.17_162.48)] opacity-75 rounded-full absolute" />
                      <span className="relative inline-flex size-3 bg-[oklch(0.696_0.17_162.48)] shadow-[0_0_12px_oklch(0.696_0.17_162.48)] rounded-full" />
                    </span>
                    <div>
                      <p className="font-medium text-neutral-50 text-sm leading-5">
                        Learning Active
                      </p>
                      <p className="font-mono text-[#9f9fa9] text-xs leading-4">
                        Ingesting 142 feedback signals
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">Model Retraining</span>
                      <span className="font-mono text-neutral-50">68%</span>
                    </div>
                    <div className="rounded-full bg-white/5 w-full h-2 overflow-hidden">
                      <div className="w-[68%] bg-[linear-gradient(90deg,oklch(0.541_0.281_293.009),oklch(0.7_0.16_200))] shadow-[0_0_12px_oklch(0.541_0.281_293.009/0.6)] rounded-full h-full" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid p-3">
                      <p className="font-mono font-bold text-neutral-50 text-xl leading-7">
                        12.4k
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Reviews Today
                      </p>
                    </div>
                    <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid p-3">
                      <p className="text-[oklch(0.696_0.17_162.48)] font-mono font-bold text-xl leading-7">
                        99.1%
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Accuracy
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 bg-[oklch(0.21_0.006_285.885/0.4)] shadow-[0_20px_50px_rgba(0,0,0,0.8)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 gap-6">
                <CardHeader className="p-0 gap-1">
                  <CardTitle className="text-lg leading-7 flex items-center gap-2">
                    <Activity className="size-5 text-[#7f22fe]" />
                    Throughput
                  </CardTitle>
                  <CardDescription className="text-[#9f9fa9]">
                    Last 12 hours
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={{
                      vol: {
                        label: "Volume",
                        color: "oklch(0.541 0.281 293.009)",
                      },
                    }}
                    className="w-full h-45"
                  >
                    <RechartsAreaChart
                      data={[
                        { t: "00", vol: 120 },
                        { t: "02", vol: 210 },
                        { t: "04", vol: 180 },
                        { t: "06", vol: 340 },
                        { t: "08", vol: 290 },
                        { t: "10", vol: 480 },
                        { t: "12", vol: 520 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="gv" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="0%"
                            stopColor="oklch(0.541 0.281 293.009)"
                            stopOpacity="0.5"
                          />
                          <stop
                            offset="100%"
                            stopColor="oklch(0.541 0.281 293.009)"
                            stopOpacity="0"
                          />
                        </linearGradient>
                      </defs>
                      <ChartTooltip />
                      <Area
                        type="monotone"
                        dataKey="vol"
                        stroke="oklch(0.7 0.16 200)"
                        strokeWidth={2}
                        fill="url(#gv)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
