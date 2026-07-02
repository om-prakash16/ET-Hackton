"use client";

import { signIn } from "next-auth/react";
import { useState, useEffect } from "react";
import { 
  Brain, ArrowRight, Mail, Lock, Eye, EyeOff, Info, 
  ShieldCheck, Layers, Sparkles, Target, Factory, 
  HelpCircle, FileText, Globe, ChevronDown, Server, Shield, AlertCircle
} from "lucide-react";
import Link from "next/link";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const MicrosoftIcon = () => (
  <svg viewBox="0 0 21 21" className="w-5 h-5">
    <rect x="1" y="1" width="9" height="9" fill="#f25022"/>
    <rect x="1" y="11" width="9" height="9" fill="#00a4ef"/>
    <rect x="11" y="1" width="9" height="9" fill="#7fba00"/>
    <rect x="11" y="11" width="9" height="9" fill="#ffb900"/>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("error")) {
        setErrorMessage("Invalid work email or password. Please verify your credentials or check with your Super Admin.");
      }
    }
  }, []);

  const handleCredentialsLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");
    
    // Check if user belongs to a pending or rejected self-service registration
    if (typeof window !== "undefined") {
      const storedOrgs = localStorage.getItem("indusbrain_orgs");
      if (storedOrgs) {
        try {
          const orgsList = JSON.parse(storedOrgs);
          const matchingOrg = orgsList.find((o: any) => o.email?.toLowerCase() === email.toLowerCase());
          if (matchingOrg) {
            if (matchingOrg.status === "Pending Approval") {
              setIsLoading(false);
              setErrorMessage(`Organization "${matchingOrg.name}" is currently awaiting Super Admin governance review & approval.`);
              return;
            } else if (matchingOrg.status === "Rejected") {
              setIsLoading(false);
              setErrorMessage(`Registration for "${matchingOrg.name}" was rejected: ${matchingOrg.rejectionReason || "Please contact security governance."}`);
              return;
            }
          }
        } catch (e) {}
      }
    }

    const emailPrefix = email.split('@')[0].toLowerCase();
    const validRoles = ["admin", "plant", "operations", "maintenance-manager", "maintenance", "reliability", "quality-manager", "quality", "safety", "production", "technician", "auditor", "contractor", "viewer"];
    const role = validRoles.includes(emailPrefix) ? emailPrefix : "admin";

    const targetUrl = role === "admin" ? "/admin/dashboard" : `/workspace/${role}/dashboard`;
    await signIn("credentials", { email, password, callbackUrl: targetUrl });
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-[#0B1121] flex flex-col font-sans text-slate-300 relative">
      
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-30"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2069&auto=format&fit=crop')",
          backgroundSize: "cover",
          backgroundPosition: "center left",
        }}
      />
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#0B1121]/90 via-[#0B1121] to-[#0B1121]"></div>

      {/* Top Navigation */}
      <div className="flex items-center justify-between p-6 lg:px-12 relative z-20">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-blue-500" />
          <span className="text-xl font-semibold text-white tracking-wide">
            IndusBrain<span className="text-blue-500">AI</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-400 hidden sm:block">New to IndusBrain AI?</span>
          <Link 
            href="/register" 
            className="group flex items-center justify-center px-4 py-2 text-sm font-medium text-blue-400 border border-slate-700 rounded-lg hover:bg-slate-800/50 transition-all"
          >
            Create account
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 p-4 lg:px-12 relative z-10 max-w-7xl mx-auto w-full my-4">
        
        {/* Left Side: Marketing Copy */}
        <div className="hidden lg:flex flex-col w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-3 tracking-tight">
            Industrial Knowledge.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Intelligent Operations.</span>
          </h1>
          <p className="text-slate-400 text-base mb-8 max-w-md">
            IndusBrain AI unifies your industrial knowledge, assets, and operations data to empower every decision with AI.
          </p>

          <div className="space-y-6 mb-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                <Layers className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-0.5">Unified Knowledge</h3>
                <p className="text-sm text-slate-400 leading-snug">Connect documents, assets, <br/> and systems</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                <Sparkles className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-0.5">AI-Powered Insights</h3>
                <p className="text-sm text-slate-400 leading-snug">Get accurate answers with <br/> source-backed responses</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                <Target className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-0.5">Operational Excellence</h3>
                <p className="text-sm text-slate-400 leading-snug">Reduce downtime, improve safety <br/> and ensure compliance</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800/80 flex items-center justify-center shrink-0 border border-slate-700/50">
                <Factory className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="text-white font-medium mb-0.5">Built for Industry</h3>
                <p className="text-sm text-slate-400 leading-snug">Designed for plants, assets <br/> and industrial teams</p>
              </div>
            </div>
          </div>

          <div className="inline-flex items-center gap-4 bg-[#0F172A]/80 backdrop-blur-md border border-slate-800 rounded-2xl p-3 self-start shadow-xl">
            <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
            </div>
            <div>
              <h4 className="text-blue-400 font-medium text-sm">Enterprise Grade Security</h4>
              <p className="text-[11px] text-slate-400">SOC 2 Type II • ISO 27001 • Data Encrypted</p>
            </div>
          </div>
        </div>

        {/* Right Side: Login Form Card */}
        <div className="w-full max-w-[440px]">
          <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-slate-800/80 rounded-[1.5rem] p-6 sm:p-8 shadow-2xl">
            
            <h2 className="text-2xl font-bold text-white tracking-tight mb-1">Welcome back</h2>
            <p className="text-slate-400 text-sm mb-6">Sign in to your IndusBrain AI workspace</p>

            <div className="space-y-2.5 mb-5">
              <button 
                onClick={() => signIn("azure-ad", { callbackUrl: "/admin/dashboard" })}
                className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium py-2.5 rounded-xl transition-all text-sm"
              >
                <MicrosoftIcon />
                Continue with Microsoft 365
              </button>
              
              <button 
                onClick={() => signIn("google", { callbackUrl: "/admin/dashboard" })}
                className="w-full flex items-center justify-center gap-3 bg-transparent hover:bg-slate-800/50 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium py-2.5 rounded-xl transition-all text-sm"
              >
                <GoogleIcon />
                Continue with Google Workspace
              </button>
            </div>

            <div className="relative py-2 mb-4 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-slate-800"></div>
              <span className="relative bg-[#0F172A] px-4 text-[11px] text-slate-500 uppercase tracking-wider">or sign in with email</span>
            </div>

            {errorMessage && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-xs p-3.5 rounded-xl mb-4 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-400" />
                <span className="leading-relaxed">{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleCredentialsLogin} className="space-y-4 mb-6">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-white block">Work email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-[#0B1121] border border-slate-800 rounded-xl py-2.5 pl-9 pr-4 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="name@company.com"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-white">Password</label>
                  <a href="#" className="text-xs text-blue-500 hover:text-blue-400 transition-colors">Forgot password?</a>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#0B1121] border border-slate-800 rounded-xl py-2.5 pl-9 pr-10 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm"
                    placeholder="Enter your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1 pb-1">
                <div className="flex items-center gap-2">
                  <input 
                    type="checkbox" 
                    id="remember" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-3.5 h-3.5 rounded border-slate-700 bg-[#0B1121] text-blue-600 focus:ring-blue-500 focus:ring-offset-[#0B1121]" 
                  />
                  <label htmlFor="remember" className="text-xs text-slate-300">
                    Remember me
                  </label>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-xs">
                  Keep me signed in <Info className="w-3.5 h-3.5" />
                </div>
              </div>

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 disabled:opacity-50 text-white font-medium py-2.5 rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98] flex items-center justify-center gap-2 text-sm mt-2"
              >
                {isLoading ? "Signing In..." : "Sign In"}
                {!isLoading && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>

            <div className="relative py-1.5 mb-4 flex items-center justify-center">
              <div className="absolute inset-x-0 h-px bg-slate-800"></div>
              <span className="relative bg-[#0F172A] px-3 text-[10px] text-slate-500 uppercase tracking-wider">Or enterprise SSO</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <button 
                onClick={() => signIn("saml", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-1.5 bg-transparent hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs py-2 rounded-xl transition-all"
              >
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span>SSO (SAML / OIDC)</span>
              </button>
              <button 
                onClick={() => signIn("ldap", { callbackUrl: "/" })}
                className="flex items-center justify-center gap-1.5 bg-transparent hover:bg-slate-800/50 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs py-2 rounded-xl transition-all px-1"
              >
                <Server className="w-3.5 h-3.5 shrink-0" />
                <span className="text-center whitespace-nowrap">LDAP / Active Directory</span>
              </button>
            </div>
            
          </div>
        </div>
        
      </div>

      {/* Footer */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-between p-4 lg:px-12 border-t border-slate-800/50 text-xs text-slate-400 z-20 gap-4 mt-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <a href="#" className="flex items-center gap-1.5 hover:text-slate-200 transition-colors whitespace-nowrap">
            <HelpCircle className="w-3.5 h-3.5" /> Help Center
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-slate-200 transition-colors whitespace-nowrap">
            <ShieldCheck className="w-3.5 h-3.5" /> Privacy Policy
          </a>
          <a href="#" className="flex items-center gap-1.5 hover:text-slate-200 transition-colors whitespace-nowrap">
            <FileText className="w-3.5 h-3.5" /> Terms of Service
          </a>
        </div>

        <button className="flex items-center gap-1.5 bg-transparent border border-slate-700 rounded-lg px-3 py-1.5 hover:bg-slate-800 transition-colors shrink-0">
          <Globe className="w-3.5 h-3.5" />
          <span>English</span>
          <ChevronDown className="w-3.5 h-3.5" />
        </button>
      </div>
      
    </div>
  );
}
