"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Share2, Network, Link as LinkIcon, AlertTriangle, CheckCircle2, GitMerge, FileText, Database, Settings, Search, Users, ShieldAlert, Cpu, Download, Box, Key, Activity, HeartPulse } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "graph" | "resolution" | "ontology";

export default function KnowledgeGraphPage() {
  const [activeTab, setActiveTab] = useState<Tab>("graph");

  const KPIS = [
    { title: "Total Nodes", value: "4.2M", icon: Box, color: "blue" },
    { title: "Relationships", value: "12.8M", icon: LinkIcon, color: "purple" },
    { title: "Graph Health", value: "98.5%", icon: HeartPulse, color: "emerald" },
    { title: "Orphan Nodes", value: "1,420", icon: AlertTriangle, color: "amber" },
  ];

  const MOCK_ORPHANS = [
    { id: "NODE-891", name: "Pump P101", type: "Asset", confidence: 94, duplicateOf: "P-101" },
    { id: "NODE-892", name: "Valve V-42", type: "Component", confidence: 88, duplicateOf: "V42_Main" },
    { id: "NODE-893", name: "Maintenance Team Alpha", type: "Department", confidence: 99, duplicateOf: "Team Alpha (Maint)" },
    { id: "NODE-894", name: "SOP-101-RevB", type: "Document", confidence: 75, duplicateOf: "Standard Operating Procedure 101" },
  ];

  return (
    <AdminPageTemplate
      title="Industrial Knowledge Graph"
      description="The central intelligence layer. Every asset, incident, engineer, and document is connected into a unified web of context for AI reasoning."
      headerIcon={Share2}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Graph Settings
          </Button>
          <Button className="bg-purple-600 hover:bg-purple-700 text-white font-bold border-none shadow-lg shadow-purple-500/20">
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Vector DB
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
            {kpi.title === "Graph Health" && (
              <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: "98.5%" }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveTab("graph")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "graph" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Network className="w-4 h-4" /> Interactive Graph
        </button>
        <button
          onClick={() => setActiveTab("resolution")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "resolution" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <GitMerge className="w-4 h-4" /> Entity Resolution
        </button>
        <button
          onClick={() => setActiveTab("ontology")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "ontology" 
              ? "border-purple-500 text-purple-400 bg-purple-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Database className="w-4 h-4" /> Ontology Manager
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "graph" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[700px] animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 bg-zinc-950/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search Asset, Incident, SOP..." 
                  defaultValue="Pump P-101"
                  className="w-full sm:w-80 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                  Depth: 3 Hops
                </Button>
                <Button size="sm" className="bg-zinc-800 hover:bg-zinc-700 text-white h-9">
                  <Download className="w-4 h-4 mr-2" /> Export Graph
                </Button>
              </div>
            </div>
            
            <div className="flex-1 bg-[#0a0f1d] relative overflow-hidden flex">
              {/* Simulated Graph Canvas */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
              
              <div className="w-full h-full relative z-10">
                {/* Central Node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 group cursor-pointer">
                  <div className="w-16 h-16 rounded-full bg-blue-600 border-4 border-blue-900 flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] group-hover:scale-110 transition-transform">
                    <Box className="w-7 h-7 text-white" />
                  </div>
                  <div className="mt-3 bg-zinc-900 border border-zinc-700 px-3 py-1.5 rounded-lg shadow-xl text-center">
                    <p className="text-white font-bold text-sm">Pump P-101</p>
                    <p className="text-blue-400 text-[10px] uppercase font-mono tracking-wider">Asset Node</p>
                  </div>
                </div>

                {/* SVG Connections (Simulated for visual effect) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                  <path d="M 50% 50% L 30% 20%" stroke="rgba(168, 85, 247, 0.4)" strokeWidth="2" strokeDasharray="5,5" fill="none" className="animate-pulse" />
                  <path d="M 50% 50% L 75% 25%" stroke="rgba(16, 185, 129, 0.4)" strokeWidth="2" fill="none" />
                  <path d="M 50% 50% L 20% 60%" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="2" fill="none" />
                  <path d="M 50% 50% L 70% 75%" stroke="rgba(59, 130, 246, 0.4)" strokeWidth="2" fill="none" />
                  <path d="M 50% 50% L 50% 85%" stroke="rgba(239, 68, 68, 0.4)" strokeWidth="2" fill="none" />
                </svg>

                {/* Connected Node 1 (Location) */}
                <div className="absolute top-[20%] left-[30%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="bg-purple-900/80 px-2 py-0.5 rounded text-[10px] text-purple-200 mb-1 absolute -top-5 whitespace-nowrap">Installed In</div>
                  <div className="w-12 h-12 rounded-full bg-purple-600/20 border-2 border-purple-500 flex items-center justify-center">
                    <Database className="w-5 h-5 text-purple-400" />
                  </div>
                  <p className="text-white font-semibold text-xs mt-2">Boiler Room B</p>
                </div>

                {/* Connected Node 2 (Maintenance) */}
                <div className="absolute top-[25%] left-[75%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="bg-emerald-900/80 px-2 py-0.5 rounded text-[10px] text-emerald-200 mb-1 absolute -top-5 whitespace-nowrap">Maintained By</div>
                  <div className="w-12 h-12 rounded-full bg-emerald-600/20 border-2 border-emerald-500 flex items-center justify-center">
                    <Users className="w-5 h-5 text-emerald-400" />
                  </div>
                  <p className="text-white font-semibold text-xs mt-2">Team Alpha</p>
                </div>

                {/* Connected Node 3 (Document) */}
                <div className="absolute top-[60%] left-[20%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="bg-amber-900/80 px-2 py-0.5 rounded text-[10px] text-amber-200 mb-1 absolute -top-5 whitespace-nowrap">Referenced By</div>
                  <div className="w-12 h-12 rounded-full bg-amber-600/20 border-2 border-amber-500 flex items-center justify-center">
                    <FileText className="w-5 h-5 text-amber-400" />
                  </div>
                  <p className="text-white font-semibold text-xs mt-2">OEM Manual v2</p>
                </div>

                {/* Connected Node 4 (Vendor) */}
                <div className="absolute top-[75%] left-[70%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="bg-blue-900/80 px-2 py-0.5 rounded text-[10px] text-blue-200 mb-1 absolute -top-5 whitespace-nowrap">Manufactured By</div>
                  <div className="w-12 h-12 rounded-full bg-blue-600/20 border-2 border-blue-500 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-blue-400" />
                  </div>
                  <p className="text-white font-semibold text-xs mt-2">FlowTech Ind.</p>
                </div>

                {/* Connected Node 5 (Incident) */}
                <div className="absolute top-[85%] left-[50%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 cursor-pointer hover:scale-105 transition-transform">
                  <div className="bg-red-900/80 px-2 py-0.5 rounded text-[10px] text-red-200 mb-1 absolute -top-5 whitespace-nowrap">Failed During</div>
                  <div className="w-12 h-12 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_15px_rgba(239,68,68,0.3)]">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-white font-semibold text-xs mt-2">Incident #145</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "resolution" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-sm">Entity Merge Review</h3>
                  <p className="text-xs text-zinc-500">The AI has detected potential duplicate nodes in the graph. Review and merge to canonical IDs.</p>
                </div>
              </div>
              <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white h-9">
                Auto-Merge All {'>'} 95% Confidence
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Detected Node</th>
                    <th className="px-6 py-4 font-semibold">Node Type</th>
                    <th className="px-6 py-4 font-semibold">Suggested Canonical Merge</th>
                    <th className="px-6 py-4 font-semibold">AI Confidence</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_ORPHANS.map((node) => (
                    <tr key={node.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4 font-medium text-white">{node.name}</td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-zinc-700 text-zinc-400 bg-zinc-800">
                          {node.type}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <LinkIcon className="w-3.5 h-3.5 text-purple-400" />
                          <span className="font-mono text-purple-300">{node.duplicateOf}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`font-mono font-bold ${node.confidence > 90 ? 'text-emerald-400' : 'text-amber-400'}`}>
                          {node.confidence}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs border-zinc-700 text-zinc-400 hover:text-white hover:bg-zinc-800">
                            Reject
                          </Button>
                          <Button size="sm" className="h-7 text-xs bg-purple-600 hover:bg-purple-700 text-white">
                            Approve Merge
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "ontology" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Node Types (Ontology)</h3>
              <p className="text-sm text-zinc-400 mb-6">Manage the foundational schema of the industrial graph.</p>
              
              <div className="flex flex-wrap gap-2">
                {["Asset", "Equipment", "Incident", "Inspection", "Work Order", "Engineer", "Department", "Plant", "SOP", "P&ID", "Compliance Rule", "Vendor", "Motor", "Valve", "Tank"].map(v => (
                  <Badge key={v} variant="outline" className="bg-zinc-950 border-zinc-700 text-zinc-300 px-3 py-1">
                    {v}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full border-dashed border-zinc-700 text-zinc-400 hover:text-white">
                + Add Node Type
              </Button>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Relationship Types (Edges)</h3>
              <p className="text-sm text-zinc-400 mb-6">Define how nodes connect to form intelligence.</p>
              
              <div className="flex flex-wrap gap-2">
                {["Installed In", "Located In", "Maintained By", "Operated By", "Reported By", "References", "Depends On", "Uses Part", "Caused", "Resolved By", "Complies With"].map(v => (
                  <Badge key={v} className="bg-purple-500/10 text-purple-300 border-none px-3 py-1">
                    <LinkIcon className="w-3 h-3 mr-1.5 inline-block"/>
                    {v}
                  </Badge>
                ))}
              </div>
              <Button variant="outline" className="mt-6 w-full border-dashed border-purple-500/30 text-purple-400 hover:text-purple-300">
                + Add Relationship Edge
              </Button>
            </div>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}

// Ensure icon imports
import { RefreshCw, Building2 } from "lucide-react";
