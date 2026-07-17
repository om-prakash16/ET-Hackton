"use client";

import React, { useEffect, useState } from "react";
import { Store, Download, Star, Brain, Wrench, Shield, ArrowRight, Loader2, BarChart2, Globe2, Building2, CheckCircle2, Sparkles } from "lucide-react";

export default function MarketplaceDashboard() {
  const [data, setData] = useState<any>(null);
  const [benchmarks, setBenchmarks] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sharingMode, setSharingMode] = useState("CONSORTIUM");

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:8000/api/v1/marketplace/packages").then(r => r.json()),
      fetch("http://localhost:8000/api/v1/marketplace/benchmarks").then(r => r.json())
    ]).then(([packagesData, benchmarksData]) => {
      setData(packagesData);
      setBenchmarks(benchmarksData);
      setLoading(false);
    });
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-fuchsia-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Store className="w-8 h-8 text-fuchsia-500" /> Intelligence Marketplace
          </h1>
          <p className="text-slate-400">Securely download OEM standards, Prompt Packs, and benchmark against global anonymous data.</p>
        </div>
        
        {/* Federation Toggle */}
        <div className="bg-slate-900 border border-slate-800 p-2 rounded-xl flex items-center gap-4">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-2">Knowledge Federation Mode</span>
          <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-800">
            <button 
              onClick={() => setSharingMode("PRIVATE")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                sharingMode === "PRIVATE" ? "bg-slate-700 text-white shadow-lg" : "text-slate-500 hover:text-white"
              }`}
            >
              <Shield className="w-3 h-3 inline mr-1" /> Private
            </button>
            <button 
              onClick={() => setSharingMode("CONSORTIUM")}
              className={`px-4 py-1.5 rounded-md text-xs font-bold transition-all ${
                sharingMode === "CONSORTIUM" ? "bg-fuchsia-600 text-white shadow-lg" : "text-slate-500 hover:text-white"
              }`}
            >
              <Globe2 className="w-3 h-3 inline mr-1" /> Anonymous Industry
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* App Store / Marketplace Packages */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <SparklesIcon /> Featured Intelligence Packs
          </h2>
          
          <div className="grid grid-cols-1 gap-4">
            {data.featured.map((pkg: any) => (
              <div key={pkg.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-fuchsia-500/50 transition-all group">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center shrink-0">
                      {pkg.category === 'OEM_KNOWLEDGE' ? <Wrench className="w-6 h-6 text-blue-400" /> :
                       pkg.category === 'DIGITAL_TWIN' ? <Building2 className="w-6 h-6 text-emerald-400" /> :
                       <Brain className="w-6 h-6 text-purple-400" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-fuchsia-400 transition-colors">{pkg.name}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{pkg.provider}</p>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold mb-1">
                      <Star className="w-4 h-4 fill-current" /> {pkg.rating}
                    </div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider">{pkg.downloads} Installs</p>
                  </div>
                </div>
                
                <p className="text-sm text-slate-300 mb-4 ml-16">{pkg.description}</p>
                
                <div className="flex items-center justify-between ml-16">
                  <span className="px-2 py-1 bg-slate-800 rounded text-[10px] font-bold text-slate-400 tracking-wider">
                    {pkg.category.replace('_', ' ')}
                  </span>
                  
                  <button className="px-4 py-1.5 bg-fuchsia-600 hover:bg-fuchsia-700 text-white rounded-lg text-xs font-bold flex items-center gap-2 transition-colors">
                    {pkg.is_premium ? 'Unlock Premium' : 'Install Free'} <Download className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Industry Benchmarking */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 h-fit sticky top-8">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <BarChart2 className="w-5 h-5 text-emerald-500" /> Anonymous Benchmarking
          </h2>
          <p className="text-xs text-slate-400 mb-6">Compare your Tenant's performance against the global {benchmarks.industry} sector.</p>
          
          <div className="space-y-6">
            {benchmarks.comparisons.map((comp: any, idx: number) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-end mb-1">
                  <span className="text-sm font-bold text-slate-300">{comp.metric}</span>
                  <span className="text-xs font-mono text-slate-500">Industry Avg: {comp.industry_avg}</span>
                </div>
                
                <div className="relative h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                  {/* Industry Average Marker */}
                  <div 
                    className="absolute top-0 bottom-0 w-0.5 bg-slate-500 z-10" 
                    style={{ left: '50%' }}
                  />
                  {/* Local Tenant Performance */}
                  <div 
                    className={`absolute top-0 bottom-0 rounded-full ${comp.status === 'AHEAD_OF_AVG' ? 'bg-emerald-500' : 'bg-rose-500'}`}
                    style={{ 
                      width: comp.status === 'AHEAD_OF_AVG' ? '75%' : '35%',
                      opacity: 0.8
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center text-[10px] uppercase font-bold tracking-wider">
                  <span className={comp.status === 'AHEAD_OF_AVG' ? 'text-emerald-400 flex items-center gap-1' : 'text-rose-400 flex items-center gap-1'}>
                    <CheckCircle2 className="w-3 h-3" /> Your Org: {comp.local_tenant}
                  </span>
                  <span className="text-amber-400">Top Quartile: {comp.top_quartile}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-4 bg-slate-950 rounded-lg border border-slate-800 text-xs text-slate-400">
            <p className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
              Your data is completely anonymized. Financial data, GPS coordinates, and PII are stripped before benchmarking calculation.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

function SparklesIcon() {
  return <Sparkles className="w-5 h-5 text-fuchsia-500" />;
}
