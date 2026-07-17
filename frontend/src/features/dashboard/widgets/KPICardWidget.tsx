"use client";
import React, { useEffect, useState } from 'react';
import { Activity, Cpu, ShieldAlert, Database, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const icons = {
  assets: Cpu,
  maintenance: Activity,
  compliance: ShieldAlert,
  ai_usage: Database
};

export function KPICardWidget() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulating fetch from GET /api/v1/dashboard/kpis
    setData({
      assets: [
        { title: "Total Assets", value: 1420, trend: "+12", status: "good" },
        { title: "Critical Eq.", value: 45, trend: "Stable", status: "warning" }
      ],
      maintenance: [
        { title: "Open Work Orders", value: 84, trend: "-5", status: "good" }
      ],
      ai_usage: [
        { title: "AI Queries Today", value: 1250, trend: "+15%", status: "good" }
      ]
    });
  }, []);

  if (!data) return <div className="p-4 text-muted">Loading KPIs...</div>;

  const renderCard = (kpi: any, type: string) => {
    const Icon = icons[type as keyof typeof icons] || Activity;
    const isGood = kpi.status === 'good';
    
    return (
      <div key={kpi.title} className="flex-1 min-w-[200px] bg-deep/30 border border-subtle rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-4 h-4 text-accent-cyan" />
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{kpi.title}</span>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${isGood ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
            {kpi.status}
          </span>
        </div>
        
        <div className="flex items-end justify-between">
          <span className="text-3xl font-bold text-primary">{kpi.value}</span>
          <div className={`flex items-center gap-1 text-sm font-semibold ${kpi.trend.startsWith('-') ? 'text-emerald-400' : 'text-amber-400'}`}>
            {kpi.trend.startsWith('-') ? <ArrowDownRight className="w-3.5 h-3.5" /> : <ArrowUpRight className="w-3.5 h-3.5" />}
            {kpi.trend}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full h-full flex gap-4 p-2 overflow-x-auto relative group">
      <div className="widget-drag-handle absolute top-0 right-0 p-2 cursor-move opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="w-4 h-4 text-muted">⣿</div>
      </div>
      {renderCard(data.assets[0], 'assets')}
      {renderCard(data.assets[1], 'assets')}
      {renderCard(data.maintenance[0], 'maintenance')}
      {renderCard(data.ai_usage[0], 'ai_usage')}
    </div>
  );
}

