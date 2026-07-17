import React from 'react';
import { TelemetryReading } from '@/types/intelliops';

interface TelemetryBarProps {
  reading: TelemetryReading;
  max?: number;
}

export default function TelemetryBar({ reading, max = 100 }: TelemetryBarProps) {
  // Color configuration
  const colorMap = {
    normal: 'var(--accent-emerald)',
    warning: 'var(--accent-amber)',
    critical: 'var(--accent-red)'
  };
  const color = colorMap[reading.status];

  // Percent calculation
  const percentage = Math.min(Math.max((reading.value / max) * 100, 0), 100);

  // Delta color and text
  const deltaColor = reading.delta > 0 ? 'var(--accent-amber)' : reading.delta < 0 ? 'var(--accent-red)' : 'var(--text-muted)';
  const deltaSign = reading.delta > 0 ? '+' : '';

  return (
    <div className="flex flex-col gap-1.5 p-3 rounded-lg border border-subtle bg-deep/20 relative overflow-hidden">
      {reading.status === 'critical' && (
        <div className="scan-line absolute inset-0 opacity-[0.03] pointer-events-none" />
      )}
      
      <div className="flex justify-between items-center text-xs">
        <span className="text-muted-foreground font-medium">{reading.label}</span>
        <div className="flex items-center gap-2 font-mono">
          <span className="text-primary font-semibold">{reading.value} {reading.unit}</span>
          {reading.delta !== 0 && (
            <span className="text-[10px]" style={{ color: deltaColor }}>
              ({deltaSign}{reading.delta}%)
            </span>
          )}
        </div>
      </div>

      <div className="progress-rail mt-1">
        <div 
          className="progress-fill"
          style={{ 
            width: `${percentage}%`, 
            backgroundColor: color,
            boxShadow: `0 0 10px ${color}40`,
            height: '4px'
          }}
        />
      </div>
    </div>
  );
}

