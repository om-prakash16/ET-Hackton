"use client";

import { useState } from "react";
import { User, Mail, Phone, Briefcase, Lock, Eye, EyeOff, Globe, Clock, Info, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
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

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneCode: "+91",
    phone: "",
    jobTitle: "",
    password: "",
    confirmPassword: "",
    language: "English (US)",
    timezone: "(GMT+05:30) Asia/Kolkata",
    updates: false,
    terms: false,
    privacy: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.terms || !formData.privacy) {
      alert("Please agree to both Terms & Conditions and Privacy Policy to continue.");
      return;
    }
    setIsLoading(true);

    setTimeout(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_email", formData.email);
        localStorage.setItem("onboarding_first_name", formData.firstName);
        localStorage.setItem("onboarding_last_name", formData.lastName);
        localStorage.setItem("onboarding_token", "demo_token");
      }
      router.push("/register/verify-email");
    }, 800);
  };

  return (
    <div className="w-full transition-colors">
      <div className="mb-6">
        <h2 className="text-[28px] font-bold text-slate-900 dark:text-white mb-1 tracking-tight">Create your account</h2>
        <p className="text-slate-500 dark:text-slate-400 text-[13px]">Let's get started with your organization</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        <div>
          <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-200 mb-4">Personal Information</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">First name <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input 
                  type="text" 
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                  placeholder="Enter first name"
                  required
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Last name <span className="text-red-500">*</span></label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input 
                  type="text" 
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                  placeholder="Enter last name"
                  required
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 mb-4">
            <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Work email <span className="text-red-500">*</span></label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type="email" 
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                placeholder="name@company.com"
                required
              />
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">Use your work email address</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Mobile number <span className="font-normal text-slate-400">(optional)</span></label>
              <div className="flex">
                <div className="relative border border-slate-200 dark:border-slate-800 border-r-0 rounded-l-lg bg-white dark:bg-[#0B1121] flex items-center pl-3 pr-1 py-2.5">
                   <Phone className="w-4 h-4 text-slate-400 dark:text-slate-500 mr-1" />
                   <select 
                     value={formData.phoneCode}
                     onChange={(e) => setFormData({...formData, phoneCode: e.target.value})}
                     className="bg-transparent text-[13px] text-slate-700 dark:text-slate-300 focus:outline-none appearance-none cursor-pointer pr-4"
                   >
                     <option value="+91">+91</option>
                     <option value="+1">+1</option>
                     <option value="+44">+44</option>
                   </select>
                   <div className="absolute right-2 pointer-events-none text-slate-400 dark:text-slate-500">
                     <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                   </div>
                </div>
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-r-lg py-2.5 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Job title <span className="font-normal text-slate-400">(optional)</span></label>
              <div className="relative">
                <Briefcase className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <input 
                  type="text" 
                  value={formData.jobTitle}
                  onChange={(e) => setFormData({...formData, jobTitle: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                  placeholder="Enter your job title"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1.5 mb-4">
            <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type={showPassword ? "text" : "password"} 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            
            {/* Password strength indicators */}
            <div className="flex gap-1 pt-1">
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 pt-0.5">Use 8+ characters with uppercase, lowercase, number & symbol</p>
          </div>

          <div className="space-y-1.5 mb-4">
            <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Confirm password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-10 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px]"
                placeholder="Confirm your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Preferred language</label>
              <div className="relative">
                <Globe className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <select 
                  value={formData.language}
                  onChange={(e) => setFormData({...formData, language: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-8 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px] appearance-none"
                >
                  <option>English (US)</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[12px] font-semibold text-slate-700 dark:text-slate-300">Time zone</label>
              <div className="relative">
                <Clock className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                <select 
                  value={formData.timezone}
                  onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                  className="w-full bg-white dark:bg-[#0B1121] border border-slate-200 dark:border-slate-800 rounded-lg py-2.5 pl-9 pr-8 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-[13px] appearance-none"
                >
                  <option>(GMT+05:30) Asia/Kolkata</option>
                  <option>(GMT-05:00) Eastern Time</option>
                  <option>(GMT+00:00) London</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 dark:text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2">
          <h3 className="text-[14px] font-bold text-slate-900 dark:text-slate-200 mb-3">Security</h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-2.5">
              <input 
                type="checkbox" 
                id="updates" 
                checked={formData.updates}
                onChange={(e) => setFormData({...formData, updates: e.target.checked})}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-[#0B1121]" 
              />
              <label htmlFor="updates" className="text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                I agree to receive product updates, newsletters, and offers (optional)
              </label>
            </div>

            <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-100 dark:border-blue-500/20 rounded-lg p-3 flex gap-2.5">
              <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <p className="text-[12px] text-blue-800 dark:text-blue-200 leading-relaxed">
                We respect your privacy. Your information is safe with us and will never be shared with third parties.
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <input 
                type="checkbox" 
                id="terms" 
                checked={formData.terms}
                onChange={(e) => setFormData({...formData, terms: e.target.checked})}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-[#0B1121]" 
              />
              <label htmlFor="terms" className="text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Terms & Conditions</a> <span className="text-red-500">*</span>
              </label>
            </div>

            <div className="flex items-start gap-2.5">
              <input 
                type="checkbox" 
                id="privacy" 
                checked={formData.privacy}
                onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                className="mt-0.5 w-4 h-4 rounded border-slate-300 dark:border-slate-700 text-blue-600 focus:ring-blue-500 dark:bg-[#0B1121]" 
              />
              <label htmlFor="privacy" className="text-[13px] text-slate-600 dark:text-slate-400 leading-snug">
                I agree to the <a href="#" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">Privacy Policy</a> <span className="text-red-500">*</span>
              </label>
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-lg shadow-blue-500/20"
        >
          {isLoading ? "Creating Account..." : "Continue"}
          {!isLoading && <ArrowRight className="w-4 h-4" />}
        </button>
      </form>

      <div className="relative py-3 mt-6 mb-6 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-slate-200 dark:bg-slate-800"></div>
        <span className="relative bg-white dark:bg-[#0B1121] px-4 text-[12px] text-slate-500 dark:text-slate-400">or sign up with</span>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button className="flex items-center justify-center gap-2 bg-white dark:bg-[#0B1121] hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl transition-all text-[13px]">
          <MicrosoftIcon />
          Sign up with Microsoft
        </button>
        <button className="flex items-center justify-center gap-2 bg-white dark:bg-[#0B1121] hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-medium py-2.5 rounded-xl transition-all text-[13px]">
          <GoogleIcon />
          Sign up with Google
        </button>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center mt-6">
        <p className="text-xs text-slate-400 mb-2">Are you an employee joining an existing organization?</p>
        <div className="flex items-center justify-center gap-4 text-xs font-semibold">
          <Link href="/invite/demo-invite-token" className="text-blue-400 hover:text-blue-300 transition-colors underline">
            Join via Invite Link
          </Link>
          <span className="text-slate-600">|</span>
          <Link href="/register/employee" className="text-blue-400 hover:text-blue-300 transition-colors underline">
            Request Employee Access
          </Link>
        </div>
      </div>

    </div>
  );
}
