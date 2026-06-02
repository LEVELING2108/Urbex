import { useEffect } from "react";
import {
  Activity,
  BarChart3,
  ChartColumn,
  Download,
  FileText,
  Flag,
  Globe,
  LineChart as LucideLineChart,
  Settings,
  ShieldHalf,
  Target,
  TrendingDown,
  TrendingUp,
  Trophy,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import {
  Area,
  AreaChart as RechartsAreaChart,
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Line,
  LineChart as RechartsLineChart,
  XAxis,
  YAxis,
} from "recharts";

export default function App() {
  return (
    <div>
      <div className="relative font-sans bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="pointer-events-none bg-[radial-gradient(circle_at_15%_20%,oklch(0.541_0.281_293.009/.18),transparent_45%),radial-gradient(circle_at_85%_75%,oklch(0.7_0.16_200/.14),transparent_45%)] absolute inset-0" />
        <div className="relative min-h-[1080px] flex w-full">
          <aside className="backdrop-blur-2xl bg-zinc-900/60 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-start items-center gap-8 w-24">
            <div className="size-12 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_8px_30px_oklch(0.541_0.281_293.009/.5)] rounded-2xl flex justify-center items-center">
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
              <button className="ring-1 ring-primary/40 rounded-xl bg-[#7f22fe]/20 text-neutral-50 flex py-3 flex-col items-center gap-1 w-16">
                <BarChart3 className="size-5 text-[#7f22fe]" />
                <span className="font-medium text-[10px]">Analytics</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-16">
                <Settings className="size-5" />
                <span className="font-medium text-[10px]">AI Core</span>
              </button>
            </nav>
            <div className="mt-auto">
              <div className="size-11 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary ring-2 ring-white/10 rounded-full flex justify-center items-center">
                <User className="size-5 text-white" />
              </div>
            </div>
          </aside>
          <main className="px-12 py-8 flex-1">
            <div className="flex mb-8 justify-between items-center">
              <div className="flex items-center gap-4">
                <h1 className="font-bold text-3xl leading-9 tracking-tight">
                  Analytics
                </h1>
                <span className="border-[oklch(0.696_0.17_162.48)]/30 bg-[oklch(0.696_0.17_162.48)]/10 text-[oklch(0.696_0.17_162.48)] font-medium rounded-full text-xs leading-4 border-black/1 border-1 border-solid flex px-3 py-1 items-center gap-2">
                  <span className="relative size-2 flex">
                    <span className="inline-flex size-full animate-ping bg-[oklch(0.696_0.17_162.48)] opacity-75 rounded-full absolute" />
                    <span className="relative inline-flex size-2 bg-[oklch(0.696_0.17_162.48)] rounded-full" />
                  </span>
                  LIVE DATA
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="backdrop-blur-2xl rounded-full bg-zinc-900/50 border-white/10 border-1 border-solid flex p-1 items-center gap-1">
                  <button className="font-medium rounded-full text-[#9f9fa9] text-xs leading-4 px-3 py-1.5">
                    1H
                  </button>
                  <button className="font-medium rounded-full text-[#9f9fa9] text-xs leading-4 px-3 py-1.5">
                    6H
                  </button>
                  <button className="font-medium rounded-full bg-[#7f22fe] text-violet-50 text-xs leading-4 px-3 py-1.5">
                    24H
                  </button>
                  <button className="font-medium rounded-full text-[#9f9fa9] text-xs leading-4 px-3 py-1.5">
                    7D
                  </button>
                  <button className="font-medium rounded-full text-[#9f9fa9] text-xs leading-4 px-3 py-1.5">
                    30D
                  </button>
                </div>
                <Button className="shadow-[0_8px_30px_oklch(0.541_0.281_293.009/.4)] bg-[#7f22fe] text-violet-50 gap-2">
                  <Download className="size-4" />
                  Generate Report
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Total Scans Today
                  </span>
                  <div className="size-9 bg-[oklch(0.7_0.16_200)]/15 rounded-lg flex justify-center items-center">
                    <Zap className="size-4 text-[oklch(0.7_0.16_200)]" />
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <span className="text-[oklch(0.7_0.16_200)] font-mono font-bold text-3xl leading-9">
                    847,291
                  </span>
                  <span className="bg-[oklch(0.696_0.17_162.48)]/10 text-[oklch(0.696_0.17_162.48)] font-medium rounded-full text-xs leading-4 flex px-2 py-0.5 items-center gap-1 w-fit">
                    <TrendingUp className="size-3" />
                    +12.4%
                  </span>
                </CardContent>
              </Card>
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Flags Raised
                  </span>
                  <div className="size-9 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                    <Flag className="size-4 text-[#7f22fe]" />
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <span className="font-mono font-bold text-[#7f22fe] text-3xl leading-9">
                    24,108
                  </span>
                  <span className="bg-[oklch(0.696_0.17_162.48)]/10 text-[oklch(0.696_0.17_162.48)] font-medium rounded-full text-xs leading-4 flex px-2 py-0.5 items-center gap-1 w-fit">
                    <TrendingUp className="size-3" />
                    +3.1%
                  </span>
                </CardContent>
              </Card>
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Avg Confidence
                  </span>
                  <div className="size-9 rounded-lg bg-[#7f22fe]/15 flex justify-center items-center">
                    <Target className="size-4 text-[#7f22fe]" />
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 justify-between items-center gap-2">
                  <span className="font-mono font-bold text-neutral-50 text-3xl leading-9">
                    91.7%
                  </span>
                  <div className="size-12 bg-[conic-gradient(oklch(0.7_0.16_200)_0deg,oklch(0.541_0.281_293.009)_330deg,oklch(0.274_0.006_286.033)_330deg)] rounded-full flex justify-center items-center">
                    <div className="size-9 font-mono rounded-full bg-zinc-900 text-neutral-50 text-[10px] flex justify-center items-center">
                      92
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Human Escalations
                  </span>
                  <div className="size-9 bg-[oklch(0.769_0.188_70.08)]/15 rounded-lg flex justify-center items-center">
                    <Users className="size-4 text-[oklch(0.769_0.188_70.08)]" />
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <span className="text-[oklch(0.769_0.188_70.08)] font-mono font-bold text-3xl leading-9">
                    1,847
                  </span>
                  <span className="bg-[oklch(0.696_0.17_162.48)]/10 text-[oklch(0.696_0.17_162.48)] font-medium rounded-full text-xs leading-4 flex px-2 py-0.5 items-center gap-1 w-fit">
                    <TrendingDown className="size-3" />
                    -8.2%
                  </span>
                </CardContent>
              </Card>
              <Card className="col-span-8 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-lg leading-7 flex items-center gap-2">
                      <Activity className="size-5 text-[oklch(0.7_0.16_200)]" />
                      Moderation Throughput
                    </h2>
                    <span className="text-[#9f9fa9] text-sm leading-5">
                      24-hour scan volume
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={{
                      volume: { label: "Volume", color: "oklch(0.7 0.16 200)" },
                    }}
                    className="w-full h-65"
                  >
                    <RechartsAreaChart
                      data={[
                        { t: "00:00", v: 18200 },
                        { t: "03:00", v: 14100 },
                        { t: "06:00", v: 22400 },
                        { t: "09:00", v: 41200 },
                        { t: "12:00", v: 53800 },
                        { t: "15:00", v: 48600 },
                        { t: "18:00", v: 61200 },
                        { t: "21:00", v: 39400 },
                        { t: "24:00", v: 28100 },
                      ]}
                    >
                      <defs>
                        <linearGradient id="thru" x1="0" y1="0" x2="0" y2="1">
                          <stop
                            offset="5%"
                            stopColor="oklch(0.541 0.281 293.009)"
                            stopOpacity={0.6}
                          />
                          <stop
                            offset="95%"
                            stopColor="oklch(0.7 0.16 200)"
                            stopOpacity={0.05}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(1 0 0 / 5%)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="t"
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 11,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip />
                      <Area
                        type="monotone"
                        dataKey="v"
                        stroke="oklch(0.7 0.16 200)"
                        strokeWidth={2.5}
                        fill="url(#thru)"
                      />
                    </RechartsAreaChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-col gap-1">
                  <h2 className="font-semibold text-lg leading-7 flex items-center gap-2">
                    <ChartColumn className="size-5 text-[#7f22fe]" />
                    Flag Category Breakdown
                  </h2>
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    By category
                  </span>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={{
                      count: {
                        label: "Count",
                        color: "oklch(0.541 0.281 293.009)",
                      },
                    }}
                    className="w-full h-65"
                  >
                    <RechartsBarChart
                      data={[
                        {
                          c: "Hate",
                          count: 8200,
                          fill: "oklch(0.541 0.281 293.009)",
                        },
                        { c: "Spam", count: 6100, fill: "oklch(0.7 0.16 200)" },
                        {
                          c: "NSFW",
                          count: 4300,
                          fill: "oklch(0.769 0.188 70.08)",
                        },
                        {
                          c: "Violence",
                          count: 3200,
                          fill: "oklch(0.704 0.191 22.216)",
                        },
                        {
                          c: "Other",
                          count: 2300,
                          fill: "oklch(0.705 0.015 286.067)",
                        },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(1 0 0 / 5%)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="c"
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip />
                      <Bar dataKey="count" radius={[6, 6, 0, 0]} />
                    </RechartsBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="col-span-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-row justify-between items-center gap-2">
                  <div className="flex flex-col gap-1">
                    <h2 className="font-semibold text-lg leading-7 flex items-center gap-2">
                      <LucideLineChart className="size-5 text-[#7f22fe]" />
                      Model Performance
                    </h2>
                    <span className="text-[#9f9fa9] text-sm leading-5">
                      Precision vs Recall — 30 days
                    </span>
                  </div>
                  <div className="text-xs leading-4 flex items-center gap-4">
                    <span className="text-[#9f9fa9] flex items-center gap-1.5">
                      <span className="size-2 rounded-full bg-[#7f22fe]" />
                      Precision
                    </span>
                    <span className="text-[#9f9fa9] flex items-center gap-1.5">
                      <span className="size-2 bg-[oklch(0.7_0.16_200)] rounded-full" />
                      Recall
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <ChartContainer
                    config={{
                      precision: {
                        label: "Precision",
                        color: "oklch(0.541 0.281 293.009)",
                      },
                      recall: { label: "Recall", color: "oklch(0.7 0.16 200)" },
                    }}
                    className="w-full h-60"
                  >
                    <RechartsLineChart
                      data={[
                        { d: "D1", precision: 88, recall: 84 },
                        { d: "D5", precision: 90, recall: 86 },
                        { d: "D10", precision: 89, recall: 88 },
                        { d: "D15", precision: 92, recall: 89 },
                        { d: "D20", precision: 93, recall: 91 },
                        { d: "D25", precision: 94, recall: 90 },
                        { d: "D30", precision: 95, recall: 92 },
                      ]}
                    >
                      <CartesianGrid
                        strokeDasharray="3 3"
                        stroke="oklch(1 0 0 / 5%)"
                        vertical={false}
                      />
                      <XAxis
                        dataKey="d"
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        domain={[80, 100]}
                        tick={{
                          fontFamily: "monospace",
                          fontSize: 10,
                          fill: "oklch(0.705 0.015 286.067)",
                        }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <ChartTooltip />
                      <Line
                        type="monotone"
                        dataKey="precision"
                        stroke="oklch(0.541 0.281 293.009)"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        type="monotone"
                        dataKey="recall"
                        stroke="oklch(0.7 0.16 200)"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </RechartsLineChart>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-col gap-1">
                  <h2 className="font-semibold text-lg leading-7 flex items-center gap-2">
                    <Globe className="size-5 text-[oklch(0.7_0.16_200)]" />
                    Geographic Heatmap
                  </h2>
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Scan distribution by region
                  </span>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-4">
                  <div className="relative rounded-xl border-white/10 border-1 border-solid w-full h-37.5 overflow-hidden">
                    <img
                      src="https://screens-image-components-public.s3.eu-north-1.amazonaws.com/world-map-2d.png"
                      alt="map"
                      className="object-cover opacity-40 w-full h-full"
                    />
                    <span className="left-[28%] top-[40%] size-3 shadow-[0_0_16px_oklch(0.541_0.281_293.009)] rounded-full bg-[#7f22fe] absolute" />
                    <span className="left-[48%] top-[35%] size-4 bg-[oklch(0.7_0.16_200)] shadow-[0_0_18px_oklch(0.7_0.16_200)] rounded-full absolute" />
                    <span className="left-[70%] top-[55%] size-2.5 shadow-[0_0_14px_oklch(0.541_0.281_293.009)] rounded-full bg-[#7f22fe] absolute" />
                    <span className="left-[58%] top-[60%] size-3 bg-[oklch(0.7_0.16_200)] shadow-[0_0_16px_oklch(0.7_0.16_200)] rounded-full absolute" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Flag className="size-3.5 text-[oklch(0.7_0.16_200)]" />
                        United States
                      </span>
                      <span className="font-mono text-[#9f9fa9]">312,400</span>
                    </div>
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Flag className="size-3.5 text-[#7f22fe]" />
                        Germany
                      </span>
                      <span className="font-mono text-[#9f9fa9]">184,210</span>
                    </div>
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Flag className="size-3.5 text-[oklch(0.7_0.16_200)]" />
                        India
                      </span>
                      <span className="font-mono text-[#9f9fa9]">142,880</span>
                    </div>
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Flag className="size-3.5 text-[#7f22fe]" />
                        Brazil
                      </span>
                      <span className="font-mono text-[#9f9fa9]">98,540</span>
                    </div>
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <Flag className="size-3.5 text-[oklch(0.7_0.16_200)]" />
                        Japan
                      </span>
                      <span className="font-mono text-[#9f9fa9]">76,120</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="flex p-0 flex-col gap-1">
                  <h2 className="font-semibold text-lg leading-7 flex items-center gap-2">
                    <Trophy className="size-5 text-[oklch(0.769_0.188_70.08)]" />
                    Top Flagged Domains
                  </h2>
                  <span className="text-[#9f9fa9] text-sm leading-5">
                    Ranked by volume
                  </span>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-3">
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          01
                        </span>
                        spamhub.net
                      </span>
                      <span className="bg-[oklch(0.704_0.191_22.216)]/15 text-[oklch(0.704_0.191_22.216)] rounded-full text-[10px] px-2 py-0.5">
                        HIGH
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[92%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        9,210
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          02
                        </span>
                        toxicpost.io
                      </span>
                      <span className="bg-[oklch(0.704_0.191_22.216)]/15 text-[oklch(0.704_0.191_22.216)] rounded-full text-[10px] px-2 py-0.5">
                        HIGH
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[78%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        7,840
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          03
                        </span>
                        rage-forum.com
                      </span>
                      <span className="bg-[oklch(0.769_0.188_70.08)]/15 text-[oklch(0.769_0.188_70.08)] rounded-full text-[10px] px-2 py-0.5">
                        MED
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[64%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        6,120
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          04
                        </span>
                        adbots.xyz
                      </span>
                      <span className="bg-[oklch(0.769_0.188_70.08)]/15 text-[oklch(0.769_0.188_70.08)] rounded-full text-[10px] px-2 py-0.5">
                        MED
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[51%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        4,930
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          05
                        </span>
                        clickfarm.co
                      </span>
                      <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] rounded-full text-[10px] px-2 py-0.5">
                        LOW
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[38%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        3,410
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="text-sm leading-5 flex justify-between items-center">
                      <span className="flex items-center gap-2">
                        <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                          06
                        </span>
                        memehate.app
                      </span>
                      <span className="bg-[oklch(0.696_0.17_162.48)]/15 text-[oklch(0.696_0.17_162.48)] rounded-full text-[10px] px-2 py-0.5">
                        LOW
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="rounded-full bg-white/5 flex-1 h-1">
                        <div className="w-[24%] rounded-full bg-[#7f22fe] h-full" />
                      </div>
                      <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                        2,180
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
