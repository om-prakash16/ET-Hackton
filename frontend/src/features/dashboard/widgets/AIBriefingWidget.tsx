"use client";
import React from 'react';
import { Play } from 'lucide-react';

export function AIBriefingWidget({ liveAlerts = [] }: { liveAlerts?: any[] }) {
  return (
    <div className="flex flex-col h-full w-full p-4 relative group">
      <div className="widget-drag-handle absolute top-2 right-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="flex gap-0.5">
          <div className="w-1 h-1 bg-subtle rounded-full"></div>
          <div className="w-1 h-1 bg-subtle rounded-full"></div>
          <div className="w-1 h-1 bg-subtle rounded-full"></div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-primary">AI Triage Inbox</h3>
        <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
          <span className="text-[10px] font-bold tracking-widest text-emerald-500 uppercase">Live Engine</span>
        </div>
      </div>

      <div className="flex flex-col gap-3 mt-4 overflow-y-auto pr-1 custom-scrollbar pb-8">
        {/* Render Live Alerts */}
        {liveAlerts.length > 0 ? liveAlerts.map((alert, idx) => (
          <div key={idx} className="flex gap-3 items-start group/item bg-red-500/10 border border-red-500/20 rounded-md p-2">
            <div className="mt-1 w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
            <div>
              <p className="text-xs text-primary leading-relaxed">
                <span className="font-semibold text-red-500">{alert.asset}: </span>
                {alert.message}
              </p>
              <div className="flex gap-2 mt-2">
                <button className="text-[10px] font-mono text-muted hover:text-primary transition-colors border border-subtle px-2 py-0.5 rounded flex items-center gap-1">
                  <Play className="w-3 h-3" /> Auto-Resolve
                </button>
              </div>
            </div>
          </div>
        )) : (
          <div className="text-xs text-secondary text-center py-4">No critical alerts detected in the telemetry stream.</div>
        )}
      </div>
    </div>
  );
}
