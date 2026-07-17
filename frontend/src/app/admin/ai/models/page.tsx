"use client";

import React, { useState } from "react";
import { 
  Bot, Settings, Activity, LineChart, Shield, Zap, Search, Key, Database, Play, CheckCircle2, XCircle, AlertTriangle, Cpu, TerminalSquare, SlidersHorizontal, Plus, Network
} from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

type Tab = "overview" | "config" | "testlab" | "telemetry" | "security";

export default function AIModelsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const { theme } = useTheme();
  
  // States for forms
  const [apiKey, setApiKey] = useState("AIzaSyB...");
  const [defaultModel, setDefaultModel] = useState("gemini-1.5-pro");
  const [backupModel, setBackupModel] = useState("gemini-1.5-flash");

  const TABS = [
    { id: "overview", label: "Overview", icon: Activity },
    { id: "config", label: "Model Configuration", icon: Settings },
    { id: "testlab", label: "Model Test Lab", icon: Play },
    { id: "telemetry", label: "Telemetry & Analytics", icon: LineChart },
    { id: "security", label: "Security & Access", icon: Shield },
  ] as const;

  return (
    <div className="p-6 space-y-6 w-full relative max-w-[1800px] mx-auto pb-24">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Bot className="w-5 h-5" />
            </div>
            AI Models Configuration
          </h1>
          <p className="text-zinc-400 text-sm mt-2 max-w-2xl">
            Central command for configuring, testing, and monitoring all large language models (LLMs) used across the IndusBrain platform.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white border-none shadow-lg shadow-purple-500/20">
            <Zap className="w-4 h-4 mr-2" />
            Save Configurations
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-zinc-800 pb-px overflow-x-auto no-scrollbar">
        {TABS.map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as Tab)}
              className={`flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded-t-lg transition-all border-b-2 whitespace-nowrap ${
                isActive 
                  ? "border-purple-500 text-purple-400 bg-purple-500/5" 
                  : "border-transparent text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              }`}
            >
              <tab.icon className={`w-4 h-4 ${isActive ? "text-purple-400" : "text-zinc-500"}`} />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-[600px]">
        {activeTab === "overview" && <OverviewTab />}
        {activeTab === "config" && <ConfigTab apiKey={apiKey} setApiKey={setApiKey} defaultModel={defaultModel} setDefaultModel={setDefaultModel} backupModel={backupModel} setBackupModel={setBackupModel} />}
        {activeTab === "testlab" && <TestLabTab />}
        {activeTab === "telemetry" && <TelemetryTab />}
        {activeTab === "security" && <SecurityTab />}
      </div>
    </div>
  );
}

// ==========================================
// TAB COMPONENTS
// ==========================================

