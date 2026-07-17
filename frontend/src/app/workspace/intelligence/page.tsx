"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, ShieldAlert, CheckSquare, Activity, Loader2, ArrowRight } from "lucide-react";

export default function WorkspaceIntelligenceDashboard() {
  const [data, setData] = useState<any>(null);
  const [insights, setInsights] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState(false);
  const [eventResult, setEventResult] = useState<any>(null);

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/api/v1/lessons/tenant/dashboard").then(r => r.json()),
      fetch("http://localhost:8000/api/v1/lessons/tenant/insights").then(r => r.json())
    ]).then(([dashboardData, insightsData]) => {
      setData(dashboardData);
      setInsights(insightsData);
      setLoading(false);
    }).catch(console.error);
  }, []);

  const simulateEvent = async () => {
    setSimulating(true);
    setEventResult(null);
    try {
      const res = await fetch("http://localhost:8000/api/v1/events/trigger", { method: "POST" });
      const responseData = await res.json();
      setEventResult(responseData);
      // Mock refresh data
      if (data && data.metrics) {
        setData({
          ...data,
          metrics: {
            ...data.metrics,
            new_lessons: data.metrics.new_lessons + 1,
            risk_alerts: data.metrics.risk_alerts + 1
          }
        });
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSimulating(false);
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
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Organization Intelligence Dashboard</h1>
          <p className="text-zinc-400">AI-generated operational intelligence, predictive alerts, and preventive recommendations.</p>
        </div>
        <button 
          onClick={simulateEvent}
          disabled={simulating}
          className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg font-bold flex items-center gap-2 transition-colors shadow-lg shadow-rose-900/20"
        >
          {simulating ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShieldAlert className="w-4 h-4" />}
          Simulate Enterprise Event
        </button>
      </div>

      {eventResult && (
        <div className="p-5 bg-rose-500/10 border border-rose-500/30 rounded-xl">
          <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2">
            <CheckSquare className="w-5 h-5" /> Enterprise Event Orchestrated
          </h3>
          <p className="text-zinc-300 text-sm mb-4">{eventResult.orchestration["4_action_taken"]}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-zinc-400 font-mono">
              <span className="text-rose-400 block mb-1">1. Event Triggered:</span>
              {JSON.stringify(eventResult.orchestration["1_event_received"], null, 2)}
            </div>
            <div className="p-3 bg-black/40 rounded border border-white/5 text-xs text-zinc-400 font-mono">
              <span className="text-indigo-400 block mb-1">2. AI Pattern Detected:</span>
              {JSON.stringify(eventResult.orchestration["3_pattern_detected"]["title"], null, 2)}
            </div>
          </div>
        </div>
      )}

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <BookOpen className="w-4 h-4 text-emerald-400" /> New Lessons
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.new_lessons}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <ShieldAlert className="w-4 h-4 text-rose-400" /> Risk Alerts
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.risk_alerts}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <CheckSquare className="w-4 h-4 text-indigo-400" /> Preventive Actions
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.preventive_recommendations}</p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <div className="flex items-center gap-3 text-zinc-400 mb-2 text-sm font-semibold">
            <Activity className="w-4 h-4 text-amber-400" /> Assets at Risk
          </div>
          <p className="text-2xl font-bold text-white">{data?.metrics.assets_at_risk}</p>
        </div>
      </div>

      {/* Today's AI Insights */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-lg font-bold text-white flex items-center gap-2 mb-6">
          Today's AI Insights
        </h2>
        <div className="space-y-4">
          {insights?.insights.map((insight: any, idx: number) => (
            <div key={idx} className="p-4 bg-black/40 rounded-lg border border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                    insight.type === 'Critical Risk' ? 'bg-rose-500/20 text-rose-400' :
                    insight.type === 'Quality Alert' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-indigo-500/20 text-indigo-400'
                  }`}>
                    {insight.type}
                  </span>
                  <span className="text-xs text-zinc-500">{insight.department}</span>
                </div>
                <p className="text-white font-medium">{insight.title}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-zinc-500">{insight.time}</span>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
                  Review
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
