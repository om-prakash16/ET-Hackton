"use client";

import React, { useEffect, useState } from "react";
import { Shield, CheckCircle, AlertTriangle, Search, Clock, FileText, Brain, Cpu, Database, ChevronRight, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TrustCenterDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedDecision, setSelectedDecision] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/trust/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  if (loading) {
    return <div className="p-12 flex justify-center"><Cpu className="w-8 h-8 text-blue-500 animate-pulse" /></div>;
  }

  const explainer = data?.recent_decisions?.find((d: any) => d.id === selectedDecision);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-500" /> AI Trust Center
        </h1>
        <p className="text-slate-400">Explainable AI Governance, Audit Logs, and Decision Transparency.</p>
      </div>

      {/* Top Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <CheckCircle className="w-4 h-4 text-emerald-400" /> Avg Confidence
          </div>
          <p className="text-3xl font-bold text-white mb-1">{(data.metrics.average_confidence * 100).toFixed(1)}%</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-rose-400" /> Hallucination Alerts
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.hallucination_alerts}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Database className="w-4 h-4 text-indigo-400" /> Decisions Audited
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.decisions_audited.toLocaleString()}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Brain className="w-4 h-4 text-amber-400" /> Active Prompt
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.active_prompt_version}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Decision List */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[600px]">
          <h2 className="text-lg font-bold text-white mb-4">Recent AI Decisions</h2>
          <div className="flex-1 overflow-y-auto space-y-3 pr-2">
            {data.recent_decisions.map((decision: any) => (
              <div 
                key={decision.id} 
                onClick={() => setSelectedDecision(decision.id)}
                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                  selectedDecision === decision.id 
                    ? "bg-blue-500/10 border-blue-500/30" 
                    : "bg-slate-950 border-slate-800 hover:border-slate-600"
                }`}
              >
                <div className="flex justify-between items-start mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {decision.type}
                  </span>
                  {decision.hallucination_flag && (
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-rose-500/20 text-rose-400">
                      Flagged
                    </span>
                  )}
                </div>
                <h3 className="text-sm font-bold text-white mb-2">{decision.title}</h3>
                <div className="flex justify-between items-center text-xs text-slate-500">
                  <span>Conf: {(decision.confidence * 100).toFixed(0)}%</span>
                  <span>{decision.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Decision Explainer */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          {explainer ? (
            <div className="space-y-6 h-full flex flex-col">
              <div className="flex justify-between items-start border-b border-slate-800 pb-4">
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">{explainer.title}</h2>
                  <p className="text-slate-400 text-sm">Decision ID: {explainer.id}</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-emerald-400">
                    {(explainer.confidence * 100).toFixed(0)}%
                  </div>
                  <p className="text-xs text-slate-500">AI Confidence Score</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                 <div className="p-3 bg-black/40 border border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Model Trace</p>
                    <p className="text-sm text-indigo-400 font-mono font-bold">{explainer.model}</p>
                 </div>
                 <div className="p-3 bg-black/40 border border-slate-800 rounded-lg">
                    <p className="text-xs text-slate-500 mb-1">Prompt Template</p>
                    <p className="text-sm text-amber-400 font-mono font-bold">{explainer.prompt_version}</p>
                 </div>
              </div>

              {explainer.hallucination_flag && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-rose-400 mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-sm font-bold text-rose-400 mb-1">Automated Hallucination Detection</h4>
                    <p className="text-xs text-slate-300">{explainer.hallucination_reason}</p>
                  </div>
                </div>
              )}

              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2">
                  <Brain className="w-4 h-4 text-blue-400" /> Why did AI recommend this?
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed p-4 bg-slate-950 border border-slate-800 rounded-lg">
                  {explainer.reasoning}
                </p>
              </div>

              <div className="flex-1">
                <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-emerald-400" /> Supporting Citations & Evidence
                </h3>
                {explainer.citations.length > 0 ? (
                  <div className="space-y-2">
                    {explainer.citations.map((cite: any, i: number) => (
                      <div key={i} className="flex justify-between items-center p-3 bg-slate-950 border border-slate-800 rounded-lg">
                        <div className="flex items-center gap-3">
                          <CheckSquare className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-slate-300 font-medium">{cite.source}</span>
                        </div>
                        <div className="flex items-center gap-4 text-xs text-slate-500">
                          <span>Page {cite.page}</span>
                          <span className="bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-bold">{cite.relevance}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-4 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-500 text-center">
                    No citations provided by the AI model.
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-500">
              <Search className="w-12 h-12 mb-4 opacity-50" />
              <p>Select a decision to view its explainability trace.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
