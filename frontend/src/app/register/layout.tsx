"use client";

import { usePathname } from "next/navigation";
import { Brain, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Lock, Globe } from "lucide-react";
import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isEmployeeFlow = pathname?.startsWith("/register/employee") || pathname?.startsWith("/invite");

  const currentStepNum = 
    pathname === "/register" ? 1 :
    pathname === "/register/verify-email" ? 2 :
    pathname === "/register/organization" ? 3 :
    pathname === "/register/plant" ? 4 :
    pathname === "/register/review" ? 5 :
    pathname === "/register/success" ? 6 : 1;

  return (
    <div className="h-screen w-full bg-[#0B1121] flex flex-col lg:flex-row font-sans relative overflow-hidden">
      
      {/* Background Image with Overlay for Left Side */}
      <div 
        className="absolute inset-y-0 left-0 w-full lg:w-5/12 z-0 opacity-30 pointer-events-none hidden lg:block"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1000&auto=format&fit=crop')",
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
              <span className="text-xl font-bold text-white tracking-wide block">
                IndusBrain <span className="text-blue-500">AI</span>
              </span>
              <span className="text-xs text-slate-400">Unified Asset & Operations Brain</span>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <h1 className="text-4xl xl:text-5xl font-bold text-white leading-tight mb-6 tracking-tight">
            Create your <br/>
            IndusBrain AI <br/>
            <span className="text-blue-500">account</span>
          </h1>
          <p className="text-slate-400 text-sm xl:text-base mb-12 max-w-sm">
            Join industrial leaders who trust IndusBrain AI to manage knowledge, assets, and operations intelligently.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0 border border-blue-500/20">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Unified Knowledge</h3>
                <p className="text-xs text-slate-400 leading-snug">Connect documents, assets,<br/> and systems in one place.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-purple-500/10 flex items-center justify-center shrink-0 border border-purple-500/20">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">AI-Powered Insights</h3>
                <p className="text-xs text-slate-400 leading-snug">Get intelligent answers and<br/> actionable recommendations.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0 border border-emerald-500/20">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Operational Excellence</h3>
                <p className="text-xs text-slate-400 leading-snug">Reduce downtime, improve safety,<br/> and ensure compliance.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-orange-500/10 flex items-center justify-center shrink-0 border border-orange-500/20">
                <Lock className="w-5 h-5 text-orange-400" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm mb-1">Enterprise Grade Security</h3>
                <p className="text-xs text-slate-400 leading-snug">SOC 2 Type II • ISO 27001<br/> Data encrypted & protected</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-[#0F172A]/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-5 mt-auto">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-1">Your data is secure with us</h4>
              <p className="text-xs text-slate-400 leading-relaxed">We follow industry-leading security standards to keep your data safe.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 border-t border-slate-700/50 pt-4">
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-300">SOC 2<br/><span className="text-[8px] text-slate-500">TYPE II</span></span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-300">ISO<br/><span className="text-[8px] text-slate-500">27001</span></span>
            </div>
            <div className="w-px h-6 bg-slate-700"></div>
            <div className="flex items-center gap-2">
               <span className="text-[10px] font-bold text-slate-300">GDPR<br/><span className="text-[8px] text-slate-500">COMPLIANT</span></span>
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
           <div className="text-xs text-slate-400">
             <strong className="text-white block mb-0.5">Need help?</strong>
             Contact our support team at <a href="mailto:support@indusbrain.ai" className="text-blue-500 hover:underline">support@indusbrain.ai</a>
           </div>
           <button className="flex items-center gap-2 bg-transparent border border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-800 transition-colors shrink-0 text-xs text-slate-300">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
           </button>
        </div>
      </div>

      {/* Right Side: White Container */}
      <div className="w-full lg:w-[55%] h-full flex flex-col p-4 sm:p-8 xl:p-12 overflow-y-auto relative z-10 bg-slate-50 dark:bg-[#0F172A] pb-24 transition-colors">
        
        <div className="hidden lg:flex shrink-0 items-center justify-end gap-4 mb-8">
          <ThemeToggle />
          <span className="text-sm text-slate-500 dark:text-slate-400">Already have an account?</span>
          <Link href="/login" className="group flex items-center justify-center px-5 py-2 text-sm font-medium text-slate-700 dark:text-white border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
            Sign in
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex-1 flex flex-col items-center">
          <div className="w-full max-w-[640px] bg-white dark:bg-[#0B1121] rounded-[2rem] p-8 sm:p-10 shadow-2xl relative border border-slate-200 dark:border-slate-800/80 transition-colors">
            
            {/* Custom Stepper for Organization Registration Flow */}
            {!isEmployeeFlow && (
              <div className="mb-10">
                <div className="flex items-center justify-between relative px-2 sm:px-6">
                  <div className="absolute left-6 right-6 top-[15px] h-px bg-slate-200 dark:bg-slate-800 z-0"></div>
                  
                  {[
                    { num: 1, label: "Account" },
                    { num: 2, label: "Verify" },
                    { num: 3, label: "Organization" },
                    { num: 4, label: "Plant" },
                    { num: 5, label: "Review" }
                  ].map((step) => {
                    const isActive = currentStepNum === step.num;
                    const isCompleted = currentStepNum > step.num;
                    
                    return (
                      <div key={step.num} className="relative z-10 flex flex-col items-center bg-white dark:bg-[#0B1121] px-2 transition-colors">
                        <div className={`w-[30px] h-[30px] rounded-full flex items-center justify-center text-xs font-semibold border-[1.5px] transition-colors ${
                          isActive ? "bg-blue-600 border-blue-600 text-white" : 
                          isCompleted ? "bg-white dark:bg-[#0B1121] border-blue-600 text-blue-600" : 
                          "bg-white dark:bg-[#0B1121] border-slate-300 dark:border-slate-700 text-slate-400"
                        }`}>
                          {step.num}
                        </div>
                        <span className={`text-[11px] font-medium mt-2 absolute -bottom-5 whitespace-nowrap ${
                          isActive ? "text-blue-600 dark:text-blue-500" : "text-slate-400 dark:text-slate-500"
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="mt-8">
              {children}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
