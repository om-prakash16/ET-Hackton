"use client";

import { useState, useEffect } from "react";
import { Building2, Globe, MapPin, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

const INDUSTRIES = [
  "Manufacturing", "Steel", "Oil & Gas", "Power", "Mining", "Chemical", 
  "Automotive", "Pharmaceutical", "Construction", "Energy", "Utilities", 
  "Food", "Water", "Other"
];

const COMPANY_SIZES = [
  "1–50", "51–200", "201–500", "501–1000", "1000+"
];

const BUSINESS_TYPES = [
  "Private Limited Company", "Public Limited Company", "Enterprise Partnership", 
  "Government / Public Sector", "Sole Proprietorship", "Multinational Corporation"
];

export default function CreateOrganizationPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    code: "IND-" + Math.floor(1000 + Math.random() * 9000),
    industry: "",
    business_type: "Private Limited Company",
    company_size: "",
    website: "",
    gst: "",
    reg_no: "",
    email: "",
    phone: "",
    country: "",
    state: "",
    city: "",
    address: "",
    postal_code: ""
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("onboarding_token");
      const storedEmail = localStorage.getItem("onboarding_email") || "";
      if (!storedToken) {
        router.replace("/register");
      } else {
        setToken(storedToken);
        setFormData((prev) => ({ ...prev, email: storedEmail }));
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (typeof window !== "undefined") {
      localStorage.setItem("onboarding_org_name", formData.name || "Acme Global Industries");
      localStorage.setItem("onboarding_org_code", formData.code);
      localStorage.setItem("onboarding_industry", formData.industry || "Oil & Gas");
      localStorage.setItem("onboarding_business_type", formData.business_type);
      localStorage.setItem("onboarding_company_size", formData.company_size || "501–1000");
      localStorage.setItem("onboarding_org_country", formData.country || "United States");
      localStorage.setItem("onboarding_org_state", formData.state || "California");
      localStorage.setItem("onboarding_org_city", formData.city || "San Francisco");
      localStorage.setItem("onboarding_org_address", formData.address || "123 Industrial Way");
      localStorage.setItem("onboarding_org_postal", formData.postal_code || "94105");
    }

    try {
      await fetch("http://localhost:8000/api/v1/auth/create-organization", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
    } catch (err: any) {
      console.log("Backend offline, saving organization profile to local storage.");
    } finally {
      setIsLoading(false);
      router.push("/register/plant");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
            <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Organization Profile</h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mt-3">Set up your company workspace to get started.</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Company Name *</label>
            <div className="relative">
              <Building2 className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                placeholder="Acme Corp"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider flex justify-between">
              <span>Org Code (Auto)</span>
              <button type="button" onClick={() => setFormData({...formData, code: "IND-" + Math.floor(1000 + Math.random()*9000)})} className="text-blue-400 hover:underline text-[10px]">Regenerate</button>
            </label>
            <input 
              type="text" 
              value={formData.code}
              readOnly
              className="w-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-600 dark:text-zinc-300 font-mono text-sm focus:outline-none cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Industry *</label>
            <select 
              value={formData.industry}
              onChange={(e) => setFormData({...formData, industry: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              required
            >
              <option value="" disabled className="text-slate-400 dark:text-zinc-500">Select Industry</option>
              {INDUSTRIES.map(ind => <option key={ind} value={ind} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">{ind}</option>)}
            </select>
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Company Size *</label>
            <select 
              value={formData.company_size}
              onChange={(e) => setFormData({...formData, company_size: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              required
            >
              <option value="" disabled className="text-slate-400 dark:text-zinc-500">Select Size</option>
              {COMPANY_SIZES.map(size => <option key={size} value={size} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">{size}</option>)}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Business Type *</label>
            <select 
              value={formData.business_type}
              onChange={(e) => setFormData({...formData, business_type: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              required
            >
              {BUSINESS_TYPES.map(bt => <option key={bt} value={bt} className="bg-white dark:bg-zinc-900 text-slate-900 dark:text-white">{bt}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Website (Optional)</label>
            <input 
              type="url" 
              value={formData.website}
              onChange={(e) => setFormData({...formData, website: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              placeholder="https://acmecorp.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">GST Number</label>
            <input 
              type="text" 
              value={formData.gst}
              onChange={(e) => setFormData({...formData, gst: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-mono"
              placeholder="27AAACA1234A1Z5"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Registration Number</label>
            <input 
              type="text" 
              value={formData.reg_no}
              onChange={(e) => setFormData({...formData, reg_no: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm font-mono"
              placeholder="U72900MH2026PTC123456"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Organization Logo</label>
          <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl p-4 text-center bg-slate-50 dark:bg-slate-900/30 hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors cursor-pointer">
            <span className="text-xs text-slate-500 dark:text-slate-400">Click or drag & drop company logo (PNG, JPG, SVG up to 5MB)</span>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
            <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2"><Globe className="w-4 h-4" /> Headquarters</span>
            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Country</label>
              <input 
                type="text" 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="United States"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">State / Province</label>
              <input 
                type="text" 
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
                placeholder="California"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">City</label>
            <input 
              type="text" 
              value={formData.city}
              onChange={(e) => setFormData({...formData, city: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="San Francisco"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Full Address</label>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3 top-3 text-slate-400 dark:text-zinc-500" />
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={3}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none"
                placeholder="123 Tech Boulevard, Suite 100"
                required
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-600 dark:bg-white hover:bg-blue-700 dark:hover:bg-zinc-200 disabled:opacity-50 text-white dark:text-black font-semibold py-3 rounded-xl transition-all shadow-lg dark:shadow-white/10 active:scale-[0.98] mt-6 flex items-center justify-center"
        >
          {isLoading ? "Creating Workspace..." : "Continue to Next Step"}
          {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
        </button>
      </form>
    </div>
  );
}
