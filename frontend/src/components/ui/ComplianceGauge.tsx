import React, { useEffect, useState } from 'react';
import AnimatedNumber from './AnimatedNumber';

interface ComplianceGaugeProps {
  score: number;
  label?: string;
  size?: number;
}

export default function ComplianceGauge({ score, label = "Score", size = 260 }: ComplianceGaugeProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing curve (easeOutQuad)
      const ease = progress * (2 - progress);
      setAnimatedScore(Math.floor(ease * score));

      if (elapsed < duration) {
        window.requestAnimationFrame(animate);
      }
    };

    const frame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(frame);
  }, [score]);

  // SVG parameters
  const strokeWidth = 14;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  // Arc angle (~270 degrees, centered at bottom)
  const angleSpan = 270;
  const strokeDashoffset = circumference - (angleSpan / 360) * circumference;

  // Actual progress offset
  const progressRatio = animatedScore / 100;
  const progressOffset = circumference - (angleSpan / 360) * circumference * progressRatio;

  // Color mapping based on score
  const color = score >= 90 ? 'var(--accent-emerald)' : score >= 70 ? 'var(--accent-amber)' : 'var(--accent-red)';

  return (
    <div className="flex flex-col items-center justify-center relative select-none" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-225">
        <defs>
          <filter id="gauge-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Gray Track Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(122, 163, 200, 0.08)"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />

        {/* Colored Progress Arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={progressOffset}
          strokeLinecap="round"
          filter="url(#gauge-glow)"
          style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
        />
      </svg>

      {/* Center Readout Text */}
      <div className="absolute flex flex-col items-center justify-center text-center mt-[-10px]">
        <span className="text-4xl font-extrabold tracking-tight text-primary font-mono">
          <AnimatedNumber value={score} />%
        </span>
        <span className="text-[10px] font-bold tracking-widest text-muted uppercase mt-1">
          {label}
        </span>
      </div>
    </div>
  );
}
