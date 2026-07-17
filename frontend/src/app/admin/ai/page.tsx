"use client";

import React from "react";
import AdminPageTemplate from "@/components/ui/AdminPageTemplate";
import { Cpu, Activity, Bot, Database, Network, Search, Zap, CheckCircle2, ShieldAlert, BarChart3, Clock, AlertTriangle, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function AICenterDashboard() {
  const KPIS = [
    { title: "Total AI Requests", value: "1.24M", icon: Activity, color: "blue" },
    { title: "Average Latency", value: "840ms", icon: Clock, color: "emerald" },
    { title: "Token Usage", value: "845M", icon: Database, color: "amber" },
    { title: "Estimated Cost", value: "$4,290", icon: BarChart3, color: "purple" },
    { title: "Active AI Agents", value: "12", icon: Bot, color: "blue" },
    { title: "OCR Jobs", value: "14,290", icon: FileText, color: "emerald" },
    { title: "Embeddings Gen", value: "89K", icon: Network, color: "amber" },
    { title: "Search Queries", value: "245K", icon: Search, color: "purple" },
  ];

  const SYSTEM_STATUS = [
    { name: "Gemini API", status: "Healthy", latency: "240ms", icon: Bot, color: "emerald" },
    { name: "OCR Service", status: "Warning", latency: "1.2s", icon: FileText, color: "amber" },
    { name: "Knowledge Graph", status: "Healthy", latency: "45ms", icon: Network, color: "emerald" },
    { name: "Vector Database", status: "Healthy", latency: "12ms", icon: Database, color: "emerald" },
    { name: "Semantic Search", status: "Healthy", latency: "85ms", icon: Search, color: "emerald" },
  ];

  return (
    <AdminPageTemplate
      title="AI Command Center"
      description="The central intelligence hub. Monitor and orchestrate all AI models, agents, and pipelines across the platform."
      headerIcon={Cpu}
      headerAction={
        <Button className="bg-blue-600 hover:bg-blue-700 text-white font-bold border-none shadow-lg shadow-blue-500/20">
          <Zap className="w-4 h-4 mr-2" />
          Run AI Diagnostics
        </Button>
      }
    >
      {/* Real-time Status Banner */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 flex flex-wrap items-center gap-6 animate-in fade-in duration-300 shadow-sm mb-6">
        <div className="flex items-center gap-2 pr-6 border-r border-zinc-800">
          <Activity className="w-5 h-5 text-blue-400 animate-pulse" />
          <span className="font-bold text-white text-sm">System Health</span>
        </div>
        {SYSTEM_STATUS.map((sys, idx) => (
          <div key={idx} className="flex items-center gap-2 text-sm">
            <sys.icon className={`w-4 h-4 ${sys.status === 'Healthy' ? 'text-emerald-400' : 'text-amber-400'}`} />
            <span className="text-zinc-300 font-medium">{sys.name}</span>
            <Badge variant="outline" className={`ml-1 border-none text-[10px] uppercase tracking-wider ${
              sys.status === 'Healthy' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'
            }`}>
              {sys.status}
            </Badge>
          </div>
        ))}
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-in fade-in duration-500 delay-100">
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

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6 animate-in fade-in duration-500 delay-200">
        
        {/* Quick Actions & Toggles */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm">
          <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white">Global AI Features</h3>
          </div>
          <div className="p-4 space-y-4">
            {[
              { name: "AI Copilot Engine", active: true },
              { name: "OCR & Text Extraction", active: true },
              { name: "Semantic Search", active: true },
              { name: "Knowledge Graph Generation", active: true },
              { name: "Automated Metadata Extraction", active: false },
              { name: "Voice AI Services", active: false },
            ].map((feature, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg border border-zinc-800/50">
                <span className="text-sm font-semibold text-zinc-300">{feature.name}</span>
                <div className="relative inline-block w-10 h-5 align-middle select-none">
                  <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-blue-500 appearance-none cursor-pointer right-0" checked={feature.active} readOnly/>
                  <label className={`toggle-label block overflow-hidden h-5 rounded-full cursor-pointer ${feature.active ? 'bg-blue-500' : 'bg-zinc-700'}`}></label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI Workflow Visualization */}
        <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-sm flex flex-col">
          <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Network className="w-4 h-4 text-purple-400" />
              <h3 className="font-bold text-white">AI Processing Pipeline</h3>
            </div>
            <Badge variant="outline" className="border-blue-500/30 text-blue-400 bg-blue-500/5">
              Live Topology
            </Badge>
          </div>
          <div className="flex-1 p-8 flex items-center justify-center bg-[#0a0f1d] relative overflow-hidden">
            {/* Minimalist flowchart representing the Master Prompt workflow */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            
            <div className="relative z-10 flex flex-wrap justify-center gap-4 max-w-2xl">
              {[
                { label: "Document Upload", icon: FileText, color: "blue" },
                { label: "OCR Processing", icon: ScanText, color: "amber" },
                { label: "Classification", icon: Bot, color: "purple" },
                { label: "Entity Extraction", icon: Network, color: "emerald" },
                { label: "Knowledge Graph", icon: Share2, color: "blue" },
                { label: "Embeddings", icon: Layers, color: "purple" },
                { label: "Vector DB", icon: Database, color: "emerald" },
                { label: "AI Copilot", icon: Sparkles, color: "amber" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center">
                  <div className={`flex flex-col items-center justify-center p-4 bg-zinc-900 border border-zinc-800 rounded-xl shadow-lg w-32 h-24 group hover:border-${step.color}-500/50 transition-colors`}>
                    <step.icon className={`w-6 h-6 text-${step.color}-400 mb-2`} />
                    <span className="text-xs font-semibold text-zinc-300 text-center">{step.label}</span>
                  </div>
                  {idx < 7 && (
                    <div className="w-8 h-0.5 bg-zinc-800 mx-2 relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 border-t-2 border-r-2 border-zinc-700 rotate-45"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </AdminPageTemplate>
  );
}

// Importing icons missing from above
import { ScanText, Share2, Layers, Sparkles } from "lucide-react";
