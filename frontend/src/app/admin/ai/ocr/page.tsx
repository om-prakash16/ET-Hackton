"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { ScanText, ScanFace, FileSearch, ShieldCheck, Activity, Image as ImageIcon, CheckCircle2, AlertTriangle, XCircle, Search, Filter, Settings, FileText, UploadCloud, Database, Network, Share2, Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "queue" | "pipeline" | "settings";

export default function OCRCenterPage() {
  const [activeTab, setActiveTab] = useState<Tab>("queue");

  const KPIS = [
    { title: "Total Documents", value: "2.4M", icon: FileText, color: "blue" },
    { title: "Avg Confidence", value: "94.2%", icon: ShieldCheck, color: "emerald" },
    { title: "Pending Jobs", value: "1,240", icon: Activity, color: "amber" },
    { title: "Failed Extractions", value: "42", icon: XCircle, color: "red" },
  ];

  const MOCK_JOBS = [
    { id: "OCR-9921", filename: "P&ID_Reactor_V2.pdf", org: "Acme Corp", type: "Drawing", status: "Completed", confidence: 98, entities: 142, time: "2.4s" },
    { id: "OCR-9922", filename: "Maintenance_Log_Oct.pdf", org: "Wayne Enterprises", type: "Manual", status: "Processing", confidence: null, entities: null, time: "-" },
    { id: "OCR-9923", filename: "Inspection_Photo_01.jpg", org: "Stark Industries", type: "Image", status: "Failed", confidence: 42, entities: 0, time: "1.2s" },
    { id: "OCR-9924", filename: "Vendor_Invoice_Q3.pdf", org: "Oscorp", type: "Invoice", status: "Completed", confidence: 91, entities: 24, time: "3.1s" },
    { id: "OCR-9925", filename: "Compliance_Audit_2026.pdf", org: "Globex Dynamics", type: "Audit", status: "Pending", confidence: null, entities: null, time: "-" },
  ];

  return (
    <AdminPageTemplate
      title="OCR & Document Intelligence"
      description="The intelligent ingestion engine. Monitor document parsing, computer vision, and structured metadata extraction across the platform."
      headerIcon={ScanText}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <Settings className="w-4 h-4 mr-2" />
            Global Settings
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold border-none shadow-lg shadow-emerald-500/20">
            <UploadCloud className="w-4 h-4 mr-2" />
            Test Extraction
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
            {kpi.title === "Avg Confidence" && (
              <div className="mt-4 w-full bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div className="bg-emerald-500 h-full" style={{ width: "94.2%" }}></div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mt-8 flex items-center gap-2 border-b border-zinc-800 pb-px">
        <button
          onClick={() => setActiveTab("queue")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "queue" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <FileSearch className="w-4 h-4" /> OCR Job Queue
        </button>
        <button
          onClick={() => setActiveTab("pipeline")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "pipeline" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Network className="w-4 h-4" /> AI Pipeline Topology
        </button>
        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "settings" 
              ? "border-emerald-500 text-emerald-400 bg-emerald-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Settings className="w-4 h-4" /> Global Thresholds
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "queue" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search OCR jobs by ID, filename, org..." 
                  className="w-full sm:w-80 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-9">
                  <Filter className="w-4 h-4 mr-2" /> Filter Errors
                </Button>
              </div>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Job ID & File</th>
                    <th className="px-6 py-4 font-semibold">Classification</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Confidence</th>
                    <th className="px-6 py-4 font-semibold">Entities Extracted</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_JOBS.map((job) => (
                    <tr key={job.id} className="hover:bg-zinc-800/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center ${job.filename.endsWith('.pdf') ? 'text-red-400' : 'text-blue-400'}`}>
                            {job.filename.endsWith('.pdf') ? <FileText className="w-5 h-5" /> : <ImageIcon className="w-5 h-5" />}
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-emerald-400 transition-colors truncate max-w-[200px]">{job.filename}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-zinc-500 font-mono">{job.id}</span>
                              <span className="text-[10px] bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{job.org}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-zinc-300 font-medium">{job.type}</span>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`border-none ${
                            job.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-400' : 
                            job.status === 'Processing' ? 'bg-blue-500/10 text-blue-400' : 
                            job.status === 'Failed' ? 'bg-red-500/10 text-red-400' : 
                            'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            {job.status === 'Processing' && <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></span>}
                            {job.status}
                          </span>
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        {job.confidence !== null ? (
                          <div className="flex items-center gap-2">
                            <span className={`font-mono font-bold ${job.confidence > 90 ? 'text-emerald-400' : job.confidence > 75 ? 'text-amber-400' : 'text-red-400'}`}>
                              {job.confidence}%
                            </span>
                            {job.confidence < 75 && <AlertTriangle className="w-3.5 h-3.5 text-red-400" title="Low Confidence - Manual Review Required" />}
                          </div>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {job.entities !== null ? (
                          <span className="text-zinc-300 font-medium">{job.entities} tags</span>
                        ) : (
                          <span className="text-zinc-600">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {job.status === 'Failed' && (
                            <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="Retry Job">
                              <Play className="w-4 h-4" />
                            </button>
                          )}
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="View Extraction Details">
                            <ScanFace className="w-4 h-4" />
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

        {activeTab === "pipeline" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[600px] animate-in fade-in duration-300">
            <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Network className="w-4 h-4 text-emerald-400" />
                <h3 className="font-bold text-white">Intelligent Document Processing Pipeline</h3>
              </div>
              <Badge variant="outline" className="border-emerald-500/30 text-emerald-400 bg-emerald-500/5">
                Active
              </Badge>
            </div>
            
            <div className="flex-1 p-8 flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden">
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
              
              <div className="relative z-10 flex flex-wrap justify-center gap-6 max-w-4xl">
                {[
                  { label: "File Upload", icon: UploadCloud, color: "blue", desc: "PDF, DWG, IMG" },
                  { label: "Preprocessing", icon: Settings, color: "zinc", desc: "Deskew, Enhance" },
                  { label: "Vision/OCR", icon: ScanText, color: "emerald", desc: "Text & Tables" },
                  { label: "Classification", icon: FileSearch, color: "amber", desc: "Detect Doc Type" },
                  { label: "Entity Extraction", icon: ScanFace, color: "purple", desc: "Assets, IDs" },
                  { label: "Knowledge Graph", icon: Share2, color: "blue", desc: "Link Nodes" },
                  { label: "Embeddings", icon: Database, color: "emerald", desc: "Vector Search" },
                ].map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className={`flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg w-36 h-32 group hover:border-${step.color}-500/50 transition-colors relative`}>
                      <div className={`absolute top-2 right-2 w-2 h-2 rounded-full bg-${step.color}-500 animate-pulse`}></div>
                      <step.icon className={`w-8 h-8 text-${step.color}-400 mb-3`} />
                      <span className="text-sm font-bold text-white text-center mb-1">{step.label}</span>
                      <span className="text-[10px] text-zinc-500 text-center uppercase tracking-wider">{step.desc}</span>
                    </div>
                    {idx < 6 && (
                      <div className="w-12 h-0.5 bg-zinc-800 mx-1 relative">
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-zinc-700 rotate-45"></div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-300">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">OCR Confidence Thresholds</h3>
              <p className="text-sm text-zinc-400 mb-6">Documents scoring below the extraction threshold will be flagged for manual review by the organization admin.</p>
              
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Minimum Allowed Confidence</span>
                    <span className="text-amber-400 font-mono">75%</span>
                  </div>
                  <input type="range" className="w-full accent-amber-500" min="0" max="100" defaultValue="75" />
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm font-semibold">
                    <span className="text-white">Auto-Publish Threshold</span>
                    <span className="text-emerald-400 font-mono">90%</span>
                  </div>
                  <input type="range" className="w-full accent-emerald-500" min="0" max="100" defaultValue="90" />
                  <p className="text-xs text-zinc-500">Extractions above this score bypass manual review completely.</p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold text-white mb-4">Pipeline Automation</h3>
              
              <div className="space-y-4">
                {[
                  { name: "Auto-Summarize Documents", active: true },
                  { name: "Auto-Generate Embeddings for Vector DB", active: true },
                  { name: "Auto-Update Knowledge Graph", active: true },
                  { name: "Auto-Detect Language", active: true },
                  { name: "Require Manual Approval for Low Confidence", active: true },
                  { name: "Delete Unreadable Pages", active: false },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800/50">
                    <span className="text-sm font-semibold text-zinc-300">{feature.name}</span>
                    <div className="relative inline-block w-10 h-5 align-middle select-none">
                      <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-emerald-500 appearance-none cursor-pointer right-0" checked={feature.active} readOnly/>
                      <label className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${feature.active ? 'bg-emerald-500' : 'bg-zinc-700'}`}></label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}
