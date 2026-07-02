"use client";
import React from 'react';
import { Activity } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export function AssetHealthWidget({ liveData = [] }: { liveData?: any[] }) {
  // If we have live data for P-101A, we use it, otherwise fallback to mock
  const p101aData = liveData.filter(d => d.asset === 'P-101A').map(d => ({
    time: new Date(d.timestamp).toLocaleTimeString([], { hour12: false, minute: '2-digit', second: '2-digit' }),
    score: d.data.pressure
  }));
  
  const displayData = p101aData.length > 5 ? p101aData : [
    { time: '10:00', score: 92 },
    { time: '10:05', score: 88 },
    { time: '10:10', score: 95 },
    { time: '10:15', score: 85 },
    { time: '10:20', score: 91 },
    { time: '10:25', score: 97 },
    { time: '10:30', score: 99 },
  ];

  return (
    <div className="flex flex-col h-full w-full p-4 relative group">
      <div className="widget-drag-handle absolute top-2 right-2 p-1 cursor-move opacity-0 group-hover:opacity-100 transition-opacity z-10">
        <div className="w-5 h-1 border-y border-subtle mb-0.5" />
        <div className="w-5 h-1 border-t border-subtle" />
      </div>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-accent-emerald" />
          <h3 className="font-semibold text-primary">Fleet Asset Health</h3>
        </div>
        <span className="text-xl font-bold text-accent-emerald">92.4%</span>
      </div>

      <div className="flex-1 w-full min-h-[150px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
            <XAxis dataKey="name" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} />
            <YAxis stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} domain={[60, 100]} />
            <Tooltip 
              contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
              itemStyle={{ color: '#fff' }}
            />
            <Area type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorScore)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
