"use client";

import React, { useEffect, useState } from "react";
import { Sparkles, TrendingUp, AlertCircle, FileText, CheckCircle2, UserCircle, Star, Brain, Cpu, Loader2 } from "lucide-react";

export default function KnowledgeEvolutionDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState<string | null>(null);

  const fetchData = () => {
    fetch("http://localhost:8000/api/v1/evolution/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleGenerate = async (gapId: string) => {
    setGenerating(gapId);
    try {
      const res = await fetch(`http://localhost:8000/api/v1/evolution/generate-gap/${gapId}`, { method: "POST" });
      const result = await res.json();
      if (result.status === "success") {
        fetchData();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setGenerating(null), 2000); // Give it a sec to show loading state
    }
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-emerald-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Sparkles className="w-8 h-8 text-amber-500" /> Self-Evolving Knowledge
        </h1>
        <p className="text-slate-400">AI-driven gap detection, health monitoring, and expert contributions.</p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Brain className="w-4 h-4 text-purple-400" /> Knowledge Maturity
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.knowledge_maturity_score}/100</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <TrendingUp className="w-4 h-4 text-emerald-400" /> Growth (YTD)
          </div>
          <p className="text-3xl font-bold text-emerald-400 mb-1">{data.metrics.knowledge_growth_ytd}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <AlertCircle className="w-4 h-4 text-amber-400" /> Active Gaps
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.active_gaps_detected}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Cpu className="w-4 h-4 text-blue-400" /> Auto-Merged Lessons
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.lessons_auto_merged}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Knowledge Gaps */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[550px]">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-amber-500" /> AI Knowledge Gap Detection
          </h2>
          <p className="text-xs text-slate-400 mb-6">Gemini continuously scans historical data and standard operating procedures to find missing intelligence.</p>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.gaps.map((gap: any) => (
              <div key={gap.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-slate-400" />
                    <span className="text-sm font-bold text-white">{gap.type}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                    gap.status === 'GENERATING' ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20' :
                    gap.severity === 'HIGH' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {gap.status === 'GENERATING' ? 'AI DRAFTING...' : gap.severity + ' PRIORITY'}
                  </span>
                </div>
                <p className="text-sm text-slate-400 ml-8 mb-4">{gap.description}</p>
                
                <div className="ml-8">
                  {gap.status === 'GENERATING' ? (
                     <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono bg-indigo-500/10 px-3 py-2 rounded-lg w-fit">
                        <Loader2 className="w-3 h-3 animate-spin" /> Gemini is synthesizing historical data to draft {gap.type}...
                     </div>
                  ) : gap.ai_can_generate ? (
                     <button 
                       onClick={() => handleGenerate(gap.id)}
                       disabled={generating !== null}
                       className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors disabled:opacity-50"
                     >
                       <Sparkles className="w-3 h-3" /> Auto-Generate with Gemini
                     </button>
                  ) : (
                     <span className="text-xs text-slate-500 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Requires manual upload (external dependency)
                     </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Contribution Leaderboard */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500/20" /> Engineering Leaderboard
          </h2>
          <p className="text-xs text-slate-400 mb-6">Top contributors enhancing organizational intelligence.</p>
          
          <div className="space-y-4">
            {data.leaderboard.map((user: any) => (
              <div key={user.rank} className="flex items-center gap-4 p-3 bg-slate-950 border border-slate-800 rounded-lg">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                  user.rank === 1 ? 'bg-amber-500 text-black' :
                  user.rank === 2 ? 'bg-slate-300 text-black' :
                  user.rank === 3 ? 'bg-amber-700 text-white' :
                  'bg-slate-800 text-slate-300'
                }`}>
                  {user.rank}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-bold text-white">{user.name}</h3>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-emerald-400">{user.score}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">Score</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
