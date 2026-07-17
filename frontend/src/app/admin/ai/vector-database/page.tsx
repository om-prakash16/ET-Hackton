"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Database, Search, HardDrive, Layers, RefreshCw, Settings, SearchCode, Server, FileText, CheckCircle2, AlertTriangle, Cpu, Share2, Plus, Download, BarChart2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "collections" | "search-lab" | "settings";

export default function VectorDatabasePage() {
  const [activeTab, setActiveTab] = useState<Tab>("collections");

  const KPIS = [
    { title: "Total Embeddings", value: "24.8M", icon: Database, color: "emerald" },
    { title: "Active Collections", value: "856", icon: Layers, color: "blue" },
    { title: "Avg Retrieval Time", value: "42ms", icon: Search, color: "purple" },
    { title: "Storage Used", value: "18.4 TB", icon: HardDrive, color: "zinc" },
  ];

  const MOCK_COLLECTIONS = [
    { id: "COL-8921", org: "Acme Corp", name: "Maintenance Logs", vectors: "1.2M", dimension: 768, status: "Healthy", updated: "2 mins ago" },
    { id: "COL-8922", org: "Acme Corp", name: "OEM Manuals", vectors: "840K", dimension: 768, status: "Indexing", updated: "Just now" },
    { id: "COL-8923", org: "Wayne Ent.", name: "Incident Reports", vectors: "45K", dimension: 768, status: "Healthy", updated: "1 hour ago" },
    { id: "COL-8924", org: "Stark Ind.", name: "P&ID Drawings", vectors: "2.1M", dimension: 768, status: "Failed", updated: "4 hours ago" },
    { id: "COL-8925", org: "Globex", name: "Compliance Rules", vectors: "12K", dimension: 768, status: "Healthy", updated: "1 day ago" },
  ];

  const [searchQuery, setSearchQuery] = useState("Why did Pump P101 fail last year?");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = () => {
    setHasSearched(true);
  };

  return (
    <AdminPageTemplate
      title="Vector Database"
      description="Manage the enterprise semantic embedding layer. This system powers RAG, AI Copilot context retrieval, and semantic similarity search."
      headerIcon={Database}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <RefreshCw className="w-4 h-4 mr-2" />
            Rebuild All Indexes
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none shadow-lg shadow-emerald-500/20">
            <Plus className="w-4 h-4 mr-2" />
            New Collection
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
          onClick={() => setActiveTab("collections")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "collections" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Layers className="w-4 h-4" /> RAG Collections
        </button>
        <button
          onClick={() => setActiveTab("search-lab")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "search-lab" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <SearchCode className="w-4 h-4" /> Vector Search Lab
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "settings" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Settings className="w-4 h-4" /> Embedding Engine
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "collections" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search collections by org, name..." 
                  className="w-full sm:w-80 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                  Filter Errors
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Collection Name</th>
                    <th className="px-6 py-4 font-semibold">Organization</th>
                    <th className="px-6 py-4 font-semibold">Vector Count</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Last Indexed</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_COLLECTIONS.map((collection) => (
                    <tr key={collection.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                            <Layers className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-emerald-400 transition-colors">{collection.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-zinc-500 font-mono">{collection.id}</span>
                              <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">Dim: {collection.dimension}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-medium text-white">{collection.org}</td>
                      <td className="px-6 py-4 font-mono text-blue-400">{collection.vectors}</td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`border-none ${
                            collection.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : 
                            collection.status === 'Indexing' ? 'bg-blue-500/10 text-blue-400' : 
                            'bg-red-500/10 text-red-400'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {collection.status === 'Indexing' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>}
                            {collection.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-zinc-400">{collection.updated}</td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Rebuild Index">
                            <RefreshCw className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-md transition-colors" title="View Analytics">
                            <BarChart2 className="w-4 h-4" />
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

        {activeTab === "search-lab" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
            {/* Search Input Area */}
            <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm h-fit">
              <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                <SearchCode className="w-4 h-4 text-emerald-400" />
                RAG Query Simulator
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-zinc-400 text-xs font-semibold">Semantic Query</label>
                  <textarea 
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-emerald-500 resize-none h-24 text-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-zinc-400 text-xs font-semibold">Target Collection</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:border-emerald-500">
                    <option>Acme Corp - ALL</option>
                    <option>Acme Corp - Maintenance Logs</option>
                  </select>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-zinc-400">Top K Results</span>
                    <span className="text-emerald-400 font-mono">3</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="1" max="10" defaultValue="3" />
                </div>

                <Button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white mt-4" onClick={handleSearch}>
                  <Play className="w-4 h-4 mr-2" /> Execute Semantic Search
                </Button>
              </div>
            </div>

            {/* Results Area */}
            <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-0 shadow-sm overflow-hidden flex flex-col h-[600px]">
              <div className="px-5 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
                <h3 className="font-bold text-white">Retrieved Vector Chunks</h3>
                {hasSearched && (
                  <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5 font-mono">
                    3 Results • 42ms
                  </Badge>
                )}
              </div>
              
              <div className="flex-1 overflow-y-auto p-5 bg-[#0a0f1d]">
                {!hasSearched ? (
                  <div className="h-full flex flex-col items-center justify-center text-zinc-500">
                    <Database className="w-12 h-12 mb-3 opacity-20" />
                    <p className="text-sm">Run a semantic query to test RAG retrieval.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {/* Result 1 */}
                    <div className="bg-zinc-900 border border-emerald-500/30 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge className="bg-emerald-500/20 text-emerald-400 border-none">Score: 0.942</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="text-sm font-bold text-white">Incident_Report_145.pdf</span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed font-serif bg-zinc-950 p-3 rounded border border-zinc-800">
                        ...inspection revealed that <span className="bg-amber-500/20 text-amber-300 rounded px-1">Pump P-101 failed</span> due to severe cavitation caused by a blockage in the suction line. The bearing housing was also found to be operating at elevated temperatures...
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 font-mono">
                        <span>Chunk ID: chk_892a</span>
                        <span>Tokens: 142</span>
                      </div>
                    </div>

                    {/* Result 2 */}
                    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge className="bg-zinc-800 text-zinc-300 border-none">Score: 0.884</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-bold text-white">Maintenance_Log_Oct.pdf</span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-serif bg-zinc-950 p-3 rounded border border-zinc-800">
                        ...routine maintenance performed on <span className="bg-amber-500/20 text-amber-300 rounded px-1">Pump P-101</span>. Lubrication replaced. Technician noted abnormal vibration during test run but within acceptable ISO limits...
                      </p>
                      <div className="flex items-center gap-3 mt-3 text-xs text-zinc-500 font-mono">
                        <span>Chunk ID: chk_441b</span>
                        <span>Tokens: 89</span>
                      </div>
                    </div>

                    {/* Result 3 */}
                    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 relative">
                      <div className="absolute top-4 right-4 flex items-center gap-2">
                        <Badge className="bg-zinc-800 text-zinc-300 border-none">Score: 0.751</Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Share2 className="w-4 h-4 text-amber-400" />
                        <span className="text-sm font-bold text-white">Knowledge Graph Node: P-101</span>
                      </div>
                      <p className="text-sm text-zinc-400 leading-relaxed font-mono bg-zinc-950 p-3 rounded border border-zinc-800">
                        Entity: Pump P-101
                        Location: Boiler Room B
                        Manufacturer: FlowTech Ind.
                        Status: Active
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Embedding Pipeline Settings</h3>
              <p className="text-sm text-zinc-400 mb-6">Configure how documents are chunked and embedded by the Gemini API.</p>
              
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-semibold">Primary Embedding Model</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500">
                    <option>Gemini Embedding API (text-embedding-004)</option>
                    <option>Vertex AI Embeddings</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-zinc-400 text-xs font-semibold">Distance Metric</label>
                  <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2.5 text-white text-sm focus:outline-none focus:border-emerald-500">
                    <option>Cosine Similarity (Recommended)</option>
                    <option>Euclidean Distance</option>
                    <option>Dot Product</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Smart Chunking Engine</h3>
              
              <div className="space-y-6 mt-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Chunk Size (Tokens)</span>
                    <span className="text-emerald-400 font-mono">1024</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="256" max="2048" defaultValue="1024" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Chunk Overlap</span>
                    <span className="text-amber-400 font-mono">20%</span>
                  </div>
                  <input type="range" className="w-full accent-amber-500" min="0" max="50" defaultValue="20" />
                  <p className="text-xs text-zinc-500 mt-2">Overlap prevents context loss at chunk boundaries during semantic retrieval.</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}

// Ensure icon imports
import { Play } from "lucide-react";
