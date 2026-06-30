import React from 'react';
import { ComplianceFramework } from '@/types/intelliops';
import { Shield, ChevronUp, ChevronDown } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';

interface FrameworkRowProps {
  framework: ComplianceFramework;
  isSelected?: boolean;
  onClick?: () => void;
}

export default function FrameworkRow({ framework, isSelected = false, onClick }: FrameworkRowProps) {
  // Status and color mappings
  const badges = {
    compliant: <span className="badge badge-success text-[9px]">Compliant</span>,
    partial: <span className="badge badge-warning text-[9px]">Partial</span>,
    'review-needed': <span className="badge badge-critical text-[9px]">Review Needed</span>
  };

  const colors = {
    compliant: 'var(--accent-emerald)',
    partial: 'var(--accent-amber)',
    'review-needed': 'var(--accent-red)'
  };
  const color = colors[framework.status];

  // Up/down trend styling (API, OISD progress simulation)
  const isUp = framework.score >= 80;

  return (
    <div 
      onClick={onClick}
      className={`p-4 rounded-xl border cursor-pointer transition-all flex flex-col gap-3 ${
        isSelected 
          ? 'bg-elevated border-active shadow-md' 
          : 'bg-deep/30 border-subtle hover:bg-elevated/40 hover:border-active hover:-translate-y-0.5'
      }`}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-subtle bg-void">
            <Shield className="w-4 h-4" style={{ color }} />
          </div>
          <span className="text-xs font-semibold text-primary">{framework.name}</span>
        </div>

        <div className="flex items-center gap-3 font-mono">
          <div className="text-right">
            <div className="text-sm font-bold text-primary">
              <AnimatedNumber value={framework.score} />%
            </div>
          </div>
          {isUp ? (
            <ChevronUp className="w-3.5 h-3.5 text-accent-emerald" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-accent-amber" />
          )}
        </div>
      </div>

      <div className="progress-rail mt-0.5">
        <div 
          className="progress-fill" 
          style={{ 
            width: `${framework.score}%`, 
            backgroundColor: color,
            height: '3.5px' 
          }}
        />
      </div>

      <div className="flex justify-between items-center text-[10px] mt-0.5 text-muted">
        <span>Framework Health</span>
        {badges[framework.status]}
      </div>
    </div>
  );
}
