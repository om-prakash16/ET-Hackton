import React from 'react';
import { Violation } from '@/types/intelliops';
import { AlertCircle, AlertTriangle, Info, ChevronRight } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface ViolationCardProps {
  violation: Violation;
  onClick?: () => void;
}

export default function ViolationCard({ violation, onClick }: ViolationCardProps) {
  // Severity config
  const severityMap = {
    critical: { icon: AlertCircle, color: 'var(--accent-red)', badge: 'badge-critical' },
    warning: { icon: AlertTriangle, color: 'var(--accent-amber)', badge: 'badge-warning' },
    info: { icon: Info, color: 'var(--accent-blue)', badge: 'badge-info' }
  };

  const config = severityMap[violation.severity] || severityMap.info;
  const Icon = config.icon;

  return (
    <div 
      onClick={onClick}
      className="p-4 rounded-xl border border-subtle bg-deep/20 hover:bg-elevated/40 hover:border-active transition-all flex items-start gap-3 cursor-pointer group hover:-translate-y-0.5"
    >
      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 border border-subtle bg-void mt-0.5">
        <Icon className="w-4 h-4" style={{ color: config.color }} />
      </div>

      <div className="flex-1 min-w-0 flex flex-col gap-1.5">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <h4 className="text-xs font-semibold text-primary truncate max-w-[200px] sm:max-w-md">
            {violation.title}
          </h4>
          <span className="text-[9px] text-muted shrink-0">
            {formatDistanceToNow(new Date(violation.detectedAt), { addSuffix: true })}
          </span>
        </div>

        <div className="flex gap-1.5 items-center flex-wrap">
          <span className={`badge ${config.badge} text-[8px] uppercase font-bold py-0.5 px-1.5`}>
            {violation.framework}
          </span>
          <span className="text-[10px] text-muted">{violation.section}</span>
        </div>

        <p className="text-xs text-secondary leading-relaxed mt-0.5">
          {violation.description}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 text-muted self-center group-hover:text-primary transition-colors shrink-0 ml-1" />
    </div>
  );
}
