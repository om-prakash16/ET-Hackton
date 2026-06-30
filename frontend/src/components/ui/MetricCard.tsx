import React from 'react';
import { KPIMetric } from '@/types/intelliops';
import Sparkline from './Sparkline';
import AnimatedNumber from './AnimatedNumber';
import * as LucideIcons from 'lucide-react';

interface MetricCardProps {
  metric: KPIMetric;
  iconName: keyof typeof LucideIcons;
}

export default function MetricCard({ metric, iconName }: MetricCardProps) {
  const Icon = LucideIcons[iconName] as React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

  // Color mapping based on status
  const colorMap = {
    normal: 'var(--accent-emerald)',
    warning: 'var(--accent-amber)',
    critical: 'var(--accent-red)'
  };
  const color = colorMap[metric.status] || 'var(--accent-cyan)';

  // Mock delta for presentation value
  const isPositive = !metric.label.toLowerCase().includes('score');
  const deltaText = isPositive ? '+3.4% this week' : '-2% degradation';

  return (
    <div className="metric-card p-6 flex flex-col justify-between h-44 relative">
      <div className="flex justify-between items-start">
        {Icon && (
          <div className="w-10 h-10 rounded-lg flex items-center justify-center"
               style={{ background: 'rgba(0, 212, 255, 0.05)', border: '1px solid rgba(0, 212, 255, 0.15)' }}>
            <Icon className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
          </div>
        )}
        <div className="ml-4">
          <Sparkline data={metric.trend} color={color} width={120} height={36} />
        </div>
      </div>

      <div className="mt-4">
        <div className="text-3xl font-bold tracking-tight text-primary">
          <AnimatedNumber value={metric.value} />
        </div>
        <div className="text-[10px] font-semibold tracking-wider text-muted uppercase mt-1">
          {metric.label}
        </div>
      </div>

      <div className="text-[11px] mt-2 flex items-center gap-1.5" style={{ color: isPositive ? 'var(--accent-cyan)' : 'var(--accent-red)' }}>
        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: isPositive ? 'var(--accent-cyan)' : 'var(--accent-red)' }} />
        {deltaText}
      </div>
    </div>
  );
}
