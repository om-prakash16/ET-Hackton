"use client";

import { Brain, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function InviteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full bg-[#0B1121] flex flex-col lg:flex-row font-sans relative overflow-hidden">
      
      {/* Background Image with Overlay for Left Side */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-5/12 z-0 opacity-30 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1000&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      />
      <div className="absolute inset-y-0 left-0 w-full lg:w-5/12 z-0 bg-gradient-to-t from-[#0B1121] via-[#0B1121]/90 to-[#0B1121] pointer-events-none hidden lg:block"></div>

      {/* Mobile/Tablet Header */}
      <div className="lg:hidden flex items-center justify-between p-6 relative z-20">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-bold text-white">IndusBrain<span className="text-blue-500">AI</span></span>
        </div>
        <Link href="/login" className="text-sm font-medium text-blue-400">Sign in</Link>
      </div>

      {/* Left Side: Dark Marketing Copy (Desktop only) */}
      <div className="hidden lg:flex flex-col w-[45%] h-full overflow-y-auto p-10 xl:p-14 relative z-10 border-r border-slate-800/50">
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-start gap-2">
            <Brain className="w-8 h-8 text-blue-500 mt-1" />
            <div>
              <span className="text-2xl font-extrabold text-white tracking-tight">IndusBrain<span className="text-blue-500">AI</span></span>
              <span className="block text-[10px] uppercase font-bold tracking-widest text-blue-400 mt-0.5">Enterprise Employee Portal</span>
            </div>
          </div>
          <span className="bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs px-3 py-1 rounded-full font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
            Invitation Access
          </span>
        </div>

        <div className="my-auto space-y-8 max-w-lg">
          <div>
            <h1 className="text-4xl xl:text-5xl font-extrabold text-white tracking-tight leading-[1.15]">
              Seamless Access to Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Company AI Copilot</span>.
            </h1>
            <p className="text-slate-400 text-base mt-4 leading-relaxed">
              You have been invited by your Organization Admin to join your enterprise team. Once registered, you will instantly gain access to plant data, asset maintenance graphs, and AI diagnostic insights.
            </p>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <Sparkles className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Instant Workspace Onboarding</h3>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">Because you were invited via verified token, no further admin approval is required.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0 mt-0.5">
                <ShieldCheck className="w-5 h-5 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">Role-Based Security & Compliance</h3>
                <p className="text-slate-400 text-xs mt-0.5 leading-relaxed">Your permissions are automatically scoped to your department and plant assignments.</p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 border-t border-slate-800 pt-6">
             <div className="text-[10px] font-bold text-slate-400">SOC 2 TYPE II</div>
             <div className="w-px h-4 bg-slate-800"></div>
             <div className="text-[10px] font-bold text-slate-400">ISO 27001</div>
             <div className="w-px h-4 bg-slate-800"></div>
             <div className="text-[10px] font-bold text-slate-400">GDPR COMPLIANT</div>
          </div>
        </div>

        <div className="mt-12 text-xs text-slate-500">
           Need help? Contact your internal IT team or email <a href="mailto:support@indusbrain.ai" className="text-blue-400 hover:underline">support@indusbrain.ai</a>
        </div>
      </div>

      {/* Right Side: Container */}
      <div className="w-full lg:w-[55%] h-full flex flex-col p-4 sm:p-8 xl:p-12 overflow-y-auto relative z-10 bg-[#0B1121] pb-24">
        <div className="hidden lg:flex shrink-0 items-center justify-end gap-4 mb-8">
          <ThemeToggle />
          <span className="text-sm text-zinc-400">Already have an account?</span>
          <Link href="/login" className="group flex items-center justify-center px-5 py-2 text-sm font-medium text-white border border-slate-700 rounded-lg hover:bg-slate-800 transition-all">
            Sign in
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-full max-w-[600px] bg-[#0B1121] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative border border-slate-800">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
