"use client";
import React from 'react';
import { Database, FileText, ArrowRight, AlertTriangle, Cpu, GitBranch, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_KPI_METRICS, MOCK_DOCUMENTS } from '@/lib/mockData';
import MetricCard from '@/components/ui/MetricCard';

interface OverviewPanelProps {
  onNavigateToCorpus?: () => void;
  onNavigateToCopilot?: () => void;
}

export function OverviewPanel({ onNavigateToCorpus, onNavigateToCopilot }: OverviewPanelProps) {
  // Map icons for KPI metrics
  const iconNames = ['FileText', 'GitBranch', 'Cpu', 'ShieldAlert'] as const;

  // Real-time AI Alerts derived from Visakhapatnam Plant mock context
  const aiAlerts = [
    {
      type: 'RCA Warning',
      title: 'P-101A Mechanical Seal Degradation',
      desc: 'Telemetry shows 15% pressure drop. Historical manuals indicate high failure probability.',
      priority: 'Critical',
      priorityColor: 'badge-critical',
      color: 'var(--accent-red)',
      bgGlow: 'rgba(239, 68, 68, 0.04)',
      borderColor: 'rgba(239, 68, 68, 0.2)',
      time: '4 hrs to failure',
    },
    {
      type: 'Compliance Gap',
      title: 'V-201 Containment Missing',
      desc: 'OISD-105 requires secondary containment documentation which is currently absent from the corpus.',
      priority: 'High',
      priorityColor: 'badge-warning',
      color: 'var(--accent-amber)',
      bgGlow: 'rgba(245, 158, 11, 0.04)',
      borderColor: 'rgba(245, 158, 11, 0.2)',
      time: '14 days overdue',
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-7xl mx-auto w-full">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.4 }}
      >
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, var(--accent-cyan), transparent)' }} />
              <h2 className="text-2xl font-bold tracking-tight text-primary">
                Unified Asset & Operations Brain
              </h2>
            </div>
            <p className="text-sm ml-4 text-muted">
              Real-time overview of your industrial knowledge graph and AI intelligence layer.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono"
              style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.2)', color: 'var(--accent-emerald)' }}>
              <span className="pulse-dot pulse-emerald w-1.5 h-1.5" />
              All Agents Online
            </div>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs transition-all btn-ghost">
              <RefreshCw className="w-3.5 h-3.5" />
              Sync
            </button>
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {MOCK_KPI_METRICS.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
          >
            <MetricCard metric={metric} iconName={iconNames[idx]} />
          </motion.div>
        ))}
      </div>

      {/* Main Grid: Stream + Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Live Knowledge Stream */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="lg:col-span-2 glass-card overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
              <h3 className="text-sm font-semibold text-primary">Live Knowledge Stream</h3>
              <span className="badge badge-info">LIVE</span>
            </div>
            <button 
              onClick={onNavigateToCorpus}
              className="btn-ghost text-xs flex items-center gap-1.5 px-3 py-1.5"
            >
              View Corpus <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="p-4 flex flex-col gap-2">
            {MOCK_DOCUMENTS.map((doc, idx) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.4 + idx * 0.06 }}
                className="flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all border border-subtle bg-deep/30 hover:bg-elevated/40 hover:border-active"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
                    style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.15)' }}>
                    <FileText className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
                  </div>
                  <div>
                    <div className="text-sm font-medium truncate max-w-xs text-primary">{doc.name}</div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-muted">
                      <span>{doc.size}</span>
                      <span>•</span>
                      <span>{doc.nodes} nodes</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-semibold uppercase badge-${doc.type === 'pdf' ? 'critical' : doc.type === 'xlsx' ? 'success' : 'info'}`}>
                    {doc.type}
                  </span>
                  {doc.status === 'processing' ? (
                    <span className="badge-processing badge text-[10px]">Processing</span>
                  ) : doc.status === 'failed' ? (
                    <span className="badge-critical badge text-[10px]">Failed</span>
                  ) : (
                    <span className="badge-success badge text-[10px]">Indexed</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* AI Triage Inbox */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.35 }}
          className="glass-card overflow-hidden flex flex-col"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" style={{ color: 'var(--accent-red)' }} />
              <h3 className="text-sm font-semibold text-primary">AI Triage Inbox</h3>
            </div>
            <span className="badge badge-critical">2 Active</span>
          </div>

          <div className="p-4 flex flex-col gap-3 flex-1">
            {aiAlerts.map((alert, idx) => (
              <motion.div
                key={alert.title}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + idx * 0.1 }}
                onClick={onNavigateToCopilot}
                className="p-4 rounded-xl cursor-pointer flex flex-col gap-2.5 transition-all border"
                style={{
                  background: alert.bgGlow,
                  borderColor: alert.borderColor,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.background = `${alert.bgGlow.replace('0.04', '0.08')}`;
                  (e.currentTarget as HTMLElement).style.borderColor = 'var(--accent-cyan)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.background = alert.bgGlow;
                  (e.currentTarget as HTMLElement).style.borderColor = alert.borderColor;
                }}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`badge ${alert.priorityColor}`}>{alert.type}</span>
                  </div>
                  <span className="text-[10px] shrink-0 text-muted">{alert.time}</span>
                </div>
                <h4 className="text-sm font-semibold text-primary">{alert.title}</h4>
                <p className="text-xs leading-relaxed text-secondary">{alert.desc}</p>
                <div className="flex items-center gap-1 text-xs font-semibold" style={{ color: alert.color }}>
                  Investigate in Copilot <ArrowRight className="w-3 h-3 ml-1" />
                </div>
              </motion.div>
            ))}

            {/* Monitoring Status */}
            <div className="mt-auto flex flex-col items-center justify-center text-center p-4 rounded-xl border border-dashed border-subtle bg-deep/10">
              <RefreshCw className="w-5 h-5 mb-2 text-muted animate-spin" style={{ animationDuration: '6s' }} />
              <p className="text-xs leading-relaxed text-muted">
                Continuously monitoring telemetry and documents for new anomalies.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* System Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {[
          { label: 'Vector DB', status: 'Qdrant Connected', color: 'var(--accent-emerald)', icon: Database },
          { label: 'Graph Engine', status: 'Neo4j Syncing', color: 'var(--accent-cyan)', icon: GitBranch },
          { label: 'AI Core', status: 'GraphRAG v2 Active', color: 'var(--accent-indigo)', icon: Cpu },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl border border-subtle bg-deep/20">
              <Icon className="w-4 h-4 shrink-0" style={{ color: s.color }} />
              <div className="flex-1 min-w-0">
                <div className="text-[10px] uppercase tracking-wider font-semibold text-muted">{s.label}</div>
                <div className="text-xs font-medium truncate" style={{ color: s.color }}>{s.status}</div>
              </div>
              <span className="pulse-dot pulse-emerald w-2 h-2 shrink-0" />
            </div>
          );
        })}
      </motion.div>
    </div>
  );
}
