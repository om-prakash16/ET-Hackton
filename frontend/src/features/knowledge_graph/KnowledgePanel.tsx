"use client";
import React, { useState, useCallback } from 'react';
import { Network, Activity, ZoomIn, Target, ChevronRight, CheckCircle2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';
import { ReactFlow, Background, Controls, MarkerType, useNodesState, useEdgesState } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const initialNodes = [
  { id: '1', position: { x: 250, y: 50 }, data: { label: 'Visakhapatnam Refinery' }, style: { background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(0, 240, 255, 0.5)', borderRadius: '8px', padding: '10px' } },
  { id: '2', position: { x: 100, y: 200 }, data: { label: 'Pump P-101A (Critical)' }, style: { background: 'rgba(239, 68, 68, 0.1)', color: '#fff', border: '1px solid rgba(239, 68, 68, 0.5)', borderRadius: '8px', padding: '10px' } },
  { id: '3', position: { x: 400, y: 200 }, data: { label: 'Vessel V-201 (Nominal)' }, style: { background: 'rgba(34, 197, 94, 0.1)', color: '#fff', border: '1px solid rgba(34, 197, 94, 0.5)', borderRadius: '8px', padding: '10px' } },
  { id: '4', position: { x: 100, y: 350 }, data: { label: 'Incident: Seal Leak' }, style: { background: 'rgba(234, 179, 8, 0.1)', color: '#fff', border: '1px solid rgba(234, 179, 8, 0.5)', borderRadius: '8px', padding: '10px' } },
  { id: '5', position: { x: 400, y: 350 }, data: { label: 'Regulation OISD-105' }, style: { background: 'rgba(168, 85, 247, 0.1)', color: '#fff', border: '1px solid rgba(168, 85, 247, 0.5)', borderRadius: '8px', padding: '10px' } },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: 'rgba(0, 240, 255, 0.5)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(0, 240, 255, 0.5)' } },
  { id: 'e1-3', source: '1', target: '3', style: { stroke: 'rgba(255, 255, 255, 0.2)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(255, 255, 255, 0.2)' } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: 'rgba(239, 68, 68, 0.5)' }, label: 'FEEDS', labelStyle: { fill: '#fff', fontSize: 10 } },
  { id: 'e4-2', source: '4', target: '2', style: { stroke: 'rgba(234, 179, 8, 0.5)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(234, 179, 8, 0.5)' } },
  { id: 'e5-3', source: '5', target: '3', style: { stroke: 'rgba(168, 85, 247, 0.5)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'rgba(168, 85, 247, 0.5)' } },
];

export function KnowledgePanel() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  return (
    <div className="flex gap-6 w-full h-full max-w-7xl mx-auto">
      {/* Main Canvas */}
      <div className="flex-1 glass-panel rounded-2xl border border-white/5 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-0 right-0 p-6 z-10 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
            <div className="flex flex-col gap-1">
                <h2 className="text-2xl font-bold tracking-wider text-brand-purple drop-shadow-[0_0_10px_rgba(168,85,247,0.3)] flex items-center gap-2">
                    <Network className="w-6 h-6" /> Brain State
                </h2>
                <p className="text-white/50 text-xs uppercase tracking-widest">Live Topological Mapping Engine</p>
            </div>
            <div className="flex items-center gap-4 pointer-events-auto">
                <div className="bg-black/50 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-3 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
                    <span className="text-xs font-mono text-white/70">14,291 Nodes Synced</span>
                </div>
            </div>
        </div>

        <div className="flex-1 w-full h-full bg-black/20">
            <ReactFlow 
                nodes={nodes} 
                edges={edges} 
                onNodesChange={onNodesChange} 
                onEdgesChange={onEdgesChange}
                fitView
                className="dark-theme-flow"
            >
                <Background color="rgba(255,255,255,0.05)" gap={20} />
                <Controls className="!bg-black/50 !border !border-white/10 !fill-white" />
            </ReactFlow>
        </div>
      </div>

      {/* Right Sidebar: AI Inspector */}
      <div className="w-80 flex flex-col gap-6">
        <div className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 border-b border-white/10 pb-3">
                <Activity className="w-4 h-4 text-brand-cyan" />
                <h3 className="font-bold text-sm tracking-widest text-white uppercase">AI Reasoner</h3>
            </div>
            
            <div className="flex flex-col gap-4 mt-2">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-xl flex flex-col gap-2 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-1 h-full bg-brand-magenta"></div>
                    <span className="text-xs text-white/40 uppercase tracking-widest">Active Inference</span>
                    <p className="text-sm text-white/80 leading-relaxed">
                        Detecting anomaly propagation. <span className="text-brand-magenta font-bold">Pump P-101A</span> pressure drop is highly correlated with historical <span className="text-yellow-500 font-bold">Seal Leaks</span>.
                    </p>
                </div>

                <div className="flex flex-col gap-2">
                    <span className="text-xs text-white/40 uppercase tracking-widest mb-1">Observed Graph Vectors</span>
                    <div className="flex items-center justify-between text-xs font-mono bg-black/30 px-3 py-2 rounded border border-white/5">
                        <span className="text-white/60">Equipment Nodes</span>
                        <span className="text-brand-cyan">1,204</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono bg-black/30 px-3 py-2 rounded border border-white/5">
                        <span className="text-white/60">Incident Edges</span>
                        <span className="text-yellow-500">42</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-mono bg-black/30 px-3 py-2 rounded border border-white/5">
                        <span className="text-white/60">Regulatory Rules</span>
                        <span className="text-brand-purple">89</span>
                    </div>
                </div>
            </div>
        </div>

        <div className="glass-panel rounded-2xl border border-white/5 p-6 flex flex-col gap-4 flex-1">
            <h3 className="font-bold text-sm tracking-widest text-white/50 uppercase border-b border-white/10 pb-3">Recommended Actions</h3>
            <div className="flex flex-col gap-3 mt-2">
                <button className="w-full text-left p-3 rounded-lg bg-brand-cyan/10 border border-brand-cyan/20 hover:bg-brand-cyan/20 transition flex flex-col gap-1">
                    <span className="text-brand-cyan text-sm font-bold flex items-center gap-2"><Target className="w-4 h-4" /> Isolate P-101A</span>
                    <span className="text-xs text-white/50">Prevent cascading failure to V-201</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg bg-brand-purple/10 border border-brand-purple/20 hover:bg-brand-purple/20 transition flex flex-col gap-1">
                    <span className="text-brand-purple text-sm font-bold flex items-center gap-2"><ShieldAlert className="w-4 h-4" /> Trigger RCA Protocol</span>
                    <span className="text-xs text-white/50">Cross-reference OISD-105 maintenance logs</span>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
}
