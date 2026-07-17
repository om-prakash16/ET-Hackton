"use client";

import React, { useEffect, useState } from "react";
import { Brain, Activity, TrendingUp, Cpu, Network, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";

export default function AIDecisionEngineDashboard() {
  const [learningLoop, setLearningLoop] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Poll the learning loop every 2 seconds to simulate real-time learning in the demo
    const fetchLoop = () => {
      fetch("http://localhost:8000/api/v1/decisions/learning-loop")
        .then(r => r.json())
        .then(data => {
          setLearningLoop(data);
          setLoading(false);
        })
        .catch(console.error);
    };
    
    fetchLoop();
    const intervalId = setInterval(fetchLoop, 2000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Cpu className="w-8 h-8 text-indigo-500" /> AI Decision Engine
          </h1>
          <p className="text-slate-400">Continuous Learning Platform & Human-in-the-Loop Orchestrator.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-bold border border-emerald-500/20">
          <Activity className="w-4 h-4" /> Engine Live
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" /> Recommendation Success
          </div>
          <p className="text-3xl font-bold text-white mb-1">94.2%</p>
          <p className="text-sm text-emerald-400 flex items-center gap-1"><TrendingUp className="w-3 h-3" /> +1.2% this month</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <Brain className="w-5 h-5 text-indigo-400" /> Gemini Prompt Version
          </div>
          <p className="text-3xl font-bold text-white mb-1">v2.1.4</p>
          <p className="text-sm text-slate-500">Auto-tuned 2 hours ago</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <AlertTriangle className="w-5 h-5 text-rose-400" /> Human Corrections
          </div>
          <p className="text-3xl font-bold text-white mb-1">{learningLoop.length}</p>
          <p className="text-sm text-slate-500">Active learning events</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <Network className="w-5 h-5 text-amber-400" /> Autonomous Workflows
          </div>
          <p className="text-3xl font-bold text-white mb-1">1,204</p>
          <p className="text-sm text-emerald-400">Successfully executed</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col">
          <h2 className="text-lg font-bold text-white mb-4">Continuous Learning Loop (Live)</h2>
          {loading ? (
            <div className="flex-1 flex items-center justify-center">
              <Loader2 className="w-6 h-6 text-indigo-500 animate-spin" />
            </div>
          ) : learningLoop.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center border border-dashed border-slate-800 rounded-lg bg-slate-900/50 p-12 text-center">
              <Brain className="w-12 h-12 text-slate-700 mb-4" />
              <p className="text-slate-400 font-medium">Waiting for human feedback...</p>
              <p className="text-sm text-slate-600 mt-2">Go to the Organization Workspace and accept/reject an AI recommendation to trigger the learning loop.</p>
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto max-h-[500px] pr-2">
              {learningLoop.map((event, idx) => (
                <div key={idx} className="bg-slate-950 border border-slate-800 rounded-lg p-4 flex flex-col gap-2">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                        event.action === 'ACCEPTED' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                      }`}>
                        {event.action}
                      </span>
                      <span className="text-slate-300 text-sm font-medium">Recommendation {event.recommendation_id}</span>
                    </div>
                    <span className="text-slate-500 text-xs">{event.timestamp}</span>
                  </div>
                  <div className="bg-slate-900 p-3 rounded border border-slate-800 text-xs font-mono text-zinc-400">
                    <p><span className="text-indigo-400">Prompt Model:</span> {event.prompt_version}</p>
                    <p><span className="text-amber-400">Confidence:</span> {(event.confidence * 100).toFixed(1)}%</p>
                    <p className="mt-2 text-emerald-400">&gt; {event.impact}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Prompt Optimization</h2>
          <div className="h-48 border border-slate-800 border-dashed rounded-lg flex items-center justify-center mb-6">
             <p className="text-slate-600">Model Fine-tuning Chart</p>
          </div>
          <div className="space-y-4">
            <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-lg">
              <h4 className="text-sm font-bold text-indigo-400 mb-1">Knowledge Evolution</h4>
              <p className="text-xs text-slate-400">2 Old lessons successfully merged with new incident data today.</p>
            </div>
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <h4 className="text-sm font-bold text-emerald-400 mb-1">Multi-Plant Sync</h4>
              <p className="text-xs text-slate-400">Pattern #442 synchronized across 4 related manufacturing plants.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
