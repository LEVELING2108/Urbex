import { useEffect } from "react";
import {
  BarChart3,
  Brain,
  ChevronDown,
  Database,
  FileText,
  FolderOpen,
  Layers,
  Play,
  Plus,
  RefreshCw,
  RotateCcw,
  Save,
  Settings,
  Shield,
  ShieldHalf,
  SlidersHorizontal,
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
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="min-h-[1080px] flex w-full">
          <aside className="shrink-0 backdrop-blur-2xl bg-zinc-900/40 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-8">
              <div className="size-12 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] shadow-[0_8px_24px_rgba(127,34,254,0.5)] rounded-2xl flex justify-center items-center">
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
            <div className="size-10 bg-gradient-to-br from-[oklch(0.541_0.281_293.009)] to-[oklch(0.7_0.16_200)] font-semibold rounded-full text-white text-xs leading-4 flex justify-center items-center">
              AK
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <div className="flex mb-8 justify-between items-start">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  AI Core
                </h1>
                <span className="ring-1 ring-primary/30 font-mono font-medium rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[11px] px-3 py-1">
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
                <Button className="shadow-[0_8px_24px_rgba(127,34,254,0.4)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Save className="size-4" />
                  Save Configuration
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-3">
                <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-4 gap-2">
                  <CardHeader className="px-2 pt-2 pb-1 gap-0">
                    <span className="font-mono text-[#9f9fa9] text-[11px] tracking-widest">
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
                    <button className="rounded-lg bg-[#7f22fe]/15 text-neutral-50 border-[#7f22fe] border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex px-3 py-2.5 items-center gap-3">
                      <Database className="size-4 text-[#7f22fe]" />
                      <span className="font-medium text-sm leading-5">
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
                    <button className="transition-colors rounded-lg text-[#9f9fa9] flex px-3 py-2.5 items-center gap-3">
                      <Shield className="size-4" />
                      <span className="text-sm leading-5">Safety Policies</span>
                    </button>
                  </CardContent>
                </Card>
              </div>
              <div className="col-span-9 flex flex-col gap-6">
                <div className="flex items-center gap-3">
                  <div className="size-9 rounded-xl bg-[#7f22fe]/15 flex justify-center items-center">
                    <Database className="size-5 text-[#7f22fe]" />
                  </div>
                  <div>
                    <h2 className="font-bold text-xl leading-7">
                      RAG Vector Store
                    </h2>
                    <p className="text-[#9f9fa9] text-sm leading-5">
                      Manage knowledge base collections, embeddings, and
                      retrieval configuration.
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-6">
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          Total Vectors
                        </span>
                        <div className="size-8 bg-[oklch(0.7_0.16_200/0.15)] rounded-lg flex justify-center items-center">
                          <Layers className="size-4 text-[oklch(0.7_0.16_200)]" />
                        </div>
                      </div>
                      <span className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-3xl leading-9">
                        2,847,291
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          Collections
                        </span>
                        <div className="size-8 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                          <FolderOpen className="size-4 text-[#7f22fe]" />
                        </div>
                      </div>
                      <span className="font-mono font-bold text-[#7f22fe] text-3xl leading-9">
                        14 Active
                      </span>
                    </CardContent>
                  </Card>
                  <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-2">
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="flex justify-between items-center">
                        <span className="text-[#9f9fa9] text-sm leading-5">
                          Avg Retrieval Latency
                        </span>
                        <div className="size-8 bg-[oklch(0.696_0.17_162.48/0.15)] rounded-lg flex justify-center items-center">
                          <Zap className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                        </div>
                      </div>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono font-bold text-3xl leading-9">
                        12ms
                      </span>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid grid-cols-9 gap-6">
                  <Card className="col-span-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-0">
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4 tracking-widest">
                        COLLECTIONS
                      </span>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-2">
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 shrink-0 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                          <FolderOpen className="size-4 text-[#7f22fe]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            hate-speech-corpus-v4
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 4m ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          482,910
                        </span>
                        <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 bg-[oklch(0.7_0.16_200/0.15)] shrink-0 rounded-lg flex justify-center items-center">
                          <FolderOpen className="size-4 text-[oklch(0.7_0.16_200)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            nsfw-visual-embeddings
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 18m ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          312,540
                        </span>
                        <span className="size-2 bg-[oklch(0.769_0.188_70.08)] animate-pulse rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 bg-[oklch(0.769_0.188_70.08/0.15)] shrink-0 rounded-lg flex justify-center items-center">
                          <FolderOpen className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            spam-pattern-library
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 1h ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          198,220
                        </span>
                        <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 shrink-0 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                          <FolderOpen className="size-4 text-[#7f22fe]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            policy-documents-2024
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 2h ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          42,180
                        </span>
                        <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 bg-[oklch(0.7_0.16_200/0.15)] shrink-0 rounded-lg flex justify-center items-center">
                          <FolderOpen className="size-4 text-[oklch(0.7_0.16_200)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            edge-cases-human-reviewed
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 5h ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          28,940
                        </span>
                        <span className="size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                      <div className="transition-colors rounded-lg border-white/10 border-1 border-solid flex p-3 items-center gap-3">
                        <div className="size-9 bg-[oklch(0.769_0.188_70.08/0.15)] shrink-0 rounded-lg flex justify-center items-center">
                          <FolderOpen className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-mono text-neutral-50 text-sm leading-5">
                            multilingual-toxicity
                          </p>
                          <p className="text-white/50 text-xs leading-4">
                            Updated 9h ago
                          </p>
                        </div>
                        <span className="text-[oklch(0.7_0.16_200)] font-mono text-xs leading-4">
                          156,701
                        </span>
                        <span className="size-2 bg-[oklch(0.769_0.188_70.08)] animate-pulse rounded-full" />
                        <Settings className="size-4 text-[#9f9fa9]" />
                      </div>
                    </CardContent>
                    <CardFooter className="p-0">
                      <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 border-white/20 border-1 border-dashed flex py-3 justify-center items-center gap-2 w-full">
                        <Plus className="size-4" />
                        Add Collection
                      </button>
                    </CardFooter>
                  </Card>
                  <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                    <CardHeader className="p-0 gap-0">
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4 tracking-widest">
                        RETRIEVAL CONFIGURATION
                      </span>
                    </CardHeader>
                    <CardContent className="flex p-0 flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <span className="text-neutral-50 text-sm leading-5">
                          Embedding Model
                        </span>
                        <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid flex px-3 py-2.5 justify-between items-center">
                          <span className="font-mono text-neutral-50 text-sm leading-5">
                            text-embedding-3-large
                          </span>
                          <ChevronDown className="size-4 text-[#9f9fa9]" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            Top-K Results
                          </span>
                          <span className="font-mono text-[#7f22fe] text-sm leading-5">
                            5
                          </span>
                        </div>
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-1/2 rounded-full bg-[#7f22fe] h-full" />
                          <span className="top-1/2 left-1/2 -translate-y-1/2 size-3.5 ring-2 ring-primary rounded-full bg-white absolute" />
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="text-neutral-50 text-sm leading-5">
                            Similarity Threshold
                          </span>
                          <span className="text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                            0.72
                          </span>
                        </div>
                        <div className="relative rounded-full bg-white/10 w-full h-1.5">
                          <div className="w-[72%] bg-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          <span className="top-1/2 left-[72%] -translate-y-1/2 size-3.5 ring-2 ring-[oklch(0.7_0.16_200)] rounded-full bg-white absolute" />
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-50 text-sm leading-5">
                          Re-ranking
                        </span>
                        <span className="rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-10 h-5.5">
                          <span className="size-4 rounded-full bg-white" />
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-neutral-50 text-sm leading-5">
                          Hybrid Search
                        </span>
                        <span className="rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-10 h-5.5">
                          <span className="size-4 rounded-full bg-white" />
                        </span>
                      </div>
                      <div className="flex flex-col gap-2">
                        <span className="text-neutral-50 text-sm leading-5">
                          Context Window
                        </span>
                        <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid px-3 py-2.5">
                          <span className="font-mono text-neutral-50 text-sm leading-5">
                            2048 tokens
                          </span>
                        </div>
                      </div>
                      <div className="border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-4 flex-col gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4 tracking-widest">
                          QUERY TEST
                        </span>
                        <div className="rounded-lg bg-white/5 border-white/10 border-1 border-solid px-3 py-2.5">
                          <span className="font-mono text-[#9f9fa9] text-sm leading-5">
                            Enter test query…
                          </span>
                        </div>
                        <Button className="bg-[oklch(0.7_0.16_200)] font-medium text-zinc-950 gap-2">
                          <Play className="size-4" />
                          Run Query
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <Card className="backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-0">
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4 tracking-widest">
                      RECENT RETRIEVALS
                    </span>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col gap-0">
                    <div className="grid grid-cols-12 font-mono text-[#9f9fa9] text-[11px] tracking-widest border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-4 py-2 gap-4">
                      <span className="col-span-4">QUERY</span>
                      <span className="col-span-2">COLLECTION</span>
                      <span className="col-span-2">TOP MATCH</span>
                      <span className="col-span-1">LATENCY</span>
                      <span className="col-span-2">TIMESTAMP</span>
                      <span className="col-span-1">STATUS</span>
                    </div>
                    <div className="grid grid-cols-12 border-transparent transition-colors border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-4 py-3 items-center gap-4">
                      <span className="col-span-4 truncate font-mono text-neutral-50 text-sm leading-5">
                        \"is this message threatening...\"
                      </span>
                      <span className="col-span-2">
                        <span className="font-mono rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[11px] px-2 py-0.5">
                          hate-speech-v4
                        </span>
                      </span>
                      <span className="col-span-2 text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                        0.94
                      </span>
                      <span className="col-span-1 text-[oklch(0.696_0.17_162.48)] font-mono text-sm leading-5">
                        9ms
                      </span>
                      <span className="col-span-2 font-mono text-white/50 text-sm leading-5">
                        14:22:08
                      </span>
                      <span className="col-span-1">
                        <span className="bg-[oklch(0.696_0.17_162.48/0.15)] text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          Hit
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-transparent transition-colors border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-4 py-3 items-center gap-4">
                      <span className="col-span-4 truncate font-mono text-neutral-50 text-sm leading-5">
                        \"detect adult visual content...\"
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          nsfw-visual
                        </span>
                      </span>
                      <span className="col-span-2 text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                        0.88
                      </span>
                      <span className="col-span-1 text-[oklch(0.696_0.17_162.48)] font-mono text-sm leading-5">
                        11ms
                      </span>
                      <span className="col-span-2 font-mono text-white/50 text-sm leading-5">
                        14:19:42
                      </span>
                      <span className="col-span-1">
                        <span className="bg-[oklch(0.696_0.17_162.48/0.15)] text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          Hit
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-transparent transition-colors border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-4 py-3 items-center gap-4">
                      <span className="col-span-4 truncate font-mono text-neutral-50 text-sm leading-5">
                        \"repeated promotional spam...\"
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          spam-pattern
                        </span>
                      </span>
                      <span className="col-span-2 text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                        0.91
                      </span>
                      <span className="col-span-1 text-[oklch(0.696_0.17_162.48)] font-mono text-sm leading-5">
                        8ms
                      </span>
                      <span className="col-span-2 font-mono text-white/50 text-sm leading-5">
                        14:15:11
                      </span>
                      <span className="col-span-1">
                        <span className="bg-[oklch(0.696_0.17_162.48/0.15)] text-[oklch(0.696_0.17_162.48)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          Hit
                        </span>
                      </span>
                    </div>
                    <div className="grid grid-cols-12 border-transparent transition-colors border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid px-4 py-3 items-center gap-4">
                      <span className="col-span-4 truncate font-mono text-neutral-50 text-sm leading-5">
                        \"ambiguous sarcasm edge case...\"
                      </span>
                      <span className="col-span-2">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] font-mono rounded-full text-[11px] px-2 py-0.5">
                          edge-cases
                        </span>
                      </span>
                      <span className="col-span-2 text-[oklch(0.7_0.16_200)] font-mono text-sm leading-5">
                        0.76
                      </span>
                      <span className="col-span-1 text-[oklch(0.696_0.17_162.48)] font-mono text-sm leading-5">
                        14ms
                      </span>
                      <span className="col-span-2 font-mono text-white/50 text-sm leading-5">
                        14:08:33
                      </span>
                      <span className="col-span-1">
                        <span className="font-mono rounded-full bg-[#ff6467]/15 text-[#ff6467] text-[11px] px-2 py-0.5">
                          Miss
                        </span>
                      </span>
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
