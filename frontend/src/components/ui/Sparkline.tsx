import React from 'react';
import { motion } from 'framer-motion';

interface SparklineProps {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}

export default function Sparkline({ data, color, width = 120, height = 40 }: SparklineProps) {
  if (!data || data.length === 0) return null;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((val, index) => {
    const x = (index / (data.length - 1)) * width;
    const y = height - ((val - min) / range) * (height - 8) - 4; // margin top/bottom
    return { x, y };
  });

  // Create SVG path string
  const pathData = points.reduce((acc, point, index) => {
    if (index === 0) return `M ${point.x} ${point.y}`;
    // Simple smooth curve
    const prev = points[index - 1];
    const cpX1 = prev.x + (point.x - prev.x) / 2;
    const cpY1 = prev.y;
    const cpX2 = prev.x + (point.x - prev.x) / 2;
    const cpY2 = point.y;
    return `${acc} C ${cpX1} ${cpY1}, ${cpX2} ${cpY2}, ${point.x} ${point.y}`;
  }, '');

  // Path for gradient fill (closed at the bottom)
  const fillPathData = `${pathData} L ${width} ${height} L 0 ${height} Z`;

  return (
    <div style={{ width, height }} className="relative">
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none">
        <defs>
          <linearGradient id={`gradient-${color}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity={0.15} />
            <stop offset="100%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        {/* Fill Area */}
        <motion.path
          d={fillPathData}
          fill={`url(#gradient-${color})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />

        {/* Line */}
        <motion.path
          d={pathData}
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        />
      </svg>
    </div>
  );
}
