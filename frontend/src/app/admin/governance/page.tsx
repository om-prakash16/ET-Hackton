"use client";

import React, { useEffect, useState } from "react";
import { ShieldCheck, Activity, Brain, Server, Lock, AlertTriangle, FileText, CheckCircle2, History, Bot, Loader2, ArrowRight } from "lucide-react";

export default function EnterpriseGovernanceDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/governance/dashboard")
      .then(r => r.json())
      .then(dashData => {
        fetch("http://localhost:8000/api/v1/governance/lifecycle")
          .then(r => r.json())
          .then(lifeData => {
            setData({ ...dashData, lifecycle: lifeData.versions });
            setLoading(false);
          });
      })
      .catch(console.error);
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-blue-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
          <ShieldCheck className="w-8 h-8 text-blue-500" /> Enterprise Governance
        </h1>
        <p className="text-slate-400">Production Operations, Knowledge Lifecycle, and Security Compliance.</p>
      </div>

      {/* System Health */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Activity className="w-4 h-4 text-emerald-400" /> System Uptime
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.system_uptime}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <Bot className="w-4 h-4 text-indigo-400" /> API Health
          </div>
          <p className="text-3xl font-bold text-emerald-400 mb-1">{data.metrics.gemini_api_health}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 text-amber-400" /> Active Security Alerts
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.active_security_alerts}</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold text-sm">
            <FileText className="w-4 h-4 text-blue-400" /> Pending Approvals
          </div>
          <p className="text-3xl font-bold text-white mb-1">{data.metrics.pending_knowledge_approvals}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Knowledge Lifecycle Manager */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-500" /> Knowledge Versioning & Lifecycle
            </h2>
          </div>
          
          <div className="space-y-4">
            {data.lifecycle.map((item: any, i: number) => (
              <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-xs font-mono text-slate-500 mr-2">{item.knowledge_id}</span>
                    <span className="text-indigo-400 font-bold text-sm">{item.version}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide uppercase ${
                    item.state === 'PUBLISHED' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    item.state === 'ARCHIVED' ? 'bg-slate-800 text-slate-400' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {item.state}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-white mb-3">{item.title}</h3>
                
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-semibold">Author</span>
                    <span>{item.author}</span>
                  </div>
                  <ArrowRight className="w-3 h-3 text-slate-700 mt-3" />
                  <div className="flex flex-col gap-1">
                    <span className="text-slate-600 font-semibold">Approver</span>
                    <span>{item.approver}</span>
                  </div>
                  <div className="ml-auto text-[10px] mt-4">{item.updated_at}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          {/* AI Model Governance */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Brain className="w-5 h-5 text-purple-500" /> AI Model Governance
            </h2>
            <div className="space-y-4">
              {data.ai_model_governance.map((model: any, i: number) => (
                <div key={i} className="p-4 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-sm font-bold text-white">{model.model}</h3>
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                    </div>
                    <p className="text-xs text-slate-500">{model.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-mono text-indigo-400">{model.monthly_tokens} Tokens</p>
                    <p className="text-xs text-slate-500 mt-1">{model.latency_ms}ms avg latency</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance & Security */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Lock className="w-5 h-5 text-emerald-500" /> Security & Compliance
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(data.compliance_status).map(([key, value]) => (
                <div key={key} className="p-3 bg-slate-950 border border-slate-800 rounded-lg">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-1">{key.replace(/_/g, ' ')}</p>
                  <div className="flex items-center gap-2">
                    {value === 'VERIFIED' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                    <span className={`text-sm font-bold ${value === 'VERIFIED' ? 'text-emerald-400' : 'text-blue-400'}`}>
                      {value as string}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
