"use client";

import React, { useEffect, useState } from "react";
import { Briefcase, DollarSign, TrendingUp, TrendingDown, Leaf, ShieldAlert, BarChart2, CheckCircle2, AlertTriangle, Loader2, Play, FileText, Brain } from "lucide-react";

export default function ExecutiveDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  // Simulation State
  const [scenario, setScenario] = useState("default");
  const [simulating, setSimulating] = useState(false);
  const [simResult, setSimResult] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/executive/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  const runSimulation = async () => {
    setSimulating(true);
    setSimResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/executive/simulate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ scenario })
      });
      const result = await res.json();
      setSimResult(result);
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Briefcase className="w-8 h-8 text-amber-500" /> Strategic Executive Intelligence
          </h1>
          <p className="text-slate-400">Board-level financial ROI, ESG metrics, and AI-driven strategic forecasting.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors">
            <FileText className="w-4 h-4" /> Generate Board Report (PDF)
          </button>
        </div>
      </div>

      {/* C-Level Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-amber-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <DollarSign className="w-4 h-4 text-amber-400" /> AI Net ROI Multiplier
          </div>
          <p className="text-3xl font-bold text-amber-400 mb-1">{data.roi.net_roi_multiplier}</p>
          <p className="text-xs text-slate-500 mt-2">Driven by $4.25M in downtime prevented vs $12.4k API cost.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Leaf className="w-4 h-4 text-emerald-400" /> ESG: Carbon Emissions
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.esg.carbon_emissions_mt} <span className="text-lg text-slate-500">MT</span></p>
          <p className="text-xs font-bold text-emerald-400 flex items-center gap-1 mt-2">
            <TrendingDown className="w-3 h-3" /> {data.esg.carbon_trend} YTD
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-blue-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <TrendingUp className="w-4 h-4 text-blue-400" /> Operational Savings
          </div>
          <p className="text-3xl font-bold text-white mb-1">${data.roi.maintenance_savings_usd}</p>
          <p className="text-xs text-slate-500 mt-2">Direct labor & parts savings.</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-16 h-16 bg-rose-500/10 rounded-bl-full" />
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Enterprise Risk Profile
          </div>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Operational</span>
              <span className="font-bold text-emerald-400">LOW</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Cybersecurity</span>
              <span className="font-bold text-amber-400">MEDIUM</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-400">Compliance</span>
              <span className="font-bold text-emerald-400">LOW</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI What-If Simulator */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="bg-slate-950 p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Brain className="w-6 h-6 text-purple-500" /> AI Strategic "What-If" Simulator
          </h2>
          <p className="text-sm text-slate-400 mt-1">Predict the operational, financial, and risk impact of major business decisions before you make them.</p>
        </div>
        
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Controls */}
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Select Strategic Scenario</label>
              <select 
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
              >
                <option value="default">-- Select Scenario --</option>
                <option value="REDUCE_BUDGET">Reduce Global Maintenance Budget by 15%</option>
                <option value="REPLACE_VENDOR">Replace OEM Vendor for High-Speed Compressors</option>
                <option value="DEFER_INSPECTION">Defer API 570 Piping Inspections by 12 Months</option>
              </select>
            </div>
            
            <button 
              onClick={runSimulation}
              disabled={scenario === "default" || simulating}
              className="w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-bold flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {simulating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Play className="w-5 h-5 fill-current" />}
              {simulating ? "Gemini Reasoning..." : "Run AI Simulation"}
            </button>
          </div>

          {/* Results */}
          <div className="lg:col-span-2 relative min-h-[300px] border border-slate-800 rounded-xl p-6 bg-slate-950/50">
            {!simResult && !simulating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500">
                <BarChart2 className="w-12 h-12 mb-4 opacity-50" />
                <p className="text-sm font-bold">Select a scenario to forecast outcomes.</p>
              </div>
            )}
            
            {simulating && (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-purple-500">
                <Brain className="w-12 h-12 animate-pulse mb-4" />
                <p className="text-sm font-bold font-mono tracking-widest uppercase">Forecasting enterprise impact vectors...</p>
              </div>
            )}
            
            {simResult && !simulating && (
              <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">{simResult.scenario}</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1"><DollarSign className="w-3 h-3"/> Financial Impact</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{simResult.financial_impact}</p>
                  </div>
                  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4">
                    <p className="text-[10px] font-bold text-blue-400 uppercase tracking-wider mb-2 flex items-center gap-1"><TrendingDown className="w-3 h-3"/> Operational Impact</p>
                    <p className="text-sm text-slate-300 leading-relaxed">{simResult.operational_impact}</p>
                  </div>
                </div>
                
                <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4">
                  <p className="text-[10px] font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1"><AlertTriangle className="w-3 h-3"/> Risk Impact</p>
                  <p className="text-sm text-rose-200 font-bold">{simResult.risk_impact}</p>
                </div>
                
                <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider mb-1">AI Strategic Recommendation</p>
                    <p className="text-sm text-indigo-100 font-bold">{simResult.recommendation}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
