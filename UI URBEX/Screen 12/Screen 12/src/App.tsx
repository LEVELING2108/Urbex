import { useEffect } from "react";
import {
  AlertCircle,
  AlertTriangle,
  BadgeCheck,
  Ban,
  BarChart3,
  Brain,
  ChevronRight,
  Database,
  FileBarChart,
  FileCheck,
  FileText,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  ShieldHalf,
  SlidersHorizontal,
  Tag,
  UserCheck,
  Webhook,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export default function App() {
  return (
    <div>
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[#030303] absolute inset-0" />
        <div className="bg-[radial-gradient(circle,oklch(0.541_0.281_293.009/0.25),transparent_70%)] blur-3xl rounded-full absolute -left-40 -top-40 w-150 h-150" />
        <div className="top-1/3 bg-[radial-gradient(circle,oklch(0.7_0.16_200/0.18),transparent_70%)] blur-3xl rounded-full absolute right-0 w-125 h-125" />
        <div className="relative min-h-[1080px] flex">
          <aside className="shrink-0 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-8">
              <div className="size-12 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] shadow-[0_8px_24px_rgba(127,34,254,0.5)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-6 text-white" />
              </div>
              <nav className="flex flex-col items-center gap-2">
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <Zap className="size-5" />
                  <span className="text-[10px]">Console</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <FileText className="size-5" />
                  <span className="text-[10px]">Audit Logs</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                  <BarChart3 className="size-5" />
                  <span className="text-[10px]">Analytics</span>
                </button>
                <button className="bg-[oklch(0.541_0.281_293.009/0.2)] border-[oklch(0.541_0.281_293.009/0.5)] rounded-xl text-neutral-50 border-black/1 border-1 border-solid flex py-3 flex-col items-center gap-1 w-16">
                  <Settings className="size-5 text-[oklch(0.7_0.5_293.009)]" />
                  <span className="text-[10px]">AI Core</span>
                </button>
              </nav>
            </div>
            <div className="size-10 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] font-semibold rounded-full text-white text-xs leading-4 flex justify-center items-center">
              AK
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <header className="flex mb-8 justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="bg-[oklch(0.541_0.281_293.009/0.2)] text-[oklch(0.75_0.18_293.009)] border-[oklch(0.541_0.281_293.009/0.4)] font-medium rounded-full text-[11px] tracking-wide border-black/1 border-1 border-solid px-3 py-1">
                  NEURAL ENGINE v4.2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#9f9fa9] text-sm leading-5">
                  Last Saved 2m ago
                </span>
                <Button className="text-[#9f9fa9] gap-2" variant="ghost">
                  <RotateCcw className="size-4" />
                  Reset Defaults
                </Button>
                <Button className="shadow-[0_8px_24px_rgba(127,34,254,0.4)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Save className="size-4" />
                  Save Configuration
                </Button>
              </div>
            </header>
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-3">
                <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-4 gap-2">
                  <CardHeader className="px-2 pt-2 pb-0 gap-0">
                    <span className="font-semibold text-[#9f9fa9] text-[11px] tracking-widest">
                      SETTINGS
                    </span>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-1">
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <Brain className="size-4" />
                      <span className="text-sm leading-5">
                        Model Configuration
                      </span>
                    </button>
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <SlidersHorizontal className="size-4" />
                      <span className="text-sm leading-5">
                        Detection Thresholds
                      </span>
                    </button>
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <Database className="size-4" />
                      <span className="text-sm leading-5">
                        RAG Vector Store
                      </span>
                    </button>
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <RefreshCw className="size-4" />
                      <span className="text-sm leading-5">Active Learning</span>
                    </button>
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <Webhook className="size-4" />
                      <span className="text-sm leading-5">{`Webhooks & API`}</span>
                    </button>
                    <button className="bg-[oklch(0.541_0.281_293.009/0.15)] border-[oklch(0.541_0.281_293.009)] rounded-lg text-neutral-50 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-3 py-2.5 items-center gap-3">
                      <Shield className="size-4 text-[oklch(0.75_0.18_293.009)]" />
                      <span className="font-medium text-sm leading-5">
                        Safety Policies
                      </span>
                    </button>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <Shield className="size-6 text-[oklch(0.75_0.18_293.009)] mt-0.5" />
                    <div>
                      <div className="flex items-center gap-3">
                        <h2 className="font-bold text-2xl leading-8">
                          Safety Policies
                        </h2>
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] border-[oklch(0.7_0.16_200/0.4)] font-medium rounded-full text-[11px] tracking-wide border-black/1 border-1 border-solid px-3 py-1">
                          COMPLIANCE READY
                        </span>
                      </div>
                      <p className="text-[#9f9fa9] text-sm leading-5 mt-1">
                        Define content governance rules, regional compliance
                        frameworks, and enforcement actions.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-2">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <span className="text-[#9f9fa9] text-sm leading-5">
                        Active Policies
                      </span>
                      <FileCheck className="size-5 text-[oklch(0.75_0.18_293.009)]" />
                    </CardHeader>
                    <CardContent className="p-0">
                      <span className="text-[oklch(0.75_0.18_293.009)] font-bold text-3xl leading-9">
                        24
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-2">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <span className="text-[#9f9fa9] text-sm leading-5">
                        Compliance Frameworks
                      </span>
                      <BadgeCheck className="size-5 text-[oklch(0.7_0.16_200)]" />
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-2">
                      <span className="text-[oklch(0.7_0.16_200)] font-bold text-2xl leading-8">
                        3 Enabled
                      </span>
                      <div className="flex gap-1.5">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] rounded-sm text-[10px] px-2 py-0.5">
                          GDPR
                        </span>
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] rounded-sm text-[10px] px-2 py-0.5">
                          COPPA
                        </span>
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] rounded-sm text-[10px] px-2 py-0.5">
                          DSA
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-2">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <span className="text-[#9f9fa9] text-sm leading-5">
                        Policy Violations Today
                      </span>
                      <AlertTriangle className="size-5 text-[oklch(0.769_0.188_70.08)]" />
                    </CardHeader>
                    <CardContent className="p-0">
                      <span className="text-[oklch(0.769_0.188_70.08)] font-bold text-3xl leading-9">
                        847
                      </span>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-9 gap-6">
                  <Card className="col-span-5 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 flex-row justify-between items-center gap-0">
                      <span className="font-semibold text-[#9f9fa9] text-sm leading-5 tracking-widest">
                        POLICY RULES
                      </span>
                      <Button
                        className="bg-[#7f22fe] text-violet-50 gap-1.5 h-8"
                        size="sm"
                      >
                        <Plus className="size-3.5" />
                        Create Policy
                      </Button>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-0">
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.704_0.191_22.216/0.15)] text-[oklch(0.704_0.191_22.216)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          CRITICAL
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            Zero-Tolerance: CSAM Detection
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="bg-[oklch(0.704_0.191_22.216/0.15)] text-[oklch(0.704_0.191_22.216)] rounded-sm text-[9px] px-1.5 py-0.5">
                              Block
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Text
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Image
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Video
                            </span>
                          </div>
                        </div>
                        <Switch checked={true} />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          HIGH
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            Hate Speech — Tier 1 Block
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="bg-[oklch(0.704_0.191_22.216/0.15)] text-[oklch(0.704_0.191_22.216)] rounded-sm text-[9px] px-1.5 py-0.5">
                              Block
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Text
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Image
                            </span>
                          </div>
                        </div>
                        <Switch checked={true} />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          HIGH
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            NSFW — Age-Gate Enforcement
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] rounded-sm text-[9px] px-1.5 py-0.5">
                              Escalate
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Image
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Video
                            </span>
                          </div>
                        </div>
                        <Switch checked={true} />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.541_0.281_293.009/0.15)] text-[oklch(0.75_0.18_293.009)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          MEDIUM
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            Spam Flood Prevention
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] rounded-sm text-[9px] px-1.5 py-0.5">
                              Flag
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Text
                            </span>
                          </div>
                        </div>
                        <Switch checked={true} />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.541_0.281_293.009/0.15)] text-[oklch(0.75_0.18_293.009)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          MEDIUM
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            Coordinated Inauthentic Behavior
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] rounded-sm text-[9px] px-1.5 py-0.5">
                              Escalate
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Text
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Image
                            </span>
                          </div>
                        </div>
                        <Switch checked={true} />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="flex py-3 items-center gap-3">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] font-semibold rounded-sm text-[10px] px-2 py-0.5">
                          LOW
                        </span>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium text-sm leading-5">
                            Misinformation — Soft Label
                          </p>
                          <div className="flex mt-1 items-center gap-1.5">
                            <span className="rounded-sm bg-white/10 text-neutral-50 text-[9px] px-1.5 py-0.5">
                              Review
                            </span>
                            <span className="rounded-sm bg-white/5 text-[#9f9fa9] text-[9px] px-1.5 py-0.5">
                              Text
                            </span>
                          </div>
                        </div>
                        <Switch />
                        <ChevronRight className="size-4 text-[#9f9fa9]" />
                      </div>
                      <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 border-white/15 border-1 border-dashed flex mt-2 py-3 justify-center items-center gap-2 w-full">
                        <Plus className="size-4" />
                        Create Custom Policy
                      </button>
                    </CardContent>
                  </Card>
                  <div className="col-span-4 flex flex-col gap-6">
                    <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-4">
                      <CardHeader className="p-0 gap-0">
                        <span className="font-semibold text-[#9f9fa9] text-sm leading-5 tracking-widest">
                          COMPLIANCE FRAMEWORKS
                        </span>
                      </CardHeader>
                      <CardContent className="flex p-0 flex-col gap-3">
                        <div className="rounded-lg bg-white/5 flex p-3 items-center gap-3">
                          <span className="text-xl leading-7">🇪🇺</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm leading-5">
                                GDPR
                              </p>
                              <span className="bg-[oklch(0.696_0.17_162.48/0.15)] text-[oklch(0.696_0.17_162.48)] rounded-sm text-[9px] px-1.5 py-0.5">
                                Enabled
                              </span>
                            </div>
                            <p className="text-[#9f9fa9] text-xs leading-4 mt-0.5">
                              Data minimization + right to erasure
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <div className="rounded-lg bg-white/5 flex p-3 items-center gap-3">
                          <span className="text-xl leading-7">🇺🇸</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm leading-5">
                                COPPA
                              </p>
                              <span className="bg-[oklch(0.696_0.17_162.48/0.15)] text-[oklch(0.696_0.17_162.48)] rounded-sm text-[9px] px-1.5 py-0.5">
                                Enabled
                              </span>
                            </div>
                            <p className="text-[#9f9fa9] text-xs leading-4 mt-0.5">
                              Under-13 content protection
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <div className="rounded-lg bg-white/5 flex p-3 items-center gap-3">
                          <span className="text-xl leading-7">🇪🇺</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm leading-5">
                                DSA
                              </p>
                              <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] rounded-sm text-[9px] flex px-1.5 py-0.5 items-center gap-1">
                                <AlertCircle className="size-3" />
                                Partial
                              </span>
                            </div>
                            <p className="text-[#9f9fa9] text-xs leading-4 mt-0.5">
                              Transparency reporting pending
                            </p>
                          </div>
                          <Switch checked={true} />
                        </div>
                        <Button
                          className="text-[oklch(0.7_0.16_200)] border-[oklch(0.7_0.16_200/0.3)] border-black/1 border-1 border-solid gap-2 w-full"
                          variant="ghost"
                        >
                          <FileBarChart className="size-4" />
                          View Compliance Report
                        </Button>
                      </CardContent>
                    </Card>
                    <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] border-white/10 border-0 border-solid p-6 gap-4">
                      <CardHeader className="p-0 gap-0">
                        <span className="font-semibold text-[#9f9fa9] text-sm leading-5 tracking-widest">
                          ENFORCEMENT ACTIONS
                        </span>
                      </CardHeader>
                      <CardContent className="flex p-0 flex-col gap-2">
                        <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 items-center gap-3">
                          <Ban className="size-5 text-[oklch(0.704_0.191_22.216)]" />
                          <div className="flex-1">
                            <p className="font-medium text-sm leading-5">
                              Auto-Block
                            </p>
                            <p className="text-[#9f9fa9] text-xs leading-4">
                              Immediately remove content
                            </p>
                          </div>
                          <span className="rounded-sm bg-white/5 text-xs leading-4 px-2 py-1">{`>0.95`}</span>
                          <Switch checked={true} />
                        </div>
                        <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 items-center gap-3">
                          <UserCheck className="size-5 text-[oklch(0.769_0.188_70.08)]" />
                          <div className="flex-1">
                            <p className="font-medium text-sm leading-5">
                              Escalate to Human
                            </p>
                            <p className="text-[#9f9fa9] text-xs leading-4">
                              Route to review queue
                            </p>
                          </div>
                          <span className="rounded-sm bg-white/5 text-xs leading-4 px-2 py-1">{`>0.80`}</span>
                          <Switch checked={true} />
                        </div>
                        <div className="border-white/5 border-t-0 border-r-0 border-b-1 border-l-0 border-solid flex py-2 items-center gap-3">
                          <Tag className="size-5 text-[oklch(0.75_0.18_293.009)]" />
                          <div className="flex-1">
                            <p className="font-medium text-sm leading-5">
                              Soft Label
                            </p>
                            <p className="text-[#9f9fa9] text-xs leading-4">
                              Add warning label
                            </p>
                          </div>
                          <span className="rounded-sm bg-white/5 text-xs leading-4 px-2 py-1">{`>0.65`}</span>
                          <Switch checked={true} />
                        </div>
                        <div className="flex py-2 items-center gap-3">
                          <FileText className="size-5 text-[oklch(0.7_0.16_200)]" />
                          <div className="flex-1">
                            <p className="font-medium text-sm leading-5">
                              Log Only
                            </p>
                            <p className="text-[#9f9fa9] text-xs leading-4">
                              Record without action
                            </p>
                          </div>
                          <span className="rounded-sm bg-white/5 text-xs leading-4 px-2 py-1">{`>0.50`}</span>
                          <Switch />
                        </div>
                        <Button className="shadow-[0_8px_24px_rgba(127,34,254,0.3)] bg-[#7f22fe] text-violet-50 mt-1 gap-2 w-full">
                          <Save className="size-4" />
                          Save Enforcement Config
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
