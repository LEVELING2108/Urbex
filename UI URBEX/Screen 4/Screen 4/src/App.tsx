import { useEffect } from "react";
import {
  BarChart3,
  Brain,
  ChevronDown,
  Database,
  FileText,
  FlaskConical,
  Gauge,
  Play,
  RefreshCw,
  RotateCcw,
  Save,
  Scale,
  Settings,
  Shield,
  ShieldHalf,
  Sliders,
  Target,
  User,
  Webhook,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function App() {
  return (
    <div>
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="pointer-events-none bg-[radial-gradient(circle_at_15%_20%,oklch(0.541_0.281_293.009/.18),transparent_45%),radial-gradient(circle_at_85%_80%,oklch(0.7_0.16_200/.14),transparent_45%)] absolute inset-0" />
        <div className="pointer-events-none width=%22120%22 height=%22120%22><filter id=%22n%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%222%22/></filter><rect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/></svg>')] opacity-4 absolute inset-0" />
        <div className="relative min-h-[1080px] flex w-full">
          <aside className="shrink-0 bg-[oklch(0.21_0.006_285.885/.4)] backdrop-blur-2xl border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-start items-center gap-8 w-24">
            <div className="size-12 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] shadow-[0_8px_30px_rgba(127,34,254,.5)] rounded-2xl flex justify-center items-center">
              <ShieldHalf className="size-6 text-white" />
            </div>
            <nav className="flex flex-col justify-start items-center gap-2">
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-18">
                <Zap className="size-5" strokeWidth={1.5} />
                <span className="text-[11px]">Console</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-18">
                <FileText className="size-5" strokeWidth={1.5} />
                <span className="leading-tight text-center text-[11px]">
                  Audit Logs
                </span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-18">
                <BarChart3 className="size-5" strokeWidth={1.5} />
                <span className="text-[11px]">Analytics</span>
              </button>
              <button className="bg-[oklch(0.541_0.281_293.009/.18)] shadow-[inset_0_0_0_1px_oklch(0.541_0.281_293.009/.4)] rounded-xl text-neutral-50 flex py-3 flex-col items-center gap-1 w-18">
                <Settings
                  className="size-5 text-[oklch(0.7_0.16_293)]"
                  strokeWidth={1.5}
                />
                <span className="text-[11px]">AI Core</span>
              </button>
            </nav>
            <div className="mt-auto">
              <div className="size-10 bg-gradient-to-br from-[oklch(0.4_0.1_293)] to-[oklch(0.35_0.05_200)] shadow-[0_6px_20px_rgba(0,0,0,.6)] rounded-full flex justify-center items-center">
                <User className="size-5 text-neutral-50/80" />
              </div>
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="border-[oklch(0.541_0.281_293.009/.5)] bg-[oklch(0.541_0.281_293.009/.12)] text-[oklch(0.75_0.18_293)] font-medium rounded-full text-[11px] tracking-wider border-black/1 border-1 border-solid px-3 py-1">
                  NEURAL ENGINE v4.2
                </span>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-[#9f9fa9] text-xs leading-4">
                  Last Saved 2m ago
                </span>
                <Button variant="ghost" className="text-[#9f9fa9] px-4 gap-2">
                  <RotateCcw className="size-4" strokeWidth={1.5} />
                  Reset Defaults
                </Button>
                <Button className="bg-[oklch(0.541_0.281_293.009)] shadow-[0_8px_30px_rgba(127,34,254,.45)] text-violet-50 px-5 gap-2">
                  <Save className="size-4" strokeWidth={1.5} />
                  Save Configuration
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-12 mt-8 gap-8">
              <Card className="col-span-3 bg-[oklch(0.21_0.006_285.885/.45)] shadow-[0_20px_50px_rgba(0,0,0,.6)] backdrop-blur-2xl border-white/10 border-0 border-solid p-6 gap-4 h-fit">
                <CardHeader className="p-0 gap-1">
                  <CardTitle className="font-medium uppercase text-[#9f9fa9] text-xs leading-4 tracking-wider">
                    Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-1">
                  <button className="border-[oklch(0.541_0.281_293.009)] bg-[oklch(0.541_0.281_293.009/.15)] text-left rounded-lg text-neutral-50 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <Brain
                      className="size-4 text-[oklch(0.75_0.18_293)]"
                      strokeWidth={1.5}
                    />
                    <span className="font-medium text-sm leading-5">
                      Model Configuration
                    </span>
                  </button>
                  <button className="border-transparent transition-colors text-left rounded-lg text-[#9f9fa9] border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <Sliders className="size-4" strokeWidth={1.5} />
                    <span className="text-sm leading-5">
                      Detection Thresholds
                    </span>
                  </button>
                  <button className="border-transparent transition-colors text-left rounded-lg text-[#9f9fa9] border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <Database className="size-4" strokeWidth={1.5} />
                    <span className="text-sm leading-5">RAG Vector Store</span>
                  </button>
                  <button className="border-transparent transition-colors text-left rounded-lg text-[#9f9fa9] border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <RefreshCw className="size-4" strokeWidth={1.5} />
                    <span className="text-sm leading-5">Active Learning</span>
                  </button>
                  <button className="border-transparent transition-colors text-left rounded-lg text-[#9f9fa9] border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <Webhook className="size-4" strokeWidth={1.5} />
                    <span className="text-sm leading-5">{`Webhooks & API`}</span>
                  </button>
                  <button className="border-transparent transition-colors text-left rounded-lg text-[#9f9fa9] border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-4 py-3 items-center gap-3">
                    <Shield className="size-4" strokeWidth={1.5} />
                    <span className="text-sm leading-5">Safety Policies</span>
                  </button>
                </CardContent>
              </Card>
              <Card className="col-span-9 bg-[oklch(0.21_0.006_285.885/.45)] shadow-[0_20px_50px_rgba(0,0,0,.6)] backdrop-blur-2xl border-white/10 border-0 border-solid p-8 gap-6">
                <CardHeader className="p-0 gap-1">
                  <div className="flex items-center gap-3">
                    <Brain
                      className="size-5 text-[oklch(0.75_0.18_293)]"
                      strokeWidth={1.5}
                    />
                    <CardTitle className="font-bold text-xl leading-7">
                      Model Configuration
                    </CardTitle>
                  </div>
                  <CardDescription className="text-[#9f9fa9] text-sm leading-5">
                    Configure the neural engine, inference behavior and modality
                    pipelines.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-6">
                  <div className="bg-[oklch(0.27_0.006_286/.3)] rounded-xl border-white/10 border-1 border-solid flex p-6 flex-col gap-4">
                    <h3 className="font-semibold uppercase text-neutral-50/90 text-sm leading-5 tracking-wider">
                      Base Model
                    </h3>
                    <div className="flex items-center gap-4">
                      <div className="bg-[oklch(0.14_0.005_285/.6)] rounded-lg border-white/15 border-1 border-solid flex px-4 py-3 justify-between items-center flex-1">
                        <span className="text-neutral-50 text-sm leading-5">
                          URBEX-Neural-Guard-4.2-turbo
                        </span>
                        <ChevronDown className="size-4 text-[#9f9fa9]" />
                      </div>
                      <span className="border-[oklch(0.7_0.16_200/.4)] bg-[oklch(0.7_0.16_200/.12)] text-[oklch(0.78_0.14_200)] rounded-full text-xs leading-4 border-black/1 border-1 border-solid px-3 py-1.5">
                        70B params
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="text-[#9f9fa9] text-xs leading-4">
                        Inference Mode
                      </span>
                      <div className="grid grid-cols-3 gap-2">
                        <button className="bg-[oklch(0.14_0.005_285/.6)] rounded-lg text-[#9f9fa9] text-sm leading-5 border-white/10 border-1 border-solid flex py-2.5 justify-center items-center gap-2">
                          <Gauge className="size-4" strokeWidth={1.5} />
                          Fast
                        </button>
                        <button className="border-[oklch(0.541_0.281_293.009/.5)] bg-[oklch(0.541_0.281_293.009/.18)] shadow-[inset_0_0_12px_oklch(0.541_0.281_293.009/.25)] font-medium rounded-lg text-neutral-50 text-sm leading-5 border-black/1 border-1 border-solid flex py-2.5 justify-center items-center gap-2">
                          <Scale
                            className="size-4 text-[oklch(0.75_0.18_293)]"
                            strokeWidth={1.5}
                          />
                          Balanced
                        </button>
                        <button className="bg-[oklch(0.14_0.005_285/.6)] rounded-lg text-[#9f9fa9] text-sm leading-5 border-white/10 border-1 border-solid flex py-2.5 justify-center items-center gap-2">
                          <Target className="size-4" strokeWidth={1.5} />
                          Accurate
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[oklch(0.27_0.006_286/.3)] rounded-xl border-white/10 border-1 border-solid flex p-6 flex-col gap-3">
                    <h3 className="font-semibold uppercase text-neutral-50/90 text-sm leading-5 tracking-wider">
                      Modality Settings
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-[oklch(0.14_0.005_285/.5)] rounded-lg border-white/10 border-1 border-solid flex p-4 justify-between items-center">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-50 text-sm leading-5">
                            Text Analysis
                          </span>
                          <span className="text-[#9f9fa9] text-xs leading-4">{`Toxicity & semantic scanning`}</span>
                        </div>
                        <div className="bg-[oklch(0.541_0.281_293.009)] shadow-[0_0_12px_oklch(0.541_0.281_293.009/.6)] rounded-full flex p-0.5 items-center w-11 h-6">
                          <div className="size-5 rounded-full bg-white ml-auto" />
                        </div>
                      </div>
                      <div className="bg-[oklch(0.14_0.005_285/.5)] rounded-lg border-white/10 border-1 border-solid flex p-4 justify-between items-center">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-50 text-sm leading-5">
                            Image Analysis
                          </span>
                          <span className="text-[#9f9fa9] text-xs leading-4">{`Vision NSFW & OCR detection`}</span>
                        </div>
                        <div className="bg-[oklch(0.541_0.281_293.009)] shadow-[0_0_12px_oklch(0.541_0.281_293.009/.6)] rounded-full flex p-0.5 items-center w-11 h-6">
                          <div className="size-5 rounded-full bg-white ml-auto" />
                        </div>
                      </div>
                      <div className="bg-[oklch(0.14_0.005_285/.5)] rounded-lg border-white/10 border-1 border-solid flex p-4 justify-between items-center">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-50/70 text-sm leading-5">
                            Video Frame Analysis
                          </span>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            Frame-by-frame extraction
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 flex p-0.5 items-center w-11 h-6">
                          <div className="size-5 rounded-full bg-white/40" />
                        </div>
                      </div>
                      <div className="bg-[oklch(0.14_0.005_285/.5)] rounded-lg border-white/10 border-1 border-solid flex p-4 justify-between items-center">
                        <div className="flex flex-col gap-0.5">
                          <span className="font-medium text-neutral-50/70 text-sm leading-5">
                            Audio Transcription
                          </span>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            Speech-to-text moderation
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 flex p-0.5 items-center w-11 h-6">
                          <div className="size-5 rounded-full bg-white/40" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[oklch(0.27_0.006_286/.3)] rounded-xl border-white/10 border-1 border-solid flex p-6 flex-col gap-5">
                    <h3 className="font-semibold uppercase text-neutral-50/90 text-sm leading-5 tracking-wider">
                      Confidence Calibration
                    </h3>
                    <div className="grid grid-cols-2 gap-x-8 gap-y-5">
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            Toxicity Threshold
                          </span>
                          <span className="text-[oklch(0.78_0.14_200)] text-sm leading-5">
                            0.75
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-1.5">
                          <div className="relative w-[75%] bg-gradient-to-r from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full h-1.5">
                            <div className="size-3.5 shadow-[0_0_8px_oklch(0.541_0.281_293.009/.8)] rounded-full bg-white absolute -right-1.5 -top-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            Hate Speech
                          </span>
                          <span className="text-[oklch(0.78_0.14_200)] text-sm leading-5">
                            0.82
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-1.5">
                          <div className="relative w-[82%] bg-gradient-to-r from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full h-1.5">
                            <div className="size-3.5 shadow-[0_0_8px_oklch(0.541_0.281_293.009/.8)] rounded-full bg-white absolute -right-1.5 -top-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            NSFW
                          </span>
                          <span className="text-[oklch(0.78_0.14_200)] text-sm leading-5">
                            0.70
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-1.5">
                          <div className="relative w-[70%] bg-gradient-to-r from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full h-1.5">
                            <div className="size-3.5 shadow-[0_0_8px_oklch(0.541_0.281_293.009/.8)] rounded-full bg-white absolute -right-1.5 -top-1" />
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            Spam
                          </span>
                          <span className="text-[oklch(0.78_0.14_200)] text-sm leading-5">
                            0.65
                          </span>
                        </div>
                        <div className="rounded-full bg-white/10 w-full h-1.5">
                          <div className="relative w-[65%] bg-gradient-to-r from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] rounded-full h-1.5">
                            <div className="size-3.5 shadow-[0_0_8px_oklch(0.541_0.281_293.009/.8)] rounded-full bg-white absolute -right-1.5 -top-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[oklch(0.27_0.006_286/.3)] rounded-xl border-white/10 border-1 border-solid flex p-6 flex-col gap-4">
                    <h3 className="font-semibold uppercase text-neutral-50/90 text-sm leading-5 tracking-wider">
                      Model Ensemble
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="border-[oklch(0.541_0.281_293.009/.3)] bg-[oklch(0.14_0.005_285/.6)] rounded-xl border-black/1 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="text-[oklch(0.75_0.18_293)] uppercase text-xs leading-4 tracking-wider">
                            Primary
                          </span>
                          <div className="bg-[oklch(0.541_0.281_293.009)] rounded-full flex p-0.5 items-center w-9 h-5">
                            <div className="size-4 rounded-full bg-white ml-auto" />
                          </div>
                        </div>
                        <span className="font-medium text-neutral-50 text-sm leading-5">
                          NG-4.2-turbo
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="bg-[oklch(0.7_0.16_200/.12)] text-[oklch(0.78_0.14_200)] rounded-md text-[11px] px-2 py-1">
                            42ms
                          </span>
                          <span className="font-semibold text-neutral-50 text-sm leading-5">
                            98.7%
                          </span>
                        </div>
                      </div>
                      <div className="bg-[oklch(0.14_0.005_285/.6)] rounded-xl border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="uppercase text-[#9f9fa9] text-xs leading-4 tracking-wider">
                            Secondary
                          </span>
                          <div className="bg-[oklch(0.541_0.281_293.009)] rounded-full flex p-0.5 items-center w-9 h-5">
                            <div className="size-4 rounded-full bg-white ml-auto" />
                          </div>
                        </div>
                        <span className="font-medium text-neutral-50 text-sm leading-5">
                          NG-4.0-base
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="bg-[oklch(0.7_0.16_200/.12)] text-[oklch(0.78_0.14_200)] rounded-md text-[11px] px-2 py-1">
                            28ms
                          </span>
                          <span className="font-semibold text-neutral-50 text-sm leading-5">
                            96.1%
                          </span>
                        </div>
                      </div>
                      <div className="bg-[oklch(0.14_0.005_285/.6)] rounded-xl border-white/10 border-1 border-solid flex p-4 flex-col gap-3">
                        <div className="flex justify-between items-center">
                          <span className="uppercase text-[#9f9fa9] text-xs leading-4 tracking-wider">
                            Fallback
                          </span>
                          <div className="rounded-full bg-white/10 flex p-0.5 items-center w-9 h-5">
                            <div className="size-4 rounded-full bg-white/40" />
                          </div>
                        </div>
                        <span className="font-medium text-neutral-50/70 text-sm leading-5">
                          NG-Lite-3.1
                        </span>
                        <div className="flex justify-between items-center">
                          <span className="rounded-md bg-white/5 text-[#9f9fa9] text-[11px] px-2 py-1">
                            12ms
                          </span>
                          <span className="font-semibold text-neutral-50/70 text-sm leading-5">
                            91.4%
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="bg-[oklch(0.27_0.006_286/.3)] rounded-xl border-white/10 border-1 border-solid p-6 flex-col items-stretch gap-3">
                  <div className="flex items-center gap-2">
                    <FlaskConical
                      className="size-4 text-[oklch(0.78_0.14_200)]"
                      strokeWidth={1.5}
                    />
                    <h3 className="font-semibold text-neutral-50 text-sm leading-5">
                      Test Configuration
                    </h3>
                  </div>
                  <div className="flex items-center gap-3">
                    <Input
                      className="bg-[oklch(0.14_0.005_285/.6)] text-neutral-50 text-sm leading-5 border-white/15 border-0 border-solid flex-1"
                      placeholder="Enter sample content to validate model output..."
                    />
                    <Button className="bg-[oklch(0.7_0.16_200)] text-[oklch(0.14_0.005_285)] shadow-[0_8px_30px_oklch(0.7_0.16_200/.4)] px-5 gap-2">
                      <Play className="size-4" strokeWidth={2} />
                      Run Test
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
