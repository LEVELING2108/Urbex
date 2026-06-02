import { useEffect } from "react";
import {
  Activity,
  BarChart3,
  Brain,
  ChevronDown,
  Copy,
  Database,
  FileText,
  Gauge,
  Key,
  KeyRound,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  ShieldHalf,
  SlidersHorizontal,
  User,
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
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Switch } from "@/components/ui/switch";
import {
  Area,
  AreaChart as RechartsAreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="relative font-sans bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[radial-gradient(circle,oklch(0.541_0.281_293.009/.18),transparent_70%)] blur-3xl pointer-events-none rounded-full absolute left-75 -top-50 w-175 h-175" />
        <div className="bg-[radial-gradient(circle,oklch(0.7_0.16_200/.14),transparent_70%)] blur-3xl pointer-events-none rounded-full absolute right-50 -bottom-50 w-175 h-175" />
        <div className="relative min-h-[1080px] flex w-480">
          <aside className="shrink-0 backdrop-blur-2xl bg-zinc-900/60 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-8">
              <div className="size-12 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_10px_30px_rgba(127,34,254,0.5)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-6 text-white" />
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
                <button className="ring-1 ring-primary/40 transition-colors rounded-xl bg-[#7f22fe]/15 text-neutral-50 flex py-3 flex-col items-center gap-1 w-16">
                  <Settings className="size-5 text-[#7f22fe]" />
                  <span className="font-medium text-[10px]">AI Core</span>
                </button>
              </nav>
            </div>
            <div className="size-11 bg-gradient-to-br from-primary/60 to-[oklch(0.7_0.16_200)]/60 ring-1 ring-white/15 rounded-full flex justify-center items-center">
              <User className="size-5 text-white" />
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <header className="flex mb-8 justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="ring-1 ring-primary/30 font-mono rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[11px] tracking-wider px-3 py-1">
                  NEURAL ENGINE v4.2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                  Last Saved 2m ago
                </span>
                <Button className="text-[#9f9fa9] gap-2" variant="ghost">
                  <RotateCcw className="size-4" />
                  Reset Defaults
                </Button>
                <Button className="shadow-[0_8px_24px_rgba(127,34,254,0.45)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Save className="size-4" />
                  Save Configuration
                </Button>
              </div>
            </header>
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-4 gap-2 h-fit">
                <CardHeader className="p-2 gap-0">
                  <span className="font-mono text-[#9f9fa9] text-[11px] tracking-widest">
                    SETTINGS
                  </span>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-1">
                  <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex p-3 items-center gap-3">
                    <Brain className="size-4" />
                    Model Configuration
                  </button>
                  <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex p-3 items-center gap-3">
                    <SlidersHorizontal className="size-4" />
                    Detection Thresholds
                  </button>
                  <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex p-3 items-center gap-3">
                    <Database className="size-4" />
                    RAG Vector Store
                  </button>
                  <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex p-3 items-center gap-3">
                    <RefreshCw className="size-4" />
                    Active Learning
                  </button>
                  <button className="transition-colors font-medium rounded-lg bg-[#7f22fe]/15 text-neutral-50 text-sm leading-5 border-[#7f22fe] border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 items-center gap-3">
                    <Webhook className="size-4 text-[#7f22fe]" />
                    {`Webhooks & API`}
                  </button>
                  <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex p-3 items-center gap-3">
                    <Shield className="size-4" />
                    Safety Policies
                  </button>
                </CardContent>
              </Card>
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex items-start gap-3">
                  <div className="size-9 ring-1 ring-primary/30 rounded-xl bg-[#7f22fe]/15 flex justify-center items-center">
                    <Webhook className="size-5 text-[#7f22fe]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl leading-7">{`Webhooks & API`}</h2>
                    <p className="text-[#9f9fa9] text-sm leading-5">
                      Manage API keys, webhook endpoints, rate limits, and
                      integration credentials.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          API Calls Today
                        </span>
                        <Activity className="size-4 text-[oklch(0.7_0.16_200)]" />
                      </div>
                      <span className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-3xl leading-9">
                        4,291,847
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          Active Webhooks
                        </span>
                        <Webhook className="size-4 text-[#7f22fe]" />
                      </div>
                      <span className="font-mono font-bold text-[#7f22fe] text-3xl leading-9">
                        7 Endpoints
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          Avg Response Time
                        </span>
                        <Zap className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                      </div>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono font-bold text-3xl leading-9">
                        18ms
                      </span>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-9 gap-6">
                  <Card className="col-span-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <div className="flex items-center gap-2">
                        <KeyRound className="size-4 text-[#7f22fe]" />
                        <span className="font-mono text-neutral-50 text-sm leading-5 tracking-widest">
                          API KEYS
                        </span>
                      </div>
                      <Button
                        className="bg-[#7f22fe] text-violet-50 gap-1.5"
                        size="sm"
                      >
                        <Plus className="size-3.5" />
                        Generate New Key
                      </Button>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-0">
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Key className="size-4 text-[#9f9fa9]" />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm leading-5">
                                sk_live_••••f2a
                              </span>
                              <span className="font-mono rounded-full bg-[#7f22fe]/20 text-[#7f22fe] text-[10px] px-2 py-0.5">
                                Read
                              </span>
                            </div>
                            <span className="font-mono text-white/50 text-[11px]">
                              created Jan 12 · used 4m ago
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="size-8 text-[#9f9fa9]"
                            size="icon"
                            variant="ghost"
                          >
                            <Copy className="size-4" />
                          </Button>
                          <Button
                            className="text-[#ff6467]"
                            size="sm"
                            variant="ghost"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Key className="size-4 text-[#9f9fa9]" />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm leading-5">
                                sk_live_••••c1b
                              </span>
                              <span className="bg-[oklch(0.7_0.16_200)]/20 text-[oklch(0.7_0.16_200)] font-mono rounded-full text-[10px] px-2 py-0.5">
                                Write
                              </span>
                            </div>
                            <span className="font-mono text-white/50 text-[11px]">
                              created Dec 03 · used 1h ago
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="size-8 text-[#9f9fa9]"
                            size="icon"
                            variant="ghost"
                          >
                            <Copy className="size-4" />
                          </Button>
                          <Button
                            className="text-[#ff6467]"
                            size="sm"
                            variant="ghost"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Key className="size-4 text-[#9f9fa9]" />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm leading-5">
                                sk_live_••••7e88
                              </span>
                              <span className="font-mono rounded-full bg-[#ff6467]/20 text-[#ff6467] text-[10px] px-2 py-0.5">
                                Admin
                              </span>
                            </div>
                            <span className="font-mono text-white/50 text-[11px]">
                              created Nov 21 · used 2d ago
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="size-8 text-[#9f9fa9]"
                            size="icon"
                            variant="ghost"
                          >
                            <Copy className="size-4" />
                          </Button>
                          <Button
                            className="text-[#ff6467]"
                            size="sm"
                            variant="ghost"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex items-center gap-3">
                          <Key className="size-4 text-[#9f9fa9]" />
                          <div className="flex flex-col">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-sm leading-5">
                                sk_test_••••a3d9
                              </span>
                              <span className="bg-[oklch(0.769_0.188_70.08)]/20 text-[oklch(0.769_0.188_70.08)] font-mono rounded-full text-[10px] px-2 py-0.5">
                                Test
                              </span>
                            </div>
                            <span className="font-mono text-white/50 text-[11px]">
                              created Oct 08 · used 5d ago
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            className="size-8 text-[#9f9fa9]"
                            size="icon"
                            variant="ghost"
                          >
                            <Copy className="size-4" />
                          </Button>
                          <Button
                            className="text-[#ff6467]"
                            size="sm"
                            variant="ghost"
                          >
                            Revoke
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="p-0">
                      <button className="transition-colors font-medium rounded-xl text-[#7f22fe] text-sm leading-5 border-[#7f22fe]/40 border-1 border-dashed flex py-3 justify-center items-center gap-2 w-full">
                        <Plus className="size-4" />
                        Generate New Key
                      </button>
                    </CardFooter>
                  </Card>
                  <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <div className="flex items-center gap-2">
                        <Webhook className="size-4 text-[oklch(0.7_0.16_200)]" />
                        <span className="font-mono text-neutral-50 text-sm leading-5 tracking-widest">
                          WEBHOOK ENDPOINTS
                        </span>
                      </div>
                      <Button
                        className="text-[oklch(0.7_0.16_200)] gap-1.5"
                        size="sm"
                        variant="ghost"
                      >
                        <Plus className="size-3.5" />
                        Add Endpoint
                      </Button>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-0">
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                            <span className="font-mono text-xs leading-4">
                              https://api.urbex.io/hooks/flag
                            </span>
                          </div>
                          <div className="flex pl-4 items-center gap-2">
                            <span className="font-mono rounded-full bg-[#7f22fe]/20 text-[#7f22fe] text-[10px] px-2 py-0.5">
                              on_flag
                            </span>
                            <span className="font-mono text-white/50 text-[11px]">
                              2m ago
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button
                            className="text-[oklch(0.7_0.16_200)] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Test
                          </Button>
                          <Button
                            className="text-[#ff6467] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                            <span className="font-mono text-xs leading-4">
                              https://api.urbex.io/hooks/escalate
                            </span>
                          </div>
                          <div className="flex pl-4 items-center gap-2">
                            <span className="bg-[oklch(0.769_0.188_70.08)]/20 text-[oklch(0.769_0.188_70.08)] font-mono rounded-full text-[10px] px-2 py-0.5">
                              on_escalate
                            </span>
                            <span className="font-mono text-white/50 text-[11px]">
                              14m ago
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button
                            className="text-[oklch(0.7_0.16_200)] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Test
                          </Button>
                          <Button
                            className="text-[#ff6467] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                            <span className="font-mono text-xs leading-4">
                              https://api.urbex.io/hooks/scan-complete
                            </span>
                          </div>
                          <div className="flex pl-4 items-center gap-2">
                            <span className="bg-[oklch(0.7_0.16_200)]/20 text-[oklch(0.7_0.16_200)] font-mono rounded-full text-[10px] px-2 py-0.5">
                              on_complete
                            </span>
                            <span className="font-mono text-white/50 text-[11px]">
                              1m ago
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button
                            className="text-[oklch(0.7_0.16_200)] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Test
                          </Button>
                          <Button
                            className="text-[#ff6467] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="size-2 bg-[oklch(0.769_0.188_70.08)] rounded-full" />
                            <span className="font-mono text-xs leading-4">
                              https://api.urbex.io/hooks/model-update
                            </span>
                          </div>
                          <div className="flex pl-4 items-center gap-2">
                            <span className="font-mono rounded-full bg-[#7f22fe]/20 text-[#7f22fe] text-[10px] px-2 py-0.5">
                              on_update
                            </span>
                            <span className="font-mono text-white/50 text-[11px]">
                              3h ago
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button
                            className="text-[oklch(0.7_0.16_200)] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Test
                          </Button>
                          <Button
                            className="text-[#ff6467] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                      <div className="flex py-3 justify-between items-center">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-[#ff6467]" />
                            <span className="font-mono text-xs leading-4">
                              https://api.urbex.io/hooks/alert
                            </span>
                          </div>
                          <div className="flex pl-4 items-center gap-2">
                            <span className="font-mono rounded-full bg-[#ff6467]/20 text-[#ff6467] text-[10px] px-2 py-0.5">
                              on_alert
                            </span>
                            <span className="font-mono text-white/50 text-[11px]">
                              2d ago
                            </span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <Button
                            className="text-[oklch(0.7_0.16_200)] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Test
                          </Button>
                          <Button
                            className="text-[#ff6467] px-2 h-6"
                            size="sm"
                            variant="ghost"
                          >
                            Delete
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 flex-row items-center gap-2">
                    <Gauge className="size-4 text-[#7f22fe]" />
                    <span className="font-mono text-neutral-50 text-sm leading-5 tracking-widest">{`RATE LIMITING & QUOTAS`}</span>
                  </CardHeader>
                  <CardContent className="grid grid-cols-2 p-0 gap-6">
                    <div className="flex flex-col gap-4">
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 justify-between items-center">
                        <div className="flex flex-col">
                          <span className="font-medium text-sm leading-5">
                            Global Rate Limit
                          </span>
                          <span className="text-[#9f9fa9] text-[11px]">
                            Platform-wide request cap
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <input
                            className="text-[oklch(0.7_0.16_200)] font-mono text-right rounded-lg bg-white/30 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-1.5 w-32"
                            defaultValue="1,000 req/min"
                          />
                          <Switch checked={true} />
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 justify-between items-center">
                        <span className="font-medium text-sm leading-5">
                          Per-Key Quota
                        </span>
                        <input
                          className="text-[oklch(0.7_0.16_200)] font-mono text-right rounded-lg bg-white/30 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-1.5 w-32"
                          defaultValue="500 req/min"
                        />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 justify-between items-center">
                        <span className="font-medium text-sm leading-5">
                          Burst Allowance
                        </span>
                        <input
                          className="text-[oklch(0.7_0.16_200)] font-mono text-right rounded-lg bg-white/30 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-1.5 w-32"
                          defaultValue="2,000 req"
                        />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 justify-between items-center">
                        <span className="font-medium text-sm leading-5">
                          Quota Reset
                        </span>
                        <div className="font-mono rounded-lg bg-white/30 text-sm leading-5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span>Every Hour</span>
                          <ChevronDown className="size-4 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 justify-between items-center">
                        <span className="font-medium text-sm leading-5">
                          Retry Policy
                        </span>
                        <div className="font-mono rounded-lg bg-white/30 text-sm leading-5 border-white/10 border-1 border-solid flex px-3 py-1.5 items-center gap-2">
                          <span>Exponential Backoff</span>
                          <ChevronDown className="size-4 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="font-medium text-sm leading-5">
                          IP Whitelist
                        </span>
                        <textarea
                          className="resize-none font-mono rounded-lg bg-white/30 text-neutral-50 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-2 w-full h-20"
                          defaultValue="10.0.0.0/24
192.168.1.0/24
172.16.0.0/16"
                        />
                      </div>
                    </div>
                    <div className="rounded-xl bg-black/20 border-white/5 border-1 border-solid flex p-4 flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm leading-5">
                          API Call Volume
                        </span>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-[11px]">
                          Last 60 min
                        </span>
                      </div>
                      <ChartContainer
                        className="w-full h-65"
                        config={{
                          volume: {
                            color: "oklch(0.541 0.281 293.009)",
                            label: "Volume",
                          },
                        }}
                      >
                        <RechartsAreaChart
                          data={[
                            { t: "-60", v: 120 },
                            { t: "-50", v: 180 },
                            { t: "-40", v: 150 },
                            { t: "-30", v: 240 },
                            { t: "-20", v: 210 },
                            { t: "-10", v: 320 },
                            { t: "-5", v: 280 },
                            { t: "now", v: 360 },
                          ]}
                        >
                          <defs>
                            <linearGradient
                              id="apiVol"
                              x1="0"
                              x2="0"
                              y1="0"
                              y2="1"
                            >
                              <stop
                                offset="0%"
                                stopColor="oklch(0.541 0.281 293.009)"
                                stopOpacity="0.6"
                              />
                              <stop
                                offset="100%"
                                stopColor="oklch(0.7 0.16 200)"
                                stopOpacity="0.05"
                              />
                            </linearGradient>
                          </defs>
                          <CartesianGrid
                            stroke="oklch(1 0 0 / 8%)"
                            strokeDasharray="3 3"
                            vertical={false}
                          />
                          <XAxis
                            axisLine={false}
                            dataKey="t"
                            stroke="oklch(0.7 0.16 200)"
                            tick={{ fill: "oklch(0.7 0.16 200)", fontSize: 10 }}
                            tickLine={false}
                          />
                          <YAxis
                            axisLine={false}
                            stroke="oklch(0.7 0.16 200)"
                            tick={{ fill: "oklch(0.7 0.16 200)", fontSize: 10 }}
                            tickLine={false}
                            width={32}
                          />
                          <ChartTooltip />
                          <Area
                            dataKey="v"
                            fill="url(#apiVol)"
                            stroke="oklch(0.7 0.16 200)"
                            strokeWidth={2}
                            type="monotone"
                          />
                        </RechartsAreaChart>
                      </ChartContainer>
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
