import { useEffect } from "react";
import {
  AlertTriangle,
  BarChart3,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  FileText,
  Flag,
  RefreshCw,
  Search,
  Settings,
  ShieldCheck,
  ShieldHalf,
  SlidersHorizontal,
  User,
  UserCog,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function App() {
  return (
    <div>
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[#030303] absolute inset-0" />
        <div className="bg-[radial-gradient(circle,oklch(0.541_0.281_293/0.18),transparent_70%)] blur-3xl rounded-full absolute -left-40 -top-40 w-150 h-150" />
        <div className="top-1/3 bg-[radial-gradient(circle,oklch(0.7_0.16_200/0.14),transparent_70%)] blur-3xl rounded-full absolute -right-40 w-150 h-150" />
        <div className="opacity-[3.5000000000000004%] absolute inset-0" />
        <div className="relative min-h-[1080px] flex">
          <aside className="shrink-0 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-start items-center gap-8 w-24">
            <div className="size-12 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_0_30px_oklch(0.541_0.281_293/0.6)] rounded-2xl flex justify-center items-center">
              <ShieldHalf className="size-6 text-white" />
            </div>
            <nav className="flex px-2 flex-col justify-start items-center gap-2 w-full">
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <Zap className="size-5" />
                <span className="font-medium text-[10px]">Console</span>
              </button>
              <button className="transition-colors rounded-xl bg-[#7f22fe]/15 text-neutral-50 border-[#7f22fe]/30 border-1 border-solid flex py-3 flex-col items-center gap-1 w-full">
                <FileText className="size-5 text-[#7f22fe]" />
                <span className="font-semibold text-[10px]">Audit Logs</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <BarChart3 className="size-5" />
                <span className="font-medium text-[10px]">Analytics</span>
              </button>
              <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1 w-full">
                <Settings className="size-5" />
                <span className="font-medium text-[10px]">AI Core</span>
              </button>
            </nav>
            <div className="size-11 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary rounded-full mt-auto p-0.5">
              <div className="size-full rounded-full bg-zinc-900 flex justify-center items-center">
                <User className="size-5 text-neutral-50" />
              </div>
            </div>
          </aside>
          <main className="flex p-12 flex-col flex-1 gap-6">
            <div className="flex justify-between items-center">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-4">
                  <h1 className="font-bold text-3xl leading-9 tracking-tight">
                    Audit Logs
                  </h1>
                  <span className="border-[oklch(0.7_0.16_200/0.5)] text-[oklch(0.7_0.16_200)] font-semibold rounded-full text-[11px] tracking-widest border-black/1 border-1 border-solid px-3 py-1">
                    IMMUTABLE RECORD
                  </span>
                </div>
                <p className="text-[#9f9fa9] text-sm leading-5">
                  Tamper-proof chronological event ledger
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl transition-colors rounded-xl text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid flex px-4 py-2.5 items-center gap-2">
                  <Calendar className="size-4 text-[#9f9fa9]" />
                  <span className="text-xs leading-4">
                    2024-06-01 — 2024-06-30
                  </span>
                  <ChevronDown className="size-4 text-[#9f9fa9]" />
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] text-sm leading-5 flex px-4 py-2.5 items-center gap-2">
                  <Download className="size-4" />
                  Export CSV
                </button>
                <button className="shadow-[0_0_25px_oklch(0.541_0.281_293/0.5)] transition-colors font-semibold rounded-xl bg-[#7f22fe] text-violet-50 text-sm leading-5 flex px-5 py-2.5 items-center gap-2">
                  <SlidersHorizontal className="size-4" />
                  Filter
                </button>
              </div>
            </div>
            <div className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-1 border-solid flex px-5 py-3.5 items-center gap-3">
              <Search className="size-5 text-[#9f9fa9]" />
              <input
                className="bg-transparent outline-none text-neutral-50 text-sm leading-5 flex-1"
                placeholder="// Search events by user, action, or hash…"
              />
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-9 bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-1 border-solid overflow-hidden">
                <table className="text-left w-full">
                  <thead>
                    <tr className="uppercase text-[#9f9fa9] text-[11px] tracking-widest border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid">
                      <th className="font-medium px-5 py-4">Timestamp</th>
                      <th className="font-medium px-3 py-4">Event</th>
                      <th className="font-medium px-3 py-4">Content Hash</th>
                      <th className="font-medium px-3 py-4">Actor</th>
                      <th className="font-medium px-3 py-4">Confidence</th>
                      <th className="font-medium px-5 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm leading-5">
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 14:22:08
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-semibold rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[10px] border-[#7f22fe]/30 border-1 border-solid px-2.5 py-1">
                          SCAN
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0x4f8a…c21e
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            JD
                          </div>
                          <span className="text-xs leading-4">J. Doe</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[42%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.42
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[oklch(0.696_0.17_162.48)] text-xs leading-4 flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Cleared
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 13:58:41
                      </td>
                      <td className="px-3 py-4">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] border-[oklch(0.7_0.16_200/0.3)] font-semibold rounded-full text-[10px] border-black/1 border-1 border-solid px-2.5 py-1">
                          FLAG
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0x9b2d…77af
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            SM
                          </div>
                          <span className="text-xs leading-4">S. Maru</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[88%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.88
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[oklch(0.769_0.188_70.08)] text-xs leading-4 flex items-center gap-1.5">
                          <Flag className="size-4" />
                          Flagged
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 12:31:19
                      </td>
                      <td className="px-3 py-4">
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] border-[oklch(0.769_0.188_70.08/0.3)] font-semibold rounded-full text-[10px] border-black/1 border-1 border-solid px-2.5 py-1">
                          OVERRIDE
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0x1c7e…04bb
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            AL
                          </div>
                          <span className="text-xs leading-4">A. Lin</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[61%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.61
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-1.5">
                          <UserCog className="size-4" />
                          Manual
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 11:47:55
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-semibold rounded-full bg-[#ff6467]/15 text-[#ff6467] text-[10px] border-[#ff6467]/30 border-1 border-solid px-2.5 py-1">
                          ESCALATE
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0xa3f1…9d2c
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            RK
                          </div>
                          <span className="text-xs leading-4">R. Kane</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[96%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.96
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#ff6467] text-xs leading-4 flex items-center gap-1.5">
                          <AlertTriangle className="size-4" />
                          Escalated
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 10:14:02
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-semibold rounded-full bg-[#7f22fe]/15 text-[#7f22fe] text-[10px] border-[#7f22fe]/30 border-1 border-solid px-2.5 py-1">
                          SCAN
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0x7e90…b1f4
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            JD
                          </div>
                          <span className="text-xs leading-4">J. Doe</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[18%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.18
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[oklch(0.696_0.17_162.48)] text-xs leading-4 flex items-center gap-1.5">
                          <CheckCircle2 className="size-4" />
                          Cleared
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 09:33:27
                      </td>
                      <td className="px-3 py-4">
                        <span className="bg-[oklch(0.7_0.16_200/0.15)] text-[oklch(0.7_0.16_200)] border-[oklch(0.7_0.16_200/0.3)] font-semibold rounded-full text-[10px] border-black/1 border-1 border-solid px-2.5 py-1">
                          FLAG
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0xd45c…3a08
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            SM
                          </div>
                          <span className="text-xs leading-4">S. Maru</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[73%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.73
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[oklch(0.769_0.188_70.08)] text-xs leading-4 flex items-center gap-1.5">
                          <Flag className="size-4" />
                          Flagged
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-white/5 border-t-0 border-r-0 border-b-1 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 08:51:13
                      </td>
                      <td className="px-3 py-4">
                        <span className="bg-[oklch(0.769_0.188_70.08/0.15)] text-[oklch(0.769_0.188_70.08)] border-[oklch(0.769_0.188_70.08/0.3)] font-semibold rounded-full text-[10px] border-black/1 border-1 border-solid px-2.5 py-1">
                          OVERRIDE
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0x2bb8…ee61
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            AL
                          </div>
                          <span className="text-xs leading-4">A. Lin</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[55%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.55
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-1.5">
                          <UserCog className="size-4" />
                          Manual
                        </div>
                      </td>
                    </tr>
                    <tr className="border-l-transparent transition-colors border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid">
                      <td className="text-[oklch(0.7_0.16_200)] text-xs leading-4 px-5 py-4">
                        06-30 07:09:44
                      </td>
                      <td className="px-3 py-4">
                        <span className="font-semibold rounded-full bg-[#ff6467]/15 text-[#ff6467] text-[10px] border-[#ff6467]/30 border-1 border-solid px-2.5 py-1">
                          ESCALATE
                        </span>
                      </td>
                      <td className="text-[#9f9fa9] text-xs leading-4 px-3 py-4">
                        0xf012…aa7d
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="size-7 bg-gradient-to-br from-[oklch(0.7_0.16_200)] to-primary font-bold rounded-full text-white text-[10px] flex justify-center items-center">
                            RK
                          </div>
                          <span className="text-xs leading-4">R. Kane</span>
                        </div>
                      </td>
                      <td className="px-3 py-4">
                        <div className="flex items-center gap-2">
                          <div className="rounded-full bg-white/10 w-20 h-1.5 overflow-hidden">
                            <div className="w-[91%] bg-gradient-to-r from-primary to-[oklch(0.7_0.16_200)] rounded-full h-full" />
                          </div>
                          <span className="text-[#9f9fa9] text-xs leading-4">
                            0.91
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <div className="text-[#ff6467] text-xs leading-4 flex items-center gap-1.5">
                          <AlertTriangle className="size-4" />
                          Escalated
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="col-span-3 flex flex-col gap-6">
                <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <CardTitle className="font-bold text-base leading-6">
                      Event Summary
                    </CardTitle>
                    <p className="text-[#9f9fa9] text-xs leading-4">
                      Distribution by type
                    </p>
                  </CardHeader>
                  <CardContent className="flex p-0 flex-col items-center gap-4">
                    <div className="relative size-40 bg-[conic-gradient(oklch(0.541_0.281_293)_0deg_209deg,oklch(0.7_0.16_200)_209deg_295deg,oklch(0.769_0.188_70.08)_295deg_335deg,oklch(0.704_0.191_22.216)_335deg_360deg)] shadow-[0_0_30px_oklch(0.541_0.281_293/0.3)] rounded-full flex justify-center items-center">
                      <div className="size-24 rounded-full bg-zinc-900 flex flex-col justify-center items-center">
                        <span className="font-bold text-xl leading-7">
                          1,284
                        </span>
                        <span className="uppercase text-[#9f9fa9] text-[10px] tracking-wider">
                          Events
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 text-xs leading-4 gap-2 w-full">
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-[#7f22fe]" />
                        <span className="text-[#9f9fa9]">Scan</span>
                        <span className="ml-auto">58%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 bg-[oklch(0.7_0.16_200)] rounded-full" />
                        <span className="text-[#9f9fa9]">Flag</span>
                        <span className="ml-auto">24%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 bg-[oklch(0.769_0.188_70.08)] rounded-full" />
                        <span className="text-[#9f9fa9]">Override</span>
                        <span className="ml-auto">11%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="size-2.5 rounded-full bg-[#ff6467]" />
                        <span className="text-[#9f9fa9]">Escalate</span>
                        <span className="ml-auto">7%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] rounded-2xl border-white/10 border-0 border-solid p-6 gap-4">
                  <CardHeader className="p-0 gap-1">
                    <CardTitle className="font-bold text-base leading-6">
                      Integrity Status
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center flex p-0 flex-col items-center gap-4">
                    <div className="size-16 bg-[oklch(0.7_0.16_200/0.12)] border-[oklch(0.7_0.16_200/0.3)] shadow-[0_0_30px_oklch(0.7_0.16_200/0.4)] rounded-2xl border-black/1 border-1 border-solid flex justify-center items-center">
                      <ShieldCheck className="size-8 text-[oklch(0.7_0.16_200)]" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-[oklch(0.7_0.16_200)] font-semibold text-sm leading-5">
                        Chain Verified
                      </span>
                      <span className="text-[#9f9fa9] text-[11px]">
                        Block #1,902,447
                      </span>
                    </div>
                    <div className="text-[#9f9fa9] text-[11px] border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-3 flex-col gap-1 w-full">
                      <span>Last verification</span>
                      <span className="text-neutral-50">
                        2024-06-30 14:25:11 UTC
                      </span>
                    </div>
                    <button className="transition-colors rounded-xl text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid flex px-4 py-2.5 justify-center items-center gap-2 w-full">
                      <RefreshCw className="size-4 text-[oklch(0.7_0.16_200)]" />
                      Verify Now
                    </button>
                  </CardContent>
                </Card>
              </div>
            </div>
            <div className="bg-[oklch(0.21_0.006_285.885/0.4)] backdrop-blur-2xl rounded-2xl border-white/10 border-1 border-solid flex px-6 py-4 justify-between items-center">
              <span className="text-[#9f9fa9] text-xs leading-4">
                Showing 1–8 of 1,284 records
              </span>
              <div className="flex items-center gap-2">
                <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex px-3 py-2 items-center gap-1">
                  <ChevronLeft className="size-4" />
                  Prev
                </button>
                <span className="rounded-lg bg-[#7f22fe]/15 text-[#7f22fe] text-sm leading-5 border-[#7f22fe]/30 border-1 border-solid px-3 py-2">
                  1
                </span>
                <span className="rounded-lg text-[#9f9fa9] text-sm leading-5 px-3 py-2">
                  2
                </span>
                <span className="rounded-lg text-[#9f9fa9] text-sm leading-5 px-3 py-2">
                  3
                </span>
                <span className="text-[#9f9fa9] text-sm leading-5 px-2">…</span>
                <span className="rounded-lg text-[#9f9fa9] text-sm leading-5 px-3 py-2">
                  161
                </span>
                <button className="transition-colors rounded-lg text-[#9f9fa9] text-sm leading-5 flex px-3 py-2 items-center gap-1">
                  Next
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
