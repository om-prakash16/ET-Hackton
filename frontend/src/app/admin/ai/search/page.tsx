"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Search, Globe, Zap, Library, SlidersHorizontal, Settings, FileText, BarChart2, ShieldAlert, Cpu, Activity, AlertTriangle, CheckCircle2, RefreshCw, Box, Link2, Key, ListFilter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "simulator" | "analytics" | "settings";

export default function SearchEnginePage() {
  const [activeTab, setActiveTab] = useState<Tab>("simulator");

  const KPIS = [
    { title: "Indexed Documents", value: "2.4M", icon: Library, color: "blue" },
    { title: "Searches Today", value: "142K", icon: Search, color: "emerald" },
    { title: "Avg Search Time", value: "48ms", icon: Zap, color: "purple" },
    { title: "Zero Result Queries", value: "0.4%", icon: ShieldAlert, color: "amber" },
  ];

  const [searchQuery, setSearchQuery] = useState("Show pump failures in 2024");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <AdminPageTemplate
      title="Global Search Engine"
      description="The unified intelligence layer. Configure keyword, semantic, and knowledge graph search settings to power discovery across the entire industrial platform."
      headerIcon={Globe}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Force Global Reindex
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20">
            <Settings className="w-4 h-4 mr-2" />
            Save Configuration
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
          onClick={() => setActiveTab("simulator")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "simulator" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Search className="w-4 h-4" /> Global Search Simulator
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "settings" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <SlidersHorizontal className="w-4 h-4" /> Hybrid Search Ranking
        </button>
        <button
          onClick={() => setActiveTab("analytics")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "analytics" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <BarChart2 className="w-4 h-4" /> Search Analytics
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "simulator" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            {/* Search Bar Area */}
            <div className="p-6 border-b border-zinc-800 bg-zinc-950/50 flex flex-col items-center justify-center">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Test Natural Language Hybrid Search
              </h3>
              
              <div className="relative w-full max-w-3xl flex">
                <Search className="w-5 h-5 text-zinc-500 absolute left-4 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-l-lg pl-12 pr-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors shadow-inner"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                />
                <Button 
                  className="rounded-l-none bg-blue-600 hover:bg-blue-700 px-8"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
              <div className="flex items-center gap-3 mt-4 text-xs">
                <Badge variant="outline" className="border-emerald-500/30 text-emerald-400">Semantic Active</Badge>
                <Badge variant="outline" className="border-purple-500/30 text-purple-400">Knowledge Graph Active</Badge>
                <Badge variant="outline" className="border-amber-500/30 text-amber-400">Keyword Active</Badge>
              </div>
            </div>
            
            {/* Results Area */}
            <div className="p-6 bg-[#0a0f1d] min-h-[400px]">
              {!hasSearched ? (
                <div className="h-full flex flex-col items-center justify-center text-zinc-500 mt-20">
                  <Search className="w-12 h-12 mb-3 opacity-20" />
                  <p className="text-sm">Run a query to test how Hybrid Search ranks multi-modal documents.</p>
                </div>
              ) : (
                <div className="max-w-4xl mx-auto space-y-4">
                  <div className="flex items-center justify-between text-sm text-zinc-400 mb-6">
                    <p>About 3 results (48ms)</p>
                    <div className="flex items-center gap-2">
                      <ListFilter className="w-4 h-4" />
                      <span>Sorted by: Relevance (Hybrid Score)</span>
                    </div>
                  </div>

                  {/* Result 1: Knowledge Graph Node */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <Box className="w-5 h-5 text-purple-400" />
                        <h4 className="text-lg font-bold text-blue-400 hover:underline cursor-pointer">Pump P-101 (Asset Node)</h4>
                      </div>
                      <Badge className="bg-purple-500/10 text-purple-400 border-none">Score: 98 (Graph Match)</Badge>
                    </div>
                    <p className="text-sm text-emerald-500 mb-2">kg://assets/p-101 • ABC Steel • Boiler Room</p>
                    <p className="text-sm text-zinc-300">
                      Primary cooling water <span className="font-bold text-white">pump</span>. Recorded 3 <span className="font-bold text-white">failures in 2024</span> due to bearing degradation. Currently maintained by Team Alpha.
                    </p>
                    <div className="flex gap-2 mt-4">
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">3 Incidents Linked</Badge>
                      <Badge variant="outline" className="border-zinc-700 text-zinc-400 text-xs">OEM Manual Linked</Badge>
                    </div>
                  </div>

                  {/* Result 2: Incident Report (Semantic Match) */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-400" />
                        <h4 className="text-lg font-bold text-blue-400 hover:underline cursor-pointer">Incident Report: P-101 Cavitation</h4>
                      </div>
                      <Badge className="bg-emerald-500/10 text-emerald-400 border-none">Score: 92 (Semantic Match)</Badge>
                    </div>
                    <p className="text-sm text-emerald-500 mb-2">doc://incidents/INC-2024-08 • PDF • Oct 12, 2024</p>
                    <p className="text-sm text-zinc-300">
                      RCA indicates that the <span className="font-bold text-white">pump failure</span> was caused by restricted flow in the suction line leading to cavitation. Recommending quarterly vibration analysis...
                    </p>
                  </div>

                  {/* Result 3: Maintenance Log (Keyword Match) */}
                  <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-5 hover:border-zinc-700 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-amber-400" />
                        <h4 className="text-lg font-bold text-blue-400 hover:underline cursor-pointer">Maintenance_Log_2024_Q1.xlsx</h4>
                      </div>
                      <Badge className="bg-amber-500/10 text-amber-400 border-none">Score: 85 (Keyword Match)</Badge>
                    </div>
                    <p className="text-sm text-emerald-500 mb-2">doc://maintenance/Q1-2024 • Excel • Jan 15, 2024</p>
                    <p className="text-sm text-zinc-300">
                      ...routine inspection of <span className="font-bold text-white">Pump</span> P-101. Found minor seal leak. No immediate <span className="font-bold text-white">failures</span> anticipated for <span className="font-bold text-white">2024</span> operations...
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Hybrid Ranking Factors</h3>
              <p className="text-sm text-zinc-400 mb-6">Adjust the weights for how Search Engine scores are calculated when users execute global searches.</p>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Semantic Similarity (Vector DB)</span>
                    <span className="text-emerald-400 font-mono">60%</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="0" max="100" defaultValue="60" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Keyword Match (BM25)</span>
                    <span className="text-amber-400 font-mono">20%</span>
                  </div>
                  <input type="range" className="w-full accent-amber-500" min="0" max="100" defaultValue="20" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Knowledge Graph Proximity</span>
                    <span className="text-purple-400 font-mono">20%</span>
                  </div>
                  <input type="range" className="w-full accent-purple-500" min="0" max="100" defaultValue="20" />
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Key className="w-5 h-5 text-blue-400" />
                Dictionaries & Modifiers
              </h3>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-white">Synonym Dictionary</h4>
                    <Button variant="link" className="text-blue-400 h-auto p-0 text-xs">Edit Rules</Button>
                  </div>
                  <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs font-mono text-zinc-400 space-y-1">
                    <div>"Motor" → ["Engine", "Drive"]</div>
                    <div>"Pump" → ["Pumping Unit", "Compressor"]</div>
                    <div>"Inspection" → ["Audit", "Check"]</div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="text-sm font-semibold text-white">Search Boosters</h4>
                  </div>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900" defaultChecked />
                      <span className="text-sm text-zinc-300">Boost Recent Documents (Last 30 Days)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900" defaultChecked />
                      <span className="text-sm text-zinc-300">Boost Critical Assets (Knowledge Graph)</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="w-4 h-4 rounded border-zinc-700 bg-zinc-900 text-blue-500 focus:ring-blue-500 focus:ring-offset-zinc-900" defaultChecked />
                      <span className="text-sm text-zinc-300">Boost Verified / Published SOPs</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <BarChart2 className="w-16 h-16 text-zinc-800 mb-4" />
             <h2 className="text-xl font-bold text-white">Search Analytics</h2>
             <p className="text-zinc-500 mt-2 max-w-sm text-sm">Visualize Top Queries, Zero Result Searches, and Autocomplete Usage.</p>
             <Button variant="outline" className="mt-6 bg-zinc-900 border-zinc-700 text-white">
               Download Analytics Report
             </Button>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}
