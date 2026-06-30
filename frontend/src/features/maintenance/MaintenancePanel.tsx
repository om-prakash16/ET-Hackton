"use client";
import React, { useState } from 'react';
import { AlertTriangle, Activity, CheckCircle2, Clock, Zap, Wrench, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_INVESTIGATIONS } from '@/lib/mockData';
import TelemetryBar from '@/components/ui/TelemetryBar';
import RCATree from '@/components/ui/RCATree';

export function MaintenancePanel() {
  const [activeId, setActiveId] = useState('inv-1');

  const selectedInv = MOCK_INVESTIGATIONS.find(i => i.id === activeId) || MOCK_INVESTIGATIONS[0];

  const severityDotClass = {
    critical: 'pulse-dot pulse-red bg-red-500',
    warning: 'pulse-dot pulse-amber bg-amber-500',
    monitoring: 'pulse-dot pulse-cyan bg-cyan-500'
  };

  const severityColors = {
    critical: 'var(--accent-red)',
    warning: 'var(--accent-amber)',
    monitoring: 'var(--accent-blue)'
  };

  // RCA tree node details for representation based on selected investigation
  const rcaData = {
    'inv-1': {
      symptom: {
        title: '15% Drop in Discharge Pressure',
        description: 'Detected via SCADA telemetry stream. Pressure drop deviation started at 08:14 AM IST.',
        evidence: ['Telemetry']
      },
      probableCause: {
        title: 'Mechanical Seal Degradation',
        description: 'Historically, 80% of pressure drops in P-101 series without power loss are caused by seal wear.',
        confidence: 94,
        evidence: ['API-610 Manual Pg 42']
      },
      rootCause: {
        title: 'Incorrect Seal Flushing Fluid',
        description: 'Last maintenance window fluid swap to Type-B. OEM Manual specifically prohibits Type-B for high-temperature operations, causing wear.',
        evidence: ['Maintenance_Log_Oct2.xlsx', 'API-610 Manual']
      }
    },
    'inv-2': {
      symptom: {
        title: 'Bearing Vibration Anomaly (4.8 mm/s)',
        description: 'High frequency oscillation detected on compressor driveshaft.',
        evidence: ['Vibration Sensor']
      },
      probableCause: {
        title: 'Bearing Misalignment',
        description: 'Correlating with recent motor mount bolt torque adjustments.',
        confidence: 88,
        evidence: ['C-502 Setup Logs']
      },
      rootCause: {
        title: 'Unchecked Torque Relaxation',
        description: 'Vibration-induced bolt loosening under sustained thermal load cycles.',
        evidence: ['Bolt Torque Spec.docx']
      }
    },
    'inv-3': {
      symptom: {
        title: 'V-201 Thermal Gradient Spike',
        description: 'Skin sensors indicate temperature discrepancy at containment bottom.',
        evidence: ['Thermal sensors']
      },
      probableCause: {
        title: 'Catalyst Bed Maldistribution',
        description: 'Uneven flow distribution leading to local hot spot generation.',
        confidence: 76,
        evidence: ['Visakhapatnam P&ID']
      },
      rootCause: {
        title: 'Feed Distributor Clogging',
        description: 'Polymerized residue deposition limiting nozzle flow cross-section.',
        evidence: ['Refinery Specs Q1.pdf']
      }
    }
  }[selectedInv.id] || {
    symptom: { title: 'Unknown Anomaly', description: 'Detailed data unavailable.', evidence: [] },
    probableCause: { title: 'Pending Correlation', description: 'Running GraphRAG pattern search...', confidence: 0, evidence: [] },
    rootCause: { title: 'Analyzing Sources', description: 'Scanning manual corpus...', evidence: [] }
  };

  const recommendations = [
    {
      step: 1,
      title: 'Immediate Isolation / Standby Swap',
      desc: 'Switch flow to standby unit immediately to prevent catastrophic blowout and loss of containment.',
      urgency: 'NOW',
      urgencyColor: 'var(--accent-red)',
    },
    {
      step: 2,
      title: 'Chemical / Fluid Swap Audit',
      desc: 'Drain existing fluid and replace with spec fluid per safety guidelines before resuming operations.',
      urgency: '< 4 HRS',
      urgencyColor: 'var(--accent-amber)',
    },
    {
      step: 3,
      title: 'Seal/Bearing Inspection Calibration',
      desc: 'Schedule unit shutdown for complete component overhaul per maintenance guidelines.',
      urgency: '1-2 DAYS',
      urgencyColor: 'var(--accent-cyan)',
    },
  ];

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full gap-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-1">
          <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, var(--accent-red), transparent)' }} />
          <h2 className="text-2xl font-bold tracking-tight text-primary">
            Maintenance Intelligence & RCA
          </h2>
        </div>
        <p className="text-sm ml-4 text-muted">
          AI-driven predictive maintenance and Root Cause Analysis derived from historical failure patterns.
        </p>
      </motion.div>

      <div className="flex gap-5 flex-col lg:flex-row min-h-[600px]">
        {/* Left Column: Investigations List */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="w-full lg:w-72 flex flex-col gap-4 shrink-0"
        >
          <div className="glass-card p-4 flex flex-col gap-2">
            <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase mb-1 px-1">Active Investigations</h3>
            {MOCK_INVESTIGATIONS.map((inc) => (
              <button
                key={inc.id}
                onClick={() => setActiveId(inc.id)}
                className="w-full text-left p-3.5 rounded-xl transition-all border"
                style={{
                  background: activeId === inc.id ? 'rgba(0, 212, 255, 0.05)' : 'transparent',
                  borderColor: activeId === inc.id ? 'var(--accent-cyan)' : 'transparent',
                  boxShadow: activeId === inc.id ? 'var(--glow-cyan)' : 'none',
                }}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`${severityDotClass[inc.severity]} w-2 h-2 shrink-0 rounded-full`} />
                  <span className="text-xs font-semibold text-primary">{inc.title}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-wider mt-2"
                     style={{ color: severityColors[inc.severity] }}>
                  <Clock className="w-3 h-3" />
                  ETA: {inc.etaHours ? `${inc.etaHours} HRS` : 'INVESTIGATING'}
                </div>
              </button>
            ))}
          </div>

          {/* Telemetry Stats */}
          <div className="glass-card p-4 flex flex-col gap-3">
            <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase px-1">Live Telemetry — {selectedInv.assetId}</h3>
            {selectedInv.telemetry.map((reading) => (
              <TelemetryBar key={reading.label} reading={reading} />
            ))}
          </div>
        </motion.div>

        {/* Right Column: RCA and Recommendations details */}
        <div className="flex-1 flex flex-col gap-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedInv.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="flex-1 flex flex-col gap-5"
            >
              {/* Detail Header */}
              <div className="glass-card p-5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-red-500/20 bg-red-500/5">
                      <AlertTriangle className="w-6 h-6 text-accent-red" style={{ color: 'var(--accent-red)' }} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h2 className="text-base font-bold text-primary">{selectedInv.title}</h2>
                        <span className={`badge uppercase text-[9px] badge-${selectedInv.severity === 'critical' ? 'critical' : 'warning'}`}>
                          {selectedInv.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-[11px] text-muted mt-1">
                        <span className="flex items-center gap-1"><Activity className="w-3 h-3 text-accent-cyan" />GraphRAG Correlation</span>
                        <span>•</span>
                        <span className="font-semibold text-accent-emerald">94.2% Confidence</span>
                      </div>
                    </div>
                  </div>
                  <button className="btn-primary flex items-center gap-2 text-xs py-2 px-4 shrink-0">
                    <Wrench className="w-4 h-4" />
                    Generate Work Order
                  </button>
                </div>
              </div>

              {/* RCA diagram & Action plan grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* RCA Flow */}
                <div className="glass-card p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <RefreshCw className="w-4 h-4 text-accent-cyan animate-spin" style={{ animationDuration: '8s' }} />
                    <h3 className="text-xs font-semibold text-primary">Automated Root Cause Analysis</h3>
                  </div>
                  <RCATree 
                    symptom={rcaData.symptom}
                    probableCause={rcaData.probableCause}
                    rootCause={rcaData.rootCause}
                  />
                </div>

                {/* Recommendations */}
                <div className="glass-card p-5 flex flex-col gap-4">
                  <div className="flex items-center gap-2 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-accent-emerald" />
                    <h3 className="text-xs font-semibold text-primary">AI Corrective Recommendations</h3>
                  </div>
                  <div className="flex flex-col gap-3">
                    {recommendations.map((rec) => (
                      <div
                        key={rec.step}
                        className="p-4 rounded-xl border border-subtle bg-deep/20 flex flex-col gap-2"
                      >
                        <div className="flex items-center gap-3 justify-between">
                          <div className="flex items-center gap-2">
                            <span className="w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold bg-void border border-subtle text-primary">
                              {rec.step}
                            </span>
                            <span className="text-xs font-semibold text-primary">{rec.title}</span>
                          </div>
                          <span 
                            className="px-2 py-0.5 rounded text-[9px] font-bold border"
                            style={{ 
                              color: rec.urgencyColor, 
                              borderColor: `${rec.urgencyColor}40`, 
                              backgroundColor: `${rec.urgencyColor}10` 
                            }}
                          >
                            {rec.urgency}
                          </span>
                        </div>
                        <p className="text-xs text-secondary leading-relaxed pl-8">{rec.desc}</p>
                      </div>
                    ))}
                    <button className="btn-primary flex items-center justify-center gap-2 mt-2 py-2.5 text-xs font-semibold">
                      <Zap className="w-4 h-4 text-accent-cyan" />
                      Execute Action Plan
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
