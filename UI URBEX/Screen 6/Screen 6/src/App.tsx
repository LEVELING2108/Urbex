import { useEffect } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Check,
  Copy,
  FileText,
  Fingerprint,
  Gauge,
  KeyRound,
  LogOut,
  Monitor,
  Save,
  ScrollText,
  Settings,
  ShieldCheck,
  ShieldHalf,
  Smartphone,
  User,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export default function App() {
  return (
    <div>
      <div className="relative bg-zinc-950 text-neutral-50 w-full h-fit overflow-hidden h-fit min-h-screen w-screen min-w-screen max-w-screen overflow-visible">
        <div className="bg-[radial-gradient(circle_at_15%_20%,oklch(0.541_0.281_293.009/.18),transparent_45%)] pointer-events-none absolute inset-0" />
        <div className="bg-[radial-gradient(circle_at_85%_70%,oklch(0.7_0.16_200/.14),transparent_45%)] pointer-events-none absolute inset-0" />
        <div className="relative min-h-[1080px] flex">
          <aside className="shrink-0 backdrop-blur-2xl bg-zinc-900/60 border-white/10 border-t-0 border-r-1 border-b-0 border-l-0 border-solid flex py-8 flex-col justify-between items-center w-24">
            <div className="flex flex-col items-center gap-8">
              <div className="size-14 bg-gradient-to-br from-primary to-[oklch(0.7_0.16_200)] shadow-[0_8px_24px_rgba(127,34,254,0.5)] rounded-2xl flex justify-center items-center">
                <ShieldHalf className="size-7 text-white" />
              </div>
              <nav className="flex flex-col items-center gap-2">
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1.5 w-16">
                  <Zap className="size-5" />
                  <span className="font-medium text-[10px]">Console</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1.5 w-16">
                  <FileText className="size-5" />
                  <span className="font-medium text-[10px]">Audit Logs</span>
                </button>
                <button className="transition-colors rounded-xl text-[#9f9fa9] flex py-3 flex-col items-center gap-1.5 w-16">
                  <BarChart3 className="size-5" />
                  <span className="font-medium text-[10px]">Analytics</span>
                </button>
                <button className="transition-colors rounded-xl bg-zinc-800 text-neutral-50 flex py-3 flex-col items-center gap-1.5 w-16">
                  <Settings className="size-5 text-[#7f22fe]" />
                  <span className="font-medium text-[10px]">AI Core</span>
                </button>
              </nav>
            </div>
            <div className="size-11 bg-gradient-to-br from-primary/40 to-[oklch(0.7_0.16_200)]/40 rounded-full border-white/10 border-1 border-solid flex justify-center items-center">
              <User className="size-5 text-neutral-50" />
            </div>
          </aside>
          <main className="flex flex-col flex-1">
            <div className="backdrop-blur-2xl bg-zinc-900/40 border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-8 pt-6">
              <div className="text-sm leading-5 flex items-center gap-8">
                <span className="cursor-pointer transition-colors text-[#9f9fa9] pb-4">
                  System Settings
                </span>
                <span className="cursor-pointer transition-colors text-[#9f9fa9] pb-4">
                  Integrations
                </span>
                <span className="cursor-pointer transition-colors text-[#9f9fa9] pb-4">
                  API Keys
                </span>
                <span className="cursor-pointer transition-colors text-[#9f9fa9] pb-4">
                  Webhooks
                </span>
                <span className="font-semibold text-neutral-50 border-[#7f22fe] border-t-0 border-r-0 border-b-2 border-l-0 border-solid pb-4">{`Security & SSO`}</span>
              </div>
            </div>
            <div className="flex px-8 py-6 justify-between items-center">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="font-bold text-2xl leading-8 tracking-tight">{`Security & SSO`}</h1>
                  <p className="text-[#9f9fa9] text-sm leading-5">{`Identity, access & hardening controls`}</p>
                </div>
                <span className="border-[oklch(0.7_0.16_200)] text-[oklch(0.7_0.16_200)] font-mono rounded-full text-xs leading-4 tracking-wider border-black/1 border-1 border-solid px-3 py-1">
                  HARDENED
                </span>
              </div>
              <div className="flex items-center gap-6">
                <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                  Last Security Scan: 4h ago
                </span>
                <Button className="shadow-[0_8px_24px_rgba(127,34,254,0.4)] bg-[#7f22fe] text-violet-50 gap-2">
                  <ShieldCheck className="size-4" />
                  Run Security Audit
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-12 px-8 pb-8 gap-6">
              <Card className="col-span-4 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex items-center gap-2">
                    <KeyRound className="size-5 text-[#7f22fe]" />
                    <CardTitle className="text-lg leading-7">
                      Authentication
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-4">
                  <div className="rounded-xl bg-zinc-800/40 border-white/10 border-1 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        MFA Enforcement
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Require multi-factor for all admins
                      </p>
                    </div>
                    <div className="shadow-[0_0_12px_rgba(127,34,254,0.6)] rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-11 h-6">
                      <div className="size-5 rounded-full bg-white" />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="font-medium text-sm leading-5">
                      Session Timeout
                    </p>
                    <div className="font-mono rounded-lg bg-white/40 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-1.5">
                      30 min
                    </div>
                  </div>
                  <div className="rounded-xl bg-zinc-800/40 border-white/10 border-1 border-solid flex p-3 flex-col gap-2">
                    <p className="font-medium text-sm leading-5">
                      Password Policy
                    </p>
                    <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-2">
                      <Check className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                      Minimum 12 characters
                    </div>
                    <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-2">
                      <Check className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                      Uppercase required
                    </div>
                    <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-2">
                      <Check className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                      Special character required
                    </div>
                    <div className="text-[#9f9fa9] text-xs leading-4 flex items-center gap-2">
                      <Check className="size-4 text-[oklch(0.696_0.17_162.48)]" />
                      No reuse of last 10
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="shadow-[0_0_12px_rgba(127,34,254,0.6)] rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-11 h-6">
                        <div className="size-5 rounded-full bg-white" />
                      </div>
                      <p className="font-medium text-sm leading-5">
                        Failed Login Lockout
                      </p>
                    </div>
                    <div className="font-mono rounded-lg bg-white/40 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-1.5">
                      5 attempts
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-3">
                      <div className="shadow-[0_0_12px_rgba(127,34,254,0.6)] rounded-full bg-[#7f22fe] flex px-0.5 justify-end items-center w-11 h-6">
                        <div className="size-5 rounded-full bg-white" />
                      </div>
                      <p className="font-medium text-sm leading-5">
                        IP Allowlist
                      </p>
                    </div>
                    <Textarea
                      className="resize-none font-mono bg-white/30 text-xs leading-4 border-white/10 border-0 border-solid h-20"
                      defaultValue="10.0.0.0/24
192.168.1.0/24
172.16.0.0/16"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-5 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Fingerprint className="size-5 text-[#7f22fe]" />
                      <CardTitle className="text-lg leading-7">
                        SSO Configuration
                      </CardTitle>
                    </div>
                    <div className="rounded-lg bg-zinc-800/60 border-white/10 border-1 border-solid flex p-1 items-center gap-1">
                      <span className="font-medium rounded-md bg-[#7f22fe] text-violet-50 text-xs leading-4 px-3 py-1">
                        SAML 2.0
                      </span>
                      <span className="rounded-md text-[#9f9fa9] text-xs leading-4 px-3 py-1">
                        OIDC
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#9f9fa9] text-xs leading-4">
                      Identity Provider URL
                    </label>
                    <input
                      className="font-mono rounded-lg bg-white/30 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2"
                      placeholder="https://idp.urbex.io/saml/sso"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[#9f9fa9] text-xs leading-4">
                      Entity ID
                    </label>
                    <input
                      className="font-mono rounded-lg bg-white/30 text-neutral-50 text-sm leading-5 border-white/10 border-1 border-solid px-3 py-2"
                      placeholder="urn:urbex:neural-guard"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[#9f9fa9] text-xs leading-4">
                        X.509 Certificate
                      </label>
                      <button className="text-[oklch(0.7_0.16_200)] text-xs leading-4 flex items-center gap-1">
                        <Copy className="size-3.5" />
                        Copy
                      </button>
                    </div>
                    <Textarea
                      className="resize-none font-mono bg-white/30 text-xs leading-4 border-white/10 border-0 border-solid h-16"
                      defaultValue="-----BEGIN CERTIFICATE-----
MIIDdzCCAl+gAwIBAgIEAgAAuTANBgk..."
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[#9f9fa9] text-xs leading-4">
                      Attribute Mapping
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        email
                      </div>
                      <ArrowRight className="size-4 text-[#7f22fe]" />
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        user.email
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        role
                      </div>
                      <ArrowRight className="size-4 text-[#7f22fe]" />
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        user.role
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        department
                      </div>
                      <ArrowRight className="size-4 text-[#7f22fe]" />
                      <div className="font-mono rounded-lg bg-zinc-800/40 text-xs leading-4 border-white/10 border-1 border-solid px-3 py-1.5 flex-1">
                        user.dept
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-0 gap-2">
                  <Button
                    variant="outline"
                    className="border-[oklch(0.7_0.16_200)] text-[oklch(0.7_0.16_200)] flex-1 gap-2"
                  >
                    <span className="relative size-2 flex">
                      <span className="inline-flex bg-[oklch(0.7_0.16_200)] animate-ping opacity-75 rounded-full absolute w-full h-full" />
                      <span className="relative inline-flex size-2 bg-[oklch(0.7_0.16_200)] rounded-full" />
                    </span>
                    Test SSO Connection
                  </Button>
                  <Button className="bg-[#7f22fe] text-violet-50 flex-1 gap-2">
                    <Save className="size-4" />
                    Save SSO Config
                  </Button>
                </CardFooter>
              </Card>
              <Card className="col-span-3 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex items-center gap-2">
                    <Gauge className="size-5 text-[#7f22fe]" />
                    <CardTitle className="text-lg leading-7">
                      Security Score
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col items-center gap-4">
                  <div className="relative size-40 bg-[conic-gradient(from_180deg,oklch(0.541_0.281_293.009),oklch(0.7_0.16_200)_280deg,oklch(0.274_0.006_286.033)_280deg)] rounded-full flex justify-center items-center">
                    <div className="size-32 rounded-full bg-zinc-900 flex flex-col justify-center items-center">
                      <span className="font-mono font-bold text-3xl leading-9">
                        87
                        <span className="text-[#9f9fa9] text-base leading-6">
                          /100
                        </span>
                      </span>
                      <span className="text-[oklch(0.696_0.17_162.48)] text-xs leading-4 mt-1">
                        SECURE
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2 w-full">
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">MFA Enabled</span>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono">
                        +20pts
                      </span>
                    </div>
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">SSO Active</span>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono">
                        +15pts
                      </span>
                    </div>
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">IP Allowlist</span>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono">
                        +10pts
                      </span>
                    </div>
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">Audit Logging</span>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono">
                        +20pts
                      </span>
                    </div>
                    <div className="text-xs leading-4 flex justify-between items-center">
                      <span className="text-[#9f9fa9]">Encryption at Rest</span>
                      <span className="text-[oklch(0.696_0.17_162.48)] font-mono">
                        +15pts
                      </span>
                    </div>
                    <div className="text-xs leading-4 border-white/10 border-t-1 border-r-0 border-b-0 border-l-0 border-solid flex pt-2 justify-between items-center">
                      <span className="text-[oklch(0.769_0.188_70.08)] flex items-center gap-1">
                        <AlertTriangle className="size-3.5" />
                        Certificate Rotation
                      </span>
                      <span className="text-[oklch(0.769_0.188_70.08)] font-mono">
                        -7pts
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Users className="size-5 text-[#7f22fe]" />
                      <CardTitle className="text-lg leading-7">
                        Active Sessions
                      </CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      className="text-[#ff6467] gap-1.5 h-8"
                    >
                      <LogOut className="size-4" />
                      Revoke All
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-0">
                  <div className="grid grid-cols-12 uppercase text-[#9f9fa9] text-[11px] tracking-wider border-white/10 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2">
                    <span className="col-span-3">User</span>
                    <span className="col-span-3">IP Address</span>
                    <span className="col-span-2">Location</span>
                    <span className="col-span-1">Device</span>
                    <span className="col-span-2">Login</span>
                    <span className="col-span-1" />
                  </div>
                  <div className="grid grid-cols-12 text-sm leading-5 border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2.5 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="size-7 rounded-full bg-[#7f22fe]/30 text-xs leading-4 flex justify-center items-center">
                        AK
                      </div>
                      Anna Kovac
                    </div>
                    <span className="col-span-3 font-mono text-[#9f9fa9] text-xs leading-4">
                      10.0.0.14
                    </span>
                    <span className="col-span-2 text-xs leading-4">
                      Berlin, DE
                    </span>
                    <span className="col-span-1">
                      <Monitor className="size-4 text-[#9f9fa9]" />
                    </span>
                    <span className="col-span-2 font-mono text-[#9f9fa9] text-xs leading-4">
                      09:42
                    </span>
                    <span className="col-span-1">
                      <button className="text-[#ff6467] text-xs leading-4">
                        Revoke
                      </button>
                    </span>
                  </div>
                  <div className="grid grid-cols-12 text-sm leading-5 border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2.5 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="size-7 bg-[oklch(0.7_0.16_200)]/30 rounded-full text-xs leading-4 flex justify-center items-center">
                        JM
                      </div>
                      James Mori
                    </div>
                    <span className="col-span-3 font-mono text-[#9f9fa9] text-xs leading-4">
                      192.168.1.7
                    </span>
                    <span className="col-span-2 text-xs leading-4">
                      Tokyo, JP
                    </span>
                    <span className="col-span-1">
                      <Smartphone className="size-4 text-[#9f9fa9]" />
                    </span>
                    <span className="col-span-2 font-mono text-[#9f9fa9] text-xs leading-4">
                      10:15
                    </span>
                    <span className="col-span-1">
                      <button className="text-[#ff6467] text-xs leading-4">
                        Revoke
                      </button>
                    </span>
                  </div>
                  <div className="grid grid-cols-12 text-sm leading-5 border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2.5 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="size-7 rounded-full bg-[#7f22fe]/30 text-xs leading-4 flex justify-center items-center">
                        SL
                      </div>
                      Sara Lund
                    </div>
                    <span className="col-span-3 font-mono text-[#9f9fa9] text-xs leading-4">
                      172.16.4.2
                    </span>
                    <span className="col-span-2 text-xs leading-4">
                      Oslo, NO
                    </span>
                    <span className="col-span-1">
                      <Monitor className="size-4 text-[#9f9fa9]" />
                    </span>
                    <span className="col-span-2 font-mono text-[#9f9fa9] text-xs leading-4">
                      08:30
                    </span>
                    <span className="col-span-1">
                      <button className="text-[#ff6467] text-xs leading-4">
                        Revoke
                      </button>
                    </span>
                  </div>
                  <div className="grid grid-cols-12 text-sm leading-5 border-white/50 border-t-0 border-r-0 border-b-1 border-l-0 border-solid px-3 py-2.5 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="size-7 bg-[oklch(0.7_0.16_200)]/30 rounded-full text-xs leading-4 flex justify-center items-center">
                        RD
                      </div>
                      Raj Desai
                    </div>
                    <span className="col-span-3 font-mono text-[#9f9fa9] text-xs leading-4">
                      10.0.0.55
                    </span>
                    <span className="col-span-2 text-xs leading-4">
                      Mumbai, IN
                    </span>
                    <span className="col-span-1">
                      <Monitor className="size-4 text-[#9f9fa9]" />
                    </span>
                    <span className="col-span-2 font-mono text-[#9f9fa9] text-xs leading-4">
                      11:02
                    </span>
                    <span className="col-span-1">
                      <button className="text-[#ff6467] text-xs leading-4">
                        Revoke
                      </button>
                    </span>
                  </div>
                  <div className="grid grid-cols-12 text-sm leading-5 px-3 py-2.5 items-center">
                    <div className="col-span-3 flex items-center gap-2">
                      <div className="size-7 rounded-full bg-[#7f22fe]/30 text-xs leading-4 flex justify-center items-center">
                        EM
                      </div>
                      Elena Marx
                    </div>
                    <span className="col-span-3 font-mono text-[#9f9fa9] text-xs leading-4">
                      192.168.1.9
                    </span>
                    <span className="col-span-2 text-xs leading-4">
                      Madrid, ES
                    </span>
                    <span className="col-span-1">
                      <Smartphone className="size-4 text-[#9f9fa9]" />
                    </span>
                    <span className="col-span-2 font-mono text-[#9f9fa9] text-xs leading-4">
                      07:58
                    </span>
                    <span className="col-span-1">
                      <button className="text-[#ff6467] text-xs leading-4">
                        Revoke
                      </button>
                    </span>
                  </div>
                </CardContent>
              </Card>
              <Card className="col-span-6 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] bg-zinc-900/40 border-white/10 border-0 border-solid p-6 gap-4">
                <CardHeader className="p-0 gap-1">
                  <div className="flex items-center gap-2">
                    <ScrollText className="size-5 text-[#7f22fe]" />
                    <CardTitle className="text-lg leading-7">
                      Security Event Log
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex p-0 flex-col gap-2">
                  <div className="rounded-lg bg-zinc-800/30 border-[#ff6467] border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        Failed Login Attempt
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: unknown@ext
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      11:42:08
                    </span>
                  </div>
                  <div className="border-[oklch(0.769_0.188_70.08)] rounded-lg bg-zinc-800/30 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        SSO Config Updated
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: Anna Kovac
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      10:58:21
                    </span>
                  </div>
                  <div className="border-[oklch(0.769_0.188_70.08)] rounded-lg bg-zinc-800/30 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        New API Key Generated
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: James Mori
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      10:15:44
                    </span>
                  </div>
                  <div className="border-[oklch(0.696_0.17_162.48)] rounded-lg bg-zinc-800/30 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        MFA Verified
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: Sara Lund
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      09:30:12
                    </span>
                  </div>
                  <div className="border-[oklch(0.769_0.188_70.08)] rounded-lg bg-zinc-800/30 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        IP Allowlist Updated
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: Raj Desai
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      08:47:03
                    </span>
                  </div>
                  <div className="border-[oklch(0.696_0.17_162.48)] rounded-lg bg-zinc-800/30 border-black/1 border-t-0 border-r-0 border-b-0 border-l-2 border-solid flex p-3 justify-between items-center">
                    <div>
                      <p className="font-medium text-sm leading-5">
                        Security Audit Passed
                      </p>
                      <p className="text-[#9f9fa9] text-xs leading-4">
                        Actor: System
                      </p>
                    </div>
                    <span className="font-mono text-[#9f9fa9] text-xs leading-4">
                      07:30:00
                    </span>
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
