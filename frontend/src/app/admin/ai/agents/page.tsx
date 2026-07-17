"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Bot, Play, Pause, RefreshCw, StopCircle, Settings, Network, AlertTriangle, FileText, CheckCircle2, Search, Filter, ShieldAlert, Cpu, Share2, ServerCog, Activity, Clock, Layers, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "registry" | "workflows" | "queue" | "analytics";

export default function AIAgentsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("registry");

  const KPIS = [
    { title: "Total Agents", value: "15", icon: Bot, color: "blue" },
    { title: "Running Agents", value: "12", icon: Play, color: "emerald" },
    { title: "Paused/Failed", value: "3", icon: AlertTriangle, color: "amber" },
    { title: "Tasks Today", value: "84.2K", icon: Activity, color: "purple" },
  ];

  const MOCK_AGENTS = [
    { id: "AGT-001", name: "AI Copilot Agent", category: "Knowledge", model: "Gemini 1.5 Pro", mode: "Manual/Event", status: "Running", tasks: "12.4K", memory: "Context Window" },
    { id: "AGT-002", name: "Document Intelligence", category: "Analytics", model: "Gemini 1.5 Flash", mode: "Event Driven", status: "Running", tasks: "45.1K", memory: "Task Memory" },
    { id: "AGT-003", name: "OCR Agent", category: "Automation", model: "Gemini 1.5 Flash", mode: "Event Driven", status: "Running", tasks: "89K", memory: "Stateless" },
    { id: "AGT-004", name: "Knowledge Graph", category: "Search", model: "Gemini 1.5 Pro", mode: "Event Driven", status: "Running", tasks: "8.2K", memory: "Shared Graph" },
    { id: "AGT-005", name: "Root Cause Analysis", category: "Engineering", model: "Gemini 1.5 Pro", mode: "Scheduled", status: "Paused", tasks: "142", memory: "Long Term" },
    { id: "AGT-006", name: "Maintenance Intelligence", category: "Engineering", model: "Gemini 1.5 Pro", mode: "Event Driven", status: "Failed", tasks: "890", memory: "Task Memory" },
    { id: "AGT-007", name: "Compliance Agent", category: "Quality", model: "Gemini 1.5 Pro", mode: "Manual", status: "Running", tasks: "420", memory: "Long Term" },
  ];

  const WORKFLOWS = [
    { name: "Document Ingestion Pipeline", trigger: "Document Uploaded", agents: ["OCR Agent", "Document Intelligence", "Knowledge Graph", "Search Agent"], status: "Active" },
    { name: "Incident Response", trigger: "Incident Created", agents: ["Incident Intelligence", "Compliance Agent", "Notification Agent"], status: "Active" },
    { name: "Maintenance Analysis", trigger: "Work Order Completed", agents: ["Maintenance Intelligence", "RCA Agent", "Lessons Learned"], status: "Paused" },
  ];

  return (
    <AdminPageTemplate
      title="AI Agents Orchestration"
      description="Manage the enterprise multi-agent swarm. Coordinate independent AI agents that automate workflows through event-driven architectures."
      headerIcon={Bot}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Restart Swarm
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-none shadow-lg shadow-purple-500/20">
            <ServerCog className="w-4 h-4 mr-2" />
            Create Agent
          </Button>
        </div>
      }
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-in fade-in duration-300">
        {KPIS.map((kpi, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className={`absolute top-0 right-0 w-20 h-20 bg-${kpi.color}-500/5 rounded-bl-full -mr-2 -mt-2 transition-transform group-hover:scale-110`} />
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveTab("registry")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "registry" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Bot className="w-4 h-4" /> Agent Registry
        </button>
        <button
          onClick={() => setActiveTab("workflows")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "workflows" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Network className="w-4 h-4" /> Workflows
        </button>
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "queue" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Layers className="w-4 h-4" /> Task Queues
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "registry" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search agents..." 
                  className="w-full sm:w-64 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                  <Filter className="w-4 h-4 mr-2" /> Filter
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Agent Details</th>
                    <th className="px-6 py-4 font-semibold">LLM Assignment</th>
                    <th className="px-6 py-4 font-semibold">Memory Type</th>
                    <th className="px-6 py-4 font-semibold">Execution</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_AGENTS.map((agent) => (
                    <tr key={agent.id} className="hover:bg-zinc-800/30 transition-colors group cursor-pointer">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-purple-400">
                            <Bot className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-purple-400 transition-colors">{agent.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-zinc-500 font-mono">{agent.id}</span>
                              <span className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{agent.category}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-blue-400">{agent.model}</td>
                      <td className="px-6 py-4 text-zinc-400">{agent.memory}</td>
                      <td className="px-6 py-4 text-zinc-400">{agent.mode}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`border-none ${
                            agent.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400' : 
                            agent.status === 'Failed' ? 'bg-red-500/10 text-red-400' : 
                            'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {agent.status === 'Running' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>}
                            {agent.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {agent.status === 'Running' ? (
                            <button className="p-1.5 text-zinc-400 hover:text-amber-400 hover:bg-zinc-800 rounded-md transition-colors" title="Pause Agent">
                              <Pause className="w-4 h-4" />
                            </button>
                          ) : (
                            <button className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-md transition-colors" title="Start Agent">
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Configure">
                            <Settings className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "workflows" && (
          <div className="grid grid-cols-1 gap-4 animate-in fade-in duration-300">
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-4">
              <Share2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-white text-sm">Agent Orchestration Engine</h3>
                <p className="text-xs text-zinc-400 mt-1">
                  Agents never call each other directly. They communicate via event queues and shared knowledge graphs to ensure robust, decoupled automation.
                </p>
              </div>
            </div>

            {WORKFLOWS.map((wf, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden group hover:border-zinc-700 transition-colors">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white">{wf.name}</h3>
                    <p className="text-sm text-zinc-400 mt-1 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-amber-400" /> Trigger: <span className="font-mono text-white">{wf.trigger}</span>
                    </p>
                  </div>
                  <Badge className={`border-none ${wf.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
                    {wf.status}
                  </Badge>
                </div>

                <div className="flex items-center flex-wrap gap-2">
                  {wf.agents.map((agent, agentIdx) => (
                    <React.Fragment key={agentIdx}>
                      <div className="bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 flex items-center gap-2">
                        <Bot className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-semibold text-zinc-300">{agent}</span>
                      </div>
                      {agentIdx < wf.agents.length - 1 && (
                        <div className="w-8 h-px bg-zinc-700 relative">
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1.5 h-1.5 border-t border-r border-zinc-500 rotate-45"></div>
                        </div>
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "queue" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <Layers className="w-16 h-16 text-zinc-800 mb-4" />
             <h2 className="text-xl font-bold text-white">Distributed Task Queues</h2>
             <p className="text-zinc-500 mt-2 max-w-sm text-sm">Real-time view of Pending, Running, and Failed tasks executed by the AI swarm will appear here.</p>
             <Button variant="outline" className="mt-6 bg-zinc-900 border-zinc-700 text-white">
               View Retry DLQ
             </Button>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}
