"use client";

import { useState, useEffect } from "react";
import { Factory, MapPin, Hash, Globe, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreatePlantPage() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    name: "",
    code: "PL-" + Math.floor(100 + Math.random()*900),
    country: "",
    state: "",
    city: "",
    address: "",
    postal_code: "",
    timezone: "America/Chicago",
    latitude: "29.7604",
    longitude: "-95.3698",
    working_hours: "24/7 Continuous Operations",
    shift_type: "3x8 Hour Rotating Shifts"
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("onboarding_token");
      if (!storedToken) {
        router.replace("/register");
      } else {
        setToken(storedToken);
      }
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      if (typeof window !== "undefined") {
        localStorage.setItem("onboarding_plant_name", formData.name || "Main Plant Facility");
        localStorage.setItem("onboarding_plant_code", formData.code);
        localStorage.setItem("onboarding_plant_country", formData.country || "United States");
        localStorage.setItem("onboarding_plant_state", formData.state || "Texas");
        localStorage.setItem("onboarding_plant_city", formData.city || "Houston");
        localStorage.setItem("onboarding_plant_address", formData.address || "456 Industrial Way");
        localStorage.setItem("onboarding_plant_postal", formData.postal_code || "77001");
        localStorage.setItem("onboarding_plant_timezone", formData.timezone);
        localStorage.setItem("onboarding_plant_lat", formData.latitude);
        localStorage.setItem("onboarding_plant_lng", formData.longitude);
        localStorage.setItem("onboarding_plant_hours", formData.working_hours);
        localStorage.setItem("onboarding_plant_shifts", formData.shift_type);
      }
      await fetch("http://localhost:8000/api/v1/auth/create-plant", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData),
      });
    } catch (err: any) {
      console.log("Backend offline, saving plant profile to local storage.");
    } finally {
      setIsLoading(false);
      router.push("/register/review");
    }
  };

  return (
    <div className="w-full">
      <div className="mb-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-blue-50 dark:bg-blue-500/10 rounded-full flex items-center justify-center border border-blue-100 dark:border-blue-500/20">
            <Factory className="w-8 h-8 text-blue-600 dark:text-blue-400" />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">First Plant Setup</h1>
        <p className="text-slate-500 dark:text-zinc-400 text-sm mt-3">Create your first operational facility to start adding assets.</p>
      </div>

      {error && (
        <div className="bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 text-red-600 dark:text-red-400 text-sm p-3 rounded-xl mb-6 text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Plant Name</label>
            <input 
              type="text" 
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all"
              placeholder="Texas Refinery"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Plant Code</label>
            <div className="relative">
              <Hash className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-zinc-500" />
              <input 
                type="text" 
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all uppercase"
                placeholder="TX-001"
                required
              />
            </div>
          </div>
        </div>

        <div className="pt-4 space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-px bg-slate-200 dark:bg-white/10 flex-1"></div>
            <span className="text-xs font-semibold text-slate-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-2"><Globe className="w-4 h-4" /> Location</span>
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
                placeholder="Texas"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">City *</label>
              <input 
                type="text" 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                placeholder="Houston"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Postal Code</label>
              <input 
                type="text" 
                value={formData.postal_code}
                onChange={(e) => setFormData({...formData, postal_code: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
                placeholder="77001"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Time Zone *</label>
              <select 
                value={formData.timezone}
                onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              >
                <option value="UTC" className="bg-white dark:bg-zinc-900">UTC</option>
                <option value="America/New_York" className="bg-white dark:bg-zinc-900">Eastern Time</option>
                <option value="America/Chicago" className="bg-white dark:bg-zinc-900">Central Time</option>
                <option value="America/Denver" className="bg-white dark:bg-zinc-900">Mountain Time</option>
                <option value="America/Los_Angeles" className="bg-white dark:bg-zinc-900">Pacific Time</option>
                <option value="Asia/Kolkata" className="bg-white dark:bg-zinc-900">India Standard Time</option>
                <option value="Asia/Dubai" className="bg-white dark:bg-zinc-900">Gulf Standard Time</option>
                <option value="Europe/London" className="bg-white dark:bg-zinc-900">Greenwich Mean Time</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Working Hours</label>
              <select 
                value={formData.working_hours}
                onChange={(e) => setFormData({...formData, working_hours: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              >
                <option value="24/7 Continuous Operations" className="bg-white dark:bg-zinc-900">24/7 Continuous Operations</option>
                <option value="08:00 - 17:00 Standard Day" className="bg-white dark:bg-zinc-900">08:00 - 17:00 Standard Day</option>
                <option value="2-Shift (16 Hours)" className="bg-white dark:bg-zinc-900">2-Shift (16 Hours)</option>
                <option value="Weekend Only Maintenance" className="bg-white dark:bg-zinc-900">Weekend Only Maintenance</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Shift Type</label>
              <select 
                value={formData.shift_type}
                onChange={(e) => setFormData({...formData, shift_type: e.target.value})}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-4 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm"
              >
                <option value="3x8 Hour Rotating Shifts" className="bg-white dark:bg-zinc-900">3x8 Hour Rotating Shifts</option>
                <option value="2x12 Hour Shifts" className="bg-white dark:bg-zinc-900">2x12 Hour Shifts</option>
                <option value="Single Day Shift" className="bg-white dark:bg-zinc-900">Single Day Shift</option>
                <option value="Flexible On-Call" className="bg-white dark:bg-zinc-900">Flexible On-Call</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Geo-Coordinates (Lat, Lng)</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={formData.latitude}
                  onChange={(e) => setFormData({...formData, latitude: e.target.value})}
                  className="w-1/2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-xs font-mono"
                  placeholder="Lat: 29.76"
                />
                <input 
                  type="text" 
                  value={formData.longitude}
                  onChange={(e) => setFormData({...formData, longitude: e.target.value})}
                  className="w-1/2 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 px-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-xs font-mono"
                  placeholder="Lng: -95.36"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-zinc-400 uppercase tracking-wider">Plant Address *</label>
            <div className="relative">
              <MapPin className="w-5 h-5 absolute left-3 top-3 text-slate-400 dark:text-zinc-500" />
              <textarea 
                value={formData.address}
                onChange={(e) => setFormData({...formData, address: e.target.value})}
                rows={2}
                className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl py-3 pl-10 pr-4 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none text-sm"
                placeholder="456 Industrial Way"
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
          {isLoading ? "Creating Plant..." : "Review and Complete"}
          {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
        </button>
      </form>
    </div>
  );
}
