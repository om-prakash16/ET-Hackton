"use client";
import React, { useState } from 'react';
import { RefreshCw, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_COMPLIANCE_FRAMEWORKS, MOCK_VIOLATIONS } from '@/lib/mockData';
import ComplianceGauge from '@/components/ui/ComplianceGauge';
import FrameworkRow from '@/components/ui/FrameworkRow';
import ViolationCard from '@/components/ui/ViolationCard';

export function CompliancePanel() {
  const [isScanning, setIsScanning] = useState(false);
  const [selectedFrameworkId, setSelectedFrameworkId] = useState('frame-2');
  const [violations, setViolations] = useState<any[]>(MOCK_VIOLATIONS);
  const [globalScore, setGlobalScore] = useState(85);

  const triggerScan = async () => {
    setIsScanning(true);
    
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/compliance/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          equipment_tag: 'P-101A',
          target_regulation: 'OISD-105'
        })
      });
      
      const data = await response.json();
      
      if (data.gaps && data.gaps.length > 0) {
        setGlobalScore(81);
        
        // Map backend gaps to our ViolationCard schema
        const newViolations = data.gaps.map((gap: any, index: number) => ({
          id: `live-gap-${index}`,
          title: gap.description,
          framework: gap.regulatory_reference,
          severity: gap.severity.toLowerCase(),
          asset: data.equipment_tag,
          date: 'Just now'
        }));
        
        setViolations(newViolations);
      } else {
        setGlobalScore(100);
        setViolations([]);
      }
    } catch (error) {
      console.error("Failed to run compliance scan", error);
    } finally {
      setIsScanning(false);
    }
  };

  return (
    <div className="flex flex-col max-w-7xl mx-auto w-full gap-6">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
      >
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-1 h-6 rounded-full" style={{ background: 'linear-gradient(180deg, var(--accent-amber), transparent)' }} />
            <h2 className="text-2xl font-bold tracking-tight text-primary">
              Compliance & Safety Intelligence
            </h2>
          </div>
          <p className="text-sm ml-4 text-muted">
            Real-time alignment of operational telemetry against regulatory frameworks (OISD, API, Factory Act).
          </p>
        </div>
        <button
          onClick={triggerScan}
          disabled={isScanning}
          className="btn-primary flex items-center gap-2 text-xs py-2 px-4 shrink-0"
        >
          <RefreshCw className={`w-4 h-4 ${isScanning ? 'animate-spin' : ''}`} />
          {isScanning ? 'Running Audit...' : 'Trigger Full Audit'}
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Left Column: Score + Frameworks */}
        <div className="flex flex-col gap-4">
          {/* Score Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 flex flex-col items-center gap-4"
          >
            <ComplianceGauge score={globalScore} label="Global Score" size={180} />
            <div className="text-center">
              <h3 className="text-sm font-semibold text-primary">Overall Compliance Score</h3>
              <p className="text-xs mt-1.5 leading-relaxed text-muted">
                {globalScore < 100 ? `Score degraded by ${100 - globalScore}% due to missing inspections on primary equipment.` : `Fully compliant across active frameworks.`}
              </p>
            </div>
            <div className="flex gap-2 w-full mt-2">
              {[
                { label: 'Critical', val: '2', color: 'var(--accent-red)' },
                { label: 'Warnings', val: '5', color: 'var(--accent-amber)' },
                { label: 'Passed', val: '47', color: 'var(--accent-emerald)' }
              ].map((s) => (
                <div 
                  key={s.label} 
                  className="flex-1 text-center p-2 rounded-lg border border-subtle bg-void/50"
                >
                  <div className="text-base font-bold font-mono" style={{ color: s.color }}>{s.val}</div>
                  <div className="text-[9px] uppercase tracking-wider font-semibold text-muted">{s.label}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Frameworks */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-4 flex flex-col gap-3"
          >
            <h3 className="text-[10px] font-bold tracking-widest text-muted uppercase px-1">Active Regulatory Frameworks</h3>
            <div className="flex flex-col gap-2">
              {MOCK_COMPLIANCE_FRAMEWORKS.map((fw) => (
                <FrameworkRow 
                  key={fw.id} 
                  framework={fw} 
                  isSelected={selectedFrameworkId === fw.id}
                  onClick={() => setSelectedFrameworkId(fw.id)}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Violations & Audits */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25 }}
          className="lg:col-span-2 glass-card flex flex-col overflow-hidden"
        >
          <div className="flex items-center justify-between px-5 py-4 border-b border-subtle">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-accent-red" />
              <h3 className="text-sm font-semibold text-primary">Detected Violations & Risks</h3>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="badge badge-critical text-[9px]">{violations.filter(v => v.severity === 'critical' || v.severity === 'high').length} Critical</span>
              <span className="badge badge-warning text-[9px]">{violations.filter(v => v.severity === 'warning' || v.severity === 'medium').length} Warnings</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            <AnimatePresence mode="wait">
              {isScanning ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-active bg-void relative overflow-hidden"
                >
                  <div className="scan-line absolute inset-0 opacity-[0.05]" />
                  <RefreshCw className="w-6 h-6 animate-spin text-accent-cyan" />
                  <span className="text-xs font-mono text-accent-cyan mt-2">
                    Cross-referencing Graph model against safety codes & regulations...
                  </span>
                </motion.div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-3"
                >
                  {violations.length > 0 ? violations.map((v) => (
                    <ViolationCard key={v.id} violation={v} />
                  )) : (
                    <div className="text-center text-muted text-sm py-10">No violations detected. Equipment is compliant.</div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
