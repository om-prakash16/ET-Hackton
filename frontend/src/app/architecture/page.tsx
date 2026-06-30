"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Cpu, Database, Network, Shield, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ArchitecturePage() {
  const layers = [
    {
      title: 'LAYER 1 — DATA SOURCES',
      color: 'var(--accent-cyan)',
      items: ['IoT Sensors', 'SCADA Systems', 'P&ID Drawings', 'Maintenance Logs', 'OEM Manuals', 'Regulatory Docs']
    },
    {
      title: 'LAYER 2 — INGESTION PIPELINE',
      color: 'var(--accent-indigo)',
      items: ['Document Parser', 'Entity Extractor', 'Relationship Builder', 'Graph Indexer']
    },
    {
      title: 'LAYER 3 — INTELLIGENCE CORE',
      color: 'var(--accent-blue)',
      items: ['Neo4j Knowledge Graph', 'Qdrant Vector Store', 'Claude AI (GraphRAG)']
    },
    {
      title: 'LAYER 4 — AGENT LAYER',
      color: 'var(--accent-emerald)',
      items: ['Maintenance Agent', 'Compliance Agent', 'RCA Agent', 'Copilot Agent']
    },
    {
      title: 'LAYER 5 — UI / CONTROL LAYER',
      color: 'var(--accent-amber)',
      items: ['IntelliOps AI Dashboard (Next.js)']
    }
  ];

  return (
    <div className="min-h-screen bg-void text-primary relative overflow-hidden p-8 font-mono">
      {/* Background patterns */}
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full opacity-10 bg-accent-cyan blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full opacity-10 bg-accent-indigo blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-8 relative z-10">
        {/* Navigation */}
        <div className="flex justify-between items-center border-b border-subtle pb-4">
          <Link href="/" className="flex items-center gap-2 text-xs text-muted hover:text-accent-cyan transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <div className="text-right">
            <h1 className="text-lg font-bold text-primary">System Architecture</h1>
            <p className="text-[10px] text-muted">IntelliOps AI Platform Topology</p>
          </div>
        </div>

        {/* Topology Visualizer */}
        <div className="flex flex-col gap-10">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="flex flex-col gap-3 relative"
            >
              {/* Header */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-6 rounded-full" style={{ backgroundColor: layer.color }} />
                <span className="text-[11px] font-bold tracking-wider" style={{ color: layer.color }}>{layer.title}</span>
              </div>

              {/* Items grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
                {layer.items.map((item) => (
                  <div
                    key={item}
                    className="p-3 rounded-lg border border-subtle bg-deep/50 text-[10px] font-semibold text-center hover:border-active transition-all"
                    style={{
                      boxShadow: `0 0 15px ${layer.color}0a`
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>

              {/* Animated Connector Arrows down */}
              {idx < layers.length - 1 && (
                <div className="flex justify-center w-full my-1">
                  <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none">
                    <motion.path
                      d="M12 0 L12 24 M6 18 L12 24 L18 18"
                      stroke={layer.color}
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeDasharray="4 4"
                      animate={{ strokeDashoffset: -20 }}
                      transition={{ repeat: Infinity, ease: "linear", duration: 2 }}
                    />
                  </svg>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Footer info box */}
        <div className="glass-card p-5 mt-4 border border-dashed border-active bg-deep/20 text-xs leading-relaxed flex items-start gap-4">
          <Cpu className="w-8 h-8 text-accent-cyan shrink-0" />
          <div>
            <span className="font-bold text-primary block mb-1">GraphRAG & Vector Fusion Engine</span>
            Operational telemetry inputs (SCADA/IoT) are structured via the Ingestion Pipeline to construct a Neo4j Knowledge Graph. Entities are dynamically matched against embedding maps inside the Qdrant Vector Store, providing multi-hop context to Claude Sonnet inference engines for RCA & automated compliance audits.
          </div>
        </div>
      </div>
    </div>
  );
}
