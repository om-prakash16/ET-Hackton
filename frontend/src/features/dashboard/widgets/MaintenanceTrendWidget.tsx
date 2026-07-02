"use client";
import React from 'react';
import { Settings } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const mockData = [
  { name: 'Week 1', preventive: 45, breakdown: 12 },
  { name: 'Week 2', preventive: 52, breakdown: 8 },
  { name: 'Week 3', preventive: 38, breakdown: 15 },
  { name: 'Week 4', preventive: 65, breakdown: 5 },
];

export function MaintenanceTrendWidget() {
  return (
    <div className="flex flex-col h-full w-full p-4 relative group">
      <div className="widget-drag-handle absolute top-2 right-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="w-5 h-1 border-y border-subtle mb-0.5" />
        <div className="w-5 h-1 border-t border-subtle" />
      </div>

      <div className="flex items-center gap-2 mb-4">
        <Settings className="w-5 h-5 text-accent-cyan" />
        <h3 className="font-semibold text-primary">Maintenance Activity</h3>
      </div>

      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Bar dataKey="preventive" name="Preventive" stackId="a" fill="#06b6d4" radius={[0, 0, 4, 4]} />
            <Bar dataKey="breakdown" name="Breakdown" stackId="a" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
