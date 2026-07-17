"use client";

import React, { useState } from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { FileCode2, History, GitMerge, FileCheck2, Bot, Archive, Plus, Search, Filter, MessageSquare, ShieldAlert, Cpu, Eye, Download, Code2, AlertTriangle, Layers, Copy, CheckCircle2, Settings } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Tab = "repository" | "editor" | "testlab" | "analytics";

export default function PromptLibraryPage() {
  const [activeTab, setActiveTab] = useState<Tab>("repository");

  const KPIS = [
    { title: "Total Prompts", value: "142", icon: FileCode2, color: "blue" },
    { title: "Published", value: "98", icon: FileCheck2, color: "emerald" },
    { title: "Pending Approval", value: "12", icon: ShieldAlert, color: "amber" },
    { title: "Archived", value: "32", icon: Archive, color: "zinc" },
  ];

  const MOCK_PROMPTS = [
    { id: "PRM-SYS-001", name: "Copilot Core System Prompt", type: "System Prompt", version: "v2.4.1", status: "Published", agent: "AI Copilot", model: "Gemini 1.5 Pro", author: "Prakash Om", updated: "2 days ago" },
    { id: "PRM-OCR-001", name: "Invoice Extraction Template", type: "JSON Prompt", version: "v1.2.0", status: "Published", agent: "OCR Agent", model: "Gemini 1.5 Flash", author: "Michael Chen", updated: "5 days ago" },
    { id: "PRM-RCA-004", name: "Maintenance Root Cause Analysis", type: "Workflow Prompt", version: "v3.0.1", status: "Review", agent: "RCA Agent", model: "Gemini 1.5 Pro", author: "Sarah Jenkins", updated: "1 hour ago" },
    { id: "PRM-KG-002", name: "Entity Extraction Ruleset", type: "Extraction Prompt", version: "v1.0.5", status: "Published", agent: "Knowledge Graph", model: "Gemini 1.5 Pro", author: "David Kim", updated: "1 week ago" },
    { id: "PRM-SAF-001", name: "Safety Incident Categorization", type: "Classification", version: "v1.0.0", status: "Draft", agent: "Incident Intelligence", model: "Gemini 1.5 Flash", author: "Prakash Om", updated: "Just now" },
  ];

  const [promptCode, setPromptCode] = useState(
`You are an expert Root Cause Analysis (RCA) AI assistant for an industrial manufacturing platform.
Your goal is to analyze maintenance failure data and generate a structured RCA report.

CONTEXT:
Organization: {{organization}}
Asset ID: {{asset_id}}
Equipment Type: {{equipment_type}}
Failure Date: {{failure_date}}

MAINTENANCE HISTORY:
{{maintenance_history}}

INCIDENT REPORT:
{{incident_report}}

TASK:
1. Identify the primary failure mode.
2. Conduct a 5-Whys analysis based on the incident report.
3. Recommend exactly 3 preventive actions.
4. Output strictly in valid JSON format matching the RCA schema.

If you are unsure or data is missing, mark confidence as LOW and request manual review.`
  );

  return (
    <AdminPageTemplate
      title="Prompt Library"
      description="The central source of truth for all AI prompts. Create, version, approve, and assign prompts to AI Agents and Models."
      headerIcon={FileCode2}
      headerAction={
        <div className="flex items-center gap-3">
          <Button variant="outline" className="bg-zinc-900 border-zinc-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Import / Export
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20"
            onClick={() => setActiveTab("editor")}
          >
            <Plus className="w-4 h-4 mr-2" />
            Create Prompt
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
          onClick={() => setActiveTab("repository")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "repository" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Layers className="w-4 h-4" /> Repository
        </button>
        <button
          onClick={() => setActiveTab("editor")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "editor" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <Code2 className="w-4 h-4" /> Prompt Editor
        </button>
        <button
          onClick={() => setActiveTab("testlab")}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 ${
            activeTab === "testlab" 
              ? "border-blue-500 text-blue-400 bg-blue-500/5" 
              : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
          }`}
        >
          <MessageSquare className="w-4 h-4" /> Test Lab
        </button>
      </div>

      {/* Tab Content */}
      <div className="mt-6">
        {activeTab === "repository" && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm animate-in fade-in duration-300">
            <div className="p-4 border-b border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-950/50">
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text" 
                  placeholder="Search prompts by name, code, or tags..." 
                  className="w-full sm:w-80 bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
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
                    <th className="px-6 py-4 font-semibold">Prompt Details</th>
                    <th className="px-6 py-4 font-semibold">Version</th>
                    <th className="px-6 py-4 font-semibold">Assigned To</th>
                    <th className="px-6 py-4 font-semibold">Status</th>
                    <th className="px-6 py-4 font-semibold">Last Updated</th>
                    <th className="px-6 py-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800 text-zinc-300">
                  {MOCK_PROMPTS.map((prompt) => (
                    <tr key={prompt.id} className="hover:bg-zinc-800/30 transition-colors group cursor-pointer" onClick={() => setActiveTab("editor")}>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                            <FileCode2 className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-bold text-white group-hover:text-blue-400 transition-colors">{prompt.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-zinc-500 font-mono">{prompt.id}</span>
                              <span className="text-xs bg-zinc-800 px-1.5 py-0.5 rounded text-zinc-400">{prompt.type}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className="border-zinc-700 text-zinc-300 bg-zinc-800 font-mono">
                          {prompt.version}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <span className="flex items-center gap-1 text-xs text-purple-400"><Bot className="w-3 h-3"/> {prompt.agent}</span>
                          <span className="flex items-center gap-1 text-xs text-zinc-500"><Cpu className="w-3 h-3"/> {prompt.model}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge 
                          className={`border-none ${
                            prompt.status === 'Published' ? 'bg-emerald-500/10 text-emerald-400' : 
                            prompt.status === 'Review' ? 'bg-amber-500/10 text-amber-400' : 
                            'bg-zinc-500/10 text-zinc-400'
                          }`}
                        >
                          {prompt.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-white text-xs">{prompt.updated}</p>
                        <p className="text-zinc-500 text-[10px]">by {prompt.author}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-md transition-colors" title="View History">
                            <History className="w-4 h-4" />
                          </button>
                          <button className="p-1.5 text-zinc-400 hover:text-blue-400 hover:bg-zinc-800 rounded-md transition-colors" title="Edit Prompt">
                            <Code2 className="w-4 h-4" />
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

        {activeTab === "editor" && (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 animate-in fade-in duration-300">
            {/* Main Editor */}
            <div className="lg:col-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col h-[700px]">
              <div className="px-4 py-3 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <h3 className="font-bold text-white">Maintenance Root Cause Analysis</h3>
                  <Badge className="bg-amber-500/10 text-amber-400 border-none">Draft Mode</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="bg-zinc-900 border-zinc-700 text-zinc-300 h-8">
                    <History className="w-3.5 h-3.5 mr-2" /> View History
                  </Button>
                  <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white h-8">
                    Save Draft
                  </Button>
                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white h-8">
                    <CheckCircle2 className="w-3.5 h-3.5 mr-2" /> Submit for Approval
                  </Button>
                </div>
              </div>
              
              <div className="flex-1 bg-[#0d1117] p-4 overflow-y-auto font-mono text-sm leading-relaxed text-zinc-300 relative group">
                <textarea 
                  className="w-full h-full bg-transparent border-none resize-none focus:outline-none"
                  value={promptCode}
                  onChange={(e) => setPromptCode(e.target.value)}
                  spellCheck={false}
                />
                
                {/* Simulated Syntax Highlighting Overlay for Variables */}
                <div className="absolute inset-4 pointer-events-none whitespace-pre-wrap break-words text-transparent z-10" aria-hidden="true">
                  {promptCode.split(/({{.*?}})/g).map((part, i) => {
                    if (part.startsWith('{{') && part.endsWith('}}')) {
                      return <span key={i} className="bg-blue-500/20 text-blue-400 px-1 rounded mx-0.5">{part}</span>;
                    }
                    return <span key={i}>{part}</span>;
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar Configuration */}
            <div className="space-y-6">
              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Settings className="w-4 h-4 text-blue-400" />
                  Configuration
                </h3>
                
                <div className="space-y-4 text-sm">
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold">Prompt ID</label>
                    <input type="text" value="PRM-RCA-004" disabled className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-zinc-500 font-mono" />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold">Target Agent</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option>RCA Agent</option>
                      <option>AI Copilot</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold">Target Model</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option>Gemini 1.5 Pro</option>
                      <option>Gemini 1.5 Flash</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-zinc-400 text-xs font-semibold">Category</label>
                    <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
                      <option>Engineering</option>
                      <option>Maintenance</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-400" />
                  Available Variables
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["organization", "plant", "asset_id", "equipment_type", "failure_date", "maintenance_history", "incident_report"].map(v => (
                    <Badge key={v} variant="outline" className="bg-zinc-950 border-zinc-700 text-zinc-300 font-mono text-[10px] cursor-pointer hover:bg-zinc-800 hover:text-white transition-colors">
                      {`{{${v}}}`}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-zinc-500 mt-4">Click to insert into prompt</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === "testlab" && (
          <div className="flex flex-col items-center justify-center py-24 text-center">
             <MessageSquare className="w-16 h-16 text-zinc-800 mb-4" />
             <h2 className="text-xl font-bold text-white">Prompt Test Lab</h2>
             <p className="text-zinc-500 mt-2 max-w-sm text-sm">Inject variables like `{"{{maintenance_history}}"}` and run live tests against the Gemini model before publishing.</p>
             <Button variant="outline" className="mt-6 bg-zinc-900 border-zinc-700 text-white">
               Start Test Session
             </Button>
          </div>
        )}
      </div>
    </AdminPageTemplate>
  );
}