function OverviewTab() {
  const KPIS = [
    { title: "Total AI Requests", value: "1.24M", change: "+12%", trend: "up", icon: Activity, color: "blue" },
    { title: "Requests Today", value: "48,291", change: "+5%", trend: "up", icon: Zap, color: "emerald" },
    { title: "Average Latency", value: "840ms", change: "-120ms", trend: "down", icon: Cpu, color: "purple" },
    { title: "Success Rate", value: "99.8%", change: "+0.1%", trend: "up", icon: CheckCircle2, color: "emerald" },
    { title: "Total Tokens", value: "845M", change: "+15%", trend: "up", icon: Database, color: "amber" },
    { title: "Estimated Cost (MTD)", value: "$4,290", change: "+8%", trend: "up", icon: LineChart, color: "red" },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {KPIS.map((kpi, idx) => (
          <div key={idx} className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 shadow-sm relative overflow-hidden group hover:border-zinc-700 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${kpi.color}-500/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110`} />
            <div className="flex items-start justify-between relative">
              <div>
                <p className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-1">{kpi.title}</p>
                <h3 className="text-2xl font-bold text-white">{kpi.value}</h3>
              </div>
              <div className={`w-10 h-10 rounded-lg bg-${kpi.color}-500/10 border border-${kpi.color}-500/20 flex items-center justify-center text-${kpi.color}-400`}>
                <kpi.icon className="w-5 h-5" />
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium">
              <span className={`text-${kpi.trend === 'up' && kpi.color !== 'red' ? 'emerald' : kpi.color === 'red' && kpi.trend === 'up' ? 'red' : 'emerald'}-400 flex items-center gap-1`}>
                {kpi.trend === 'up' ? '↑' : '↓'} {kpi.change}
              </span>
              <span className="text-zinc-500">vs last month</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Active Models</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">G</div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">Gemini 1.5 Pro <Badge className="bg-emerald-500/10 text-emerald-400 border-none">Default</Badge></div>
                  <div className="text-xs text-zinc-400">Google • Complex Reasoning • 2M Context</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">65% Usage</div>
                <div className="text-xs text-zinc-500">800ms Avg</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 bg-zinc-950 rounded-lg border border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 font-bold">G</div>
                <div>
                  <div className="text-white font-semibold flex items-center gap-2">Gemini 1.5 Flash <Badge className="bg-zinc-800 text-zinc-400 border-none">Backup</Badge></div>
                  <div className="text-xs text-zinc-400">Google • High Speed • 1M Context</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold text-white">35% Usage</div>
                <div className="text-xs text-zinc-500">350ms Avg</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col items-center justify-center text-center">
          <LineChart className="w-16 h-16 text-zinc-800 mb-4" />
          <h3 className="text-zinc-400 font-medium">Chart Visualization Placeholder</h3>
          <p className="text-zinc-500 text-sm max-w-xs mt-2">Token Usage & API Cost over time graph would render here using Recharts or Chart.js.</p>
        </div>
      </div>
    </div>
  );
}

function ConfigTab({ apiKey, setApiKey, defaultModel, setDefaultModel, backupModel, setBackupModel }: any) {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Provider & Credentials */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-2">
          <Key className="w-4 h-4 text-purple-400" />
          <h3 className="font-bold text-white">Primary Provider Credentials</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Provider</label>
            <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 cursor-not-allowed opacity-70" disabled>
              <option>Google Vertex AI / Gemini API</option>
            </select>
            <p className="text-[10px] text-zinc-500">Currently only Google Gemini is supported as the primary provider.</p>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">API Key (Encrypted)</label>
            <div className="relative">
              <input 
                type="password" 
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-500 font-mono"
              />
              <Button size="sm" variant="outline" className="absolute right-1 top-1 h-7 text-xs bg-zinc-900 border-zinc-800 text-white">
                Verify Key
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Model Selection */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-blue-400" />
          <h3 className="font-bold text-white">Global Model Selection</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Default Model</label>
            <select 
              value={defaultModel}
              onChange={(e) => setDefaultModel(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
            >
              <option value="gemini-1.5-pro">Gemini 1.5 Pro (Reasoning & Complex Tasks)</option>
              <option value="gemini-1.5-flash">Gemini 1.5 Flash (Speed & Cost Efficiency)</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Backup Fallback Model</label>
            <select 
              value={backupModel}
              onChange={(e) => setBackupModel(e.target.value)}
              className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-500"
            >
              <option value="gemini-1.5-flash">Gemini 1.5 Flash</option>
              <option value="gemini-1.5-pro">Gemini 1.5 Pro</option>
              <option value="none">None (Fail request)</option>
            </select>
            <p className="text-[10px] text-zinc-500">Used automatically if the default model hits rate limits or is down.</p>
          </div>
        </div>
      </div>

      {/* Generation Parameters */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
          <h3 className="font-bold text-white">Default Generation Parameters</h3>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Temperature</label>
              <span className="text-xs text-white font-mono">0.4</span>
            </div>
            <input type="range" min="0" max="2" step="0.1" defaultValue="0.4" className="w-full accent-emerald-500" />
            <p className="text-[10px] text-zinc-500">0.0 = Deterministic, 2.0 = Highly Creative.</p>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Top P</label>
              <span className="text-xs text-white font-mono">0.95</span>
            </div>
            <input type="range" min="0" max="1" step="0.05" defaultValue="0.95" className="w-full accent-emerald-500" />
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Max Output Tokens</label>
            </div>
            <input type="number" defaultValue={8192} className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-emerald-500 font-mono" />
          </div>
        </div>
      </div>

      {/* Task Routing */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-800 bg-zinc-950/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Network className="w-4 h-4 text-amber-400" />
            <h3 className="font-bold text-white">Model Routing Rules</h3>
          </div>
          <Button size="sm" variant="outline" className="h-7 text-xs bg-zinc-900 border-zinc-700 hover:bg-zinc-800 text-white">
            <Plus className="w-3 h-3 mr-1" /> Add Rule
          </Button>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-zinc-950 text-zinc-400 text-xs uppercase border-b border-zinc-800">
              <tr>
                <th className="px-6 py-3 font-semibold">Task Context</th>
                <th className="px-6 py-3 font-semibold">Assigned Model</th>
                <th className="px-6 py-3 font-semibold">Reasoning</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 text-zinc-300">
              <tr className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium text-white">AI Copilot Chat</td>
                <td className="px-6 py-4"><Badge className="bg-blue-500/10 text-blue-400 border-none">Gemini 1.5 Pro</Badge></td>
                <td className="px-6 py-4 text-xs text-zinc-500">Requires complex reasoning and long context memory.</td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium text-white">Document Summarization</td>
                <td className="px-6 py-4"><Badge className="bg-amber-500/10 text-amber-400 border-none">Gemini 1.5 Flash</Badge></td>
                <td className="px-6 py-4 text-xs text-zinc-500">High speed required for bulk processing.</td>
              </tr>
              <tr className="hover:bg-zinc-800/30">
                <td className="px-6 py-4 font-medium text-white">OCR Extraction</td>
                <td className="px-6 py-4"><Badge className="bg-amber-500/10 text-amber-400 border-none">Gemini 1.5 Flash</Badge></td>
                <td className="px-6 py-4 text-xs text-zinc-500">Vision capabilities combined with speed.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TestLabTab() {
  return (
    <div className="h-[700px] border border-zinc-800 rounded-xl overflow-hidden flex bg-zinc-900 animate-in fade-in duration-300 shadow-xl shadow-black/20">
      {/* Playground Left Panel */}
      <div className="w-1/3 border-r border-zinc-800 flex flex-col bg-zinc-950/50">
        <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
          <h3 className="font-bold text-white flex items-center gap-2">
            <TerminalSquare className="w-4 h-4 text-purple-400" /> Prompt Testing
          </h3>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">Test Model</label>
            <select className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500">
              <option>Gemini 1.5 Pro</option>
              <option>Gemini 1.5 Flash</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">System Prompt</label>
            <textarea 
              rows={4}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 font-mono resize-none"
              defaultValue="You are an expert AI engineering assistant. Output valid JSON."
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">User Message</label>
            <textarea 
              rows={6}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 resize-none"
              defaultValue="Analyze this pump failure description and extract entities."
            />
          </div>
          <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold">
            <Play className="w-4 h-4 mr-2 fill-current" /> Execute Prompt
          </Button>
        </div>
      </div>
      
      {/* Playground Right Panel */}
      <div className="flex-1 flex flex-col bg-[#0a0f1d]">
        <div className="h-12 border-b border-zinc-800 flex items-center px-4 justify-between bg-zinc-900/50">
          <div className="flex items-center gap-2">
            <Badge className="bg-emerald-500/10 text-emerald-400 border-none flex items-center gap-1.5"><CheckCircle2 className="w-3.5 h-3.5"/> Success (200 OK)</Badge>
            <span className="text-xs text-zinc-500 font-mono">1.2s • 451 Tokens</span>
          </div>
          <div className="flex gap-2">
            <button className="text-xs font-medium text-zinc-400 hover:text-white px-2 py-1 rounded hover:bg-zinc-800 transition-colors">Raw JSON</button>
            <button className="text-xs font-medium bg-zinc-800 text-white px-2 py-1 rounded">Markdown</button>
          </div>
        </div>
        <div className="flex-1 p-6 overflow-y-auto text-sm text-zinc-300 font-mono whitespace-pre-wrap leading-relaxed">
          {`{
  "entities": [
    {
      "type": "equipment",
      "value": "Centrifugal Pump P-102"
    },
    {
      "type": "failure_mode",
      "value": "Cavitation"
    },
    {
      "type": "symptom",
      "value": "Excessive vibration and noise"
    }
  ],
  "confidence_score": 0.98
}`}
        </div>
      </div>
    </div>
  );
}

function TelemetryTab() {
  return (
    <div className="flex flex-col items-center justify-center py-24 animate-in fade-in duration-300 text-center">
      <LineChart className="w-20 h-20 text-zinc-800 mb-6" />
      <h2 className="text-2xl font-bold text-white">Telemetry & Advanced Analytics</h2>
      <p className="text-zinc-400 mt-2 max-w-lg">
        This section connects to Datadog or an internal Prometheus/Grafana instance to visualize real-time AI API latency, token consumption, and estimated billing costs per organization.
      </p>
      <Button className="mt-8 bg-zinc-800 hover:bg-zinc-700 text-white border-zinc-700" disabled>
        Connect APM Provider
      </Button>
    </div>
  );
}

function SecurityTab() {
  return (
    <div className="max-w-3xl space-y-6 animate-in fade-in duration-300">
      <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5 flex items-start gap-4">
        <AlertTriangle className="w-6 h-6 text-red-400 shrink-0 mt-0.5" />
        <div>
          <h3 className="font-bold text-white">Strict Role-Based Access Control (RBAC)</h3>
          <p className="text-sm text-zinc-400 mt-1">
            API Keys and Model Configurations are strictly locked to the Super Admin role. Organizations consume the AI services through the unified gateway but cannot access or override these configurations.
          </p>
        </div>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 space-y-4">
        <h3 className="font-bold text-white border-b border-zinc-800 pb-2">Security Rules</h3>
        
        <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-white">Prompt Injection Protection</div>
            <div className="text-xs text-zinc-500">Filter incoming requests for known jailbreak patterns.</div>
          </div>
          <div className="relative inline-block w-10 h-5 align-middle select-none">
            <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-purple-500 appearance-none cursor-pointer right-0" checked readOnly/>
            <label className="toggle-label block overflow-hidden h-5 rounded-full bg-purple-500 cursor-pointer"></label>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-white">PII Data Masking</div>
            <div className="text-xs text-zinc-500">Automatically mask sensitive employee/financial data before sending to LLM.</div>
          </div>
          <div className="relative inline-block w-10 h-5 align-middle select-none">
            <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-purple-500 appearance-none cursor-pointer right-0" checked readOnly/>
            <label className="toggle-label block overflow-hidden h-5 rounded-full bg-purple-500 cursor-pointer"></label>
          </div>
        </div>
        
        <div className="flex items-center justify-between p-3 bg-zinc-950 rounded-lg">
          <div>
            <div className="text-sm font-semibold text-white">Strict Gateway Logging</div>
            <div className="text-xs text-zinc-500">Log all requests, responses, and token counts to audit database.</div>
          </div>
          <div className="relative inline-block w-10 h-5 align-middle select-none">
            <input type="checkbox" className="toggle-checkbox absolute block w-5 h-5 rounded-full bg-white border-4 border-purple-500 appearance-none cursor-pointer right-0" checked readOnly/>
            <label className="toggle-label block overflow-hidden h-5 rounded-full bg-purple-500 cursor-pointer"></label>
          </div>
        </div>
      </div>
    </div>
  );
}
