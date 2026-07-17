"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BookOpen, Files, ShieldCheck, GraduationCap, Mic, Loader2, Link as LinkIcon, Database, CheckSquare, Search } from "lucide-react";

export default function KnowledgeHubDashboard() {
  const [loading, setLoading] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState("");

  const triggerTrainingGen = async () => {
    setLoading(true);
    try {
      const res = await fetch("http://localhost:8000/api/v1/knowledge/generate-training", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ source_material: "Expert Interview with John Doe on Compressor Tuning" })
      });
      const data = await res.json();
      setGeneratedMessage(data.message + ` Added to Knowledge Articles.`);
    } catch (e) {
      console.error(e);
      setGeneratedMessage("Failed to generate training guide.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-500" /> External Knowledge Hub
          </h1>
          <p className="text-slate-400">Manage OEM Manuals, Standards, and Expert Knowledge Retention.</p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/admin/intelligence/knowledge/articles"
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            <Search className="w-4 h-4" /> View Articles
          </Link>
          <button 
            onClick={triggerTrainingGen}
            disabled={loading}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <GraduationCap className="w-4 h-4" />}
            Generate AI Training
          </button>
        </div>
      </div>

      {generatedMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg flex items-center gap-2">
          <CheckSquare className="w-5 h-5" />
          {generatedMessage}
        </div>
      )}

      {/* External Sources Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <Files className="w-5 h-5 text-indigo-400" /> OEM Manuals
          </div>
          <p className="text-3xl font-bold text-white mb-1">1,245</p>
          <p className="text-sm text-emerald-400 flex items-center gap-1">+12 this week</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <ShieldCheck className="w-5 h-5 text-rose-400" /> Eng. Standards
          </div>
          <p className="text-3xl font-bold text-white mb-1">340</p>
          <p className="text-sm text-slate-500 flex items-center gap-1">ISO, API, OSHA</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <Mic className="w-5 h-5 text-amber-400" /> Expert Interviews
          </div>
          <p className="text-3xl font-bold text-white mb-1">89</p>
          <p className="text-sm text-emerald-400 flex items-center gap-1">+3 this month</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center gap-3 text-slate-400 mb-4 font-semibold">
            <Database className="w-5 h-5 text-emerald-400" /> AI Articles
          </div>
          <p className="text-3xl font-bold text-white mb-1">412</p>
          <p className="text-sm text-blue-400 flex items-center gap-1">98% Validation</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Knowledge Retention Graph</h2>
          <div className="h-64 flex items-center justify-center border border-slate-800 border-dashed rounded-lg">
            <p className="text-slate-500">Knowledge Growth Analytics Chart</p>
          </div>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Recent Integrations</h2>
          <div className="space-y-4">
            {[
              { title: "Pump Maintenance Standards", type: "OEM Manual", time: "2h ago" },
              { title: "ISO 14001 Env. Rules", type: "Standard", time: "5h ago" },
              { title: "Interview: Chief Eng. Gupta", type: "Expert Note", time: "1d ago" },
              { title: "Flowmeter Calibration Proc.", type: "Vendor Bulletin", time: "2d ago" },
            ].map((item, i) => (
              <div key={i} className="flex justify-between items-center border-b border-slate-800 pb-3 last:border-0 last:pb-0">
                <div>
                  <p className="text-white text-sm font-medium">{item.title}</p>
                  <p className="text-xs text-slate-500">{item.type}</p>
                </div>
                <span className="text-xs text-slate-400">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
