import { useEffect } from "react";
import {
  Activity,
  BarChart3,
  BellRing,
  ChevronDown,
  ChevronUp,
  Cloud,
  Copy,
  Database,
  FileText,
  KeyRound,
  MessageSquare,
  Plug,
  Plus,
  Settings,
  ShieldHalf,
  SlidersHorizontal,
  User,
  Webhook,
  Workflow,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { FallbackComponent } from "./CustomComponents";

export default function App() {
  return (
    <div>
      <div className="relative font-sans bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[#030303] absolute inset-0" />
        <div className="bg-[radial-gradient(circle,oklch(0.541_0.281_293.009/.18),transparent_70%)] blur-3xl rounded-full absolute left-50 -top-50 w-150 h-150" />
        <div className="bg-[radial-gradient(circle,oklch(0.7_0.16_200/.14),transparent_70%)] blur-3xl rounded-full absolute right-25 -bottom-50 w-150 h-150" />
        <div className="relative min-h-[1080px] flex">
          <div className="shrink-0 backdrop-blur-xl bg-zinc-900/40 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-start items-center gap-8 w-24">
            <div className="size-14 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_8px_30px_oklch(0.541_0.281_293.009/.5)] rounded-2xl flex justify-center items-center">
              <ShieldHalf className="size-7 text-white" />
            </div>
            <div className="flex px-3 flex-col items-center gap-2 w-full">
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <Zap className="size-5" />
                <span className="font-medium text-[10px]">Console</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <FileText className="size-5" />
                <span className="font-medium text-[10px]">Audit Logs</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <BarChart3 className="size-5" />
                <span className="font-medium text-[10px]">Analytics</span>
              </button>
              <button className="transition-colors rounded-xl bg-white/10 text-neutral-50 flex py-3 flex-col items-center gap-1 w-full">
                <Settings className="size-5 text-[#7f22fe]" />
                <span className="font-medium text-[10px]">AI Core</span>
              </button>
            </div>
            <div className="mt-auto">
              <div className="size-11 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary ring-2 ring-white/10 rounded-full flex justify-center items-center">
                <User className="size-5 text-white" />
              </div>
            </div>
          </div>
          <div className="flex flex-col flex-1">
            <div className="backdrop-blur-xl bg-zinc-900/40 border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-12 pt-8 pb-0 w-full">
              <div className="flex mb-6 justify-between items-start">
                <div>
                  <div className="flex items-center gap-3">
                    <h1 className="font-bold text-3xl leading-9 tracking-tight">
                      Admin Panel
                    </h1>
                    <span className="font-semibold rounded-full bg-[#ff6467]/15 text-[#ff6467] text-[10px] tracking-wider border-[#ff6467]/40 border-1 border-solid px-3 py-1">
                      SUPER ADMIN
                    </span>
                  </div>
                  <p className="text-[#9f9fa9] text-sm leading-5 mt-1">{`System Settings & Integrations`}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="rounded-full bg-zinc-900/60 border-white/10 border-1 border-solid flex px-4 py-2 items-center gap-2">
                    <span className="relative size-2 flex">
                      <span className="animate-ping inline-flex bg-[oklch(0.696_0.17_162.48)] opacity-75 rounded-full absolute w-full h-full" />
                      <span className="relative inline-flex size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                    </span>
                    <span className="font-medium text-neutral-50 text-xs leading-4">
                      All Systems Operational
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-neutral-50 border-white/10 border-1 border-solid gap-2"
                  >
                    <Activity className="size-4" />
                    System Diagnostics
                  </Button>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <button className="relative font-semibold text-neutral-50 text-sm leading-5 pb-4">
                  System Settings
                  <span className="shadow-[0_0_8px_oklch(0.541_0.281_293.009/.8)] rounded-full bg-[#7f22fe] absolute left-0 bottom-0 w-full h-0.5" />
                </button>
                <button className="transition-colors font-medium text-[#9f9fa9] text-sm leading-5 pb-4">
                  Integrations
                </button>
                <button className="transition-colors font-medium text-[#9f9fa9] text-sm leading-5 pb-4">
                  API Keys
                </button>
                <button className="transition-colors font-medium text-[#9f9fa9] text-sm leading-5 pb-4">
                  Webhooks
                </button>
                <button className="transition-colors font-medium text-[#9f9fa9] text-sm leading-5 pb-4">{`Security & SSO`}</button>
              </div>
            </div>
            <div className="p-12 flex-1">
              <div className="grid grid-cols-12 gap-6">
                <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="size-5 text-[#7f22fe]" />
                      <CardTitle className="font-semibold text-lg leading-7">
                        System Configuration
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[#9f9fa9] text-xs leading-4">
                      Core platform parameters
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-0">
                    <div className="flex py-4 flex-col gap-2">
                      <label className="font-medium text-[#9f9fa9] text-xs leading-4">
                        Organization Name
                      </label>
                      <Input
                        className="bg-white/5 text-neutral-50 border-white/10 border-0 border-solid"
                        defaultValue="URBEX Corp"
                      />
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 flex-col gap-2">
                      <label className="font-medium text-[#9f9fa9] text-xs leading-4">
                        Default Language
                      </label>
                      <div className="rounded-lg bg-white/5 text-sm leading-5 border-white/10 border-1 border-solid flex px-3 py-2 justify-between items-center">
                        <span>English (US)</span>
                        <ChevronDown className="size-4 text-[#9f9fa9]" />
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 flex-col gap-2">
                      <label className="font-medium text-[#9f9fa9] text-xs leading-4">
                        Data Retention Policy
                      </label>
                      <div className="rounded-lg bg-white/5 text-sm leading-5 border-white/10 border-1 border-solid flex px-3 py-2 justify-between items-center">
                        <span>1 Year</span>
                        <ChevronDown className="size-4 text-[#9f9fa9]" />
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 flex-col gap-2">
                      <label className="font-medium text-[#9f9fa9] text-xs leading-4">
                        Timezone
                      </label>
                      <div className="rounded-lg bg-white/5 text-sm leading-5 border-white/10 border-1 border-solid flex px-3 py-2 justify-between items-center">
                        <span>UTC−08:00 Pacific</span>
                        <ChevronDown className="size-4 text-[#9f9fa9]" />
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 flex-col gap-2">
                      <label className="font-medium text-[#9f9fa9] text-xs leading-4">
                        Max Concurrent Scans
                      </label>
                      <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid flex px-3 py-2 justify-between items-center">
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                          2,500
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <ChevronUp className="size-3 text-[#9f9fa9]" />
                          <ChevronDown className="size-3 text-[#9f9fa9]" />
                        </div>
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 justify-between items-center">
                      <div>
                        <p className="font-medium text-sm leading-5">
                          Rate Limiting
                        </p>
                        <p className="font-mono text-[#9f9fa9] text-[11px]">
                          Threshold: 1,000 req/min
                        </p>
                      </div>
                      <div className="shadow-[0_0_10px_oklch(0.541_0.281_293.009/.6)] rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-11 h-6">
                        <div className="size-5 rounded-full bg-white" />
                      </div>
                    </div>
                    <div className="bg-white/5 h-px" />
                    <div className="flex py-4 justify-between items-center">
                      <div>
                        <p className="font-medium text-sm leading-5">
                          Maintenance Mode
                        </p>
                        <p className="text-[#9f9fa9] text-[11px]">
                          Take system offline for updates
                        </p>
                      </div>
                      <div className="rounded-full bg-white/10 flex px-0.5 justify-start items-center w-11 h-6">
                        <div className="size-5 rounded-full bg-[#9f9fa9]" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="col-span-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <div className="flex items-center gap-2">
                      <Plug className="size-5 text-[oklch(0.7_0.16_200)]" />
                      <CardTitle className="font-semibold text-lg leading-7">
                        Active Integrations
                      </CardTitle>
                    </div>
                    <CardDescription className="text-[#9f9fa9] text-xs leading-4">
                      Connected third-party services
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                              <MessageSquare className="size-4 text-[#7f22fe]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                Slack
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Connected
                                </span>
                              </div>
                            </div>
                          </div>
                          <Settings className="size-4 text-[#9f9fa9]" />
                        </div>
                        <span className="font-mono text-[#9f9fa9] text-[10px]">
                          last sync: 2m ago
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 bg-[oklch(0.488_0.243_264.376)]/20 rounded-lg flex justify-center items-center">
                              <FallbackComponent className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                Jira
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Connected
                                </span>
                              </div>
                            </div>
                          </div>
                          <Settings className="size-4 text-[#9f9fa9]" />
                        </div>
                        <span className="font-mono text-[#9f9fa9] text-[10px]">
                          last sync: 14m ago
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 bg-[oklch(0.7_0.16_200)]/15 rounded-lg flex justify-center items-center">
                              <Cloud className="size-4 text-[oklch(0.7_0.16_200)]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                AWS S3
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 bg-[oklch(0.7_0.16_200)] rounded-full" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Connected
                                </span>
                              </div>
                            </div>
                          </div>
                          <Settings className="size-4 text-[#9f9fa9]" />
                        </div>
                        <span className="font-mono text-[#9f9fa9] text-[10px]">
                          last sync: 1m ago
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-white/5 flex justify-center items-center">
                              <Workflow className="size-4 text-[#9f9fa9]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                Zapier
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 rounded-full bg-[#9f9fa9]" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Disconnected
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button
                          size="sm"
                          className="bg-[#7f22fe] text-violet-50 text-xs leading-4 h-7"
                        >
                          Connect
                        </Button>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 bg-[oklch(0.769_0.188_70.08)]/15 rounded-lg flex justify-center items-center">
                              <Database className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                Splunk
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Connected
                                </span>
                              </div>
                            </div>
                          </div>
                          <Settings className="size-4 text-[#9f9fa9]" />
                        </div>
                        <span className="font-mono text-[#9f9fa9] text-[10px]">
                          last sync: 5m ago
                        </span>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="size-9 rounded-lg bg-[#ff6467]/15 flex justify-center items-center">
                              <BellRing className="size-4 text-[#ff6467]" />
                            </div>
                            <div>
                              <p className="font-semibold text-sm leading-5">
                                PagerDuty
                              </p>
                              <div className="flex items-center gap-1.5">
                                <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                                <span className="text-[#9f9fa9] text-[10px]">
                                  Connected
                                </span>
                              </div>
                            </div>
                          </div>
                          <Settings className="size-4 text-[#9f9fa9]" />
                        </div>
                        <span className="font-mono text-[#9f9fa9] text-[10px]">
                          last sync: 8m ago
                        </span>
                      </div>
                    </div>
                    <button className="transition-colors font-medium rounded-xl text-[#7f22fe] text-sm leading-5 border-[#7f22fe]/50 border-1 border-dashed flex py-3 justify-center items-center gap-2 w-full">
                      <Plus className="size-4" />
                      Add Integration
                    </button>
                  </CardContent>
                </Card>
                <div className="col-span-3 flex flex-col gap-6">
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-1">
                      <div className="flex items-center gap-2">
                        <KeyRound className="size-5 text-[#7f22fe]" />
                        <CardTitle className="font-semibold text-lg leading-7">
                          API Keys
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-3">
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-neutral-50 text-xs leading-4">
                            sk_live_••••4f2a
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="bg-[oklch(0.7_0.16_200)]/15 text-[oklch(0.7_0.16_200)] font-semibold rounded-full text-[9px] px-2 py-0.5">
                              Read
                            </span>
                            <Copy className="size-3.5 text-[#9f9fa9]" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[#9f9fa9] text-[10px]">
                            created Jan 12 · used 4m ago
                          </span>
                          <button className="font-medium text-[#ff6467] text-[10px]">
                            Revoke
                          </button>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-neutral-50 text-xs leading-4">
                            sk_live_••••9c1b
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[9px] px-2 py-0.5">
                              Write
                            </span>
                            <Copy className="size-3.5 text-[#9f9fa9]" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[#9f9fa9] text-[10px]">
                            created Dec 03 · used 1h ago
                          </span>
                          <button className="font-medium text-[#ff6467] text-[10px]">
                            Revoke
                          </button>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-neutral-50 text-xs leading-4">
                            sk_live_••••7e88
                          </span>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold rounded-full bg-[#ff6467]/15 text-[#ff6467] text-[9px] px-2 py-0.5">
                              Admin
                            </span>
                            <Copy className="size-3.5 text-[#9f9fa9]" />
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-mono text-[#9f9fa9] text-[10px]">
                            created Nov 21 · used 2d ago
                          </span>
                          <button className="font-medium text-[#ff6467] text-[10px]">
                            Revoke
                          </button>
                        </div>
                      </div>
                      <Button className="shadow-[0_0_15px_oklch(0.541_0.281_293.009/.4)] bg-[#7f22fe] text-violet-50 gap-2 w-full">
                        <Plus className="size-4" />
                        Generate New Key
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-1">
                      <div className="flex items-center gap-2">
                        <Webhook className="size-5 text-[oklch(0.7_0.16_200)]" />
                        <CardTitle className="font-semibold text-lg leading-7">
                          Webhook Endpoints
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-3">
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                          <span className="truncate font-mono text-neutral-50 text-[11px]">
                            https://api.urbex.io/hooks/flag
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[9px] px-2 py-0.5">
                            on_flag
                          </span>
                        </div>
                        <div className="flex pt-1 items-center gap-3">
                          <button className="text-[oklch(0.7_0.16_200)] font-medium text-[10px]">
                            Test
                          </button>
                          <button className="font-medium text-[#ff6467] text-[10px]">
                            Delete
                          </button>
                        </div>
                      </div>
                      <div className="rounded-xl bg-white/5 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <span className="size-1.5 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                          <span className="truncate font-mono text-neutral-50 text-[11px]">
                            https://api.urbex.io/hooks/esc
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="bg-[oklch(0.7_0.16_200)]/15 text-[oklch(0.7_0.16_200)] font-mono rounded-full text-[9px] px-2 py-0.5">
                            on_escalate
                          </span>
                        </div>
                        <div className="flex pt-1 items-center gap-3">
                          <button className="text-[oklch(0.7_0.16_200)] font-medium text-[10px]">
                            Test
                          </button>
                          <button className="font-medium text-[#ff6467] text-[10px]">
                            Delete
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
