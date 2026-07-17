"use client";

import React, { useEffect, useState } from "react";
import { Network, Bot, User, CheckCircle2, AlertTriangle, Calendar, Settings, Activity, BrainCircuit, Loader2, Workflow, Clock } from "lucide-react";

export default function FabricDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/fabric/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Network className="w-8 h-8 text-indigo-500" /> Industrial Intelligence Fabric
          </h1>
          <p className="text-slate-400">The central nervous system orchestrating Human Engineers, AI Agents, and Enterprise Operations.</p>
        </div>
        
        <div className="flex items-center gap-3 px-4 py-2 bg-slate-900 border border-slate-800 rounded-lg">
          <BrainCircuit className="w-5 h-5 text-fuchsia-500 animate-pulse" />
          <span className="text-sm font-bold text-white">Gemini Master Orchestrator: <span className="text-emerald-400">ONLINE</span></span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Digital Workforce */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[600px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-indigo-500" /> Hybrid Digital Workforce
            </h2>
            <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded-full font-mono">{data.workforce.length} Active Nodes</span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.workforce.map((member: any) => (
              <div key={member.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg group hover:border-indigo-500/50 transition-colors relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-1 h-full ${
                  member.type === 'AI_AGENT' ? 'bg-fuchsia-500' : 'bg-blue-500'
                }`} />
                
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
                      member.type === 'AI_AGENT' ? 'bg-fuchsia-500/10' : 'bg-blue-500/10'
                    }`}>
                      {member.type === 'AI_AGENT' ? 
                        <Bot className="w-5 h-5 text-fuchsia-400" /> : 
                        <User className="w-5 h-5 text-blue-400" />}
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white">{member.name}</h3>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">{member.id} | {member.type}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded tracking-wider">
                    {member.status}
                  </span>
                </div>
                
                <div className="bg-slate-900 rounded p-3 text-xs text-slate-300 flex items-start gap-2 border border-slate-800">
                  <Activity className="w-4 h-4 text-slate-500 shrink-0" />
                  <p><span className="font-bold text-slate-400">Current Task:</span> {member.current_task}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Operations Calendar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[600px]">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-500" /> AI Operations Planning
          </h2>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-800 before:to-transparent">
            {data.operations_plan.map((plan: any, idx: number) => (
              <div key={plan.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-slate-800 bg-slate-900 text-slate-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10">
                  {plan.type === 'MAINTENANCE' ? <Settings className="w-4 h-4 text-amber-500" /> : <CheckCircle2 className="w-4 h-4 text-blue-500" />}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-slate-800 bg-slate-950 shadow">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{plan.scheduled_date}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      plan.status === 'EXECUTING' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
                    }`}>{plan.status}</span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1">{plan.title}</h3>
                  <p className="text-xs text-slate-400 mb-3 leading-relaxed">{plan.trigger}</p>
                  
                  <div className="flex justify-between items-center pt-3 border-t border-slate-800">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <BrainCircuit className="w-3 h-3 text-fuchsia-500" /> {plan.generated_by}
                    </span>
                    {plan.human_approval_required ? (
                      <span className="text-[10px] font-bold text-rose-400 flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> Approval Reqd</span>
                    ) : (
                      <span className="text-[10px] font-bold text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Auto-Approved</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>

      </div>
    </div>
  );
}
