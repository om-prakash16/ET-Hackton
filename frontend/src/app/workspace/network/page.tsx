"use client";

import React, { useEffect, useState } from "react";
import { Globe, Building2, Wrench, Shield, ArrowRight, Loader2, Link2, BellRing, UserPlus, ServerCrash } from "lucide-react";

export default function GlobalNetworkDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:8000/api/v1/network/dashboard")
      .then(r => r.json())
      .then(d => {
        setData(d);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-12 flex justify-center"><Loader2 className="w-8 h-8 text-cyan-500 animate-spin" /></div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
            <Globe className="w-8 h-8 text-cyan-500" /> Enterprise Network Hub
          </h1>
          <p className="text-slate-400">Manage Zero Trust B2B connections with OEMs, Suppliers, and Regulators.</p>
        </div>
        
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-colors shadow-lg shadow-cyan-500/20">
          <UserPlus className="w-4 h-4" /> Invite Partner
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active B2B Connections */}
        <div className="lg:col-span-2 space-y-6">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Link2 className="w-5 h-5 text-cyan-500" /> Federated Organization Links
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.connections.map((conn: any) => (
              <div key={conn.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-cyan-500/50 transition-all relative overflow-hidden group">
                <div className={`absolute top-0 right-0 w-2 h-full ${
                  conn.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'
                }`} />
                
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                    {conn.type === 'OEM' ? <Wrench className="w-5 h-5 text-blue-400" /> :
                     conn.type === 'REGULATOR' ? <Shield className="w-5 h-5 text-rose-400" /> :
                     <Building2 className="w-5 h-5 text-emerald-400" />}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{conn.name}</h3>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">{conn.id}</p>
                  </div>
                </div>
                
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider mb-1">Shared Resources</p>
                    <p className="text-sm font-bold text-slate-300">{conn.shared_assets}</p>
                  </div>
                  <span className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider ${
                    conn.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                    'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                  }`}>
                    {conn.status}
                  </span>
                </div>
                
                <div className="mt-4 pt-4 border-t border-slate-800 flex justify-end">
                  <button className="text-[10px] font-bold text-slate-500 group-hover:text-cyan-400 flex items-center gap-1 transition-colors uppercase tracking-wider">
                    Manage Access <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Organization Feed */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 flex flex-col h-[600px]">
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <BellRing className="w-5 h-5 text-blue-500" /> Cross-Org Activity Feed
          </h2>
          <p className="text-xs text-slate-400 mb-6">Live federated events from connected partners.</p>
          
          <div className="flex-1 overflow-y-auto pr-2 space-y-4">
            {data.activity_feed.map((feed: any) => (
              <div key={feed.id} className="p-4 bg-slate-950 border border-slate-800 rounded-lg group hover:border-slate-700 transition-colors">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-cyan-500" />
                    <span className="text-xs font-bold text-slate-300">{feed.partner}</span>
                  </div>
                  <span className="text-[10px] text-slate-500">{feed.time}</span>
                </div>
                
                <h3 className="text-sm font-bold text-cyan-400 mb-2">{feed.action}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{feed.details}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-slate-800">
             <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-lg text-xs text-slate-300 flex items-start gap-3">
                <Shield className="w-4 h-4 text-rose-400 mt-0.5 shrink-0" />
                <p>All federated data exchanges are verified via Zero Trust API policies and logged to the global audit trail.</p>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
}
