import React from 'react';
import { motion } from 'framer-motion';
import { Activity, AlertTriangle, Crosshair, ChevronDown } from 'lucide-react';

interface RCANode {
  title: string;
  description: string;
  evidence: string[];
}

interface RCATreeProps {
  symptom: RCANode;
  probableCause: RCANode & { confidence: number };
  rootCause: RCANode;
}

export default function RCATree({ symptom, probableCause, rootCause }: RCATreeProps) {
  return (
    <div className="relative flex flex-col items-center gap-8 w-full max-w-lg mx-auto py-4">
      {/* Background SVG for flowing connection lines */}
      <div className="absolute inset-0 pointer-events-none flex justify-center z-0">
        <svg className="w-2 h-full" fill="none">
          <motion.line
            x1="4" y1="0" x2="4" y2="100%"
            stroke="url(#rca-line-gradient)"
            strokeWidth="2"
            strokeDasharray="4 4"
            initial={{ strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: -20 }}
            transition={{ repeat: Infinity, ease: "linear", duration: 1.5 }}
          />
          <defs>
            <linearGradient id="rca-line-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent-cyan)" />
              <stop offset="50%" stopColor="var(--accent-amber)" />
              <stop offset="100%" stopColor="var(--accent-red)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* NODE 1: SYMPTOM DETECTED */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="glass-card w-full p-4 z-10"
        style={{ borderLeft: '3px solid var(--accent-cyan)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Activity className="w-4 h-4 text-accent-cyan" />
          <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Symptom Detected</span>
        </div>
        <h4 className="text-sm font-semibold text-primary">{symptom.title}</h4>
        <p className="text-xs text-secondary mt-1">{symptom.description}</p>
        <div className="flex flex-wrap gap-1 mt-2.5">
          {symptom.evidence.map(ev => (
            <span key={ev} className="px-2 py-0.5 rounded text-[9px] font-semibold badge-info uppercase">{ev}</span>
          ))}
        </div>
      </motion.div>

      <ChevronDown className="w-4 h-4 text-muted z-10 animate-bounce" />

      {/* NODE 2: PROBABLE CAUSE */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15 }}
        className="glass-card w-full p-4 z-10"
        style={{ borderLeft: '3px solid var(--accent-amber)' }}
      >
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-accent-amber" />
            <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Probable Cause</span>
          </div>
          <span className="badge badge-warning text-[9px] font-mono">{probableCause.confidence}% confidence</span>
        </div>
        <h4 className="text-sm font-semibold text-primary">{probableCause.title}</h4>
        <p className="text-xs text-secondary mt-1">{probableCause.description}</p>
        <div className="flex flex-wrap gap-1 mt-2.5">
          {probableCause.evidence.map(ev => (
            <span key={ev} className="px-2 py-0.5 rounded text-[9px] font-semibold badge-info uppercase">{ev}</span>
          ))}
        </div>
      </motion.div>

      <ChevronDown className="w-4 h-4 text-muted z-10 animate-bounce" />

      {/* NODE 3: ROOT CAUSE PATTERN */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="glass-card w-full p-4 z-10"
        style={{ borderLeft: '3px solid var(--accent-red)' }}
      >
        <div className="flex items-center gap-2 mb-1">
          <Crosshair className="w-4 h-4 text-accent-red" />
          <span className="text-[10px] font-bold tracking-widest text-muted uppercase">Root Cause Identified</span>
        </div>
        <h4 className="text-sm font-semibold text-primary">{rootCause.title}</h4>
        <p className="text-xs text-secondary mt-1">{rootCause.description}</p>
        <div className="flex flex-wrap gap-1 mt-2.5">
          {rootCause.evidence.map(ev => (
            <span key={ev} className="px-2 py-0.5 rounded text-[9px] font-semibold badge-info uppercase">{ev}</span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
