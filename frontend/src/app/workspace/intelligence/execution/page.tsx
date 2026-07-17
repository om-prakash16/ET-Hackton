"use client";

import React, { useEffect, useState } from "react";
import { CheckSquare, DollarSign, Clock, Activity, ShieldAlert, Target, Shield, CheckCircle2, Bot, Loader2 } from "lucide-react";

export default function ExecutionDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);

  const fetchDashboard = () => {
    fetch("http://localhost:8000/api/v1/execution/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const handleVerify = async (taskId: string) => {
    setVerifying(taskId);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/execution/${taskId}/verify`, { method: "POST" });
      const result = await res.json();
      if (result.status === "success") {
        // Refresh data to show updated ROI
        fetchDashboard();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setVerifying(null);
    }
  };

  if (loading) {
    return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;
  }

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <CheckSquare className="w-8 h-8 text-emerald-500" /> Execution & ROI
        </h1>
        <p className="text-slate-400">Closed-Loop System: Track AI recommendations through execution to measure business value.</p>
      </div>

      {/* ROI Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <DollarSign className="w-4 h-4 text-emerald-400" /> Maintenance ROI
          </div>
          <p className="text-3xl font-bold text-white mb-1">
            ${data.metrics.total_roi_saved.toLocaleString()}
          </p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Clock className="w-4 h-4 text-indigo-400" /> Downtime Prevented
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.downtime_saved_hours} hrs</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Target className="w-4 h-4 text-rose-400" /> AI Success Rate
          </div>
          <p className="text-3xl font-bold text-white mb-1">{(data.metrics.recommendation_success_rate * 100).toFixed(0)}%</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Activity className="w-4 h-4 text-amber-400" /> Open Tasks
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.open_recommendations}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Plant Scorecard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">Plant Scorecard</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-bold flex items-center gap-2"><Activity className="w-4 h-4 text-emerald-500" /> Reliability Score</span>
                <span className="text-emerald-400">{data.scorecard.reliability_score}/100</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${data.scorecard.reliability_score}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-bold flex items-center gap-2"><Shield className="w-4 h-4 text-indigo-500" /> Safety Score</span>
                <span className="text-indigo-400">{data.scorecard.safety_score}/100</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-indigo-500 h-full rounded-full" style={{ width: `${data.scorecard.safety_score}%` }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-300 font-bold flex items-center gap-2"><Bot className="w-4 h-4 text-amber-500" /> AI Adoption</span>
                <span className="text-amber-400">{data.scorecard.ai_adoption}%</span>
              </div>
              <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: `${data.scorecard.ai_adoption}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Task List */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-6">AI Execution Tracking</h2>
          
          <div className="space-y-4">
            {data.tasks.map((task: any) => (
              <div key={task.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold text-slate-500">{task.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                      task.status === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-400' :
                      task.status === 'EXECUTED' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-800 text-slate-400'
                    }`}>
                      {task.status}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white">{task.title}</h3>
                  <div className="text-xs text-slate-400 mt-2 flex gap-4">
                    <span>Asset: <span className="text-indigo-400">{task.asset}</span></span>
                    <span>Owner: {task.owner}</span>
                    <span>Est ROI: ${task.expected_roi.toLocaleString()}</span>
                  </div>
                </div>
                
                <div>
                  {task.status === 'VERIFIED' ? (
                     <div className="px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-sm font-bold flex items-center gap-2 border border-emerald-500/20">
                       <CheckCircle2 className="w-4 h-4" /> AI Loop Closed
                     </div>
                  ) : task.status === 'EXECUTED' ? (
                    <button 
                      onClick={() => handleVerify(task.id)}
                      disabled={verifying === task.id}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                    >
                      {verifying === task.id ? <Loader2 className="w-4 h-4 animate-spin" /> : "Verify Execution"}
                    </button>
                  ) : (
                     <div className="px-4 py-2 bg-slate-800 text-slate-400 rounded-lg text-sm font-bold">
                       Awaiting Execution
                     </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
