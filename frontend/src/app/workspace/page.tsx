"use client";

import React, { useEffect, useState } from "react";
import { Brain, Activity, LineChart, Shield, ShieldAlert, Cpu, Sparkles, Building2, User, Wrench, FileText, CheckCircle2, ArrowRight, Loader2 } from "lucide-react";

export default function AICommandCenter() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Copilot State
  const [activeRole, setActiveRole] = useState("executive");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotData, setCopilotData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/ai-os/command-center")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setCopilotLoading(true);
    fetch(`http://localhost:8000/api/v1/ai-os/copilot/${activeRole}`)
      .then(r => r.json())
      .then(d => {
        setCopilotData(d);
        setCopilotLoading(false);
      });
  }, [activeRole]);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Cpu className="w-10 h-10 text-indigo-500" /> Enterprise Industrial AI OS
          </h1>
          <p className="text-slate-400 text-lg">Central nervous system for operations, engineering, and enterprise intelligence.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-bold border border-indigo-500/20">
          <Brain className="w-4 h-4 animate-pulse" /> Gemini Orchestrator Active
        </div>
      </div>

      {/* Global Enterprise Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-blue-500/50 transition-colors">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Activity className="w-4 h-4 text-blue-400" /> Overall Asset Health
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.overall_asset_health}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Sparkles className="w-4 h-4 text-emerald-400" /> Knowledge Growth
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.knowledge_growth}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Shield className="w-4 h-4 text-indigo-400" /> Safety & Compliance
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.safety_score}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden group hover:border-amber-500/50 transition-colors">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <LineChart className="w-4 h-4 text-amber-400" /> AI ROI Savings
          </div>
          <p className="text-3xl font-bold text-amber-400 mb-1">{data.metrics.ai_roi_savings}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Role-Based Copilot Hub */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Brain className="w-6 h-6 text-indigo-500" /> Role-Based AI Copilot
              </h2>
            </div>

            {/* Role Tabs */}
            <div className="flex bg-slate-950 p-1 rounded-lg mb-6 border border-slate-800">
              <button 
                onClick={() => setActiveRole("executive")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
                  activeRole === "executive" ? "bg-indigo-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Building2 className="w-4 h-4" /> Executive Copilot
              </button>
              <button 
                onClick={() => setActiveRole("plant_head")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
                  activeRole === "plant_head" ? "bg-blue-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <User className="w-4 h-4" /> Plant Head
              </button>
              <button 
                onClick={() => setActiveRole("engineer")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-md text-sm font-bold transition-all ${
                  activeRole === "engineer" ? "bg-emerald-600 text-white shadow-lg" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                <Wrench className="w-4 h-4" /> Engineering
              </button>
            </div>

            {/* Copilot Output */}
            <div className="min-h-[250px] bg-slate-950 border border-slate-800 rounded-xl p-6 relative">
              {copilotLoading ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                  <Loader2 className="w-8 h-8 animate-spin mb-4 text-indigo-500" />
                  <p className="text-sm font-mono animate-pulse">Gemini reasoning over context...</p>
                </div>
              ) : copilotData && (
                <div className="animate-in fade-in duration-500">
                  <div className="flex justify-between items-start mb-6">
                    <h3 className="text-2xl font-bold text-white">{copilotData.greeting}</h3>
                    <span className="px-3 py-1 bg-slate-800 border border-slate-700 rounded-full text-xs font-mono text-slate-400">
                      FOCUS: {copilotData.focus}
                    </span>
                  </div>
                  
                  <div className="space-y-4">
                    {copilotData.insights.map((insight: string, i: number) => (
                      <div key={i} className="flex gap-3 items-start">
                        <CheckCircle2 className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
                        <p className="text-slate-300 leading-relaxed">{insight}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Autonomous Workflow Engine */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[480px]">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-emerald-500" /> Autonomous AI Engine
          </h2>
          <p className="text-xs text-slate-400 mb-6">Live feed of actions generated by AI agents without human intervention.</p>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.autonomous_feed.map((feed: any) => (
              <div key={feed.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <Brain className="w-4 h-4 text-indigo-500" />
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{feed.agent}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{feed.time}</span>
                </div>
                
                <h3 className="text-sm font-bold text-emerald-400 mb-2">{feed.action}</h3>
                <p className="text-xs text-slate-400">{feed.reason}</p>
                
                <div className="mt-3 flex justify-end">
                  <button className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 flex items-center gap-1 transition-colors">
                    View Trace <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
