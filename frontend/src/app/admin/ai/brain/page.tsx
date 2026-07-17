"use client";

import React, { useEffect, useState } from "react";
import { Brain, Network, Bot, Activity, Cpu, Play, CheckCircle2, ShieldAlert, FileText, Settings, Loader2 } from "lucide-react";

export default function AIBrainDashboard() {
  const [agents, setAgents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Orchestration State
  const [orchestrating, setOrchestrating] = useState(false);
  const [orchestrationData, setOrchestrationData] = useState<any>(null);
  const [liveStream, setLiveStream] = useState<any[]>([]);
  const [synthesisComplete, setSynthesisComplete] = useState(false);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/brain/agents")
      .then(r => r.json())
      .then(d => {
        setAgents(d.active_agents);
        setLoading(false);
      })
      .catch(console.error);
  }, []);

  const triggerOrchestration = async () => {
    setOrchestrating(true);
    setOrchestrationData(null);
    setLiveStream([]);
    setSynthesisComplete(false);
    
    try {
      const res = await fetch("http://localhost:8000/api/v1/brain/orchestrate", { method: "POST" });
      const data = await res.json();
      setOrchestrationData(data);
      
      // Simulate the stream of parallel agent thoughts
      for (let i = 0; i < data.execution_trace.length; i++) {
        await new Promise(r => setTimeout(r, 1200)); // Dramatic pause between agent actions
        setLiveStream(prev => [...prev, data.execution_trace[i]]);
      }
      
      await new Promise(r => setTimeout(r, 800));
      setSynthesisComplete(true);
      setOrchestrating(false);
      
    } catch (e) {
      console.error(e);
      setOrchestrating(false);
    }
  };

  const getAgentIcon = (name: string) => {
    if (name.includes("Gemini")) return <Brain className="w-5 h-5 text-indigo-400" />;
    if (name.includes("Maintenance")) return <Settings className="w-5 h-5 text-amber-400" />;
    if (name.includes("Knowledge") || name.includes("Document")) return <FileText className="w-5 h-5 text-emerald-400" />;
    if (name.includes("Compliance") || name.includes("Inspection")) return <ShieldAlert className="w-5 h-5 text-rose-400" />;
    return <Bot className="w-5 h-5 text-blue-400" />;
  };

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-indigo-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2 flex items-center gap-3">
            <Network className="w-10 h-10 text-indigo-500" /> Autonomous AI Operations Brain
          </h1>
          <p className="text-slate-400 text-lg">Central Orchestrator & Multi-Agent Ecosystem Controller.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-indigo-500/10 text-indigo-400 rounded-full text-sm font-bold border border-indigo-500/20">
          <Activity className="w-4 h-4" /> System Online
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Agent Ecosystem Sidebar */}
        <div className="lg:col-span-1 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-500" /> Active AI Agents
          </h2>
          <div className="space-y-3">
            {agents.map((agent, i) => (
              <div key={i} className="p-3 bg-slate-950 border border-slate-800 rounded-lg flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {getAgentIcon(agent.name)}
                  <div>
                    <p className="text-xs font-bold text-slate-300">{agent.name}</p>
                    <p className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                      {agent.status}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Master Orchestrator Main Console */}
        <div className="lg:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[700px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-white">Live Multi-Agent Orchestration</h2>
            <button 
              onClick={triggerOrchestration}
              disabled={orchestrating}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
            >
              {orchestrating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              {orchestrating ? "Agents Processing..." : "Simulate Event Processing"}
            </button>
          </div>

          {!orchestrationData && !orchestrating ? (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-800 rounded-xl bg-slate-950/50 p-12 text-center">
              <Network className="w-16 h-16 text-slate-700 mb-6" />
              <h3 className="text-xl font-bold text-slate-400 mb-2">AI Brain Standing By</h3>
              <p className="text-slate-500 max-w-md">
                Click "Simulate Event Processing" to watch the Master Orchestrator receive an event, assign tasks to specialized agents, and synthesize a final decision using Google Gemini.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col space-y-6">
              
              {/* Event Header */}
              {orchestrationData && (
                <div className="p-4 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                  <p className="text-xs font-bold text-rose-400 uppercase tracking-widest mb-1">Incoming Event Detected</p>
                  <p className="text-lg text-white font-medium">{orchestrationData.event_received}</p>
                </div>
              )}

              {/* Agent Stream */}
              <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-4 overflow-y-auto space-y-4">
                {liveStream.map((trace, i) => (
                  <div key={i} className="flex gap-4 animate-in slide-in-from-bottom-4 fade-in duration-500">
                    <div className="mt-1">
                      {getAgentIcon(trace.agent)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-bold text-slate-300">{trace.agent}</span>
                        <span className="text-xs text-slate-500 font-mono">[{trace.action}]</span>
                      </div>
                      <div className={`p-3 rounded-lg text-sm ${
                        trace.agent.includes("Gemini") 
                          ? "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20" 
                          : "bg-slate-900 border border-slate-800 text-slate-400"
                      }`}>
                        {trace.result}
                      </div>
                    </div>
                  </div>
                ))}
                {orchestrating && (
                   <div className="flex gap-4 items-center pl-2 pt-2">
                     <Loader2 className="w-5 h-5 text-slate-500 animate-spin" />
                     <span className="text-slate-500 text-sm font-mono animate-pulse">Waiting for agent consensus...</span>
                   </div>
                )}
              </div>

              {/* Final Synthesis */}
              {synthesisComplete && orchestrationData?.final_decision && (
                <div className="p-6 bg-gradient-to-r from-indigo-900/50 to-slate-900 border border-indigo-500/30 rounded-xl animate-in zoom-in-95 duration-500">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2 text-indigo-400 font-bold">
                      <Brain className="w-6 h-6" /> Final Gemini Synthesis Complete
                    </div>
                    <div className="text-emerald-400 font-bold text-sm bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> {(orchestrationData.final_decision.confidence * 100).toFixed(0)}% Conf
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{orchestrationData.final_decision.action}</h3>
                  <p className="text-slate-300">{orchestrationData.final_decision.recommendation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
