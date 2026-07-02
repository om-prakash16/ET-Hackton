"use client";
import React from 'react';
import { AlertCircle, Clock } from 'lucide-react';

const failures = [
  { id: 'INC-2024-089', equipment: 'Pump P-102A', type: 'Mechanical Seal Leak', time: '2 hours ago', status: 'In Progress' },
  { id: 'INC-2024-088', equipment: 'Conveyor CV-05', type: 'Motor Overload', time: '5 hours ago', status: 'Resolved' },
  { id: 'INC-2024-087', equipment: 'Valve V-201', type: 'Stuck Open', time: '1 day ago', status: 'Pending Parts' }
];

export function RecentFailuresWidget() {
  return (
    <div className="flex flex-col h-full w-full p-4 relative group overflow-hidden">
      <div className="widget-drag-handle absolute top-2 right-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="w-5 h-1 border-y border-subtle mb-0.5" />
        <div className="w-5 h-1 border-t border-subtle" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <AlertCircle className="w-5 h-5 text-accent-red" />
        <h3 className="font-semibold text-primary">Recent Incidents</h3>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-2">
        {failures.map(incident => (
          <div key={incident.id} className="flex items-center justify-between p-3 rounded-lg bg-deep/30 border border-subtle hover:bg-elevated/40 transition-colors">
            <div>
              <div className="text-sm font-semibold text-primary">{incident.equipment}</div>
              <div className="text-xs text-secondary mt-0.5">{incident.type}</div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <span className={`text-[10px] px-2 py-0.5 rounded font-medium ${
                incident.status === 'Resolved' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                incident.status === 'In Progress' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                'bg-amber-500/10 text-amber-400 border border-amber-500/20'
              }`}>
                {incident.status}
              </span>
              <div className="flex items-center gap-1 text-[10px] text-muted">
                <Clock className="w-3 h-3" />
                {incident.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
