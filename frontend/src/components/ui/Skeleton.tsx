import React from 'react';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
}

export default function Skeleton({ className = '', width, height }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse rounded bg-elevated/40 border border-subtle/50 relative overflow-hidden before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/5 before:to-transparent ${className}`}
      style={{
        width: width,
        height: height
      }}
    />
  );
}
