"use client";

import React, { useEffect, useState } from "react";
import { Building2, Activity, ShieldAlert, Cpu, BrainCircuit, Globe, Loader2, ArrowRight } from "lucide-react";

export default function SuperAdminLessonsDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/admin/lessons/dashboard");
      const result = await res.json();
      setData(result);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12">
        <Loader2 className="w-8 h-8 text-indigo-500 animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Platform Overview</h1>
        <p className="text-zinc-400">Global intelligence engine metrics across all organizations.</p>
      </div>

      {/* Top Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <Building2 className="w-4 h-4 text-emerald-400" /> Organizations
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.organizations_active}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <BrainCircuit className="w-4 h-4 text-indigo-400" /> Lessons Generated
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.lessons_generated}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <Cpu className="w-4 h-4 text-amber-400" /> Active AI Jobs
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.active_ai_jobs}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Global Risk Alerts
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.critical_risk_alerts}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Global Map Simulation */}
        <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-400" /> High-Risk Plants
            </h2>
            <span className="px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full text-xs font-semibold">
              Coverage: {data?.metrics.knowledge_coverage}
            </span>
          </div>
          
          <div className="space-y-4">
            {data?.high_risk_plants.map((plant: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center p-4 bg-black/40 rounded-lg border border-white/5">
                <div>
                  <p className="text-white font-medium">{plant.name}</p>
                  <p className="text-xs text-zinc-500 mt-1">Cross-Organization Analysis Flag</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${plant.risk_score > 9 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                      style={{ width: `${(plant.risk_score / 10) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-white">{plant.risk_score}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-emerald-400" /> Recent AI Activity
          </h2>
          <div className="space-y-6">
            {data?.recent_activity.map((activity: any, idx: number) => (
              <div key={idx} className="flex gap-4 relative">
                {idx !== data.recent_activity.length - 1 && (
                  <div className="absolute left-[9px] top-6 bottom-[-24px] w-[2px] bg-white/10" />
                )}
                <div className="w-5 h-5 rounded-full bg-indigo-500/20 border border-indigo-500/50 flex-shrink-0 mt-0.5 z-10" />
                <div>
                  <p className="text-sm text-zinc-300">{activity.event}</p>
                  <p className="text-xs text-zinc-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-2 bg-white/5 hover:bg-white/10 text-sm text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2">
            View All Logs <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
}
